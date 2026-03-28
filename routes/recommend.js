const express = require('express');
const Hotel = require('../models/Hotel');
const Booking = require('../models/Booking');
const { protect } = require('../middleware/auth');

const router = express.Router();

const ACTIVE_FILTER = { isActive: { $ne: false } };

// @route   GET /api/recommend
// @desc    Get recommended hotels based on user booking history
router.get('/', protect, async (req, res) => {
  try {
    // Get user's past bookings
    const bookings = await Booking.find({ user: req.user._id }).populate('hotel', 'location price');

    if (bookings.length === 0) {
      // New user — return top-rated hotels
      const popular = await Hotel.find(ACTIVE_FILTER).sort({ rating: -1, bookingCount: -1 }).limit(6);
      return res.json(popular);
    }

    // Extract preferred locations and avg price
    const locations = [...new Set(bookings.map(b => b.hotel?.location).filter(Boolean))];
    const avgPrice = bookings.reduce((sum, b) => sum + (b.hotel?.price || 0), 0) / bookings.length;
    const bookedHotelIds = bookings.map(b => b.hotel?._id?.toString()).filter(Boolean);

    // Find similar hotels (same locations OR similar price range, excluding already booked)
    const recommended = await Hotel.find({
      ...ACTIVE_FILTER,
      _id: { $nin: bookedHotelIds },
      $or: [
        { location: { $in: locations } },
        { price: { $gte: avgPrice * 0.6, $lte: avgPrice * 1.5 } },
      ],
    })
      .sort({ rating: -1 })
      .limit(6);

    // If not enough recommendations, fill with top-rated
    if (recommended.length < 6) {
      const moreIds = [...bookedHotelIds, ...recommended.map(h => h._id.toString())];
      const more = await Hotel.find({ ...ACTIVE_FILTER, _id: { $nin: moreIds } })
        .sort({ rating: -1 })
        .limit(6 - recommended.length);
      recommended.push(...more);
    }

    res.json(recommended);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/recommend/search
// @desc    Auto-suggest hotels for search
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.length < 2) return res.json([]);

    const suggestions = await Hotel.find({
      ...ACTIVE_FILTER,
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { location: { $regex: q, $options: 'i' } },
      ],
    })
      .select('name location price rating image')
      .limit(5);

    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
