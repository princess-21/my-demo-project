const RoomManagement = require('../models/RoomManagement');

exports.allocateRoom = async (req, res) => {
    const { studentName, studentID, hostel, block, roomNumber } = req.body;

    try {
        const allocation = new RoomManagement({ studentName, studentID, hostel, block, roomNumber });
        await allocation.save();
        res.status(201).json(allocation);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.getAllAllocations = async (req, res) => {
    try {
        const allocations = await RoomManagement.find();
        res.json(allocations);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};
