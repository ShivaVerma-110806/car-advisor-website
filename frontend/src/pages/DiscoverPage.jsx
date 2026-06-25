import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CarCard from "../components/discover/CarCard";
import FilterChips from "../components/discover/FilterChips";
import { SkeletonGrid } from "../components/ui/SkeletonLoader";
// Import static chips config and getAllCars service helper
import { FILTER_CHIPS, getAllCars } from "../data/cars.js"; 

export default function DiscoverPage() {
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState([]);
  const [cars, setCars] = useState([]); // State to hold all cars fetched from backend

  // Fetch all cars once on mount
  useEffect(() => {
    async function fetchAllData() {
      setLoading(true);
      try {
        const data = await getAllCars();
        setCars(data);
      } catch (error) {
        console.error("Failed to load cars:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchAllData();
  }, []); // Runs once on mount

  const toggleFilter = (filter) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  // Case-insensitive filtering logic executed right before mapping
  const displayedCars = cars.filter((car) =>
    activeFilters.every((filter) => {
      const lowerFilter = filter.toLowerCase();
      if (lowerFilter === "under 10l") {
        return car.priceMax <= 1000000;
      }
      if (lowerFilter === "under 20l") {
        return car.priceMax <= 2000000;
      }
      if (
        lowerFilter === "city driving" ||
        lowerFilter === "long trips" ||
        lowerFilter === "family"
      ) {
        return car.tags?.some((tag) => tag.toLowerCase() === lowerFilter);
      }
      return (
        car.bodyType?.toLowerCase() === lowerFilter ||
        car.fuelType?.toLowerCase() === lowerFilter ||
        car.transmission?.toLowerCase() === lowerFilter ||
        car.tags?.some((tag) => tag.toLowerCase() === lowerFilter)
      );
    })
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 page-enter">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary">
          Discover Premium Cars
        </h1>
        <p className="mt-4 text-lg text-text-secondary max-w-2xl">
          Explore our curated selection — filter by what matters to you.
        </p>
      </motion.div>

      <div className="mt-8 mb-10">
        <FilterChips filters={FILTER_CHIPS} activeFilters={activeFilters} onToggle={toggleFilter} />
      </div>

      {loading ? (
        <SkeletonGrid count={6} />
      ) : displayedCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCars.map((car, i) => (
            <CarCard key={car.id} car={car} index={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-text-secondary text-lg">No cars match your filters.</p>
          <button
            onClick={() => setActiveFilters([])}
            className="mt-4 text-accent-light hover:text-accent font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}