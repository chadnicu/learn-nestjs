CREATE TABLE `set` (
	`id` integer PRIMARY KEY NOT NULL,
	`reps` integer,
	`weight` integer,
	`workout_exercise_id` integer NOT NULL,
	`user_id` text NOT NULL,
	FOREIGN KEY (`workout_exercise_id`) REFERENCES `workout_exercise`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `workout_exercise` (
	`id` integer PRIMARY KEY NOT NULL,
	`todo` text,
	`comment` text,
	`workout_id` integer NOT NULL,
	`exercise_id` integer NOT NULL,
	`order` real DEFAULT -1 NOT NULL,
	FOREIGN KEY (`workout_id`) REFERENCES `workout`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`exercise_id`) REFERENCES `exercise`(`id`) ON UPDATE no action ON DELETE no action
);
