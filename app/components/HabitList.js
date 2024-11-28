import HabitCard from "./HabitCard";

function HabitList({ habits, toggleHabit, deleteHabit, updateHabit }) {
    if (habits.length === 0) {
        return <p className="text-center">No habits yet. Add one to get started!</p>;
    }
    return (
        <div className="space-y-4">
            {habits.map((habit) => (
                <HabitCard 
                    key={habit.id} 
                    habit={habit} 
                    onToggle={toggleHabit}
                    onDelete={deleteHabit} 
                    onUpdate={updateHabit}
                    />
            ))}
        </div>
    );
} export default HabitList;