'use client';

import { useState, useEffect } from 'react';

interface SearchFilters {
  unitName?: string;
  unitNumber?: string;
  project?: string;
}

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchField, setSearchField] = useState<keyof SearchFilters>('unitName');
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      const filters: SearchFilters = {};
      if (searchValue) {
        filters[searchField] = searchValue;
      }
      onSearch(filters);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue, searchField, onSearch]);

  const clearFilters = () => {
    setSearchValue('');
    onSearch({});
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <select
          value={searchField}
          onChange={(e) => setSearchField(e.target.value as keyof SearchFilters)}
          className="w-full sm:w-auto px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
        >
          <option value="unitName">Unit Name</option>
          <option value="unitNumber">Unit Number</option>
          <option value="project">Project</option>
        </select>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={`Search by ${searchField.replace(/([A-Z])/g, ' $1').toLowerCase()}...`}
          className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-600"
        />
      </div>
      {searchValue && (
        <button
          type="button"
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Clear filter
        </button>
      )}
    </div>
  );
} 