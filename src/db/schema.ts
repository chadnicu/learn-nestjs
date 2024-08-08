import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const exerciseTable = sqliteTable('exercise', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  instructions: text('instructions'),
  url: text('url'),
  userId: text('user_id').notNull(),
});

export const templateTable = sqliteTable('template', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  userId: text('user_id').notNull(),
});

export const templateExerciseTable = sqliteTable('template_exercise', {
  id: integer('id').primaryKey(),
  toDo: text('todo'),
  exerciseId: integer('exercise_id')
    .notNull()
    .references(() => exerciseTable.id),
  templateId: integer('template_id')
    .notNull()
    .references(() => templateTable.id),
  order: integer('order').notNull().default(-1),
});

export const workoutTable = sqliteTable('workout', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  date: text('date').default(sql`CURRENT_DATE`),
  started: text('started'),
  finished: text('finished'),
  comment: text('comment'),
  userId: text('user_id').notNull(),
});

export const workoutExerciseTable = sqliteTable('workout_exercise', {
  id: integer('id').primaryKey(),
  toDo: text('todo'),
  comment: text('comment'),
  workoutId: integer('workout_id')
    .notNull()
    .references(() => workoutTable.id),
  exerciseId: integer('exercise_id')
    .notNull()
    .references(() => exerciseTable.id),
  order: integer('order').notNull().default(-1),
});

export const setTable = sqliteTable('set', {
  id: integer('id').primaryKey(),
  reps: integer('reps'),
  weight: integer('weight'),
  workoutExerciseId: integer('workout_exercise_id')
    .notNull()
    .references(() => workoutExerciseTable.id),
  userId: text('user_id').notNull(),
});

// export type InsertExercise = typeof exerciseTable.$inferInsert;
// export type SelectExercise = typeof exerciseTable.$inferSelect;

// export type InsertTemplate = typeof templateTable.$inferInsert;
// export type SelectTemplate = typeof templateTable.$inferSelect;

// export type InsertTemplateExercise = typeof templateExerciseTable.$inferInsert;
// export type SelectTemplateExercise = typeof templateExerciseTable.$inferSelect;

// export type InsertWorkout = typeof workoutTable.$inferInsert;
// export type SelectWorkout = typeof workoutTable.$inferSelect;

// export type InsertWorkoutExercise = typeof workoutExerciseTable.$inferInsert;
// export type SelectWorkoutExercise = typeof workoutExerciseTable.$inferSelect;

// export type InsertSet = typeof setTable.$inferInsert;
// export type SelectSet = typeof setTable.$inferSelect;
