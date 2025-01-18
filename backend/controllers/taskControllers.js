const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    try {
        const task = await Task.create({ ...req.body, user: req.user.id }); // Associate user ID
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllTasks = async (req, res) => {
    try {
        const { search, page = 1, limit = 10 } = req.query;
        const query = { user: req.user.id }; // Filter tasks by user ID
        if (search) {
            query.title = new RegExp(search, 'i'); // Add search filter
        }

        const tasks = await Task.find(query)
            .skip((page - 1) * limit)
            .limit(Number(limit));
        const total = await Task.countDocuments(query);

        res.status(200).json({ tasks, total });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user.id }); // Check user ownership
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id }, // Check user ownership
            req.body,
            { new: true }
        );
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id }); // Check user ownership
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
