const User = require('../modals/Users');
const Admin = require('../modals/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'dfvvabfzdbdfbefhfdvbzfbfbeerewrewrewg'; // Ideally store this in environment variables

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(req.body)
        const existingUser = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash the password directly here
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: 'User'
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1d' });

        res.status(201).json({ message: 'Register successful', token,newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while registering user' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)
        const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({ message: 'Login successful', token,user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while logging in' });
    }
};

exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)
        const user = await Admin.findOne({ email: new RegExp(`^${email}$`, 'i') });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({ message: 'Login successful', token,user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while logging in' });
    }
};