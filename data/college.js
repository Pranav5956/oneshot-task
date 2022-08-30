import { faker } from "@faker-js/faker";
import { getRandomNumber } from "./common.js";

export const initializeCountry = () => faker.address.country();

// Generate states and corresponding feature vectors
export const initializeStates = (numStates = 5) => {
  const states = new Array(numStates).fill(0).map(() => faker.address.state());
  const stateFeatureVectors = Object.assign(
    {},
    ...states.map((state) => ({
      [state]: states.map((s) => (s === state ? 1 : 0)),
    }))
  );

  return [states, stateFeatureVectors];
};

// Generate cities for each state along with corresponding feature vectors
export const initializeCities = (states, minCities = 3, maxCities = 6) => {
  const cities = Object.assign(
    {},
    ...states.map((state) => ({
      [state]: new Array(getRandomNumber(minCities, maxCities))
        .fill(0)
        .map(() => faker.address.city()),
    }))
  );
  const cityList = Object.values(cities).flat();
  const cityFeatureVectors = Object.assign(
    {},
    ...cityList.map((city) => ({
      [city]: cityList.map((c) => (c === city ? 1 : 0)),
    }))
  );

  return [cities, cityFeatureVectors];
};

export const initializeCourses = () => [
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
