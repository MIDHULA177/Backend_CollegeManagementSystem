const Department = require("../Models/Department");
const mongoose = require("mongoose");

exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch departments" });
  }
};

exports.createDepartment = async (req, res) => {
  try {
    const { name, description, status } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: "Name and description are required" });
    }

    const newDepartment = new Department({
      name,
      description,
      status: status || "Active"
    });

    await newDepartment.save();
    res.status(201).json(newDepartment);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Department name already exists" });
    }
    res.status(500).json({ message: "Failed to create department" });
  }
};

exports.updateDepartment = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid department ID" });
    }

    const updatedDepartment = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedDepartment) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json(updatedDepartment);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid department ID" });
    }

    const deletedDepartment = await Department.findByIdAndDelete(req.params.id);

    if (!deletedDepartment) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json({ message: "Department deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};