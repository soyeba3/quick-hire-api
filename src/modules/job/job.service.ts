import { and, desc, eq, like, sql } from "drizzle-orm";
import { db } from "../../drizzle";
import { NewJob } from "../../drizzle/models";
import { jobs } from "../../drizzle/schema";
import { paginationCalculator } from "../../utils/pagination-calculator";

export class JobService {
  async findAll(query: {
    search?: string;
    category?: string;
    location?: string;
    type?: string;
    limit?: string;
    offset?: string;
  }) {
    const { search, category, location, type, limit, offset } = query;
    const { limit: limitNum, offset: offsetNum } = paginationCalculator(
      limit,
      offset,
    );

    const whereClauses: any[] = [];

    if (search) {
      whereClauses.push(
        sql`(${jobs.title} LIKE ${`%${search}%`} OR ${jobs.company} LIKE ${`%${search}%`})`,
      );
    }
    if (category) {
      whereClauses.push(eq(jobs.category, category as any));
    }
    if (location) {
      whereClauses.push(like(jobs.location, `%${location}%`));
    }
    if (type) {
      whereClauses.push(eq(jobs.type, type as any));
    }

    const baseQuery = db.select().from(jobs);

    if (whereClauses.length > 0) {
      baseQuery.where(and(...whereClauses));
    }

    if (limitNum !== undefined && offsetNum !== undefined) {
      baseQuery.limit(limitNum).offset(offsetNum);
    }

    baseQuery.orderBy(desc(jobs.createdAt));

    return await baseQuery;
  }

  async findOne(id: number) {
    const result = await db.select().from(jobs).where(eq(jobs.id, id));
    return result[0];
  }

  async create(data: NewJob) {
    const result = await db.insert(jobs).values(data);
    const insertedId = result[0].insertId;
    return await this.findOne(insertedId);
  }

  async update(id: number, data: Partial<NewJob>) {
    await db.update(jobs).set(data).where(eq(jobs.id, id));
    return await this.findOne(id);
  }

  async delete(id: number) {
    await db.delete(jobs).where(eq(jobs.id, id));
    return true;
  }
}
