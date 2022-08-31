export interface Distribution {
  [key: string]: number;
}

export interface Distributions {
  yearFounded: Distribution;
  courses: Distribution;
  state: Distribution;
}
