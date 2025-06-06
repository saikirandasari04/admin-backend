const express = require('express');
const router = express.Router();
const authController = require('../Authenticator');
const {
    applyLoan,
    getAllLoans,
    getUserLoans,
    updateLoanStatus,
} = require('../controllers/Loan');

router.post('/loan/apply',authController, applyLoan);
router.get('/admin/loans',authController, getAllLoans);
router.get('/loan/status',authController, getUserLoans);
router.patch('/admin/loan/:id',authController, updateLoanStatus);

module.exports = router;