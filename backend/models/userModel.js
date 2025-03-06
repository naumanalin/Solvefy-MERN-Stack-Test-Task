import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
    trim: true,
    minLength: [3, "Name must contain at least 3 characters."],
    maxLength: [30, "Name cannot exceed 30 characters."]
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address."
    ],
    index: true  // Optimized searching
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  picture: {
    type: String,
    default: null,  
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const User = mongoose.model("User", userSchema);

export default User;
