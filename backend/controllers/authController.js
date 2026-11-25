const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({ name, email, password: hashedPassword });
        const token = generateToken(user);
        res.status(201).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
};
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user);
        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { loginUser, registerUser };