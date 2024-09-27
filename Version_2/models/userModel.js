import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: String, required: true },
})

const studentSchema = new mongoose.Schema({
    reg_no: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
})

const User = mongoose.model("User", userSchema)
const Student = mongoose.model("Student", studentSchema)

export { User, Student };