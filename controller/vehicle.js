const Vehicle = require("../model/vehicle");

exports.addVehicle = async (req, res) => {
  try {
    const { carModel, price, phone, maxPics, city } = req.body;
    const userId = req.user?.userId;

    if (!carModel || !price || !maxPics || !phone || !city) {
      return res.status(400).json({
        success: false,
        message: "Please Provide All Required Fields",
      });
    }
    if (req.files && req.files.length > 0) {
      const pictures = req.files.map((file) => file.path);

      await Vehicle.create({
        userId,
        carModel,
        price,
        phone,
        maxPics,
        city,
        pictures,
      });
      return res
        .status(200)
        .json({ success: true, message: "Vehicle Added Successfully" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Please Add Image" });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

exports.getAllVehicle = async (req, res) => {
  const userId = req.user.userId;

  try {
    const vehicle = await Vehicle.find({ userId });
    if (!vehicle) {
      return res
        .status(400)
        .json({ success: false, message: "No Vehicle Available" });
    }
    return res.status(200).json({ success: true, data: vehicle });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
