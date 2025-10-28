const express = require('express');
const router = express.Router(); // [cite: 632]
const { registerUser, loginUser } = require('../controllers/authController'); // [cite: 633-634]

router.post('/register', registerUser); // [cite: 635]
router.post('/login', loginUser); // [cite: 636]

module.exports = router;