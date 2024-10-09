const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    carModel: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      trim: true,
    },
    phone: {
      type: Number,
      trim: true,
    },
    maxPics: {
      type: Number,
      trim: true,
      minLength: 1,
      maxLength: 10,
    },
    pictures: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);
