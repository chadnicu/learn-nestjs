import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AllowAnon, Role, Roles } from './auth/auth.decorator';

@ApiBearerAuth('access-token')
@ApiTags('testing')
@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @AllowAnon()
  @HttpCode(HttpStatus.OK)
  @Post('sign-in-as-admin')
  signInAsAdmin() {
    return this.appService.signInAsAdmin();
  }

  @Roles(Role.Admin)
  @Post('create-mock-data')
  createMockData() {
    return this.appService.createMockData(3);
  }

  @Roles(Role.Admin)
  @Get('get-all-rows')
  getAllRows() {
    return this.appService.getAllRows();
  }

  @Roles(Role.Admin)
  @Delete('delete-all-data-except-admin-account')
  deleteAllRowsExceptAdminAccount() {
    return this.appService.deleteAllRowsExceptAdminAccount();
  }
}
