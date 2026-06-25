import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CarCard from "../components/discover/CarCard";
import FilterChips from "../components/discover/FilterChips";
import { SkeletonGrid } from "../components/ui/SkeletonLoader";
// Import your dynamic filterCars and static chips config
import { FILTER_CHIPS, filterCars } from "../data/cars.js"; 

export default function DiscoverPage() {
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]); // State to hold the backend results

  // Trigger a fetch whenever activeFilters changes
  useEffect(() => {
    async function fetchFilteredData() {
      setLoading(true);
      try {
        const data = await filterCars(activeFilters);
        setFilteredCars(data);
      } catch (error) {
        console.error("Failed to load cars matching filters:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchFilteredData();
  }, [activeFilters]); // Runs initially and whenever a filter chip is toggled

  const toggleFilter = (filter) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

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
      ) : filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car, i) => (
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