const express = require("express");
const { signupUser } = require("./../Controllers/signupcontroller");

const router = express.Router();

router.post("/signup", signupUser);

module.exports = router;