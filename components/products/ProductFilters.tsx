'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { ChevronDown, X } from 'lucide-react';
import Button from '@/components/ui/Button';

export interface FilterState {
  sortBy: string;
  categories: string[];
  priceRange: [number, number];
  inStock: boolean;
  featured: boolean;
}

interface ProductFiltersProps {
  categories: string[];
  onFilterChange: (filters: FilterState) => void;
  totalProducts: number;
  filteredCount: number;
}

const PRICE_RANGES = [
  { label: 'Under ₹500', min: 0, max: 500 },
  { label: '₹500 - ₹1000', min: 500, max: 1000 },
  { label: '₹1000 - ₹2000', min: 1000, max: 2000 },
  { label: '₹2000 - ₹5000', min: 2000, max: 5000 },
  { label: 'Above ₹5000', min: 5000, max: Infinity },
];

export default function ProductFilters({
  categories,
  onFilterChange,
  totalProducts,
  filteredCount,
}: ProductFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    sortBy: 'newest',
    categories: [],
    priceRange: [0, Infinity],
    inStock: false,
    featured: false,
  });

  const [expandedSections, setExpandedSections] = useState({
    sort: true,
    category: true,
    price: true,
    availability: false,
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const toggleSection = useCallback((section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }, []);

  const handleSortChange = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, sortBy: value }));
  }, []);

  const handleCategoryToggle = useCallback((category: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  }, []);

  const handlePriceRangeSelect = useCallback((min: number, max: number) => {
    setFilters((prev) => ({ ...prev, priceRange: [min, max] }));
  }, []);

  const handleInStockToggle = useCallback(() => {
    setFilters((prev) => ({ ...prev, inStock: !prev.inStock }));
  }, []);

  const handleFeaturedToggle = useCallback(() => {
    setFilters((prev) => ({ ...prev, featured: !prev.featured }));
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({
      sortBy: 'newest',
      categories: [],
      priceRange: [0, Infinity],
      inStock: false,
      featured: false,
    });
  }, []);

  const hasActiveFilters = useMemo(
    () =>
      filters.categories.length > 0 ||
      filters.priceRange[1] !== Infinity ||
      filters.inStock ||
      filters.featured,
    [filters.categories.length, filters.priceRange[1], filters.inStock, filters.featured]
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg flex items-center justify-between hover:bg-gray-50"
        >
          <span className="font-medium">Filters & Sort</span>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 lg:hidden ${
          isOpen ? 'block' : 'hidden'
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`fixed left-0 top-0 h-full w-80 bg-white z-50 overflow-y-auto transition-transform lg:relative lg:w-full lg:h-auto lg:bg-transparent lg:z-auto lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 lg:p-0">
          {/* Close button for mobile */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden absolute top-4 right-4"
          >
            <X className="w-6 h-6" />
          </button>

          <h2 className="text-xl font-semibold mb-6 mt-8 lg:mt-0">
            Filters & Sort
          </h2>

          {/* Results count */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <p className="text-sm text-gray-800">
              Showing <span className="font-medium">{filteredCount}</span> of{' '}
              <span className="font-medium">{totalProducts}</span> products
            </p>
          </div>

          {/* Sort Section */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <button
              onClick={() => toggleSection('sort')}
              className="flex items-center justify-between w-full mb-4"
            >
              <h3 className="font-semibold text-gray-900">Sort By</h3>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  expandedSections.sort ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedSections.sort && (
              <div className="space-y-2">
                {[
                  { value: 'newest', label: 'Newest First' },
                  { value: 'price-low', label: 'Price: Low to High' },
                  { value: 'price-high', label: 'Price: High to Low' },
                  { value: 'name-asc', label: 'Name: A-Z' },
                  { value: 'name-desc', label: 'Name: Z-A' },
                  { value: 'featured', label: 'Featured' },
                ].map((option) => (
                  <label key={option.value} className="flex items-center gap-3 cursor-pointer hover:text-gray-900">
                    <input
                      type="radio"
                      name="sort"
                      value={option.value}
                      checked={filters.sortBy === option.value}
                      onChange={(e) => handleSortChange(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-800">{option.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Category Section */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <button
              onClick={() => toggleSection('category')}
              className="flex items-center justify-between w-full mb-4"
            >
              <h3 className="font-semibold text-gray-900">Category</h3>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  expandedSections.category ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedSections.category && (
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center gap-3 cursor-pointer hover:text-gray-900">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category)}
                      onChange={() => handleCategoryToggle(category)}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm text-gray-800">{category}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Price Range Section */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <button
              onClick={() => toggleSection('price')}
              className="flex items-center justify-between w-full mb-4"
            >
              <h3 className="font-semibold text-gray-900">Price Range</h3>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  expandedSections.price ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedSections.price && (
              <div className="space-y-2">
                {PRICE_RANGES.map((range) => (
                  <label key={range.label} className="flex items-center gap-3 cursor-pointer hover:text-gray-900">
                    <input
                      type="radio"
                      name="price"
                      checked={
                        filters.priceRange[0] === range.min &&
                        filters.priceRange[1] === range.max
                      }
                      onChange={() => handlePriceRangeSelect(range.min, range.max)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-800">{range.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Availability Section */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <button
              onClick={() => toggleSection('availability')}
              className="flex items-center justify-between w-full mb-4"
            >
              <h3 className="font-semibold text-gray-900">Availability</h3>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  expandedSections.availability ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedSections.availability && (
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer hover:text-gray-900">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={handleInStockToggle}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm text-gray-800">In Stock Only</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer hover:text-gray-900">
                  <input
                    type="checkbox"
                    checked={filters.featured}
                    onChange={handleFeaturedToggle}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm text-gray-800">Featured Products</span>
                </label>
              </div>
            )}
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <Button
              onClick={handleClearFilters}
              variant="secondary"
              className="w-full"
            >
              Clear All Filters
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
