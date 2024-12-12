import { Day } from './types';

export const initialData: Day[] = [
  {
    date: new Date(2024, 1, 5), // Thứ Hai
    workouts: [
      {
        id: 'workout-1',
        name: 'Chest Daydd',
        exercises: [
          { id: 'exercise-1', name: 'Bench Press', sets: ['50 lb x 5', '60 lb x 5', '70 lb x 5'] },
        ]
      },
      {
        id: 'workout-2',
        name: 'Chest Day',
        exercises: [
          { id: 'exercise-2', name: 'Bench Press', sets: ['50 lb x 5', '60 lb x 5', '70 lb x 5'] },
        ]
      },
    ]
  },
  {
    date: new Date(2024, 1, 6), // Thứ Ba
    workouts: [
      {
        id: 'workout-2wd',
        name: 'Leg Day',
        exercises: [
          { id: 'exercise-2ưdw', name: 'Squat', sets: ['100 lb x 5', '110 lb x 5', '120 lb x 5'] },
        ]
      },
    ]
  }
];
