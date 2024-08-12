import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class NumberIdParamDto {
  @IsNumber()
  @ApiProperty()
  id: number;
}
