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
    };
    setHabits([...habits, newHabit]);
  };

  const toggleHabit = (id) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id 
          ? { 
            ...habit, 
            isComplete: !habit.isComplete, 
            completedAt: !habit.isComplete ? new Date().toLocaleString() : null,
          }
          : habit
      )
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
