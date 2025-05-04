import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, IsBoolean, IsOptional, Min, IsNotEmpty } from 'class-validator';

export type ApartmentDocument = Apartment & Document;

@Schema({ timestamps: true })
export class Apartment {
  @ApiProperty({ example: 'Unit A', description: 'The name of the unit' })
  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  unitName: string;

  @ApiProperty({ example: '101', description: 'The unit number' })
  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  unitNumber: string;

  @ApiProperty({ example: 'Katameya Heights', description: 'The project name' })
  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  project: string;

  @ApiProperty({ example: '123 Main St, Cairo', description: 'The address of the apartment' })
  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  address: string;

  @ApiProperty({ example: 1200, description: 'The price of the apartment' })
  @IsNumber()
  @Min(0)
  @Prop({ required: true })
  price: number;

  @ApiProperty({ example: 2, description: 'Number of bedrooms' })
  @IsNumber()
  @Min(0)
  @Prop({ required: true })
  bedrooms: number;

  @ApiProperty({ example: 1, description: 'Number of bathrooms' })
  @IsNumber()
  @Min(0)
  @Prop({ required: true })
  bathrooms: number;

  @ApiProperty({ example: 850, description: 'Square footage' })
  @IsNumber()
  @Min(0)
  @Prop({ required: true })
  squareFootage: number;

  @ApiProperty({ example: ['Pool', 'Gym'], description: 'List of amenities', required: false })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @Prop({ type: [String], default: [] })
  amenities?: string[];

  @ApiProperty({ example: 'A beautiful apartment with city views.', description: 'Description of the apartment' })
  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  description: string;

  @ApiProperty({ example: 'https://example.com/images/apartments/apartment.jpg', description: 'Image URL', required: false })
  @IsString()
  @IsOptional()
  @Prop({ type: String, default: '' })
  imageUrl: string;

  @ApiProperty({ example: true, description: 'Availability status', required: false })
  @IsBoolean()
  @IsOptional()
  @Prop({ default: true })
  isAvailable: boolean;
}

export const ApartmentSchema = SchemaFactory.createForClass(Apartment); 