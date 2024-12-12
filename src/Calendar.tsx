import React, { useState } from 'react';
import { DndContext, closestCenter, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { initialData } from './data/initialData';
import { Day } from './data/types';
import DayComponent from './components/Day';
import Modal from './components/Modal';
import { getStartOfWeek, addDays, isToday } from './utils/dateUtils';
import './styles.css';

const Calendar: React.FC = () => {
  const [days, setDays] = useState<Day[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPlaceholder, setModalPlaceholder] = useState('');
  const [modalDate, setModalDate] = useState<Date | null>(null);
  const [modalWorkoutId, setModalWorkoutId] = useState<string | null>(null);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 }, // Kích hoạt khi kéo 10px
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
    console.log('datedate', date)
    setModalPlaceholder('Enter workout name');
    setModalDate(date);
    setModalWorkoutId(null);
    setIsModalOpen(true);
  };

  const handleAddExercise = (workoutId: string, exerciseName: string) => {
    const newExercise = {
      id: `exercise-${new Date().getTime()}`,
      name: exerciseName,
      sets: [],
    };

    const newDays = days.map((day) => {
      const newWorkouts = day.workouts.map((workout) => {
        if (workout.id === workoutId) {
          return {
            ...workout,
            exercises: [...workout.exercises, newExercise],
          };
        }
        return workout;
      });
      return { ...day, workouts: newWorkouts };
    });

    setDays(newDays);
  };

  const handleModalSubmit = (value: string) => {
    if (modalDate) {
      const newWorkout = {
        id: `workout-${new Date().getTime()}`,
        name: value,
        exercises: [],
      };

      let updated = false;
      const newDays = days.map((day) => {
        if (day.date.toDateString() === modalDate.toDateString()) {
          updated = true;
          return {
            ...day,
            workouts: [...day.workouts, newWorkout],
          };
        }
        return day;
      });

      if (!updated) {
        newDays.push({ date: modalDate, workouts: [newWorkout] });
      }

      setDays(newDays);
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
              {dayData ? (
                <SortableContext items={dayData.workouts} strategy={verticalListSortingStrategy}>
                  <DayComponent key={dayData.date.toDateString()} day={dayData} onAddExercise={handleAddExercise} />
                </SortableContext>
              ) : (
                <p>Không có bài tập</p>
              )}
            </div>
          );
        })}
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        placeholder={modalPlaceholder}
      />
    </DndContext>
  );
};

export default Calendar;
