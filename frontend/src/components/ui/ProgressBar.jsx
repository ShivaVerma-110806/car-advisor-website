import { motion } from "framer-motion";

export default function ProgressBar({ label, valueA, valueB, nameA, nameB }) {
  const winner = valueA >= valueB ? "A" : "B";

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className={winner === "A" ? "text-accent-light font-medium" : "text-text-secondary"}>
          {nameA}: {valueA}
        </span>
        <span className="text-text-muted">{label}</span>
        <span className={winner === "B" ? "text-accent-light font-medium" : "text-text-secondary"}>
          {nameB}: {valueB}
        </span>
      </div>
      <div className="flex gap-1 h-2 rounded-full overflow-hidden bg-bg-elevated">
        <motion.div
          className="bg-gradient-to-r from-accent to-accent-light rounded-l-full"
          initial={{ width: 0 }}
          animate={{ width: `${(valueA / (valueA + valueB)) * 100}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <motion.div
          className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-r-full flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        />
      </div>
      {winner && (
        <p className="text-xs text-text-muted text-center">
          {winner === "A" ? nameA : nameB} wins in {label.toLowerCase()}
        </p>
      )}
    </div>
  );
}

export function ConfidenceMeter({ value, label = "Decision Confidence" }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-text-secondary">{label}</span>
        <span className="text-accent-light font-medium">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-bg-elevated overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-accent via-accent-light to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
