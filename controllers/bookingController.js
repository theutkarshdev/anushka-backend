import Booking from "../model/bookingModal.js";

export const createBooking = async (req, res) => {
  try {
    const { fullName, email, phone, date, time, noOfPeople } = req.body;

    if (!fullName || !email || !phone || !date || !time || !noOfPeople) {
      return res.status(400).json({ message: "All fields are required.", success: false });
    }

    const newBooking = new Booking({
      fullName,
      email,
      phone,
      date,
      time,
      noOfPeople,
    });

    const savedBooking = await newBooking.save();

    return res.status(201).json({
      message: "Booking created successfully.",
      success: true,
      booking: savedBooking,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    // Retrieve all blogs from the database
    const allBookings = await Booking.find();

    return res.status(200).json({
      message: "Bookings retrieved successfully.",
      success: true,
      booking: allBookings,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
