const Task = require("../models/task.model.js");

const Project = require("../models/project.model.js");


// Get all tasks
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate("assignedUsers", "fullName email").populate("projectId", "projectTitle");
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single task by ID
exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate("assignedUsers", "fullName email").populate("projectId", "projectTitle");
        if (!task) return res.status(404).json({ message: "Task not found" });

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new task
// exports.createTask = async (req, res) => {
//     try {
//         const {
//             taskTitle,
//             taskDescription,
//             status,
//             startDate,
//             endDate,
//             id: projectId,
//             assignedUser
//         } = req.body;
//         conslog.log(req.body); 

//         // Create new Task
//         const newTask = new Task({
//             taskTitle,
//             taskDescription,
//             status,
//             startDate: new Date(startDate),
//             endDate: new Date(endDate),
//             projectId,
//             assignedUser,
//             createdBy: req.user.id,
//         });

//         const savedTask = await newTask.save();

//         // Push this task into the corresponding project's tasks array
//         await Project.findByIdAndUpdate(projectId, {
//             $push: { tasks: savedTask._id }
//         });

//         res.status(201).json(savedTask);
//     } catch (error) {
//         console.error("Error creating task:", error);
//         res.status(500).json({ message: error.message });
//     }
// }; 



// exports.createTask = async (req, res) => {
//     try {
//         const {
//             taskTitle,
//             taskDescription,
//             status,
//             startDate,
//             endDate,
//             id: projectId, // Assuming you're passing project ID in `id`
//             assignedUser
//         } = req.body;

//         console.log(req.body); // fixed typo: `conslog` ➝ `console`

//         // Create new Task
//         const newTask = new Task({
//             taskTitle,
//             taskDescription,
//             taskStatus: status || "To Do", // match the field name in schema
//             startDate: new Date(startDate),
//             endDate: new Date(endDate),
//             projectId,
//             assignedUser,
//             createdBy: req.user.id, // assuming user is added to req by auth middleware
//         });

//         const savedTask = await newTask.save();

//         // Push task ID into the related Project's tasks array
//         await Project.findByIdAndUpdate(projectId, {
//             $push: { tasks: savedTask._id }
//         });

//         res.status(201).json(savedTask);
//     } catch (error) {
//         console.error("Error creating task:", error);
//         res.status(500).json({ message: error.message });
//     }
// };

// const Task = require("../models/Task");
// const Project = require("../models/Project");

exports.createTask = async (req, res) => { 
    conlog.log('yes',req.body());
    try {
        const {
            taskTitle,
            taskDescription,
            taskStatus,
            startDate,
            endDate,
            projectId,
            assignedUser
        } = req.body;

        // Validate project exists
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        // Optional: Validate dates
        if (new Date(startDate) > new Date(endDate)) {
            return res.status(400).json({ message: "End date must be after start date" });
        }

        // Create and save the task
        const newTask = new Task({
            taskTitle,
            taskDescription,
            taskStatus: taskStatus || "To Do", // default fallback
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            projectId,
            assignedUser,
            createdBy: req.user.id,
        });

        const savedTask = await newTask.save();

        console.log('no',req.body); 
        // Update the related project with the task
        await Project.findByIdAndUpdate(projectId, {
            $push: { tasks: savedTask._id }
        });

        res.status(201).json(savedTask);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


// Update a task
exports.updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedTask) return res.status(404).json({ message: "Task not found" });

        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) return res.status(404).json({ message: "Task not found" });

        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
