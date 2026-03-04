import {
  bigint,
  boolean,
  mysqlEnum,
  mysqlTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const jobCategories = [
  "Design",
  "Sales",
  "Marketing",
  "Finance",
  "Technology",
  "Engineering",
  "Business",
  "Human Resource",
] as const;

export const jobTypes = [
  "Full-Time",
  "Part-Time",
  "Contract",
  "Remote",
] as const;

export const jobs = mysqlTable("jobs", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  category: mysqlEnum("category", jobCategories).notNull(),
  type: mysqlEnum("type", jobTypes).notNull(),
  description: text("description").notNull(),
  companyLogo: varchar("company_logo", { length: 500 }),
  isFeatured: boolean("is_featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const applications = mysqlTable("applications", {
  id: serial("id").primaryKey(),
  jobId: bigint("job_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => jobs.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  resumeLink: varchar("resume_link", { length: 500 }).notNull(),
  coverNote: text("cover_note").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
