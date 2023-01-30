const express = require('express');
const authController = require('../controllers/auth');

const imageUrl = require('../middleware/imageurl')

const router = express.Router();

router.post('/signup',imageUrl.uploadimage, authController.signup);

router.post('/login', authController.login);

router.post('/forgotpassword', authController.forgotpassword);

router.put('/resetpassword/:resetLink', authController.resetpassword);

module.exports = router;