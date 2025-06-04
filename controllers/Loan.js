const Loan = require("../modals/Loans");

exports.applyLoan = async (req, res) => {
  try {
    const { amount, purpose, income, status } = req.body;
    
    // You need to get user id from auth middleware, usually attached to req.user or req.userId
    // Adjust this line depending on your auth setup:
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: User ID missing' });
    }

    // Validate required fields (you can do more validation as needed)
    if (!amount || !purpose || !income || !status) {
      return res.status(400).json({ message: 'Please provide amount, purpose and income' });
    }

    // Create new loan instance
    const newLoan = new Loan({
      user: userId,
      amount,
      purpose,
      income,
      status: status || 'pending',  // default status if not provided
    });

    await newLoan.save();

    res.status(201).json({ message: 'Loan application submitted successfully', loan: newLoan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getAllLoans = async (req, res) => {
  try {
    // Fetch all loans with user details
    const loans = await Loan.find().populate('user', 'name email');

    // Calculate counts
    const total = loans.length;
    const approved = loans.filter(loan => loan.status === 'Approved').length;
    const rejected = loans.filter(loan => loan.status === 'Rejected').length;

    res.status(200).json({
        total,
        approved,
        rejected,
      loans
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.getUserLoans = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User ID missing" });
    }

    const userLoans = await Loan.find({ user: userId }).populate('user', 'name email');

    res.status(200).json({ loans: userLoans });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateLoanStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const loan = await Loan.findById(id);
    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    loan.status = status;
    await loan.save();

    res.status(200).json({ message: "Loan status updated", loan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};