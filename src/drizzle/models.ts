import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import * as schema from "./schema";

export type Job = InferSelectModel<typeof schema.jobs>;
export type NewJob = InferInsertModel<typeof schema.jobs>;

export type Application = InferSelectModel<typeof schema.applications>;
export type NewApplication = InferInsertModel<typeof schema.applications>;
