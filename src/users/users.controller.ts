import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UsersService } from './users.service';
import { NumberIdParamDto } from 'src/common/dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Get(':id')
  find(@Param() { id }: NumberIdParamDto) {
    return this.usersService.find(id);
  }

  @Patch(':id')
  update(@Param() { id }: NumberIdParamDto, @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  delete(@Param() { id }: NumberIdParamDto) {
    return this.usersService.delete(id);
  }
}
