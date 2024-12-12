import React from 'react';
import { Workout as WorkoutType } from '../data/types';
import Workout from './Workout';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableWorkoutProps {
  workout: WorkoutType;
  onAddExercise: (workoutId: string) => void;
}

const SortableWorkout: React.FC<SortableWorkoutProps> = ({ workout, onAddExercise }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: workout.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Workout workout={workout} onAddExercise={onAddExercise} />
    </div>
  );
};

export default SortableWorkout;
