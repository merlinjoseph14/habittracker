import { useState } from 'react';

export default function HabitCard({ habit, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(habit.name);

  const handleSave = () => {
    if (editedName.trim()) {
      onUpdate(habit.id, editedName);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 rounded-md shadow border">
      <div className="flex items-center gap-2 w-full">
        <input
          type="checkbox"
          checked={habit.isComplete}
          onChange={() => onToggle(habit.id)}
          className="w-6 h-6 border-gray-400"
        />
        {isEditing ? (
          <div className="flex gap-2 w-full">
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              className="p-2 border border-gray-300 rounded bg-white text-black w-full focus:outline-none focus:ring focus:ring-blue-200"
            />
            <button
              onClick={handleSave}
              className="text-blue-500 hover:text-blue-600 font-bold"
            >
              Save
            </button>
          </div>
        ) : (
          <span
            className={`text-lg flex-grow ${
              habit.isComplete
                ? 'line-through text-gray-500'
                : 'text-black'
            }`}
          >
            {habit.name}
          </span>
        )}
      </div>
      <button
        onClick={() => setIsEditing(true)}
        className={`text-gray-500 hover:text-gray-600 font-bold ${
          isEditing ? 'hidden' : ''
        }`}
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(habit.id)}
        className="text-red-500 hover:text-red-600 font-bold ml-4"
      >
        Delete
      </button>
    </div>
  );
}