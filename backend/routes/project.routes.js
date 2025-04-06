const express = require("express");
const { authenticateUser } = require("../middleware/auth.middleware");
const {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
} = require("../controllers/project.controller");

const router = express.Router();

router.get("/", authenticateUser, getAllProjects); // Get all projects
router.get("/:id", authenticateUser, getProjectById); // Get a single project
router.post("/", authenticateUser, createProject); // Create a project
router.put("/:id", authenticateUser, updateProject); // Update project
router.delete("/:id", authenticateUser, deleteProject); // Delete project
// routes/projectRoutes.js

// const Project = require("../models/Project");

// router.get("/assigned", authenticateUser, async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const projects = await Project.find({ assignedUsers: userId });
//         res.json(projects);
//     } catch (error) {
//         res.status(500).json({ message: "Failed to fetch assigned projects" });
//     }
// });






module.exports = router;
