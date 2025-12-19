const User = require("../Models/User");
const bcrypt = require("bcryptjs");

exports.signupUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || 
        typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({
        message: "Name, email and password are required"
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: role || "Student"
    });

    await newUser.save();

    return res.status(201).json({
      message: "Registration Successful"
    });
  } catch (error) {
    console.error("SIGNUP ERROR DETAILS:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return res.status(500).json({ 
      message: "Server Error",
      error: error.message 
    });
  }

};
