'use client';

import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import { getApartmentById, Apartment } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';

export default function ApartmentDetailsPage() {
  const params = useParams();
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApartment = async () => {
      if (!params?.id) {
        notFound();
        return;
      }

      try {
        const data = await getApartmentById(params.id as string);
        setApartment(data);
      } catch (error) {
        console.error('Error fetching apartment:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchApartment();
  }, [params?.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#e6f0ff] to-[#f0f7ff] flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!apartment) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e6f0ff] to-[#f0f7ff] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          ← Back to Listings
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative h-96 w-full">
            {apartment.imageUrl ? (
              <Image
                src={apartment.imageUrl}
                alt={apartment.unitName}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                unoptimized={true}
              />
            ) : (
              <div className="bg-gray-100 h-full w-full flex items-center justify-center">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
          </div>

          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{apartment.unitName}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Unit Number</h3>
                  <p className="mt-1 text-lg text-gray-900">{apartment.unitNumber}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Project</h3>
                  <p className="mt-1 text-lg text-gray-900">{apartment.project}</p>
                </div>
                {apartment.price && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Price</h3>
                    <p className="mt-1 text-lg text-gray-900">${apartment.price.toLocaleString()}</p>
                  </div>
                )}
                {apartment.bedrooms && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Bedrooms</h3>
                    <p className="mt-1 text-lg text-gray-900">{apartment.bedrooms}</p>
                  </div>
                )}
                {apartment.bathrooms && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Bathrooms</h3>
                    <p className="mt-1 text-lg text-gray-900">{apartment.bathrooms}</p>
                  </div>
                )}
                {apartment.squareFootage && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Square Footage</h3>
                    <p className="mt-1 text-lg text-gray-900">{apartment.squareFootage.toLocaleString()} sq ft</p>
                  </div>
                )}
              </div>
              {apartment.amenities && apartment.amenities.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Amenities</h3>
                  <ul className="mt-2 space-y-2">
                    {apartment.amenities.map((amenity, index) => (
                      <li key={index} className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-900">{amenity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {apartment.description && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
                <p className="text-gray-600 leading-relaxed">{apartment.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 