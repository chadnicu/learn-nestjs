import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  readonly username: string;

  @IsString()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @ApiProperty()
  readonly passwordHash: string;

  @IsString()
  @ApiProperty()
  readonly weightUnit: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  readonly firstName?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  readonly lastName?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  readonly dateOfBirth?: number;

  @IsNumber()
  @IsOptional()
  readonly createdAt: number;

  @IsNumber()
  @IsOptional()
  readonly updatedAt: number;
}
