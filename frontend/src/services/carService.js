import axios from "axios";


// Local Backend URL
const API = "http://localhost:5000/api/cars";

export const getCars = async () => {
    try {
        const res = await axios.get(API);
        return res.data;
    } catch (error) {
        console.error("Error fetching all cars from backend:", error.message);
        return []; // Returns an empty array fallback so array methods (.map, .filter) don't break
    }
};

export const getCarById = async (id) => {
    try {
        const res = await axios.get(`${API}/${id}`);
        return res.data;
    } catch (error) {
        console.error(`Error fetching car with ID ${id}:`, error.message);
        return null; // Returns null fallback since it's looking for a single item
    }
};