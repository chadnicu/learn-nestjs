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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetPayload } from 'src/auth/auth.decorator';

@ApiBearerAuth('access-token')
@ApiTags('workouts')
@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Post()
  create(@GetPayload('sub') userId: number, @Body() body: CreateWorkoutDto) {
    return this.workoutsService.create({ ...body, userId });
  }

  @Get(':id')
  find(@GetPayload('sub') userId: number, @Param() { id }: NumberIdParamDto) {
    return this.workoutsService.find(id, userId);
  }

  @Get()
  findAllByUser(@GetPayload('sub') userId: number) {
    return this.workoutsService.findAllByUser(userId);
  }

  @Patch(':id')
  update(
    @GetPayload('sub') userId: number,
    @Param() { id }: NumberIdParamDto,
    @Body() body: UpdateWorkoutDto,
  ) {
    return this.workoutsService.update(id, { ...body, userId });
  }

  @Delete(':id')
  delete(@GetPayload('sub') userId: number, @Param() { id }: NumberIdParamDto) {
    return this.workoutsService.delete(id, userId);
  }
}
