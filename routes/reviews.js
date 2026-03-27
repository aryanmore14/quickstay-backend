const express = require('express');
const Review = require('../models/Review');
const Hotel = require('../models/Hotel');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/reviews
// @desc    Create a review
router.post('/', protect, async (req, res) => {
  try {
    const { hotel, rating, comment } = req.body;

    const existing = await Review.findOne({ user: req.user._id, hotel });
    if (existing) {
      return res.status(400).json({ message: 'You already reviewed this hotel' });
    }

    const review = await Review.create({
      user: req.user._id,
      hotel,
      rating,
      comment,
    });

    const populated = await Review.findById(review._id).populate('user', 'name');

    // Update hotel average rating
    const reviews = await Review.find({ hotel });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await Hotel.findByIdAndUpdate(hotel, { rating: Math.round(avgRating * 10) / 10 });

    res.status(201).json(populated);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'You already reviewed this hotel' });
    }
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/reviews/:hotelId
// @desc    Get reviews for a hotel
router.get('/:hotelId', async (req, res) => {
  try {
    const reviews = await Review.find({ hotel: req.params.hotelId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/reviews/:id
// @desc    Delete own review
router.delete('/:id', protect, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const hotelId = review.hotel;
    await review.deleteOne();

    // Recalculate average
    const remaining = await Review.find({ hotel: hotelId });
    const avgRating = remaining.length > 0
      ? remaining.reduce((sum, r) => sum + r.rating, 0) / remaining.length
      : 0;
    await Hotel.findByIdAndUpdate(hotelId, { rating: Math.round(avgRating * 10) / 10 });

    res.json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
