import React from 'react';
import Workout from './Workout';
import { Day as DayType, Workout as WorkoutType } from '../data/types';

interface DayProps {
  day: DayType;
}

const Day: React.FC<DayProps> = ({ day }) => {
  return (
    <div className="day-content">
      {day.workouts.map((workout: WorkoutType) => (
        <Workout key={workout.id} workout={workout} />
      ))}
    </div>
  );
};

export default Day;
