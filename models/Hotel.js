const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Hotel name is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price per night is required'],
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    image: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      required: true,
    },
    amenities: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Hotel', hotelSchema);
