'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Import Link

export default function MonthlyTrackerPage() {
  const [habits, setHabits] = useState([]);
  const [days, setDays] = useState([]);

  useEffect(() => {
    const savedHabits = JSON.parse(localStorage.getItem('habits')) || [];
    setHabits(savedHabits);

    const today = new Date();
    const totalDays = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);
    setDays(daysArray);
  }, []);

  const toggleCompletion = (habitId, day) => {
    const updatedHabits = habits.map((habit) => {
      if (habit.id === habitId) {
        const updatedCompletion = {
          ...habit.completion,
          [day]: !habit.completion?.[day],
        };
        return { ...habit, completion: updatedCompletion };
      }
      return habit;
    });

    setHabits(updatedHabits);
    localStorage.setItem('habits', JSON.stringify(updatedHabits));
  };

  return (
    <div className="min-h-screen bg-gray-800 p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-white">
          Monthly Tracker: {new Date().toLocaleString('default', { month: 'long' })}{' '}
          {new Date().getFullYear()}
        </h1>
        <div className="flex space-x-4">
          <Link href="/" className="text-blue-500 hover:underline">
            Daily Tracker
          </Link>
        </div>
      </div>

      <table className="table-auto border-collapse border border-gray-700 w-full text-white">
        <thead>
          <tr>
            <th className="border border-gray-600 p-2">Habit</th>
            {days.map((day) => (
              <th key={day} className="border border-gray-600 p-2">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {habits.map((habit) => (
            <tr key={habit.id}>
              <td className="border border-gray-600 p-2">{habit.name}</td>
              {days.map((day) => (
                <td
                  key={day}
                  className={`border border-gray-600 p-2 cursor-pointer ${
                    habit.completion?.[day] ? 'bg-green-500' : 'bg-gray-700'
                  }`}
                  onClick={() => toggleCompletion(habit.id, day)}
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
