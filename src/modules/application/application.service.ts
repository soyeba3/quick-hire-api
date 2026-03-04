import { desc, eq } from "drizzle-orm";
import { db } from "../../drizzle";
import { NewApplication } from "../../drizzle/models";
import { applications } from "../../drizzle/schema";

export class ApplicationService {
  async findAll() {
    return await db
      .select()
      .from(applications)
      .orderBy(desc(applications.createdAt));
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
