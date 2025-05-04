import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Apartment } from '../apartments/schemas/apartment.schema';

const cairoProjects = [
  'New Cairo',
  'Madinaty',
  'Rehab City',
  'El Shorouk',
  '6th of October City',
  'Sheikh Zayed',
  'Katameya Heights',
  'Palm Hills',
  'Mountain View',
  'Al Rehab'
];

const apartmentNames = [
  'Luxury Apartment',
  'Modern Studio',
  'Cozy Flat',
  'Elegant Residence',
  'Premium Suite',
  'Contemporary Loft',
  'Stylish Apartment',
  'Comfortable Home',
  'Spacious Unit',
  'Exclusive Residence'
];

const imageUrls = [
  'property_image_305962.webp',
  'compound_image_2031.webp',
  'compound_image_2034.webp'
];

const amenitiesList = ['Pool', 'Gym', 'Parking', 'Elevator', 'Security', 'Garden'];

@Injectable()
export class SeedDataService implements OnModuleInit {
  constructor(
    @InjectModel(Apartment.name) private apartmentModel: Model<Apartment>,
  ) { }

  async onModuleInit() {
    try {
      await this.seedData();
    } catch (error) {
      console.error('Error during database initialization:', error);
    }
  }

  async seedData() {
    try {
      const apartments = [];

      for (let i = 0; i < 50; i++) {
        const project = cairoProjects[Math.floor(Math.random() * cairoProjects.length)];
        const name = apartmentNames[Math.floor(Math.random() * apartmentNames.length)];
        const unitNumber = `${Math.floor(Math.random() * 1000)}`;
        const imageUrl = `http://localhost:3001/static/${imageUrls[Math.floor(Math.random() * imageUrls.length)]}`;
        const address = `${Math.floor(Math.random() * 1000)} Main St, ${project}`;
        const price = Math.floor(Math.random() * 5000) + 1000;
        const bedrooms = Math.floor(Math.random() * 4) + 1;
        const bathrooms = Math.floor(Math.random() * 3) + 1;
        const squareFootage = Math.floor(Math.random() * 150) + 50;
        const amenities = Array.from({ length: Math.floor(Math.random() * 4) }, () => amenitiesList[Math.floor(Math.random() * amenitiesList.length)]);
        const isAvailable = Math.random() > 0.2;
        apartments.push({
          unitName: `${name} in ${project}`,
          unitNumber,
          project,
          address,
          price,
          bedrooms,
          bathrooms,
          squareFootage,
          amenities,
          description: `A beautiful ${name.toLowerCase()} located in the prestigious ${project} area. Features modern amenities and stunning views.`,
          imageUrl,
          isAvailable,
        });
      }

      await this.apartmentModel.deleteMany({});

      await this.apartmentModel.insertMany(apartments);

    } catch (error) {
      console.error('Error seeding data:', error);
      throw error;
    }
  }
} 