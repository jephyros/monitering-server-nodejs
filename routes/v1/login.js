const express = require('express');
const router = express.Router();


const Login = require('../../controllers/v1/Login');


router.post('/signup',Login.signup_POST)
router.post("/auth", Login.auth_POST)

module.exports = router;