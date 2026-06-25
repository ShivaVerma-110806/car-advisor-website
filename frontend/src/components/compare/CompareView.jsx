import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProgressBar from "../ui/ProgressBar";
import GlassCard from "../ui/GlassCard";
import CarVisual from "../ui/CarVisual";
import Button from "../ui/Button";
import { useCompare } from "../../context/CompareContext";
// REMOVED: Static 'cars' variable reference
import { getCarById, getAllCars, COMPARE_CATEGORIES } from "../../data/cars";

export default function CompareView() {
  const { compareList, addToCompare, removeFromCompare, clearCompare } = useCompare();

  // 1. Setup local states to hold your async backend data pools safely
  const [carA, setCarA] = useState(null);
  const [carB, setCarB] = useState(null);
  const [availableCars, setAvailableCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Lifecycle trigger to parse network data matching context lists
  useEffect(() => {
    async function populateComparisonMatrix() {
      setLoading(true);
      try {
        // Fetch all inventory items for fallback selections
        const allInventory = await getAllCars();

        // Fetch targeted slots synchronously matching indices
        const fetchA = compareList[0] ? await getCarById(compareList[0]) : null;
        const fetchB = compareList[1] ? await getCarById(compareList[1]) : null;

        setCarA(fetchA);
        setCarB(fetchB);
        
        // Filter out cars already selected in comparison slots
        setAvailableCars(allInventory.filter((c) => !compareList.includes(c.id)));
      } catch (error) {
        console.error("Error populating comparison elements:", error);
      } finally {
        setLoading(false);
      }
    }

    populateComparisonMatrix();
  }, [compareList]); // Runs automatically whenever slots are chosen, added, or cleared

  // 3. Render unified initial loader layout
  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center text-text-secondary">
        Loading smart comparison matrix...
      </div>
    );
  }

  // 4. Case A: Both selection slots are empty
  if (!carA && !carB) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center page-enter">
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary">Compare Cars</h1>
        <p className="mt-4 text-text-secondary">
          Select two cars to see a smart side-by-side comparison — not a spreadsheet.
        </p>
        <div className="mt-12 grid sm:grid-cols-2 gap-4">
          {[0, 1].map((slot) => (
            <GlassCard key={slot} className="p-8 border-2 border-dashed border-border">
              <p className="text-text-muted">Select Car {slot + 1}</p>
              <div className="mt-4 max-h-48 overflow-y-auto space-y-2">
                {availableCars.slice(0, 4).map((car) => (
                  <button
                    key={car.id}
                    onClick={() => addToCompare(car.id)}
                    className="w-full glass glass-hover rounded-xl p-3 text-left text-sm text-text-primary transition-all"
                  >
                    {car.name}
                  </button>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
        <Button to="/discover" className="mt-8">Browse All Cars</Button>
      </div>
    );
  }

  // 5. Case B: Only one car is selected
  if (!carB) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 page-enter">
        <h1 className="text-3xl font-bold text-text-primary text-center mb-8">Compare Cars</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <GlassCard className="p-6">
            <CarVisual gradient={carA.gradient} accentColor={carA.accentColor} className="h-40 mb-4" />
            <h3 className="font-bold text-text-primary">{carA.name}</h3>
            <p className="text-accent-light">{carA.priceRange}</p>
            <button onClick={() => removeFromCompare(carA.id)} className="mt-4 text-sm text-text-muted hover:text-text-primary">
              Remove
            </button>
          </GlassCard>
          <GlassCard className="p-8 border-2 border-dashed border-border">
            <p className="text-text-muted mb-4">Select second car</p>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {availableCars.map((car) => (
                <button
                  key={car.id}
                  onClick={() => addToCompare(car.id)}
                  className="w-full glass glass-hover rounded-xl p-3 text-left text-sm transition-all hover:text-accent-light"
                >
                  {car.name} — {car.priceRange}
                </button>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    );
  }

  // 6. Case C: Both cars loaded, compile data breakdown metrics
  const winsA = COMPARE_CATEGORIES.filter(
    (c) => carA.compareScores?.[c.key] >= carB.compareScores?.[c.key]
  ).length;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 page-enter">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary">Smart Comparison</h1>
        <p className="mt-3 text-text-secondary">See which car wins where it matters to you</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {[carA, carB].map((car, i) => (
          <motion.div
            key={car.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard className={`p-6 ${i === 0 ? "ring-1 ring-accent/20" : ""}`}>
              <CarVisual gradient={car.gradient} accentColor={car.accentColor} className="h-44 mb-4" />
              <p className="text-xs text-text-muted uppercase">{car.brand}</p>
              <h3 className="text-xl font-bold text-text-primary">{car.name}</h3>
              <p className="text-accent-light font-semibold mt-1">{car.priceRange}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="text-xs glass rounded-lg px-2 py-1">{car.fuelType}</span>
                <span className="text-xs glass rounded-lg px-2 py-1">{car.transmission}</span>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <GlassCard className="p-6 sm:p-8 space-y-8">
        <h2 className="text-xl font-bold text-text-primary">Category Breakdown</h2>
        {COMPARE_CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <ProgressBar
              label={cat.label}
              valueA={carA.compareScores?.[cat.key] || 0}
              valueB={carB.compareScores?.[cat.key] || 0}
              nameA={carA.name.split(" ").slice(-1)[0]}
              nameB={carB.name.split(" ").slice(-1)[0]}
            />
          </motion.div>
        ))}
      </GlassCard>

      <GlassCard className="mt-8 p-6 sm:p-8 border border-accent/20">
        <h3 className="text-lg font-bold text-text-primary mb-3">AI Verdict</h3>
        <p className="text-text-secondary leading-relaxed">
          {winsA >= 3 ? (
            <>
              Choose <strong className="text-text-primary">{carA.name}</strong> if you prioritize comfort,{" "}
              {COMPARE_CATEGORIES.find((c) => carA.compareScores?.[c.key] > carB.compareScores?.[c.key])?.label.toLowerCase() || "practicality"}, and overall value.
              Choose <strong className="text-text-primary">{carB.name}</strong> if technology and{" "}
              {COMPARE_CATEGORIES.find((c) => carB.compareScores?.[c.key] > carA.compareScores?.[c.key])?.label.toLowerCase() || "performance"} matter more.
            </>
          ) : (
            <>
              Choose <strong className="text-text-primary">{carB.name}</strong> if you prioritize{" "}
              {COMPARE_CATEGORIES.find((c) => carB.compareScores?.[c.key] > carA.compareScores?.[c.key])?.label.toLowerCase() || "performance"} and modern features.
              Choose <strong className="text-text-primary">{carA.name}</strong> for better{" "}
              {COMPARE_CATEGORIES.find((c) => carA.compareScores?.[c.key] > carB.compareScores?.[c.key])?.label.toLowerCase() || "reliability"} and lower maintenance.
            </>
          )}
        </p>
      </GlassCard>

      <div className="mt-8 flex justify-center gap-4">
        <Button variant="secondary" onClick={clearCompare}>Clear Comparison</Button>
        <Button to="/advisor">Get AI Recommendation</Button>
      </div>
    </div>
  );
}