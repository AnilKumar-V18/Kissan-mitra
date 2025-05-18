const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Vegetables = require("../models/vegetables");
const { errorHandler } = require("../helpers/dbErrorHandler");
const logger = require("../logger/index");

exports.vegetableById = (req, res, next, id) => {
    Vegetables.findById(id).exec((err, vegetable) => {
        if (err || !vegetable) {
            return res.status(400).json({
                error: "vegetable not found"
            });
        }
        req.vegetable = vegetable;
        next();
    });
};

exports.read = (req, res) => {
    req.vegetable.photo = undefined;
    return res.json(req.vegetable);
};

exports.add = (req, res) => {
    
    let form = new formidable.IncomingForm();
    console.log("add");
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        console.log(fields.price);
        if (err) {
            console.log(err);
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        const {
            name,
            price,
            quantity
        } = fields;

        if (
            !name ||
            !price ||
            !quantity 
        ) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }
        let vegetables = new Vegetables(fields);

        if (files.photo) {
            console.log(files.photo)
            vegetables.photo.data = fs.readFileSync(files.photo.path);
            vegetables.photo.contentType = files.photo.type;
        }

        vegetables.save((err, result) => {
            if (err) {
                console.log(err);
                return res.staus(400).json({
                    error: errorHandler(err)
                });
            }
            logger.info("Vegetables added");
            res.json(result);
        });
    });
};

exports.remove = (req, res) => {
    console.log("remove")
    let vegetable = req.vegetable;
    vegetable.remove((err, deleteVegetable) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        logger.info("Vegetables removed successfully");
        res.json({
            message: "Vegetable deleted successfully"
        });
    });
};
  
exports.update = (req, res) => {
    
    let form = new formidable.IncomingForm();
    console.log("update");
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        console.log(fields.price);
        if (err) {
            console.log(err);
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        const {
            name,
            price,
            quantity
        } = fields;

        if (
            !name ||
            !price ||
            !quantity 
        ) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }
        let vegetables = req.vegetable;
        vegetable = _.extend(vegetables, fields)

        if (files.photo) {
            console.log(files.photo)
            vegetables.photo.data = fs.readFileSync(files.photo.path);
            vegetables.photo.contentType = files.photo.type;
        }

        vegetables.save((err, result) => {
            if (err) {
                console.log(err);
                return res.staus(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

/**
 * sell / arrival
 * by sell = /vegetables?sortBy=sold&order=desc&limit=4
 * by arrival = /vegetables?sortBy=createdAt&order=desc&limit=4
 * if no params are sent, then all vegetables are returned
 */

exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Vegetables.find()
        .select("-photo")
        .populate("farmer_id")
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, vegetables) => {
            if (err) {
                return res.status(400).json({
                    error: "Vegetables not found"
                });
            }
            logger.info("Vegetables found");
            res.json(vegetables);
        });
};

exports.photo = (req, res, next) => {
    if (req.vegetable.photo.data) {
        res.set("Content-Type", req.vegetable.photo.contentType);
        return res.send(req.vegetable.photo.data);
    }
    next();
};


/**
 * list vegetables by search
 * we will implement vegetables search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */

 exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Vegetables.find(findArgs)
        .select("-photo")
        .populate("farmer_id")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Vegetables not found"
                });
            }
            logger.info("Filters applied and vegetables found");
            res.json({
                size: data.length,
                data
            });
        });
};


exports.listSearch = (req, res) => {
    // create query object to hold search value and category value
    const query = {};
    cosole.log(req.body);
    // assign search value to query.name
    if (req.query.name) {
        query.name = { $regex: req.query.name, $options: "i" };
        console.log("name", query.name);
        // assigne category value to query.category
        if (req.query.farmer_id && req.query.farmer_id != "All") {
            query.farmer_id = req.query.farmer_id;
        }
        // find the product based on query object with 2 properties
        // search and category
        Vegetables.find(query, (err, vegetables) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(vegetables);
        }).select("-photo");
    }
};
