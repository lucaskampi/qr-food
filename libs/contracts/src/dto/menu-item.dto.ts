import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean, IsPositive, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMenuItemDto {
  @ApiProperty({ example: 'Margherita Pizza' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'Classic tomato sauce, mozzarella, fresh basil' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 12.99 })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiPropertyOptional({ example: 'https://example.com/pizza.jpg' })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;
}

export class UpdateMenuItemDto {
  @ApiPropertyOptional({ example: 'Margherita Pizza' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 'Classic tomato sauce, mozzarella, fresh basil' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 12.99 })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({ example: 'https://example.com/pizza.jpg' })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;
}

export class MenuItemResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty()
  price: number;

  @ApiPropertyOptional()
  imageUrl?: string;

  @ApiProperty()
  isAvailable: boolean;

  @ApiProperty()
  categoryId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
