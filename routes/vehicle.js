const express = require("express");
const vehicleRouter = express.Router();
const { upload } = require("../utills/upload");

const { addVehicle, getAllVehicle } = require("../controller/vehicle");
const authenticateUser = require("../middleware/auth");

vehicleRouter.post(
  "/createVehicle",
  authenticateUser,
  upload.any(),
  addVehicle
);
vehicleRouter.get("/getVehicles", authenticateUser, getAllVehicle);

module.exports = vehicleRouter;
