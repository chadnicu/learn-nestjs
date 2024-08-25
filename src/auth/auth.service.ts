import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InvalidCredentialsException } from './exceptions/invalid-credentials.exception';
import { CreateUserDto, UpdateUserDto } from 'src/users/dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) throw new InvalidCredentialsException();

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(data: CreateUserDto) {
    await this.usersService.create(data);
    return await this.signIn(data.username, data.password);
  }

  getUserData(userId: number) {
    return this.usersService.findById(userId);
  }

  async updateProfile(data: UpdateUserDto & { userId: number }) {
    const updated = await this.usersService.update(data);
    const payload = { sub: updated.id, username: updated.username };
    const updated_token = await this.jwtService.signAsync(payload);
    return { updated, updated_token };
  }

  deleteProfile(userId: number) {
    return this.usersService.delete(userId);
  }
}
