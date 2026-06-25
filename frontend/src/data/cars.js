import axios from "axios";

const API = "https://car-advisor-website-1.onrender.com/api/cars/"; // Live Render Backend URL

export const getAllCars = async () => {
  try {
    const res = await axios.get(API);
    return res.data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    return [];
  }
};

export const getCarById = async (id) => {
  try {
    const res = await axios.get(`${API}${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error finding car with id ${id}:`, error);
    return null;
  }
};

export const getSimilarCars = async (carId, limit = 4) => {
  try {
    const car = await getCarById(carId);
    if (!car) return [];

    const cars = await getAllCars();
    return cars
      .filter((c) => c.id !== carId && (c.bodyType === car.bodyType || c.fuelType === car.fuelType))
      .slice(0, limit);
  } catch (error) {
    console.error("Error finding similar cars:", error);
    return [];
  }
};

export const filterCars = async (activeFilters) => {
  const cars = await getAllCars();
  if (!activeFilters.length) return cars;

  return cars.filter((car) =>
    activeFilters.every((filter) => {
      switch (filter) {
        case "Under 10L": return car.priceMax <= 1000000;
        case "Under 20L": return car.priceMax <= 2000000;
        case "City Driving":
        case "Long Trips":
        case "Family": return car.tags?.includes(filter);
        default:
          return (
            car.bodyType === filter ||
            car.fuelType === filter ||
            car.transmission === filter ||
            car.tags?.includes(filter)
          );
      }
    })
  );
};

// Custom Recommendation Algorithm matching your questions Matrix
export const generateRecommendations = async (answers) => {
  try {
    const cars = await getAllCars();
    
    const scored = cars.map((car) => {
      let score = 50;

      if (answers.budget === "under10" && car.priceMax <= 1000000) score += 20;
      if (answers.budget === "10to20" && car.priceMin >= 1000000 && car.priceMax <= 2000000) score += 20;
      if (answers.budget === "20to50" && car.priceMin >= 2000000 && car.priceMax <= 5000000) score += 20;
      if (answers.budget === "above50" && car.priceMin >= 5000000) score += 20;

      if (answers.driving === "city" && car.tags?.includes("City Driving")) score += 10;
      if (answers.driving === "highway" && car.tags?.includes("Long Trips")) score += 10;
      if (answers.driving === "mixed") score += 5;

      if (answers.family === "5+" && car.seating?.includes("7")) score += 15;
      if (answers.family === "3-4" && car.seating?.includes("5")) score += 10;

      if (answers.preference === "comfort" && car.compareScores?.space > 85) score += 10;
      if (answers.preference === "performance" && car.compareScores?.performance > 85) score += 10;
      if (answers.preference === "balanced") score += 8;

      if (answers.fuel !== "any" && car.fuelType === answers.fuel) score += 15;

      if (answers.mileage === "high" && car.compareScores?.mileage > 85) score += 12;
      if (answers.mileage === "low" && car.compareScores?.performance > 85) score += 8;

      if (answers.priority === "features" && car.compareScores?.features > 85) score += 10;
      if (answers.priority === "reliability" && car.compareScores?.maintenance > 85) score += 10;

      const matterMap = {
        safety: "safety",
        performance: "performance",
        luxury: "features",
        mileage: "mileage",
        maintenance: "maintenance",
        technology: "features",
      };
      const key = matterMap[answers.matters];
      if (key && car.compareScores?.[key] > 85) score += 15;

      return { ...car, matchScore: Math.min(score, 98) };
    });

    return scored.sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);
  } catch (error) {
    console.error("Error generating local recommendations:", error);
    return [];
  }
};

export const FILTER_CHIPS = [
  "SUV", "Sedan", "Hatchback", "Petrol", "Diesel", "EV", 
  "Automatic", "Manual", "Under 10L", "Under 20L", "Family", "City Driving", "Long Trips"
];

// ADDED: Export ADVISOR_QUESTIONS array properly here so AdvisorFlow can parse it!
export const ADVISOR_QUESTIONS = [
  {
    id: "budget",
    question: "What is your budget?",
    options: [
      { label: "Under ₹10L", value: "under10" },
      { label: "₹10 to 20L", value: "10to20" },
      { label: "₹20 to 50L", value: "20to50" },
      { label: "Above ₹50L", value: "above50" },
    ],
  },
  {
    id: "driving",
    question: "What type of driving do you mostly do?",
    options: [
      { label: "City commuting", value: "city" },
      { label: "Highway trips", value: "highway" },
      { label: "Mixed usage", value: "mixed" },
    ],
  },
  {
    id: "family",
    question: "How many family members travel regularly?",
    options: [
      { label: "1 to 2 people", value: "1-2" },
      { label: "3 to 4 people", value: "3-4" },
      { label: "5+ people", value: "5+" },
    ],
  },
  {
    id: "preference",
    question: "Do you prefer comfort or performance?",
    options: [
      { label: "Comfort first", value: "comfort" },
      { label: "Balanced", value: "balanced" },
      { label: "Performance first", value: "performance" },
    ],
  },
  {
    id: "fuel",
    question: "Petrol, Diesel, Hybrid, EV, or Open?",
    options: [
      { label: "Petrol", value: "Petrol" },
      { label: "Diesel", value: "Diesel" },
      { label: "Hybrid", value: "Hybrid" },
      { label: "EV", value: "EV" },
      { label: "Open to all", value: "any" },
    ],
  },
  {
    id: "mileage",
    question: "How important is mileage?",
    options: [
      { label: "Very important", value: "high" },
      { label: "Somewhat important", value: "medium" },
      { label: "Not a priority", value: "low" },
    ],
  },
  {
    id: "priority",
    question: "Do you value features or reliability more?",
    options: [
      { label: "Latest features", value: "features" },
      { label: "Both equally", value: "both" },
      { label: "Reliability first", value: "reliability" },
    ],
  },
  {
    id: "matters",
    question: "What matters most?",
    options: [
      { label: "Safety", value: "safety" },
      { label: "Performance", value: "performance" },
      { label: "Luxury", value: "luxury" },
      { label: "Mileage", value: "mileage" },
      { label: "Low Maintenance", value: "maintenance" },
      { label: "Technology", value: "technology" },
    ],
  },
];
// ADDED: Export COMPARE_CATEGORIES array layout metrics so CompareView can render comparisons!
export const COMPARE_CATEGORIES = [
  { key: "mileage", label: "Mileage" },
  { key: "safety", label: "Safety" },
  { key: "space", label: "Space" },
  { key: "performance", label: "Performance" },
  { key: "features", label: "Features" },
  { key: "maintenance", label: "Maintenance" },
];