const express = require('express');
const router = express.Router();
const { Register, Login } = require('../auth/main')

router.post('/register', Register);

router.get('/login', Login);

module.exports = router;