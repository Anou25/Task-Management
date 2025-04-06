const express = require("express");
const { authenticateUser } = require("../middleware/auth.middleware");
const {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
} = require("../controllers/task.controller");

const router = express.Router();

router.get("/", authenticateUser, getAllTasks); // Get all tasks
router.get("/:id", authenticateUser, getTaskById); // Get task by ID
router.post("/", createTask); // Create task
router.put("/:id", authenticateUser, updateTask); // Update task
router.delete("/:id", authenticateUser, deleteTask); // Delete task

// const Project = require("../models/Project");
// const Task = require("../models/Task");

// router.get("/:projectId/tasks", authenticateUser, async (req, res) => {
//     try {
//         const { projectId } = req.params;
//         const project = await Project.findById(projectId);

//         if (!project) {
//             return res.status(404).json({ message: "Project not found" });
//         }

//         if (!project.assignedUsers.includes(req.user.id)) {
//             return res.status(403).json({ message: "Access denied to this project" });
//         }

//         const tasks = await Task.find({ projectId });
//         res.json(tasks);
//     } catch (error) {
//         res.status(500).json({ message: "Failed to fetch tasks" });
//     }
// });

// router.patch("/:projectId/tasks/:taskId", authenticateUser, async (req, res) => {
//     try {
//         const { projectId, taskId } = req.params;
//         const { status } = req.body;

//         const project = await Project.findById(projectId);
//         if (!project) return res.status(404).json({ message: "Project not found" });

//         if (!project.assignedUsers.includes(req.user.id)) {
//             return res.status(403).json({ message: "Access denied to this project" });
//         }

//         const task = await Task.findOneAndUpdate(
//             { _id: taskId, projectId },
//             { status },
//             { new: true }
//         );

//         if (!task) return res.status(404).json({ message: "Task not found" });

//         res.json(task);
//     } catch (error) {
//         res.status(500).json({ message: "Failed to update task status" });
//     }
// });

module.exports = router;
