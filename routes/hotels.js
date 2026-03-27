const express = require('express');
const Hotel = require('../models/Hotel');

const router = express.Router();

// @route   GET /api/hotels
// @desc    Get all hotels (optional location filter)
router.get('/', async (req, res) => {
  try {
    const { location } = req.query;
    let filter = {};

    if (location && location !== 'All') {
      filter.location = { $regex: location, $options: 'i' };
    }

    const hotels = await Hotel.find(filter).sort({ rating: -1 });
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/hotels/:id
// @desc    Get single hotel by ID
router.get('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
