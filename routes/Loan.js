const express = require('express');
const router = express.Router();
const authController = require('../Authenticator');
const {
    applyLoan,
    getAllLoans,
    getUserLoans,
    updateLoanStatus,
} = require('../controllers/Loan');

router.post('/api/loan/apply',authController, applyLoan);
router.get('/api/admin/loans',authController, getAllLoans);
router.get('/api/loan/status',authController, getUserLoans);
router.patch('/api/admin/loan/:id',authController, updateLoanStatus);

module.exports = router;