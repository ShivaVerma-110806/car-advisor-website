import { motion } from "framer-motion";
import { Heart, GitCompare, Sparkles } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import Button from "../ui/Button";
import CarVisual from "../ui/CarVisual";
import { useFavorites } from "../../context/FavoritesContext";
import { useCompare } from "../../context/CompareContext";
import { getCarById } from "../../data/cars";

export default function FavoritesView() {
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCompare } = useCompare();

  const savedCars = favorites.map(getCarById).filter(Boolean);

  if (savedCars.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center page-enter">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
          <Heart className="h-8 w-8 text-accent-light" />
        </div>
        <h1 className="text-3xl font-bold text-text-primary">Your Favorites</h1>
        <p className="mt-4 text-text-secondary">
          Save cars you're considering and we'll keep AI notes ready for you.
        </p>
        <Button to="/discover" className="mt-8">Discover Cars</Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 page-enter">
      <h1 className="text-3xl sm:text-4xl font-bold text-text-primary">Your Favorites</h1>
      <p className="mt-2 text-text-secondary">{savedCars.length} saved vehicle{savedCars.length !== 1 ? "s" : ""}</p>

      <div className="mt-10 space-y-6">
        {savedCars.map((car, i) => (
          <motion.div
            key={car.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <GlassCard className="overflow-hidden">
              <div className="grid sm:grid-cols-[200px_1fr_auto] gap-6 p-6">
                <CarVisual gradient={car.gradient} accentColor={car.accentColor} className="h-36 sm:h-full" />
                <div>
                  <p className="text-xs text-text-muted uppercase">{car.brand}</p>
                  <h3 className="text-xl font-bold text-text-primary">{car.name}</h3>
                  <p className="text-accent-light font-semibold mt-1">{car.priceRange}</p>

                  <div className="mt-4 glass rounded-xl p-4 flex gap-3">
                    <Sparkles className="h-5 w-5 text-accent-light shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-text-primary">AI Note</p>
                      <p className="text-sm text-text-secondary mt-1">
                        {car.overview.slice(0, 120)}...
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full sm:w-auto">
                  <Button to={`/car/${car.id}`} size="sm">View</Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => addToCompare(car.id)}
                  >
                    <GitCompare className="h-4 w-4" /> Compare
                  </Button>
                  <button
                    onClick={() => toggleFavorite(car.id)}
                    className="text-sm text-text-muted hover:text-red-400 transition-colors py-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {savedCars.length >= 2 && (
        <div className="mt-10 flex justify-center">
          <Button
            to="/compare"
            onClick={() => {
              addToCompare(savedCars[0].id);
              addToCompare(savedCars[1].id);
            }}
          >
            Compare Saved Cars
          </Button>
        </div>
      )}
    </div>
  );
}
