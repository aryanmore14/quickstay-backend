const express = require('express');
const Booking = require('../models/Booking');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/bookings
// @desc    Create a new booking
router.post('/', protect, async (req, res) => {
  try {
    const { hotel, checkIn, checkOut, guests, totalPrice } = req.body;

    const booking = await Booking.create({
      user: req.user._id,
      hotel,
      checkIn,
      checkOut,
      guests,
      totalPrice,
      status: 'pending',
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/bookings/my
// @desc    Get logged-in user's bookings
router.get('/my', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('hotel', 'name location price image')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/bookings/:id/cancel
// @desc    Cancel a booking
router.put('/:id/cancel', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Booking already cancelled' });
    }

    booking.status = 'cancelled';
    await booking.save();

    const updated = await Booking.findById(booking._id).populate('hotel', 'name location price image');
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
