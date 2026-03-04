import { desc, eq, sql } from "drizzle-orm";
import { db } from "../../drizzle";
import { NewApplication } from "../../drizzle/models";
import { applications } from "../../drizzle/schema";
import { paginationCalculator } from "../../utils/pagination-calculator";

export class ApplicationService {
  async findAll(query: { limit?: string; offset?: string } = {}) {
    const { limit: limitNum, offset: offsetNum } = paginationCalculator(
      query.limit,
      query.offset,
    );

    const totalResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(applications);

    const total = totalResult[0]?.count || 0;

    const baseQuery = db
      .select()
      .from(applications)
      .orderBy(desc(applications.createdAt));

    if (limitNum !== undefined && offsetNum !== undefined) {
      baseQuery.limit(limitNum).offset(offsetNum);
    }

    const items = await baseQuery;

    const page = query.offset ? parseInt(query.offset) : 1;
    const limitVal = query.limit ? parseInt(query.limit) : items.length;

    return {
      items,
      meta: {
        total,
        page,
        limit: limitVal,
        totalPages: limitVal > 0 ? Math.ceil(total / limitVal) : 1,
      },
    };
  }

  async findByJobId(jobId: number) {
    return await db
      .select()
      .from(applications)
      .where(eq(applications.jobId, jobId))
      .orderBy(desc(applications.createdAt));
  }

  async create(data: NewApplication) {
    const result = await db.insert(applications).values(data);
    const insertedId = result[0].insertId;
    const inserted = await db
      .select()
      .from(applications)
      .where(eq(applications.id, insertedId));
    return inserted[0];
  }

  async delete(id: number) {
    await db.delete(applications).where(eq(applications.id, id));
    return true;
  }
}
