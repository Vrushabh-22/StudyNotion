const express = require("express");
const router = express.Router();

const {createOrder, verifySignature} = require("../controllers/Payment")
const {auth, isStudent} = require("../middlewares/Auth")


router.post("/createOrder", auth, isStudent, createOrder);
router.post("/verifySignature", auth, isStudent, verifySignature);

module.exports = router