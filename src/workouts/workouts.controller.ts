import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { CreateWorkoutDto, UpdateWorkoutDto } from './dto';
import { NumberIdParamDto } from 'src/common/dto';

@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Post()
  create(@Body() body: CreateWorkoutDto) {
    return this.workoutsService.create(body);
  }

  @Get(':id')
  find(@Param() { id }: NumberIdParamDto) {
    return this.workoutsService.find(id);
  }

  @Get('/user/:id')
  findAllByUser(@Param() { id: userId }: NumberIdParamDto) {
    return this.workoutsService.findAllByUser(userId);
  }

  @Patch(':id')
  update(@Param() { id }: NumberIdParamDto, @Body() body: UpdateWorkoutDto) {
    return this.workoutsService.update(id, body);
  }

  @Delete(':id')
  delete(@Param() { id }: NumberIdParamDto) {
    return this.workoutsService.delete(id);
  }
}
