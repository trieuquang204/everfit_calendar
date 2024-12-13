import React from 'react';
import Workout from './Workout';
import { Day as DayType, Workout as WorkoutType } from '../data/types';

interface DayProps {
  day: DayType;
  date: Date;
}

const Day: React.FC<DayProps> = ({ day, date }) => {
  return (
    <div className="day-content">
      {day.workouts.map((workout: WorkoutType) => (
        <Workout key={workout.id} workout={workout} date={date} />
      ))}
    </div>
  );
};

export default Day;
