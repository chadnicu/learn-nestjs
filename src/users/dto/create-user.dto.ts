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
  readonly passwordSalt: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  readonly firstName?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  readonly lastName?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  readonly dateOfBirth?: string;

  @IsNumber()
  readonly createdAt: number;

  @IsNumber()
  readonly updatedAt: number;
}
