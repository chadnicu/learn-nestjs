import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class StringIdParamDto {
  @IsString()
  @ApiProperty()
  id: string;
}
