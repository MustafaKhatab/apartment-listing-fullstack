import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateApartmentDto } from '../dto/create-apartment.dto';
import { PaginatedResponse } from '../interfaces/paginated-response.interface';
import { Apartment, ApartmentDocument } from '../schemas/apartment.schema';
import { PaginationDto } from '../dto/pagination.dto';
import { ApartmentQuery } from '../interfaces/apartment-query.interface';


@Injectable()
export class ApartmentsService {
  constructor(
    @InjectModel(Apartment.name)
    private apartmentModel: Model<ApartmentDocument>,
  ) { }

  async create(createApartmentDto: CreateApartmentDto): Promise<Apartment> {
    const createdApartment = new this.apartmentModel(createApartmentDto);
    return createdApartment.save();
  }

  async findAll(
    pagination: PaginationDto,
    filters?: {
      unitName?: string;
      unitNumber?: string;
      project?: string;
    },
  ): Promise<PaginatedResponse<Apartment>> {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;

    const query: ApartmentQuery = {};
    if (filters) {
      if (filters.unitName) {
        query.unitName = { $regex: filters.unitName, $options: 'i' };
      }
      if (filters.unitNumber) {
        query.unitNumber = { $regex: filters.unitNumber, $options: 'i' };
      }
      if (filters.project) {
        query.project = { $regex: filters.project, $options: 'i' };
      }
    }

    const [data, total] = await Promise.all([
      this.apartmentModel
        .find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.apartmentModel.countDocuments(query).exec(),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<Apartment> {
    const apartment = await this.apartmentModel.findById(id).exec();
    if (!apartment) {
      throw new NotFoundException(`Apartment with ID ${id} not found`);
    }
    return apartment;
  }
} 