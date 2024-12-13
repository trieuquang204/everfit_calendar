import React, { useState } from 'react';
import { DndContext, MouseSensor, useSensor, useSensors, closestCenter } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import Day from './Day';
import Modal from './Modal';
import { initialData } from '../data/initialData';
import { Day as DayType, Workout as WorkoutType } from '../data/types';
import { getStartOfWeek, addDays, isToday } from '../utils/dateUtils';

const Calendar: React.FC = () => {
  const [days, setDays] = useState<DayType[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState<Date | null>(null);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 },
  });
  const sensors = useSensors(mouseSensor);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    setDays((prevDays) => {
      return prevDays.map((day) => {
        const activeWorkoutIndex = day.workouts.findIndex((workout) => workout.id === activeId);
        const overWorkoutIndex = day.workouts.findIndex((workout) => workout.id === overId);

        if (activeWorkoutIndex !== -1 && overWorkoutIndex !== -1) {
          const reorderedWorkouts = arrayMove(day.workouts, activeWorkoutIndex, overWorkoutIndex);
          return { ...day, workouts: reorderedWorkouts };
        }

        const activeExerciseIndex = day.workouts.some((workout) =>
          workout.exercises.findIndex((exercise) => exercise.id === activeId) !== -1
        );
        const overExerciseIndex = day.workouts.some((workout) =>
          workout.exercises.findIndex((exercise) => exercise.id === overId) !== -1
        );

        if (activeExerciseIndex && overExerciseIndex) {
          return {
            ...day,
            workouts: day.workouts.map((workout) => {
              const activeIndex = workout.exercises.findIndex((exercise) => exercise.id === activeId);
              const overIndex = workout.exercises.findIndex((exercise) => exercise.id === overId);

              if (activeIndex !== -1 && overIndex !== -1) {
                const reorderedExercises = arrayMove(workout.exercises, activeIndex, overIndex);
                return { ...workout, exercises: reorderedExercises };
              }

              return workout;
            }),
          };
        }

        return day;
      });
    });
  };

  const handleAddWorkout = (date: Date) => {
    setModalDate(date);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (workoutName: string) => {
    if (modalDate) {
      const newWorkout: WorkoutType = {
        id: `workout-${new Date().getTime()}`,
        name: workoutName,
        exercises: [],
      };

      setDays((prevDays) => {
        const dateExists = prevDays.find((day) => day.date.toDateString() === modalDate.toDateString());

        if (dateExists) {
          return prevDays.map((day) => 
            day.date.toDateString() === modalDate.toDateString()
              ? { ...day, workouts: [...day.workouts, newWorkout] }
              : day
          );
        } else {
          return [...prevDays, { date: modalDate, workouts: [newWorkout] }];
        }
      });

      setIsModalOpen(false);
    }
  };

  const startOfWeek = getStartOfWeek(new Date());
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startOfWeek, i));
  const dayShortNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <div className="calendar">
        {weekDays.map((date, index) => {
          const dayData = days.find((day) => day.date.toDateString() === date.toDateString());
          const dayName = dayShortNames[date.getDay() - 1];
          return (
            <div key={index} className={`day ${isToday(date) ? 'active' : ''}`}>
              <h3>
                {dayName} ({date.getDate()}) <button onClick={() => handleAddWorkout(date)}>+</button>
              </h3>
              <p>{date.toLocaleDateString('vi-VN')}</p>
              {dayData && <Day day={dayData} />}
            </div>
          );
        })}
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        placeholder="Enter workout name"
      />
    </DndContext>
  );
};

export default Calendar;
