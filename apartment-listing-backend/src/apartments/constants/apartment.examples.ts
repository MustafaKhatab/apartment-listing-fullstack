export const CREATE_APARTMENT_EXAMPLE = {
  unitName: 'Unit A',
  unitNumber: '101',
  project: 'Katameya Heights',
  address: '123 Main St, Cairo',
  price: 1200,
  bedrooms: 2,
  bathrooms: 1,
  squareFootage: 850,
  amenities: ['Pool', 'Gym'],
  description: 'A beautiful apartment with city views.',
  imageUrl: 'https://example.com/images/apartments/apartment.jpg',
  isAvailable: true
};

export const CREATED_APARTMENT_EXAMPLE = {
  _id: '60c72b2f9b1e8e6d88f1e8e6',
  ...CREATE_APARTMENT_EXAMPLE,
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
  __v: 0
}; 