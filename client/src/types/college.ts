export interface College {
  _id: string;
  name: string;
  yearFounded: Date;
  city: string;
  state: string;
  country: string;
  numberOfStudents: number;
  courses: string[];
}

export interface SimilarCollege {
  match: number;
  college: College;
}
