const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const authController = require('../controllers/auth.controller');



router.post('/register', authController.register);

router.post('/login', authController.login);


// router.post('/logout', authMiddleware, authController.logout);

router.post('/logout', authMiddleware, authController.logout);

module.exports = router;    