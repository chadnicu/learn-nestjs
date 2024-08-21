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
import { NumberIdParamDto, StringUsernameParamDto } from 'src/common/dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Get(':id')
  findById(@Param() { id }: NumberIdParamDto) {
    return this.usersService.findById(id);
  }

  @Get(':username')
  findByUsername(@Param() { username }: StringUsernameParamDto) {
    return this.usersService.findByUsername(username);
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
