import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    estimatedTime: {
        type: String,
    },
    enrolledUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        max: 3,
        default: [],
    }],
    price: {
        type: Number,
        default: 0,
    },
    users: {
        type: Number,
        default: 0,
    },
});

const applicationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    appliedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        enum: ['applied', 'pending', 'accepted', 'rejected'],
        default: 'pending',
    },
    appliedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    }],

});

const Course = mongoose.model('Course', CourseSchema);
const Application = mongoose.model('Application', applicationSchema);

export { Course, Application };