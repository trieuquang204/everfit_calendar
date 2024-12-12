import React from 'react';
import { Day as DayType } from '../data/types';
import Workout from './Workout';
import { useDroppable } from '@dnd-kit/core';

interface DayProps {
  day: DayType;
  onAddExercise: (workoutId: string, exerciseName: string) => void;
}

const Day: React.FC<DayProps> = ({ day, onAddExercise }) => {
  const { setNodeRef } = useDroppable({
    id: day.date.toDateString(),
  });

  const dayOfWeek = day.date.toLocaleDateString('vi-VN', { weekday: 'long' });
  const dayOfMonth = day.date.getDate();
  const fullDate = day.date.toLocaleDateString('vi-VN');

  return (
    <div className="day" ref={setNodeRef}>
      <h3>{dayOfWeek} ({dayOfMonth})</h3>
      <p>{fullDate}</p> {/* Hiển thị ngày tháng năm */}
      {day.workouts.map(workout => (
        <Workout key={workout.id} workout={workout} onAddExercise={onAddExercise} />
      ))}
    </div>
  );
};

export default Day;
