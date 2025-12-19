const Staff = require("../Models/Staff");
const bcrypt = require("bcryptjs");

exports.getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find();
    res.status(200).json(staff);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch staff" });
  }
};

exports.createStaff = async (req, res) => {
  try {
    const { name, email, position, department, password, status } = req.body;

    // ✅ Validation matches frontend
    if (!name || !email || !position || !department || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStaff = new Staff({
      name,
      email: email.toLowerCase().trim(),
      position,
      department: department.toLowerCase().trim(),
      password: hashedPassword,
      status: status || "Active"
    });

    await newStaff.save();
    res.status(201).json(newStaff);

  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    console.error("CREATE STAFF ERROR:", err);
    res.status(500).json({ message: "Failed to create staff" });
  }
};

exports.updateStaff = async (req, res) => {
  try {
    const updatedStaff = await Staff.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedStaff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.status(200).json(updatedStaff);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

exports.deleteStaff = async (req, res) => {
  try {
    const deletedStaff = await Staff.findByIdAndDelete(req.params.id);

    if (!deletedStaff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.status(200).json({ message: "Staff deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};
