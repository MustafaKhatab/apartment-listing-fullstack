import Image from 'next/image';
import Link from 'next/link';
import { Apartment } from '@/lib/api';

interface ApartmentCardProps {
  apartment: Apartment;
}

export default function ApartmentCard({ apartment }: ApartmentCardProps) {
  if (!apartment._id) {
    console.error('Apartment ID is missing:', apartment);
    return null;
  }

  return (
    <Link href={`/apartments/${apartment._id}`} passHref>
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative h-48 w-full">
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
        <div className="p-5">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{apartment.unitName}</h3>
          <div className="space-y-1">
            <p className="text-gray-600 flex items-center">
              <span className="font-medium">Unit:</span>
              <span className="ml-2">{apartment.unitNumber}</span>
            </p>
            <p className="text-gray-600 flex items-center">
              <span className="font-medium">Project:</span>
              <span className="ml-2">{apartment.project}</span>
            </p>
          </div>
          {apartment.description && (
            <p className="mt-3 text-gray-500 line-clamp-2">{apartment.description}</p>
          )}
        </div>
      </div>
    </Link>
  );
} 