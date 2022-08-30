import mongoose from "mongoose";

const college = mongoose.Schema({
  name: { type: String, required: true },
  yearFounded: { type: Date, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  numberOfStudents: { type: Number, required: true },
  courses: { type: [String], required: true, default: [] },
  featureVector: { type: [Number], required: true },
});

const College = mongoose.model("College", college);
export default College;
