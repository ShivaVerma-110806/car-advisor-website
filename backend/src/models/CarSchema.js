import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    make: { type: String, required: true, trim: true }, // e.g., "Maruti Suzuki", "Kia"
    model: { type: String, required: true, trim: true }, // e.g., "Grand Vitara", "Seltos"
    variant: { type: String, required: true }, // e.g., "Delta", "HTX"
    year: { type: Number, required: true },
    price: {
      exShowroom: { type: Number, required: true },
      currency: { type: String, default: "INR" },
    },
    specifications: {
      engine: { type: String, required: true },
      fuelType: { type: String, required: true },
      transmission: { type: String, required: true },
      power: { type: String },
      torque: { type: String },
      mileage: { type: String },
    },
    features: { type: [String], default: [] },
    images: { type: [String], required: true },
    isAvailable: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    collection: "car", // Forces Mongoose to match your singular collection name in Compass
  }
);

// Prevention logic for hot-reloading (critical for Next.js / frontend dev servers)
const Car = mongoose.models.Car || mongoose.model("Car", carSchema, "car");

export default Car;
