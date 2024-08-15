import { Controller, Delete, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('getAllRows')
  getAllData() {
    return this.appService.getAllData();
  }

  @Delete('deleteAllRows')
  deleteAllData() {
    return this.appService.deleteAllData();
  }
}
