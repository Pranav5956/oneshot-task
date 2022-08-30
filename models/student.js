import { Schema, model, Types } from "mongoose";

const student = Schema({
  name: { type: String, required: true },
  yearOfBatch: { type: Date, required: true },
  collegeId: { type: Types.ObjectId, ref: "College", required: true },
  skills: { type: [String], required: true, default: [] },
});

const Student = model("Student", student);
export default Student;
