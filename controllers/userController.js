import { User } from "../models/userModel.js";
import { Course, Application } from "../models/courseModel.js";
import decodeToken from '../utils/decodeToken.js';

const getUser = async (req, res) => {
    try {
        const id = decodeToken(req.headers.authorization.split(' ')[1]).id;
        const user = await User.findById(id).select('-password').populate('courses').populate('applications');
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

const getCourses = async (req, res) => {
    try {
        const course = await Course.find({});
        res.json(course);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        res.json(course);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

const UserEnrollApplication = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        const user = await User.findById(decodeToken(req.headers.authorization.split(' ')[1]).id);
        if (course.enrolledUsers.includes(user.id)) {
            return res.status(400).json({ message: 'You have already enrolled' });
        }
                
        // Create a new application
        const application = await Application.create({
            title: course.title,
            description: course.description,
            appliedBy: user.id,
            appliedCourses: course._id,
        });

        // Add the application reference to the user's applications
        await User.findByIdAndUpdate(user.id, { "$push": { applications: application._id } });

        // Add the application reference to the course's applications
        await Course.findByIdAndUpdate(course._id, { "$push": { applications: application._id } });

        res.json("Application submitted successfully");
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error in Enrolling' });
    }
}

const getApplications = async (req, res) => {
    //check if admin is fetching the applications
    const user = await User.findById(decodeToken(req.headers.authorization.split(' ')[1]).id);
    if (!user || user.role !== 'admin') {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const application = await Application.find({}).populate('appliedCourses');
        res.json(application);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

const updateApplication = async (req, res) => {
    try {
        const user = await User.findById(decodeToken(req.headers.authorization.split(' ')[1]).id);
        if (user.role !== 'admin') {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const application = await Application.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        if (req.body.status) {
            application.status = req.body.status;
        }

        await application.save(); 
        // If the application is accepted, update the course and user schemas
        if (application.status === 'accepted') {
            await Course.findByIdAndUpdate(application.appliedCourses, { $push: { enrolledUsers: application.appliedBy } });
            await User.findByIdAndUpdate(application.appliedBy, { $push: { courses: application.appliedCourses } });
        }

        res.json({ message: "Application updated successfully", application });
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

const fetchUserApplications = async (req, res) => {
    try {
        const user = await User.findById(decodeToken(req.headers.authorization.split(' ')[1]).id);
        const application = await Application.find({ appliedBy: user.id });
        res.json(application);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

const CreateCourse = async (req, res) => {
    const { title, description, estimatedTime, users, price } = req.body;
    //check if admin is creating the course
    try {
        const user = await User.findById(decodeToken(req.headers.authorization.split(' ')[1]).id);
        if (!user || user.role !== 'admin') {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const course = await Course.create({
            title,
            description,
            estimatedTime,
            users,
            price
        });
        res.json(course);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

const getApplicationById = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id).populate('appliedCourses');
        res.json(application);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

export { getApplicationById, getUser, getCourses, getCourseById, UserEnrollApplication, getApplications, updateApplication, fetchUserApplications, CreateCourse };