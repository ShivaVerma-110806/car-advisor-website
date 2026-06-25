import { motion } from "framer-motion";

export default function GlassCard({ children, className = "", hover = false, ...props }) {
  return (
    <motion.div
      className={`glass rounded-2xl ${hover ? "glass-hover glow-card transition-all duration-500" : ""} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
