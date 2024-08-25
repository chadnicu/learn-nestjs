import { Controller, Delete, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@ApiTags('testing')
@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('getAllRows')
  getAllData() {
    return this.appService.getAllRows();
  }

  @Delete('deleteAllRows')
  deleteAllData() {
    return this.appService.deleteAllRows();
  }
}
