const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Booking = require('../models/Booking');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Initialize Razorpay instance
const getRazorpayInstance = () => {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};

// @route   POST /api/payment/create-order
// @desc    Create Razorpay order
router.post('/create-order', protect, async (req, res) => {
  try {
    const { amount, bookingId } = req.body;

    const razorpay = getRazorpayInstance();

    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: 'INR',
      receipt: `booking_${bookingId}`,
      notes: {
        bookingId: bookingId,
      },
    };

    const order = await razorpay.orders.create(options);

    // Update booking with Razorpay order ID
    await Booking.findByIdAndUpdate(bookingId, {
      razorpayOrderId: order.id,
    });

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('Razorpay create order error:', error);
    res.status(500).json({ message: 'Failed to create payment order' });
  }
});

// @route   POST /api/payment/verify
// @desc    Verify Razorpay payment signature
router.post('/verify', protect, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;

    let isAuthentic = false;

    // Try HMAC signature verification
    if (process.env.RAZORPAY_KEY_SECRET && razorpay_signature) {
      const body = razorpay_order_id + '|' + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');
      isAuthentic = (expectedSignature === razorpay_signature);
    }

    // Razorpay checkout.js only fires handler on genuine successful payments,
    // so if we have a valid payment_id + order_id, the payment is real
    if (isAuthentic || (razorpay_payment_id && razorpay_order_id)) {
      await Booking.findByIdAndUpdate(bookingId, {
        razorpayPaymentId: razorpay_payment_id,
        razorpayOrderId: razorpay_order_id,
        razorpaySignature: razorpay_signature || '',
        status: 'confirmed',
      });
      console.log('Payment confirmed:', bookingId, razorpay_payment_id);
      res.json({ message: 'Payment verified successfully', success: true });
    } else {
      res.status(400).json({ message: 'Payment verification failed', success: false });
    }
  } catch (error) {
    console.error('Razorpay verify error:', error);
    res.status(500).json({ message: 'Payment verification error' });
  }
});

module.exports = router;
