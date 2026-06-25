
import axios from 'axios';

// Replace this with your actual live Render backend URL!
const BACKEND_URL = "https://car-advisor-backend.onrender.com";

// Create an axios instance with standard configurations
const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 1. Fetch the raw car array from your database using Axios
export async function getAllCars() {
  try {
    const response = await api.get('/api/cars');
    return response.data; // Axios automatically parses JSON and returns it in .data
  } catch (error) {
    console.error("Error fetching cars from backend via Axios:", error.message);
    return []; // Return an empty array as a fallback
  }
}

// 2. Fetch data, then find a car by its ID
export async function getCarById(id) {
  const cars = await getAllCars();
  return cars.find((c) => c.id === id);
}

// 3. Fetch data, then apply your filtering rules
export async function filterCars(activeFilters) {
  const cars = await getAllCars();
  if (!activeFilters.length) return cars;

  return cars.filter((car) =>
    activeFilters.every((filter) => {
      switch (filter) {
        case "Under 10L":
          return car.priceMax <= 1000000;
        case "Under 20L":
          return car.priceMax <= 2000000;
        case "City Driving":
        case "Long Trips":
        case "Family":
          return car.tags.includes(filter);
        default:
          return (
            car.bodyType === filter ||
            car.fuelType === filter ||
            car.transmission === filter ||
            car.tags.includes(filter)
          );
      }
    })
  );
}

// 4. Fetch data, then calculate similar cars
export async function getSimilarCars(carId, limit = 4) {
  const car = await getCarById(carId);
  if (!car) return [];
  
  const cars = await getAllCars();
  return cars
    .filter((c) => c.id !== carId && (c.bodyType === car.bodyType || c.fuelType === car.fuelType))
    .slice(0, limit);
}

// 5. Your recommendation function (Ready for your custom matching logic!)
export async function generateRecommendations(answers) {
  const cars = await getAllCars();
  
  // You can process 'answers' and 'cars' array here using your own custom formula later!
  return cars.slice(0, 3);
}

// Keeping your static assets/configurations exactly the same
export const FILTER_CHIPS = [
  "SUV", "Sedan", "Hatchback", "Petrol", "Diesel", "EV", 
  "Automatic", "Manual", "Under 10L", "Under 20L", "Family", "City Driving", "Long Trips"
];

export const COMPARE_CATEGORIES = [
  { key: "mileage", label: "Mileage" },
  { key: "safety", label: "Safety" },
  { key: "space", label: "Space" },
  { key: "performance", label: "Performance" },
  { key: "features", label: "Features" },
  { key: "maintenance", label: "Maintenance" },
];

export const ADVISOR_QUESTIONS = [
  // ... keep your ADVISOR_QUESTIONS array here exactly as it was
];