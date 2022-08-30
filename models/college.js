import { Schema, model } from "mongoose";

const college = Schema({
  name: { type: String, required: true },
  yearFounded: { type: Date, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  numberOfStudents: { type: Number, required: true },
  courses: { type: [String], required: true, default: [] },
});

const College = model("College", college);
export default College;
