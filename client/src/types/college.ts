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
