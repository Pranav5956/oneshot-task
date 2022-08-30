import { faker } from "@faker-js/faker";

export const country = faker.address.country();

export const states = new Array(15)
  .fill(0)
  .map(() => faker.address.state());

export const cities = new Array(25)
  .fill(0)
  .map(() => faker.address.city());

export const courses = [
  "Mechanical Engineering",
  "Electronics and Communication Engineering",
  "Electrical and Electronics Engineering",
  "Computer Science and Engineering",
  "Information Techology",
  "Artifical Intelligence and Data Science",
  "Civil Engineering",
  "Bio-Technology",
  "Automobile Engineering",
  "Bio-Chemistry",
  "Aerospace Engineering",
  "Bio-Medical Engineering",
  "Chemical Engineering",
  "Food Technology",
];
