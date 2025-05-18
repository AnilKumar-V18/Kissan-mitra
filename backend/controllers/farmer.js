const Farmer = require("../models/farmer");
const { errorHandler } = require("../helpers/dbErrorHandler");
const logger = require("../logger/index");

exports.farmerById = (req, res, next, id) => {
    Farmer.findById(id).exec((err, farmer) => {
        if (err || !farmer) {
            return res.status(400).json({
                error: "Farmer does not exist"
            });
        }
        req.farmer = farmer;
        next();
    });
};

exports.read = (req, res) => {
    return res.json(req.farmer);
};


exports.list = (req, res) => {
    Farmer.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        logger.info("got Farmer list ");
        res.json(data);
    });
};
