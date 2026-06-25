import Car from "../models/CarSchema.js";

export const getCars = async (req, res) => {
    try {
        const cars = await Car.find()
            .select("id brand name priceRange priceMin priceMax bodyType fuelType transmission seating tags gradient accentColor highlights compareScores")
            .limit(10);

        res.status(200).json(cars);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
export const getCarById = async (req , res) => {
    try {
        const query = req.params.id.match(/^[0-9a-fA-F]{24}$/)
            ? { _id: req.params.id }
            : { id: req.params.id };

        const car = await Car.findOne(query);
        if(!car){
            return res.status(404).json({
                message:"Car is Unavailable"
            });
        }
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
