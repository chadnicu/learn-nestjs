import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class NumberIdParamDto {
  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  id: number;
}
