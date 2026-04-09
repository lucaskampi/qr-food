import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRestaurantDto {
  @ApiProperty({ example: 'La Bella Italia' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '123 Main Street, Downtown' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiPropertyOptional({ example: '+1 555-123-4567' })
  @IsString()
  @IsOptional()
  phone?: string;
}

export class UpdateRestaurantDto {
  @ApiPropertyOptional({ example: 'La Bella Italia' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: '123 Main Street, Downtown' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({ example: '+1 555-123-4567' })
  @IsString()
  @IsOptional()
  phone?: string;
}

export class RestaurantResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiPropertyOptional()
  phone?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
