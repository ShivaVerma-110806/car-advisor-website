export const FILTER_CHIPS = [
  "SUV",
  "Sedan",
  "Hatchback",
  "Petrol",
  "Diesel",
  "EV",
  "Automatic",
  "Manual",
  "Under 10L",
  "Under 20L",
  "Family",
  "City Driving",
  "Long Trips",
];


export const cars = [
  {
    id: "grand-vitara",
    brand: "Maruti Suzuki",
    name: "Grand Vitara",
    priceRange: "₹10.99 - 19.99 Lakh",
    priceMin: 1099000,
    priceMax: 1999000,
    bodyType: "SUV",
    fuelType: "Petrol",
    transmission: "Manual",
    seating: "5 Seater",
    tags: ["SUV", "Family", "Long Trips", "City Driving"],
    gradient: "from-emerald-600 to-teal-900",
    accentColor: "#10b981",
    highlights: [
      "1.5L Intelligent Hybrid",
      "AllGrip Select AWD option",
      "Panoramic Sunroof",
      "360 View Camera"
    ],
    overview: "The Maruti Suzuki Grand Vitara is a premium mid-size SUV that brings strong hybrid technology and all-wheel-drive capability to the Maruti lineup. Featuring a sleek, aggressive design, a tech-loaded cabin, and class-leading mileage, it is perfect for both daily city driving and long family road trips.",
    keySpecs: {
      mileage: "21.11 kmpl",
      engine: "1462 cc",
      power: "102 bhp",
      torque: "136.8 Nm",
      seating: "5 Seater",
      bootSpace: "373 Litres",
      safetyRating: "4 Star (Global NCAP)"
    },
    pros: [
      "Exceptional hybrid fuel efficiency",
      "AWD capability available",
      "Spacious and comfortable cabin",
      "Modern features like 360-degree camera"
    ],
    cons: [
      "Boot space is reduced in strong hybrid versions",
      "Engine lacks punch at high highway speeds",
      "Premium pricing on top-end models"
    ],
    specifications: {
      "Engine & Transmission": {
        "Engine Type": "1.5L K15C Smart Hybrid",
        "Displacement": "1462 cc",
        "Max Power": "102 bhp @ 6000 rpm",
        "Max Torque": "136.8 Nm @ 4400 rpm",
        "Transmission": "5-Speed Manual"
      },
      "Fuel & Performance": {
        "Fuel Type": "Petrol (Mild Hybrid)",
        "Mileage (ARAI)": "21.11 kmpl"
      },
      "Dimensions & Capacity": {
        "Length": "4345 mm",
        "Width": "1795 mm",
        "Height": "1645 mm",
        "Wheelbase": "2600 mm",
        "Seating Capacity": "5 People",
        "Boot Space": "373 Litres"
      }
    },
    variants: [
      { name: "Sigma", price: "₹10.99 Lakh", highlights: ["Keyless Entry", "ESP", "Auto AC"] },
      { name: "Delta", price: "₹12.20 Lakh", highlights: ["SmartPlay Pro", "Cruise Control", "Rear Camera"] },
      { name: "Zeta", price: "₹13.99 Lakh", highlights: ["LED Headlamps", "6 Airbags", "Auto Fold ORVM"] },
      { name: "Alpha", price: "₹15.49 Lakh", highlights: ["Panoramic Sunroof", "360 Camera", "Leatherette Seats"] }
    ],
    ownership: {
      serviceCost: "₹6,000/year",
      maintenance: "Low",
      practicality: "Excellent for both city traffic and highway cruising"
    },
    aiMatchScore: 92,
    compareScores: {
      mileage: 94,
      safety: 85,
      space: 88,
      performance: 76,
      features: 84,
      maintenance: 95
    }
  },
  {
    id: "fronx",
    brand: "Maruti Suzuki",
    name: "Fronx",
    priceRange: "₹7.51 - 13.04 Lakh",
    priceMin: 751000,
    priceMax: 1304000,
    bodyType: "SUV",
    fuelType: "Petrol",
    transmission: "Manual",
    seating: "5 Seater",
    tags: ["SUV", "City Driving", "Family"],
    gradient: "from-rose-600 to-red-900",
    accentColor: "#f43f5e",
    highlights: [
      "1.0L Boosterjet Engine",
      "Coupe SUV Styling",
      "Heads-Up Display",
      "Wireless Charger"
    ],
    overview: "The Maruti Suzuki Fronx is a sporty coupe-SUV based on the Baleno platform. It offers an athletic design stance, high-performance turbo-petrol options, and modern dashboard features, presenting a stylish hatchback alternative for city-focused driving.",
    keySpecs: {
      mileage: "20.01 kmpl",
      engine: "998 cc",
      power: "98.69 bhp",
      torque: "147.6 Nm",
      seating: "5 Seater",
      bootSpace: "308 Litres",
      safetyRating: "4 Star (Global NCAP)"
    },
    pros: [
      "Sporty, eye-catching exterior styling",
      "Punchy performance from Boosterjet engine",
      "Refined ride and handling",
      "Decent list of modern features"
    ],
    cons: [
      "Rear headroom is slightly tight due to sloping roof",
      "Interior looks identical to Baleno",
      "AMT transmission on 1.2L is slow"
    ],
    specifications: {
      "Engine & Transmission": {
        "Engine Type": "1.0L Turbo Boosterjet",
        "Displacement": "998 cc",
        "Max Power": "98.69 bhp @ 5500 rpm",
        "Max Torque": "147.6 Nm @ 2000-4500 rpm",
        "Transmission": "5-Speed Manual"
      },
      "Fuel & Performance": {
        "Fuel Type": "Petrol (Turbo)",
        "Mileage (ARAI)": "20.01 kmpl"
      },
      "Dimensions & Capacity": {
        "Length": "3995 mm",
        "Width": "1765 mm",
        "Height": "1550 mm",
        "Wheelbase": "2520 mm",
        "Seating Capacity": "5 People",
        "Boot Space": "308 Litres"
      }
    },
    variants: [
      { name: "Sigma", price: "₹7.51 Lakh", highlights: ["Keyless Entry", "ESP", "Projector Headlamps"] },
      { name: "Delta", price: "₹8.35 Lakh", highlights: ["7-inch Infotainment", "Steering Controls"] },
      { name: "Zeta Turbo", price: "₹9.71 Lakh", highlights: ["1.0L Turbo Engine", "LED DRLs", "6 Airbags"] },
      { name: "Alpha Turbo", price: "₹11.45 Lakh", highlights: ["360 View Camera", "HUD", "16-inch Alloys"] }
    ],
    ownership: {
      serviceCost: "₹5,200/year",
      maintenance: "Low",
      practicality: "Perfect for young buyers and urban commuting"
    },
    aiMatchScore: 88,
    compareScores: {
      mileage: 85,
      safety: 80,
      space: 82,
      performance: 88,
      features: 85,
      maintenance: 92
    }
  },
  {
    id: "brezza",
    brand: "Maruti Suzuki",
    name: "Brezza",
    priceRange: "₹8.29 - 14.14 Lakh",
    priceMin: 829000,
    priceMax: 1414000,
    bodyType: "SUV",
    fuelType: "Petrol",
    transmission: "Automatic",
    seating: "5 Seater",
    tags: ["SUV", "Family", "City Driving", "Long Trips"],
    gradient: "from-amber-600 to-orange-900",
    accentColor: "#d97706",
    highlights: [
      "Electric Sunroof",
      "360 Camera",
      "Paddle Shifters",
      "Reliable 1.5L Engine"
    ],
    overview: "The Maruti Suzuki Brezza is a popular compact SUV known for its upright SUV design, robust build quality, and spacious cabin. With premium features like an electric sunroof, a 360-degree camera, and paddle shifters, it remains a reliable choice for families.",
    keySpecs: {
      mileage: "19.89 kmpl",
      engine: "1462 cc",
      power: "101.64 bhp",
      torque: "136.8 Nm",
      seating: "5 Seater",
      bootSpace: "328 Litres",
      safetyRating: "4 Star (Global NCAP)"
    },
    pros: [
      "Spacious cabin with excellent headroom",
      "Reliable and refined 1.5L engine",
      "Smooth torque-converter automatic",
      "Strong safety credentials"
    ],
    cons: [
      "Lacks diesel or turbo-petrol options",
      "Interior plastics feel hard in some places",
      "High pricing for top automatic trims"
    ],
    specifications: {
      "Engine & Transmission": {
        "Engine Type": "1.5L K15C DualJet",
        "Displacement": "1462 cc",
        "Max Power": "101.64 bhp @ 6000 rpm",
        "Max Torque": "136.8 Nm @ 4400 rpm",
        "Transmission": "6-Speed Automatic"
      },
      "Fuel & Performance": {
        "Fuel Type": "Petrol",
        "Mileage (ARAI)": "19.89 kmpl"
      },
      "Dimensions & Capacity": {
        "Length": "3995 mm",
        "Width": "1790 mm",
        "Height": "1685 mm",
        "Wheelbase": "2500 mm",
        "Seating Capacity": "5 People",
        "Boot Space": "328 Litres"
      }
    },
    variants: [
      { name: "Lxi", price: "₹8.29 Lakh", highlights: ["ESC", "Hill Hold Assist", "Rear AC Vents"] },
      { name: "Vxi", price: "₹9.65 Lakh", highlights: ["7-inch Infotainment", "Android Auto & Apple CarPlay"] },
      { name: "Zxi", price: "₹11.15 Lakh", highlights: ["Electric Sunroof", "LED Projector Headlamps"] },
      { name: "Zxi Plus", price: "₹12.86 Lakh", highlights: ["360 View Camera", "HUD", "Wireless Charger"] }
    ],
    ownership: {
      serviceCost: "₹5,800/year",
      maintenance: "Very Low",
      practicality: "Superb reliability and high resale value"
    },
    aiMatchScore: 90,
    compareScores: {
      mileage: 82,
      safety: 85,
      space: 85,
      performance: 78,
      features: 86,
      maintenance: 96
    }
  },
  {
    id: "baleno",
    brand: "Maruti Suzuki",
    name: "Baleno",
    priceRange: "₹6.61 - 9.88 Lakh",
    priceMin: 661000,
    priceMax: 988000,
    bodyType: "Hatchback",
    fuelType: "Petrol",
    transmission: "Automatic",
    seating: "5 Seater",
    tags: ["Hatchback", "City Driving", "Family"],
    gradient: "from-blue-600 to-indigo-900",
    accentColor: "#3b82f6",
    highlights: [
      "HUD System",
      "9-inch Touchscreen",
      "Arkamys Surround Sound",
      "6 Airbags"
    ],
    overview: "The Maruti Suzuki Baleno is India's highest-selling premium hatchback. Offering segment-first features like a heads-up display and a 360-degree camera, combined with extremely spacious rear seats and fuel-efficient performance, it sets the benchmark for premium hatchbacks.",
    keySpecs: {
      mileage: "22.94 kmpl",
      engine: "1197 cc",
      power: "88.50 bhp",
      torque: "113 Nm",
      seating: "5 Seater",
      bootSpace: "318 Litres",
      safetyRating: "3 Star (Global NCAP)"
    },
    pros: [
      "Very spacious rear seat comfort",
      "Segment-first features like HUD",
      "Excellent mileage and refinement",
      "Affordable pricing"
    ],
    cons: [
      "Automatic is an AMT, not a CVT/DCT",
      "Highway stability could be better",
      "Safety rating is average"
    ],
    specifications: {
      "Engine & Transmission": {
        "Engine Type": "1.2L DualJet Petrol",
        "Displacement": "1197 cc",
        "Max Power": "88.50 bhp @ 6000 rpm",
        "Max Torque": "113 Nm @ 4400 rpm",
        "Transmission": "5-Speed AMT (Automatic)"
      },
      "Fuel & Performance": {
        "Fuel Type": "Petrol",
        "Mileage (ARAI)": "22.94 kmpl"
      },
      "Dimensions & Capacity": {
        "Length": "3990 mm",
        "Width": "1745 mm",
        "Height": "1500 mm",
        "Wheelbase": "2520 mm",
        "Seating Capacity": "5 People",
        "Boot Space": "318 Litres"
      }
    },
    variants: [
      { name: "Sigma", price: "₹6.61 Lakh", highlights: ["Auto AC", "Rear Defogger", "Keyless Entry"] },
      { name: "Delta", price: "₹7.45 Lakh", highlights: ["7-inch Touchscreen", "Steering Controls"] },
      { name: "Zeta", price: "₹8.38 Lakh", highlights: ["6 Airbags", "Rear AC Vents", "Push Button Start"] },
      { name: "Alpha", price: "₹9.10 Lakh", highlights: ["HUD", "360 View Camera", "UV Cut Glass"] }
    ],
    ownership: {
      serviceCost: "₹4,800/year",
      maintenance: "Very Low",
      practicality: "Excellent city runabout with segment-best fuel economy"
    },
    aiMatchScore: 86,
    compareScores: {
      mileage: 95,
      safety: 70,
      space: 88,
      performance: 80,
      features: 88,
      maintenance: 98
    }
  },
  {
    id: "swift",
    brand: "Maruti Suzuki",
    name: "Swift",
    priceRange: "₹6.49 - 9.50 Lakh",
    priceMin: 649000,
    priceMax: 950000,
    bodyType: "Hatchback",
    fuelType: "Petrol",
    transmission: "Manual",
    seating: "5 Seater",
    tags: ["Hatchback", "City Driving"],
    gradient: "from-orange-500 to-red-600",
    accentColor: "#f97316",
    highlights: [
      "Sporty Design",
      "Z-Series Engine",
      "Rear AC Vents",
      "Excellent Fuel Efficiency"
    ],
    overview: "The Maruti Suzuki Swift is an iconic sporty hatchback that has dominated Indian roads for decades. The latest generation brings a new Z-Series engine focusing on high mileage, sporty handling, and a refreshed visual style, making it the perfect fun-to-drive city car.",
    keySpecs: {
      mileage: "24.80 kmpl",
      engine: "1197 cc",
      power: "80 bhp",
      torque: "112 Nm",
      seating: "5 Seater",
      bootSpace: "265 Litres",
      safetyRating: "3 Star (Global NCAP)"
    },
    pros: [
      "Incredibly fun to drive in city traffic",
      "Industry-best mileage in hatchback segment",
      "Refined manual gearbox",
      "Sporty cockpit-style interior"
    ],
    cons: [
      "Z-Series engine has slightly less power than older K-Series",
      "Boot space is small at 265 Litres",
      "Rear seat space is tighter than Baleno"
    ],
    specifications: {
      "Engine & Transmission": {
        "Engine Type": "1.2L Z12E Petrol",
        "Displacement": "1197 cc",
        "Max Power": "80 bhp @ 5700 rpm",
        "Max Torque": "112 Nm @ 4300 rpm",
        "Transmission": "5-Speed Manual"
      },
      "Fuel & Performance": {
        "Fuel Type": "Petrol",
        "Mileage (ARAI)": "24.80 kmpl"
      },
      "Dimensions & Capacity": {
        "Length": "3860 mm",
        "Width": "1735 mm",
        "Height": "1520 mm",
        "Wheelbase": "2450 mm",
        "Seating Capacity": "5 People",
        "Boot Space": "265 Litres"
      }
    },
    variants: [
      { name: "Lxi", price: "₹6.49 Lakh", highlights: ["6 Airbags", "ESP", "Remote Keyless Entry"] },
      { name: "Vxi", price: "₹7.29 Lakh", highlights: ["7-inch Touchscreen", "Steering Controls"] },
      { name: "Zxi", price: "₹8.29 Lakh", highlights: ["LED Headlamps", "Alloy Wheels", "Wireless Charger"] },
      { name: "Zxi Plus", price: "₹9.00 Lakh", highlights: ["Arkamys Sound", "Rear Camera", "Rear AC Vents"] }
    ],
    ownership: {
      serviceCost: "₹4,500/year",
      maintenance: "Very Low",
      practicality: "Super compact dimensions make parking a breeze"
    },
    aiMatchScore: 85,
    compareScores: {
      mileage: 98,
      safety: 70,
      space: 75,
      performance: 82,
      features: 80,
      maintenance: 98
    }
  }
];


