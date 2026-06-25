import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import CarCard from "../discover/CarCard";
import FilterChips from "../discover/FilterChips";
import { SkeletonGrid } from "../ui/SkeletonLoader";
import Button from "../ui/Button";
// FIXED: Removed the nonexistent 'cars' import variable
import { FILTER_CHIPS, filterCars } from "../../data/cars";

export default function DiscoverPreview() {
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]); // State to hold dynamic backend array matches

  // Trigger data fetching across your Axios middleware layer whenever filter chips shift
  useEffect(() => {
    async function fetchPreviewData() {
      setLoading(true);
      try {
        const data = await filterCars(activeFilters);
        // Slice the first 6 records right here dynamically
        setFilteredCars(data.slice(0, 6));
      } catch (error) {
        console.error("Failed to load preview cards from backend API:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPreviewData();
  }, [activeFilters]); // Keeps synchronous alignment with active filter configurations

  const toggleFilter = (filter) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  return (
    <section id="discover" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary">
          Discover Premium Cars
        </h2>
        <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
          Explore our curated selection of vehicles, each chosen for quality, innovation, and value.
        </p>
      </motion.div>

      <div className="mb-8">
        <FilterChips filters={FILTER_CHIPS} activeFilters={activeFilters} onToggle={toggleFilter} />
      </div>

      {loading ? (
        <SkeletonGrid count={6} />
      ) : filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car, i) => (
            <CarCard key={car.id} car={car} index={i} featured={i === 1} />
          ))}
        </div>
      ) : null}

      {!loading && filteredCars.length === 0 && (
        <div className="text-center py-16">
          <p className="text-text-secondary">No cars match your filters. Try adjusting your selection.</p>
        </div>
      )}

      <div className="mt-12 flex justify-center">
        <Button to="/discover" size="lg" icon={ArrowRight}>
          View All Cars
        </Button>
      </div>
    </section>
  );
}