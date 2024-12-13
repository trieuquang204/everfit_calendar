import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Exercise as ExerciseType } from '../data/types';

interface ExerciseProps {
  exercise: ExerciseType;
}

const Exercise: React.FC<ExerciseProps> = ({ exercise }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: exercise.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'transform 250ms ease',
    cursor: 'grab',
    margin: '10px 0',
    padding: '10px',
    backgroundColor: '#f0f0f0',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <p>{exercise.name}</p>
    </div>
  );
};

export default Exercise;
