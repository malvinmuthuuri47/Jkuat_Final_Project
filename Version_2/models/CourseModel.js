import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    number: { type: String, required: true },
    department: { type: String, required: true },
    requirements: { type: [{ 
        clusterPoints: { type: Number, required: true },
        fees: { type: Number, required: true },
        requirements: { type: Array, required: true }
    }], required: true }
});

const lecturerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    department: { type: String, required: true },
    course: { type: String, required: true }
});

const Course = mongoose.model("Course", courseSchema)
const Lecturer = mongoose.model("Lecturer", lecturerSchema)

export { Course, Lecturer };