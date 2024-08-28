import { Inject, Injectable } from '@nestjs/common';
import { Database, DrizzleAsyncProvider } from './db/db.module';
import {
  exerciseTable,
  templateExerciseTable,
  templateSetTable,
  templateTable,
  userTable,
  workoutExerciseTable,
  workoutSetTable,
  workoutTable,
} from './db/schema';
import { UsersService } from './users/users.service';
import { AuthService } from './auth/auth.service';
import { ne } from 'drizzle-orm';
import { ExercisesService } from './exercises/exercises.service';
import { WorkoutsService } from './workouts/workouts.service';
import { TemplatesService } from './templates/templates.service';
import { WorkoutExercisesService } from './workout-exercises/workout-exercises.service';
import { TemplateExercisesService } from './template-exercises/template-exercises.service';
import { WorkoutSetsService } from './workout-sets/workout-sets.service';
import { TemplateSetsService } from './template-sets/template-sets.service';

@Injectable()
export class AppService {
  constructor(
    @Inject(DrizzleAsyncProvider) private db: Database,
    private usersService: UsersService,
    private authService: AuthService,
    private exercisesService: ExercisesService,
    private workoutsService: WorkoutsService,
    private templatesService: TemplatesService,
    private workoutExercisesService: WorkoutExercisesService,
    private templateExercisesService: TemplateExercisesService,
    private workoutSetsService: WorkoutSetsService,
    private templateSetsService: TemplateSetsService,
  ) {}

  async signInAsAdmin() {
    return await this.authService.signIn('nicu', 'nicu');
  }

  async createMockData(userId: number) {
    const exercisesData = [
      {
        title: 'Bench Press',
        instructions: 'Press the barbell',
        url: 'https://www.youtube.com/shorts/EdDqD4aKwxM',
        userId,
      },
      {
        title: 'Dumbbell Row',
        instructions: 'Row the dumbbell',
        url: 'https://www.youtube.com/watch?v=DMo3HJoawrU',
        userId,
      },
      {
        title: 'Barbell Squat',
        instructions: 'Squat the barbell',
        url: 'https://www.youtube.com/shorts/gslEzVggur8',
        userId,
      },
    ];

    const workoutsData = [
      {
        title: 'Push',
        description: 'Chest',
        userId,
      },
      {
        title: 'Pull',
        description: 'Back',
        userId,
      },
      {
        title: 'Lower',
        description: 'Legs',
        userId,
      },
    ];

    const templatesData = [
      {
        title: 'Push template',
        description: 'Chest',
        userId,
      },
      {
        title: 'Pull template',
        description: 'Back',
        userId,
      },
      {
        title: 'Lower template',
        description: 'Legs',
        userId,
      },
    ];

    const [exercises, workouts, templates] = await Promise.all([
      Promise.all(
        exercisesData.map((exercise) => this.exercisesService.create(exercise)),
      ),
      Promise.all(
        workoutsData.map((workout) => this.workoutsService.create(workout)),
      ),
      Promise.all(
        templatesData.map((template) => this.templatesService.create(template)),
      ),
    ]);

    const ids = Array(3)
      .fill(null)
      .map((_, i) => ({
        exerciseId: exercises[i].id,
        workoutId: workouts[i].id,
        templateId: templates[i].id,
      }));

    const [workoutExercises, templateExercises] = await Promise.all([
      Promise.all(
        ids.map(({ exerciseId, workoutId }) =>
          this.workoutExercisesService.create(
            { exerciseId, workoutId },
            userId,
          ),
        ),
      ),
      Promise.all(
        ids.map(({ exerciseId, templateId }) =>
          this.templateExercisesService.create(
            { exerciseId, templateId },
            userId,
          ),
        ),
      ),
    ]);

    const moreIds = Array(3)
      .fill(null)
      .map((_, i) => ({
        workoutExerciseId: workoutExercises[i].id,
        templateExerciseId: templateExercises[i].id,
      }));

    await Promise.all([
      moreIds.map(({ workoutExerciseId, templateExerciseId }) => {
        this.workoutSetsService.create({ workoutExerciseId, userId });
        this.templateSetsService.create({ templateExerciseId, userId });
      }),
    ]);

    return await this.getAllRows();
  }

  async getAllRows() {
    const [
      users,
      exercises,
      templates,
      templateExercises,
      workouts,
      workoutExercises,
      workoutSets,
      templateSets,
    ] = await Promise.all([
      this.db.select().from(userTable).all(),
      this.db.select().from(exerciseTable).all(),
      this.db.select().from(templateTable).all(),
      this.db.select().from(templateExerciseTable).all(),
      this.db.select().from(workoutTable).all(),
      this.db.select().from(workoutExerciseTable).all(),
      this.db.select().from(workoutSetTable).all(),
      this.db.select().from(templateSetTable).all(),
    ]);

    return {
      users,
      exercises,
      templates,
      templateExercises,
      workouts,
      workoutExercises,
      workoutSets,
      templateSets,
    };
  }

  async deleteAllRowsExceptAdminAccount() {
    await Promise.all([
      this.db.delete(templateSetTable).all(),
      this.db.delete(workoutSetTable).all(),
    ]);

    await Promise.all([
      this.db.delete(templateExerciseTable).all(),
      this.db.delete(workoutExerciseTable).all(),
    ]);

    await Promise.all([
      this.db.delete(templateTable).all(),
      this.db.delete(workoutTable).all(),
      this.db.delete(exerciseTable).all(),
    ]);

    await this.db.delete(userTable).where(ne(userTable.id, 3));

    return 'Deleted all rows';

    // In case I need to drop the tables again:
    /* 
      DROP TABLE IF EXISTS template_set;
      DROP TABLE IF EXISTS workout_set;
      
      DROP TABLE IF EXISTS template_exercise;
      DROP TABLE IF EXISTS workout_exercise;
      
      DROP TABLE IF EXISTS template;
      DROP TABLE IF EXISTS workout;
      DROP TABLE IF EXISTS exercise;
      
      DROP TABLE IF EXISTS user;
    */
  }
}
