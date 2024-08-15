CREATE TABLE `exercise` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`instructions` text,
	`url` text,
	`user_id` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `template_exercise` (
	`id` integer PRIMARY KEY NOT NULL,
	`todo` text,
	`exercise_id` integer NOT NULL,
	`template_id` integer NOT NULL,
	`order` integer DEFAULT -1 NOT NULL,
	FOREIGN KEY (`exercise_id`) REFERENCES `exercise`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`template_id`) REFERENCES `template`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `template_set` (
	`id` integer PRIMARY KEY NOT NULL,
	`reps` integer,
	`weight` integer,
	`rir` integer,
	`template_exercise_id` integer NOT NULL,
	FOREIGN KEY (`template_exercise_id`) REFERENCES `template_exercise`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `template` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`user_id` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` integer PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`email` text NOT NULL,
	`password_hash` text NOT NULL,
	`weight_unit` text DEFAULT 'kg' NOT NULL,
	`first_name` text,
	`last_name` text,
	`date_of_birth` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `workout_exercise` (
	`id` integer PRIMARY KEY NOT NULL,
	`todo` text,
	`comment` text,
	`workout_id` integer NOT NULL,
	`exercise_id` integer NOT NULL,
	`order` real DEFAULT -1 NOT NULL,
	FOREIGN KEY (`workout_id`) REFERENCES `workout`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`exercise_id`) REFERENCES `exercise`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `workout_set` (
	`id` integer PRIMARY KEY NOT NULL,
	`reps` integer,
	`weight` integer,
	`rir` integer,
	`comment` text,
	`workout_exercise_id` integer NOT NULL,
	FOREIGN KEY (`workout_exercise_id`) REFERENCES `workout_exercise`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `workout` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`date` integer DEFAULT (unixepoch()) NOT NULL,
	`started` text,
	`finished` text,
	`comment` text,
	`user_id` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `template_exercise_exercise_id_template_id_unique` ON `template_exercise` (`exercise_id`,`template_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_username_unique` ON `user` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `workout_exercise_exercise_id_workout_id_unique` ON `workout_exercise` (`exercise_id`,`workout_id`);