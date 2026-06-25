import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, GitCompare, ChevronDown, Gauge, Cog, Zap, Users, Package, Shield } from "lucide-react";
import CarVisual from "../ui/CarVisual";
import GlassCard from "../ui/GlassCard";
import Button from "../ui/Button";
import ScoreRing from "../ui/ScoreRing";
import { CarCardCompact } from "../discover/CarCard";
import { useFavorites } from "../../context/FavoritesContext";
import { useCompare } from "../../context/CompareContext";
// Dynamic helper data modules
import { getCarById, getSimilarCars } from "../../data/cars";

const specIcons = {
  mileage: Gauge,
  engine: Cog,
  power: Zap,
  torque: Cog,
  seating: Users,
  bootSpace: Package,
  safetyRating: Shield,
};

export default function CarDetailsContent({ carId }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCompare } = useCompare();
  
  // 1. Setup local states to securely capture asynchronous backend data
  const [car, setCar] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [openSpec, setOpenSpec] = useState(null);
  const [loading, setLoading] = useState(true);

  // 2. Fetch the concrete data profiles inside the lifecycle loop
  useEffect(() => {
    async function loadCarDetails() {
      setLoading(true);
      try {
        const fetchCar = await getCarById(carId);
        setCar(fetchCar);

        if (fetchCar) {
          const fetchSimilar = await getSimilarCars(carId);
          setSimilar(fetchSimilar);
        }
      } catch (error) {
        console.error("Failed to load car details matrix profile:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCarDetails();
  }, [carId]); // Triggers fresh data loads safely whenever a different car is selected

  // 3. Render loading layout if network requests are actively processing
  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="skeleton h-80 rounded-2xl mb-8" />
        <div className="skeleton h-8 w-1/2 rounded mb-4" />
        <div className="skeleton h-4 w-1/3 rounded" />
      </div>
    );
  }

  // 4. Handle "Car not found" fallback securely after the loading check has resolved
  if (!car) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-text-primary">Car not found</h1>
        <Button to="/discover" className="mt-6">Back to Discover</Button>
      </div>
    );
  }

  const saved = isFavorite(car.id);

  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="relative">
        <CarVisual gradient={car.gradient} accentColor={car.accentColor} className="h-64 sm:h-80 lg:h-96 rounded-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <p className="text-sm text-text-muted uppercase tracking-wider">{car.brand}</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mt-1">{car.name}</h1>
              <p className="text-2xl font-semibold text-accent-light mt-2">{car.priceRange}</p>
            </div>
            <div className="flex items-center gap-4">
              <ScoreRing score={car.aiMatchScore} size={90} strokeWidth={6} />
              <div className="flex gap-2">
                <button
                  onClick={() => toggleFavorite(car.id)}
                  className={`flex h-11 w-11 items-center justify-center rounded-full glass transition-all ${
                    saved ? "text-accent-light bg-accent/20" : "text-text-secondary hover:text-accent-light"
                  }`}
                >
                  <Heart className={`h-5 w-5 ${saved ? "fill-current" : ""}`} />
                </button>
                <button
                  onClick={() => addToCompare(car.id)}
                  className="flex h-11 w-11 items-center justify-center rounded-full glass text-text-secondary hover:text-accent-light transition-all"
                >
                  <GitCompare className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
        {/* Overview */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-2xl font-bold text-text-primary mb-4">Overview</h2>
          <p className="text-lg text-text-secondary leading-relaxed max-w-3xl">{car.overview}</p>
        </motion.section>

        {/* Key Highlights */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-2xl font-bold text-text-primary mb-6">Key Highlights</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(car.keySpecs).map(([key, value]) => {
              const Icon = specIcons[key] || Gauge;
              const label = key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
              return (
                <GlassCard key={key} className="p-4 sm:p-5 text-center">
                  <Icon className="h-6 w-6 text-accent-light mx-auto mb-3" />
                  <p className="text-xs text-text-muted uppercase">{label}</p>
                  <p className="text-sm font-semibold text-text-primary mt-1">{value}</p>
                </GlassCard>
              );
            })}
          </div>
        </motion.section>

        {/* Pros & Cons */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-2xl font-bold text-text-primary mb-6">Pros & Cons</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <GlassCard className="p-6 border-l-2 border-l-emerald-500">
              <h3 className="font-semibold text-emerald-400 mb-4">Pros</h3>
              <ul className="space-y-3">
                {car.pros.map((p) => (
                  <li key={p} className="flex gap-3 text-text-secondary">
                    <span className="text-emerald-400 shrink-0">✓</span> {p}
                  </li>
                ))}
              </ul>
            </GlassCard>
            <GlassCard className="p-6 border-l-2 border-l-amber-500">
              <h3 className="font-semibold text-amber-400 mb-4">Cons</h3>
              <ul className="space-y-3">
                {car.cons.map((c) => (
                  <li key={c} className="flex gap-3 text-text-secondary">
                    <span className="text-amber-400 shrink-0">−</span> {c}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </motion.section>

        {/* Specifications Accordion */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-2xl font-bold text-text-primary mb-6">Specifications</h2>
          <div className="space-y-3">
            {Object.entries(car.specifications).map(([category, specs]) => (
              <GlassCard key={category} className="overflow-hidden">
                <button
                  onClick={() => setOpenSpec(openSpec === category ? null : category)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold text-text-primary">{category}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-text-secondary transition-transform ${
                      openSpec === category ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openSpec === category && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    className="px-5 pb-5 space-y-3 border-t border-border pt-4"
                  >
                    {Object.entries(specs).map(([key, val]) => (
                      <div key={key} className="flex justify-between text-sm gap-4 py-1">
                        <span className="text-text-secondary">{key}</span>
                        <span className="text-text-primary font-medium text-right">{val}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </GlassCard>
            ))}
          </div>
        </motion.section>

        {/* Variants */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-2xl font-bold text-text-primary mb-6">Variants</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {car.variants.map((v) => (
              <GlassCard key={v.name} hover className="p-6">
                <h3 className="font-semibold text-text-primary">{v.name}</h3>
                <p className="text-accent-light font-semibold mt-2">{v.price}</p>
                <ul className="mt-4 space-y-1">
                  {v.highlights.map((h) => (
                    <li key={h} className="text-sm text-text-secondary flex gap-2">
                      <span className="text-accent">•</span> {h}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </motion.section>

        {/* Ownership */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-2xl font-bold text-text-primary mb-6">Ownership Insights</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { label: "Service Costs", value: car.ownership?.serviceCost },
              { label: "Maintenance", value: car.ownership?.maintenance },
              { label: "Real-world Practicality", value: car.ownership?.practicality },
            ].map((item) => (
              <GlassCard key={item.label} className="p-6">
                <p className="text-sm text-text-muted">{item.label}</p>
                <p className="mt-2 text-text-primary font-medium">{item.value}</p>
              </GlassCard>
            ))}
          </div>
        </motion.section>

        {/* Similar Alternatives */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-2xl font-bold text-text-primary mb-6">Similar Alternatives</h2>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {similar.map((c) => (
              <CarCardCompact key={c.id} car={c} />
            ))}
          </div>
        </motion.section>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button to="/advisor" size="lg">Ask AI About This Car</Button>
          <Button to="/compare" variant="secondary" size="lg">Add to Compare</Button>
        </div>
      </div>
    </div>
  );
}