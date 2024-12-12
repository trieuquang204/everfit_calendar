import React, { useState, useCallback } from 'react';
import { Workout as WorkoutType, Exercise as ExerciseType } from '../data/types';
import Exercise from './Exercise';
import { useSortable, SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Modal from './Modal';

interface WorkoutProps {
  workout: WorkoutType;
  onAddExercise: (workoutId: string, exerciseName: string) => void;
}

const Workout: React.FC<WorkoutProps> = ({ workout, onAddExercise }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: workout.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'transform 250ms ease',
    cursor: 'grab',
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddExerciseClick = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleModalSubmit = (exerciseName: string) => {
    onAddExercise(workout.id, exerciseName);
    setIsModalOpen(false);
  };

  return (
    <div 
      className="workout" 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners} 
    >
      <h4>{workout.name} <button onClick={handleAddExerciseClick}>+</button></h4>
      <SortableContext items={workout.exercises} strategy={verticalListSortingStrategy}>
        {workout.exercises.map(exercise => (
          <Exercise key={exercise.id} exercise={exercise} />
        ))}
      </SortableContext>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        placeholder="Enter exercise name"
      />
    </div>
  );
};

export default Workout;
