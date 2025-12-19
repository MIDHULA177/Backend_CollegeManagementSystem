const express = require("express");
const router = express.Router();
const { getAllUsers, updateUser, deleteUser } = require("../Controllers/admincontroller");
const { getAllStaff, createStaff, updateStaff, deleteStaff } = require("../Controllers/staffcontroller");
const { getAllDepartments, createDepartment, updateDepartment, deleteDepartment } = require("../Controllers/departmentcontroller");
const User = require("../Models/User");
const Staff = require("../Models/Staff");
const Department = require("../Models/Department");

/* ================= GET ALL USERS ================= */
router.get("/users", getAllUsers);

/* ================= UPDATE USER ================= */
router.put("/users/:id", updateUser);

/* ================= DELETE USER ================= */
router.delete("/users/:id", deleteUser);

/* ================= STAFF ROUTES ================= */
router.get("/staff", getAllStaff);
router.post("/staff", createStaff);
router.put("/staff/:id", updateStaff);
router.delete("/staff/:id", deleteStaff);

/* ================= DEPARTMENT ROUTES ================= */
router.get("/departments", getAllDepartments);
router.post("/departments", createDepartment);
router.put("/departments/:id", updateDepartment);
router.delete("/departments/:id", deleteDepartment);

/* ================= DASHBOARD STATS ================= */
router.get("/stats", async (req, res) => {
  try {
    const [students, faculty, activeUsers, totalStaff, totalDepartments] = await Promise.all([
      User.countDocuments({ role: "Student" }),
      User.countDocuments({ role: "Faculty" }),
      User.countDocuments({ status: "Active" }),
      Staff.countDocuments(),
      Department.countDocuments()
    ]);

    res.json({ students, faculty, activeUsers, totalStaff, totalDepartments });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stats" });
  }
});

module.exports = router;