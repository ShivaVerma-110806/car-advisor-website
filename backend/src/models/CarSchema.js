import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    brand: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    priceRange: { type: String },
    priceMin: { type: Number },
    priceMax: { type: Number },
    bodyType: { type: String },
    fuelType: { type: String },
    transmission: { type: String },
    seating: { type: String },
    tags: { type: [String], default: [] },
    gradient: { type: String },
    accentColor: { type: String },
    highlights: { type: [String], default: [] },
    overview: { type: String },
    keySpecs: { type: mongoose.Schema.Types.Mixed },
    pros: { type: [String], default: [] },
    cons: { type: [String], default: [] },
    specifications: { type: mongoose.Schema.Types.Mixed },
    variants: { type: [mongoose.Schema.Types.Mixed], default: [] },
    ownership: { type: mongoose.Schema.Types.Mixed },
    aiMatchScore: { type: Number },
    compareScores: { type: mongoose.Schema.Types.Mixed },
  },
  {
    timestamps: true,
    collection: "car",
  }
);

// Prevention logic for hot-reloading (critical for Next.js / frontend dev servers)
const Car = mongoose.models.Car || mongoose.model("Car", carSchema, "car");

export default Car;
