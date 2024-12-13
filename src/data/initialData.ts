import { Day } from './types';

export const initialData: Day[] = [
  {
    date: new Date(),
    workouts: [
      {
        id: 'workout-1',
        name: 'Workout 1',
        exercises: [
          { id: 'exercise-1', name: 'Exercise 1', sets: [] },
          { id: 'exercise-2', name: 'Exercise 2', sets: [] },
        ],
      },
    ],
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() + 1)), // Day after today
    workouts: [],
  },
];
