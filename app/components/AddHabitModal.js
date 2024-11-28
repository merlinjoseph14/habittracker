import { useState } from "react";

function AddHabitModal({ addHabit }) {
    const [habitName, setHabitName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (habitName.trim()) {
            addHabit(habitName);
            setHabitName('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-4 items-center justify-center mb-6">
            <input
                type="text"
                placeholder="Enter habit name"
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-black placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-800 max-w-md w-full"
            />
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
                Add Habit
            </button>
        </form>
    );
} export default AddHabitModal;