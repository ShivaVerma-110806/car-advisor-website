import Car from "../models/CarSchema.js";

export const getCars = async (req, res) => {
    try {
        const cars = await Car.find()
            .select("make model price.exShowroom images")
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
        const car = await Car.findById(req.params.id)
        if(!car){
            res.status(400).json({
                meassage:"Car is Unavaible"
            })
        }
        res.status(200).json(car)
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
