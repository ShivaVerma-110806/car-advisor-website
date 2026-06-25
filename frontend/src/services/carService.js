import axios from "axios";

const API = "http://localhost:5000/api/cars";

export const getCars = async () => {
    const res = await axios.get(API);
    return res.data;
};

export const getCarById = async (id) => {
    const res = await axios.get(`${API}/${id}`);
    return res.data;
};