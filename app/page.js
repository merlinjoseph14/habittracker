'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation'; // For navigation
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Firebase auth state listener
import { auth } from './_utils/firebase';
import Link from 'next/link';

export default function DailyTrackerPage() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState(''); // State for the new habit input
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/landingpage'); // Redirect to login page if user is not logged in
      }
    });
    
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    const savedHabits = JSON.parse(localStorage.getItem('habits')) || [];
    setHabits(savedHabits);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase signOut function
      console.log("User signed out successfully");
      router.push('/landingpage'); // Redirect to login page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Function to calculate streak for a habit
  const calculateStreak = (habit) => {
    let streak = 0;

    // Check for consecutive completion from the last day
    for (let i = habit.completion.length - 1; i >= 0; i--) {
      if (habit.completion[i]) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  // Toggle habit completion
  const toggleCompletion = (habitId) => {
    const updatedHabits = habits.map((habit) => {
      if (habit.id === habitId) {
        const updatedCompletion = [
          ...habit.completion,
          !habit.completed, // Toggle completion status for the new day
        ];
        return { ...habit, completed: !habit.completed, completion: updatedCompletion };
      }
      return habit;
    });

    setHabits(updatedHabits);
    localStorage.setItem('habits', JSON.stringify(updatedHabits));
  };

  // Add a new habit
  const addHabit = () => {
    if (newHabit.trim() === '') return; // Don't add empty habits
    const newHabitObj = {
      id: Date.now(), // Unique id using timestamp
      name: newHabit,
      completed: false,
      completion: [] // Empty array for completion status
    };

    const updatedHabits = [...habits, newHabitObj];
    setHabits(updatedHabits);
    setNewHabit(''); // Clear the input field after adding the habit
    localStorage.setItem('habits', JSON.stringify(updatedHabits));
  };

  // Delete a habit
  const deleteHabit = (habitId) => {
    const updatedHabits = habits.filter((habit) => habit.id !== habitId);
    setHabits(updatedHabits);
    localStorage.setItem('habits', JSON.stringify(updatedHabits));
  };

  return (
    <div className="min-h-screen bg-gray-800 p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-white">Daily Tracker</h1>
        <div className="flex space-x-4">
          <Link href="/monthly-tracker" className="text-blue-500 hover:underline">
            Monthly Tracker
          </Link>
          <button
            onClick={handleLogout}
            className="text-red-500 hover:underline"
          >
            Logout
          </button>
        </div>
      </div>

      {/* New Habit Input */}
      <div className="mb-4 flex items-center space-x-2">
        <input
          type="text"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)} // Update state on input change
          className="p-2 bg-gray-700 text-white rounded"
          placeholder="Add a new habit"
        />
        <button
          onClick={addHabit}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Add Habit
        </button>
      </div>

      {/* Habit List */}
      <div className="space-y-4">
        {habits.map((habit) => (
          <div key={habit.id} className="flex justify-between items-center bg-gray-700 p-4 rounded">
            <span className="text-white">{habit.name}</span>
            <div className="flex items-center space-x-4">
              {/* Completion Button */}
              <button
                onClick={() => toggleCompletion(habit.id)}
                className={`p-2 text-white rounded ${habit.completed ? 'bg-green-500' : 'bg-gray-600'}`}
              >
                {habit.completed ? (
                  <span className="text-xl">&#10003;</span> // Checkmark
                ) : (
                  <span className="text-xl">&#x2714;</span> // Empty box
                )}
              </button>

              {/* Display Streak */}
              <span className="text-white">{calculateStreak(habit)} Day Streak</span>

              {/* Delete Button */}
              <button
                onClick={() => deleteHabit(habit.id)}
                className="p-2 bg-red-500 text-white rounded hover:bg-red-700"
              >
                <span className="text-xl">×</span> {/* 'X' icon */}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
