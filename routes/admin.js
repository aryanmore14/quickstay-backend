const express = require('express');
const User = require('../models/User');
const Hotel = require('../models/Hotel');
const Booking = require('../models/Booking');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

const router = express.Router();

// @route   GET /api/admin/stats
router.get('/stats', protect, admin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalHotels = await Hotel.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const confirmedBookings = await Booking.countDocuments({ status: 'confirmed' });
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    const cancelledBookings = await Booking.countDocuments({ status: 'cancelled' });

    const revenueResult = await Booking.aggregate([
      { $match: { status: { $in: ['confirmed', 'pending'] } } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } },
    ]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    res.json({ totalUsers, totalHotels, totalBookings, confirmedBookings, pendingBookings, cancelledBookings, totalRevenue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/admin/notifications
// @desc    Get recent activity (bookings + users from last 24h)
router.get('/notifications', protect, admin, async (req, res) => {
  try {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const recentBookings = await Booking.find({ createdAt: { $gte: since } })
      .populate('user', 'name')
      .populate('hotel', 'name')
      .sort({ createdAt: -1 })
      .limit(10);

    const recentUsers = await User.find({ createdAt: { $gte: since } })
      .select('name email createdAt')
      .sort({ createdAt: -1 })
      .limit(10);

    const notifications = [
      ...recentBookings.map(b => ({
        type: 'booking',
        message: `${b.user?.name || 'A user'} booked ${b.hotel?.name || 'a hotel'}`,
        time: b.createdAt,
      })),
      ...recentUsers.map(u => ({
        type: 'user',
        message: `${u.name} joined Quickstay`,
        time: u.createdAt,
      })),
    ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 15);

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/admin/bookings
router.get('/bookings', protect, admin, async (req, res) => {
  try {
    const { status, startDate, endDate } = req.query;
    const filter = {};
    if (status && status !== 'all') filter.status = status;
    if (startDate) filter.checkIn = { $gte: new Date(startDate) };
    if (endDate) filter.checkOut = { ...filter.checkOut, $lte: new Date(endDate) };

    const bookings = await Booking.find(filter)
      .populate('user', 'name email')
      .populate('hotel', 'name location price image')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/admin/bookings/:id/status
// @desc    Update booking status (confirm/cancel)
router.put('/bookings/:id/status', protect, admin, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['confirmed', 'cancelled', 'pending'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('user', 'name email').populate('hotel', 'name location price image');

    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/admin/users
router.get('/users', protect, admin, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/admin/hotels
// @desc    Get all hotels for management (including inactive)
router.get('/hotels', protect, admin, async (req, res) => {
  try {
    const hotels = await Hotel.find().sort({ createdAt: -1 });
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/admin/hotels
router.post('/hotels', protect, admin, async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);
    res.status(201).json(hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/admin/hotels/:id
// @desc    Edit hotel details
router.put('/hotels/:id', protect, admin, async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PATCH /api/admin/hotels/:id/toggle
// @desc    Toggle hotel active/inactive
router.patch('/hotels/:id/toggle', protect, admin, async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
    hotel.isActive = !hotel.isActive;
    await hotel.save();
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/admin/hotels/:id
router.delete('/hotels/:id', protect, admin, async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
    res.json({ message: 'Hotel deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
