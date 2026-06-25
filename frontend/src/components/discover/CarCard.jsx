import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Badge from "../ui/Badge";
import CarVisual from "../ui/CarVisual";
import { useFavorites } from "../../context/FavoritesContext";
import { useCompare } from "../../context/CompareContext";

export default function CarCard({ car, index = 0, featured = false }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCompare } = useCompare();
  const saved = isFavorite(car.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -8 }}
      className={`group glass rounded-2xl overflow-hidden transition-all duration-500 glow-card ${
        featured ? "ring-1 ring-accent/30" : ""
      }`}
    >
      <Link to={`/car/${car.id}`} className="block">
        <div className="relative overflow-hidden">
          <motion.div
            className="transition-transform duration-700 group-hover:scale-110"
            whileHover={{ scale: 1.05 }}
          >
            <CarVisual gradient={car.gradient} accentColor={car.accentColor} className="h-52 sm:h-56" />
          </motion.div>
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 0%, ${car.accentColor}25 0%, transparent 70%)`,
            }}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(car.id);
            }}
            className={`absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full glass transition-all duration-300 ${
              saved ? "text-accent-light bg-accent/20" : "text-text-secondary hover:text-accent-light"
            }`}
          >
            <Heart className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
          </button>
        </div>
      </Link>

      <div className="p-6">
        <p className="text-xs font-medium tracking-wider text-text-muted uppercase">{car.brand}</p>
        <Link to={`/car/${car.id}`}>
          <h3 className="mt-1 text-xl font-bold text-text-primary group-hover:text-accent-light transition-colors">
            {car.name}
          </h3>
        </Link>
        <p className="mt-2 text-lg font-semibold text-accent-light">{car.priceRange}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge>{car.fuelType}</Badge>
          <Badge>{car.transmission}</Badge>
          <Badge>{car.seating}</Badge>
        </div>

        <ul className="mt-4 space-y-1.5">
          {car.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2 text-sm text-text-secondary">
              <span className="h-1 w-1 rounded-full bg-accent shrink-0" />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex gap-3">
          <Link
            to={`/car/${car.id}`}
            className="flex-1 rounded-xl glass glass-hover py-2.5 text-center text-sm font-medium text-text-primary transition-all"
          >
            View Details
          </Link>
          <button
            onClick={() => addToCompare(car.id)}
            className="flex-1 rounded-xl glass glass-hover py-2.5 text-sm font-medium text-text-primary transition-all hover:bg-accent/10 hover:text-accent-light"
          >
            Compare
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export function CarCardCompact({ car }) {
  return (
    <Link
      to={`/car/${car.id}`}
      className="shrink-0 w-64 glass rounded-2xl overflow-hidden hover:glow-card transition-all duration-300"
    >
      <CarVisual gradient={car.gradient} accentColor={car.accentColor} className="h-36" />
      <div className="p-4">
        <p className="text-xs text-text-muted uppercase">{car.brand}</p>
        <h4 className="font-semibold text-text-primary">{car.name}</h4>
        <p className="text-sm text-accent-light mt-1">{car.priceRange}</p>
      </div>
    </Link>
  );
}
