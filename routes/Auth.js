const express = require('express');
const router = express.Router();
// const authController = require('../Authenticator');
const {
    register,
    login,
    adminLogin,
} = require('../controllers/Auth');

router.post('/api/auth/register', register);
router.post('/api/auth/login', login);
router.post('/api/admin/login', adminLogin);

module.exports = router;