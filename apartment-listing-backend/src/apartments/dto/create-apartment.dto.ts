import { IsString, IsNumber, IsArray, IsBoolean, IsOptional, Min, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApartmentDto {
  @ApiProperty({ example: 'Unit A', description: 'The name of the unit' })
  @IsString()
  @IsNotEmpty()
  unitName: string;

  @ApiProperty({ example: '101', description: 'The unit number' })
  @IsString()
  @IsNotEmpty()
  unitNumber: string;

  @ApiProperty({ example: 'Katameya Heights', description: 'The project name' })
  @IsString()
  @IsNotEmpty()
  project: string;

  @ApiProperty({ example: '123 Main St, Cairo', description: 'The address of the apartment' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: 1200, description: 'The price of the apartment' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 2, description: 'Number of bedrooms' })
  @IsNumber()
  @Min(0)
  bedrooms: number;

  @ApiProperty({ example: 1, description: 'Number of bathrooms' })
  @IsNumber()
  @Min(0)
  bathrooms: number;

  @ApiProperty({ example: 850, description: 'Square footage' })
  @IsNumber()
  @Min(0)
  squareFootage: number;

  @ApiProperty({ example: ['Pool', 'Gym'], description: 'List of amenities', required: false })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  amenities?: string[];

  @ApiProperty({ example: 'A beautiful apartment with city views.', description: 'Description of the apartment' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'https://example.com/images/apartments/apartment.jpg', description: 'Image URLs', required: true })
  @IsString()
  @IsOptional()
  imageUrl: string;

  @ApiProperty({ example: true, description: 'Availability status', required: false })
  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;
} 