"use strict";
const express = require('express');
const router = express.Router();

const User = require('../../controllers/v1/User');


//router.post('/signup',User.signup_post);
router.get('',User.userlist_get)


module.exports = router;