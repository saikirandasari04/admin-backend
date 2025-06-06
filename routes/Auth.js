const express = require('express');
const router = express.Router();
// const authController = require('../Authenticator');
const {
    register,
    login,
    adminLogin,
} = require('../controllers/Auth');

router.get('/test', (req,res) => {
    try {
        res.status(200).send({message : 'Server running...'})
    }catch(error) {
        res.status(500).send({message : "server not working...,",error})
    }
});
router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/admin/login', adminLogin);

module.exports = router;