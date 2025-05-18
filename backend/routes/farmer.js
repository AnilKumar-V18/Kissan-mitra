const express = require("express");
const router = express.Router();

const { farmerById, read, list } = require("../controllers/farmer");
const { userById } = require("../controllers/user");

router.get("/farmer/:farmerId", read);
router.get("/farmers", list);

router.param("farmerId", farmerById);
router.param("userId", userById);

module.exports = router;