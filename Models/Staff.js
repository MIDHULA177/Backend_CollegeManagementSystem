const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    position: {
      type: String,
      required: true
    },

    // 🔥 CHANGE HERE: STRING instead of ObjectId
    department: {
      type: String,
      required: true
    },

    password: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Staff", staffSchema);
