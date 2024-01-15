import mongoose from "mongoose";

const BookingSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true, // Trim leading and trailing whitespaces
  },
  email: {
    type: String,
    trim: true,
    lowercase: true, // Convert email to lowercase
    match: /^\S+@\S+\.\S+$/, // Simple email format validation
  },
  phone: {
    type: String,
    trim: true,
    // You might want to add more specific validation for phone numbers based on your requirements
  },
  noOfPeople: {
    type: Number,
    min: 1, // Assuming the number of people should be at least 1
  },
  time: {
    type: Date,
  },
  date: {
    type: Date,
  },
});

const Booking = mongoose.model("Booking", BookingSchema);

export default Booking;
