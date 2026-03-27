const express = require('express');
const Hotel = require('../models/Hotel');

const router = express.Router();

// @route   GET /api/hotels
// @desc    Get all hotels (search, location filter, sort)
router.get('/', async (req, res) => {
  try {
    const { location, search, sort } = req.query;
    let filter = { isActive: { $ne: false } };

    if (location && location !== 'All') {
      filter.location = { $regex: location, $options: 'i' };
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    let sortOption = { rating: -1 };
    if (sort === 'price_low') sortOption = { price: 1 };
    if (sort === 'price_high') sortOption = { price: -1 };
    if (sort === 'name') sortOption = { name: 1 };

    const hotels = await Hotel.find(filter).sort(sortOption);
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
