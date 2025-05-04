import axios from 'axios';

export interface Apartment {
  _id: string;
  unitName: string;
  unitNumber: string;
  project: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  squareFootage?: number;
  amenities?: string[];
}

export interface SearchFilters {
  unitName?: string;
  unitNumber?: string;
  project?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getApartments = async (
  page: number = 1, 
  limit: number = 10,
  filters: SearchFilters = {}
): Promise<PaginatedResponse<Apartment>> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(filters.unitName && { unitName: filters.unitName }),
    ...(filters.unitNumber && { unitNumber: filters.unitNumber }),
    ...(filters.project && { project: filters.project })
  });

  try {
    const response = await api.get<PaginatedResponse<Apartment>>(`/apartments?${params}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching apartments:', error);
    throw error;
  }
};

export const getApartmentById = async (id: string): Promise<Apartment> => {
  try {
    const response = await api.get<Apartment>(`/apartments/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching apartment:', error);
    throw error;
  }
};
