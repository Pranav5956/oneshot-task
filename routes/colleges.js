import { Router } from "express";
import College from "../models/college.js";
import FastPriorityQueue from "fastpriorityqueue";
import similarity from "compute-cosine-similarity";
import students from "./students.js";

const router = Router();

router.get("/:collegeId", async (req, res, next) => {
  try {
    const { collegeId: id } = req.params;

    const college = await College.findById(id).lean();
    res.json({ college });
  } catch (err) {
    next(err);
  }
});

router.use("/:collegeId/students", students);

router.get("/:collegeId/similar", async (req, res, next) => {
  try {
    const { collegeId: id } = req.params;

    const targetCollege = await College.findById(id).lean();
    const colleges = await College.find({ state: targetCollege.state }).lean();

    var pQueue = new FastPriorityQueue(function (a, b) {
      return a[0] > b[0];
    });

    colleges.forEach((college, index) => {
      pQueue.add([
        similarity(targetCollege.featureVector, college.featureVector),
        index,
      ]);
    });

    // Remove 100% match with itself
    pQueue.poll();

    // Get 5 most similar colleges
    const similarColleges = [];
    let i = 0;
    while (!pQueue.isEmpty() && i < 5) {
      const [score, index] = pQueue.poll();
      similarColleges.push({
        match: score * 100,
        college: colleges[index],
      });
      i++;
    }

    res.json({ colleges: similarColleges });
  } catch (err) {}
});

export default router;