export function getCarById(id) {
  return cars.find((c) => c.id === id);
}

export function filterCars(activeFilters) {
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

export function getSimilarCars(carId, limit = 4) {
  const car = getCarById(carId);
  if (!car) return [];
  return cars
    .filter((c) => c.id !== carId && (c.bodyType === car.bodyType || c.fuelType === car.fuelType))
    .slice(0, limit);
}

export const ADVISOR_QUESTIONS = [
  {
    id: "budget",
    question: "What is your budget?",
    options: [
      { label: "Under ₹10L", value: "under10" },
      { label: "₹10–20L", value: "10to20" },
      { label: "₹20–50L", value: "20to50" },
      { label: "Above ₹50L", value: "above50" },
    ],
  },
  {
    id: "driving",
    question: "What type of driving do you mostly do?",
    options: [
      { label: "City commuting", value: "city", icon: "city" },
      { label: "Highway trips", value: "highway", icon: "highway" },
      { label: "Mixed usage", value: "mixed", icon: "mixed" },
    ],
  },
  {
    id: "family",
    question: "How many family members travel regularly?",
    options: [
      { label: "1–2 people", value: "1-2" },
      { label: "3–4 people", value: "3-4" },
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

export function generateRecommendations(answers) {
  const scored = cars.map((car) => {
    let score = 50;

    if (answers.budget === "under10" && car.priceMax <= 1000000) score += 20;
    if (answers.budget === "10to20" && car.priceMin >= 1000000 && car.priceMax <= 2000000) score += 20;
    if (answers.budget === "20to50" && car.priceMin >= 2000000 && car.priceMax <= 5000000) score += 20;
    if (answers.budget === "above50" && car.priceMin >= 5000000) score += 20;

    if (answers.driving === "city" && car.tags.includes("City Driving")) score += 10;
    if (answers.driving === "highway" && car.tags.includes("Long Trips")) score += 10;
    if (answers.driving === "mixed") score += 5;

    if (answers.family === "5+" && car.seating.includes("7")) score += 15;
    if (answers.family === "3-4" && car.seating.includes("5")) score += 10;

    if (answers.preference === "comfort" && car.compareScores.space > 85) score += 10;
    if (answers.preference === "performance" && car.compareScores.performance > 85) score += 10;
    if (answers.preference === "balanced") score += 8;

    if (answers.fuel !== "any" && car.fuelType === answers.fuel) score += 15;

    if (answers.mileage === "high" && car.compareScores.mileage > 85) score += 12;
    if (answers.mileage === "low" && car.compareScores.performance > 85) score += 8;

    if (answers.priority === "features" && car.compareScores.features > 85) score += 10;
    if (answers.priority === "reliability" && car.compareScores.maintenance > 85) score += 10;

    const matterMap = {
      safety: "safety",
      performance: "performance",
      luxury: "features",
      mileage: "mileage",
      maintenance: "maintenance",
      technology: "features",
    };
    const key = matterMap[answers.matters];
    if (key && car.compareScores[key] > 85) score += 15;

    return { ...car, matchScore: Math.min(score, 98) };
  });

  return scored.sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);
}

export const COMPARE_CATEGORIES = [
  { key: "mileage", label: "Mileage" },
  { key: "safety", label: "Safety" },
  { key: "space", label: "Space" },
  { key: "performance", label: "Performance" },
  { key: "features", label: "Features" },
  { key: "maintenance", label: "Maintenance" },
];
