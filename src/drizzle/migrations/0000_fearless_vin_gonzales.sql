CREATE TABLE `applications` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`job_id` bigint unsigned NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`resume_link` varchar(500) NOT NULL,
	`cover_note` text NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `applications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `jobs` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`company` varchar(255) NOT NULL,
	`location` varchar(255) NOT NULL,
	`category` enum('Design','Sales','Marketing','Finance','Technology','Engineering','Business','Human Resource') NOT NULL,
	`type` enum('Full-Time','Part-Time','Contract','Remote') NOT NULL,
	`description` text NOT NULL,
	`company_logo` varchar(500),
	`is_featured` boolean DEFAULT false,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `jobs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `applications` ADD CONSTRAINT `applications_job_id_jobs_id_fk` FOREIGN KEY (`job_id`) REFERENCES `jobs`(`id`) ON DELETE cascade ON UPDATE no action;