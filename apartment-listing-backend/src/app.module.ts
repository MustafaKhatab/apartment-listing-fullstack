import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ApartmentsModule } from './apartments/apartments.module';
import { SeedDataService } from './scripts/seed-data';
import { Apartment, ApartmentSchema } from './apartments/schemas/apartment.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: Apartment.name, schema: ApartmentSchema },
    ]),
    ApartmentsModule,
  ],
  providers: [SeedDataService],
})
export class AppModule { }
