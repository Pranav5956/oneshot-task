import { faker } from "@faker-js/faker";
import College from "../models/college.js";
import Student from "../models/student.js";
import {
  initializeCities,
  initializeCountry,
  initializeCourses,
  initializeStates,
} from "./college.js";
import { getRandomNumber, vectorizeArraysFromEmbeddings } from "./common.js";
import { initializeSkills } from "./student.js";

export const populate = async (req, res, next) => {
  const country = initializeCountry();
  const [states, stateFeatureVectors] = initializeStates();
  const [cities, cityFeatureVectors] = initializeCities(states);
  const courses = initializeCourses();

  const skills = initializeSkills();

  try {
    await College.deleteMany();
    await Student.deleteMany();

    const colleges = new Array(100).fill(0).map(() => {
      const name = faker.company.name() + " Engineering College";
      const randomYear = getRandomNumber(1980, 2012);
      const yearFounded = new Date(randomYear, getRandomNumber(12));
      const state = states[getRandomNumber(states.length)];
      const available_cities = cities[state];
      const city = available_cities[getRandomNumber(available_cities.length)];
      const numberOfStudents = getRandomNumber(80, 120);
      const offeredCourses = courses
        .sort(() => 0.5 - Math.random())
        .slice(0, getRandomNumber(4, 8));
      const featureVector = [
        randomYear - 1980,
        numberOfStudents - 80,
        ...stateFeatureVectors[state],
        ...cityFeatureVectors[city],
        ...vectorizeArraysFromEmbeddings(offeredCourses, courses),
      ];

      return new College({
        name,
        yearFounded,
        city,
        state,
        country,
        numberOfStudents,
        courses: offeredCourses,
        featureVector,
      });
    });

    await College.insertMany(colleges);

    const students = [];
    for (let i = 0; i < 100; i++) {
      const yearFounded = new Date(colleges[i].yearFounded).getFullYear();

      for (let j = 0; j < colleges[i].numberOfStudents; j++) {
        const name = faker.name.fullName();
        const yearOfBatch = new Date(
          getRandomNumber(yearFounded, 2015),
          getRandomNumber(12)
        );
        const currentSkills = skills
          .sort(() => 0.5 - Math.random())
          .slice(0, getRandomNumber(6, 12));

        students.push(
          new Student({
            name,
            yearOfBatch,
            collegeId: colleges[i]._id,
            skills: currentSkills,
          })
        );
      }
    }

    await Student.insertMany(students);

    res.send(
      `Populated database with ${colleges.length} colleges and ${students.length} students.`
    );
  } catch (err) {
    next(err);
  }
};
