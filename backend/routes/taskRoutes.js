const express = require('express');
const {
    createTask, getAllTasks, getTaskById, updateTask, deleteTask,
} = require('../controllers/taskControllers.js');

const router = express.Router();

router.post('/tasks', createTask);
router.get('/tasks', getAllTasks);
router.get('/tasks/:id', getTaskById);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

module.exports = router;
