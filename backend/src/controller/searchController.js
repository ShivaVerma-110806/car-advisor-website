import Car from "../models/CarSchema.js";

export const search = async (req, res) => {
    try {
        const searchres = req.query.search || "";

        const cars = await Car.find({
            model: {
                $regex: searchres,
                $options: "i",
            },
        });

        res.status(200).json(cars);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};