import { motion } from "framer-motion";

export default function FilterChip({ label, active, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
        active
          ? "bg-accent text-white shadow-lg shadow-accent/30"
          : "glass text-text-secondary hover:text-text-primary hover:border-border-hover"
      }`}
    >
      {label}
    </motion.button>
  );
}
