'use client';

import Navbar from "./components/Navbar";
import { useState } from "react";
import AddHabitModal from "./components/AddHabitModal";
import HabitList from "./components/HabitList";

function Home() {
  const [habits, setHabits] = useState([]);
  
  const addHabit = (name) => {
    const newHabit = {
      id: Date.now(),
      name,
      isComplete: false,
      createdAt: new Date().toLocaleString(),
      completedAt: null,
      streak: 0,
      lastCompletedAt: null,
    };
    setHabits([...habits, newHabit]);
  };

  const toggleHabit = (id) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id === id) {
          const isComplete = !habit.isComplete;
          let newStreak = habit.streak;
          let lastCompletedAt = habit.lastCompletedAt;
  
          if (isComplete) {
            const today = new Date();
            const yesterday = new Date();
            yesterday.setDate(today.getDate() - 1);
  
            const lastDate = new Date(habit.lastCompletedAt);
  
            if (
              lastCompletedAt &&
              lastDate.toDateString() === yesterday.toDateString()
            ) {
              newStreak += 1; // Increment streak
            } else if (
              !lastCompletedAt ||
              lastDate.toDateString() !== today.toDateString()
            ) {
              newStreak = 1; // Reset streak to 1
            }
  
            lastCompletedAt = today.toISOString();
          } else {
            newStreak = 0; // Reset streak on uncheck
            lastCompletedAt = null;
          }
  
          return {
            ...habit,
            isComplete,
            streak: newStreak,
            lastCompletedAt,
          };
        }
        return habit;
      })
    );
  };
  

  const deleteHabit = (id) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  const updateHabit = (id, name) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id
          ? { ...habit, name }
          : habit
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-800 p-4">
      <h1 className="text-2xl font-bold mb-4">Habit Tracker</h1>
      <AddHabitModal addHabit={addHabit} />
      <HabitList 
        habits={habits} 
        toggleHabit={toggleHabit}
        deleteHabit={deleteHabit} 
        updateHabit={updateHabit}
        />
    </div>
  );
   
        
}export default Home;
