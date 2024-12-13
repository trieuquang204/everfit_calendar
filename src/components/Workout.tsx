import React, { useState, useCallback } from 'react';
import { useSortable, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Exercise from './Exercise';
import Modal from './Modal';
import { Workout as WorkoutType, Exercise as ExerciseType } from '../data/types';

interface WorkoutProps {
  workout: WorkoutType;
}

const Workout: React.FC<WorkoutProps> = ({ workout }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: workout.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'transform 250ms ease',
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddExerciseClick = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleModalSubmit = (exerciseName: string) => {
    workout.exercises.push({
      id: `exercise-${new Date().getTime()}`,
      name: exerciseName,
      sets: [],
    });
    setIsModalOpen(false);
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="workout">
      <h4>{workout.name} <button onClick={handleAddExerciseClick}>+</button></h4>
      <SortableContext items={workout.exercises} strategy={verticalListSortingStrategy}>
        {workout.exercises.map((exercise: ExerciseType) => (
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
