const express = require('express');
const router = express.Router();
// const authController = require('../Authenticator');
const {
    register,
    login,
    adminLogin,
} = require('../controllers/Auth');

router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/admin/login', adminLogin);

module.exports = router;