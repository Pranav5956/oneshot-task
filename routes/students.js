import { Router } from "express";
import Student from "../models/student.js";

const router = Router({ mergeParams: true });

router.get("/", async (req, res, next) => {
  try {
    const { collegeId } = req.params;
    const students = await Student.find({ collegeId }, { name: 1 }).lean();

    res.json({ students });
  } catch (err) {
    next(err);
  }
});

router.get("/:studentId", async (req, res, next) => {
  try {
    const { studentId: id } = req.params;
    const student = await Student.findById(id).lean();

    res.json({ student });
  } catch (err) {
    next(err);
  }
});

export default router;
