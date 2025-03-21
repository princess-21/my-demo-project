const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.loginAdmin = async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: admin._id }, 'your_jwt_secret_key', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.viewDashboard = (req, res) => {
    res.send('Welcome to the Admin Dashboard');
};
