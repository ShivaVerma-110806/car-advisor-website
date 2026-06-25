import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CarCard from "../components/discover/CarCard";
import FilterChips from "../components/discover/FilterChips";
import { SkeletonGrid } from "../components/ui/SkeletonLoader";
import { cars, FILTER_CHIPS, filterCars } from "../data/cars";

export default function DiscoverPage() {
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const toggleFilter = (filter) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const filtered = filterCars(activeFilters);

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
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((car, i) => (
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
