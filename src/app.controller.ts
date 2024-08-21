import { Controller, Delete, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

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
