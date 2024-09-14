import express from 'express';
import { getUser, getCourses, getCourseById, UserEnrollApplication, getApplications, updateApplication, fetchUserApplications, CreateCourse, getApplicationById } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get('/user', getUser);
router.get('/courses', getCourses);
router.get('/course/:id', getCourseById);
router.post('/createCourse',authMiddleware, CreateCourse);
router.post('/enroll/:id',authMiddleware, UserEnrollApplication);
router.get('/applications',authMiddleware, getApplications);
router.put('/application/:id',authMiddleware, updateApplication);
router.get('/application/:id',authMiddleware, getApplicationById);
router.get('/userApplications',authMiddleware, fetchUserApplications);


export default router;