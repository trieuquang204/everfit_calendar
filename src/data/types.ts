export interface Exercise {
  id: string;
  name: string;
  sets: string[];
}

export interface Workout {
  id: string;
  name: string;
  exercises: Exercise[];
}

export interface Day {
  date: Date;
  workouts: Workout[];
}
