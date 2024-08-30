import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AllowAnon, GetPayload } from './auth.decorator';
import { CreateUserDto, UpdateUserDto } from '../users/dto';
import { JwtPayload } from './interface/jwt-payload.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @AllowAnon()
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body() { username, password }: SignInDto) {
    return this.authService.signIn(username, password);
  }

  @AllowAnon()
  @HttpCode(HttpStatus.OK)
  @Post('sign-up')
  signUp(@Body() data: CreateUserDto) {
    return this.authService.signUp(data);
  }

  @ApiBearerAuth('access-token')
  @Get('profile')
  async getProfile(@GetPayload() payload: JwtPayload) {
    return {
      payload,
      user: await this.authService.getUserData(payload.sub),
    };
  }

  @ApiBearerAuth('access-token')
  @Patch('profile')
  async updateProfile(
    @GetPayload() payload: JwtPayload,
    @Body() body: UpdateUserDto,
  ) {
    const profile = await this.authService.updateProfile({
      ...body,
      userId: payload.sub,
    });
    return { payload, ...profile };
  }

  @ApiBearerAuth('access-token')
  @Delete('profile')
  deleteProfile(@GetPayload('sub') userId: number) {
    return this.authService.deleteProfile(userId);
  }
}
