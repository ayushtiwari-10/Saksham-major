// backend/src/routes/booking.routes.js

const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');

// Routes for booking operations
router.get('/', bookingController.getAllBookings);
router.get('/:id', bookingController.getBookingById);
router.post('/', bookingController.createBooking);
router.put('/:id', bookingController.updateBooking);
router.delete('/:id', bookingController.deleteBooking);  // <- Make sure this matches the export name

module.exports = router;
