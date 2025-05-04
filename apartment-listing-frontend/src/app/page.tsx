'use client';

import { useState, useEffect } from 'react';
import { getApartments, Apartment, SearchFilters } from '@/lib/api';
import ApartmentCard from '@/components/ApartmentCard';
import SearchBar from '@/components/SearchBar';
import Pagination from '@/components/Pagination';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        setLoading(true);
        const response = await getApartments(currentPage, itemsPerPage, filters);
        console.log('Fetched apartments:', response.data);
        
        setApartments(response.data);
        setTotalPages(response.totalPages);
        setTotalItems(response.total);
      } catch (error) {
        console.error('Error fetching apartments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApartments();
  }, [filters, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Apartment Listings</h1>
          <SearchBar onSearch={setFilters} />
          <p className={styles.subtitle}>
            Showing {apartments.length} of {totalItems} apartments
          </p>
        </div>

        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
          </div>
        ) : apartments.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyStateText}>No apartments found</p>
          </div>
        ) : (
          <>
            <div className={styles.grid}>
              {apartments.map((apartment) => (
                <ApartmentCard key={apartment._id} apartment={apartment} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}
