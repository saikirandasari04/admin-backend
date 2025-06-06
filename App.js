    const express = require('express');
    const cors = require('cors');
    const app = express();
    const mongoose = require('mongoose');
    const port = 7000;
    app.use(express.json());

    // Allow all origins (for development)
    app.use(cors());

    mongoose.connect('mongodb+srv://saikirandasari04:mRCCHvIkwSiRdU8x@chatapp.md9qa.mongodb.net');

    const Auth = require("./routes/Auth")
    const Loan = require("./routes/Loan")
    app.use(Auth)
    app.use(Loan)

    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });