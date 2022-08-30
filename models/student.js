import mongoose from "mongoose";

const student = mongoose.Schema({
  name: { type: String, required: true },
  yearOfBatch: { type: Date, required: true },
  collegeId: { type: mongoose.Types.ObjectId, ref: "College", required: true },
  skills: { type: [String], required: true, default: [] },
});

const Student = mongoose.model("Student", student);
export default Student;
