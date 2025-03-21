const Hostel = require('../models/Hostel');

exports.addHostel = async (req, res) => {
    const { name, blocks } = req.body;

    try {
        const hostel = new Hostel({ name, blocks });
        await hostel.save();
        res.status(201).json(hostel);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.getHostels = async (req, res) => {
    try {
        const hostels = await Hostel.find();
        res.json(hostels);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};
