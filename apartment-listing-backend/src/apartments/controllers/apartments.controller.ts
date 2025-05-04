import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBody } from '@nestjs/swagger';
import { ApartmentsService } from '../services/apartments.service';
import { CreateApartmentDto } from '../dto/create-apartment.dto';
import { PaginatedResponse } from '../interfaces/paginated-response.interface';
import { Apartment } from '../schemas/apartment.schema';

@ApiTags('apartments')
@Controller('apartments')
export class ApartmentsController {
  constructor(private readonly apartmentsService: ApartmentsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new apartment' })
  @ApiBody({
    type: CreateApartmentDto,
    examples: {
      example1: {
        summary: 'Basic apartment',
        value: {
          unitName: 'Unit A',
          unitNumber: '101',
          project: 'Sunset Towers',
          address: '123 Main St, Cityville',
          price: 1200,
          bedrooms: 2,
          bathrooms: 1,
          squareFootage: 850,
          amenities: ['Pool', 'Gym'],
          description: 'A beautiful apartment with city views.',
          imageUrl: 'https://example.com/images/apartments/apartment.jpg',
          isAvailable: true
        }
      }
    }
  })
  @ApiResponse({ status: 201, description: 'The apartment has been successfully created.', type: Apartment, 
    schema: {
      example: {
        _id: '60c72b2f9b1e8e6d88f1e8e6',
        unitName: 'Unit A',
        unitNumber: '101',
        project: 'Sunset Towers',
        address: '123 Main St, Cityville',
        price: 1200,
        bedrooms: 2,
        bathrooms: 1,
        squareFootage: 850,
        amenities: ['Pool', 'Gym'],
        description: 'A beautiful apartment with city views.',
        imageUrl: 'https://example.com/images/apartments/apartment.jpg',
        isAvailable: true,
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T00:00:00.000Z',
        __v: 0
      }
    }
  })
  async create(@Body() createApartmentDto: CreateApartmentDto): Promise<Apartment> {
    return this.apartmentsService.create(createApartmentDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all apartments with optional filtering',
    description: 'Retrieves a paginated list of apartments with optional filtering by unit name, number, and project. Results are sorted by creation date in descending order.'
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination',
    type: 'number',
    example: 1
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of items per page',
    type: 'number',
    example: 10
  })
  @ApiQuery({
    name: 'unitName',
    required: false,
    description: 'Filter apartments by unit name (case-insensitive partial match)',
  })
  @ApiQuery({
    name: 'unitNumber',
    required: false,
    description: 'Filter apartments by unit number (case-insensitive partial match)',
  })
  @ApiQuery({
    name: 'project',
    required: false,
    description: 'Filter apartments by project name (case-insensitive partial match)',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns a paginated list of apartments matching the criteria.',
    schema: {
      type: 'object',
      properties: {
        data: { type: 'array', items: { $ref: '#/components/schemas/Apartment' } },
        total: { type: 'number' },
        page: { type: 'number' },
        limit: { type: 'number' },
        totalPages: { type: 'number' }
      }
    }
  })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('unitName') unitName?: string,
    @Query('unitNumber') unitNumber?: string,
    @Query('project') project?: string,
  ): Promise<PaginatedResponse<Apartment>> {
    return this.apartmentsService.findAll(
      { page, limit },
      { unitName, unitNumber, project }
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get apartment by ID' })
  @ApiResponse({ status: 200, description: 'Return the apartment.', type: Apartment })
  @ApiResponse({ status: 404, description: 'Apartment not found.' })
  async findOne(@Param('id') id: string): Promise<Apartment> {
    return this.apartmentsService.findOne(id);
  }
} 