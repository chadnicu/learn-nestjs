import { sql } from 'drizzle-orm';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const userTable = sqliteTable('user', {
  id: integer('id').primaryKey(),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  passwordSalt: text('password_salt').notNull(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  dateOfBirth: text('date_of_birth'),
  createdAt: integer('created_at', { mode: 'number' })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer('updated_at', { mode: 'number' })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const exerciseTable = sqliteTable('exercise', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  instructions: text('instructions'),
  url: text('url'),
  userId: integer('user_id')
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
});

export const templateTable = sqliteTable('template', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  userId: integer('user_id')
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
});

export const templateExerciseTable = sqliteTable('template_exercise', {
  id: integer('id').primaryKey(),
  toDo: text('todo'),
  exerciseId: integer('exercise_id')
    .notNull()
    .references(() => exerciseTable.id, { onDelete: 'cascade' }),
  templateId: integer('template_id')
    .references(() => templateTable.id, { onDelete: 'cascade' })
    .notNull(),
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
  userId: integer('user_id')
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
});

export const workoutExerciseTable = sqliteTable('workout_exercise', {
  id: integer('id').primaryKey(),
  toDo: text('todo'),
  comment: text('comment'),
  workoutId: integer('workout_id')
    .references(() => workoutTable.id, { onDelete: 'cascade' })
    .notNull(),
  exerciseId: integer('exercise_id')
    .references(() => exerciseTable.id, { onDelete: 'cascade' })
    .notNull(),
  order: real('order').notNull().default(-1),
});

export const setTable = sqliteTable('set', {
  id: integer('id').primaryKey(),
  reps: integer('reps'),
  weight: integer('weight'),
  workoutExerciseId: integer('workout_exercise_id')
    .notNull()
    .references(() => workoutExerciseTable.id, { onDelete: 'cascade' })
    .notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
});
