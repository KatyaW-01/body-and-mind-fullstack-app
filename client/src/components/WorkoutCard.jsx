import React from "react"
import { deleteWorkout } from "../api/workouts"
import { useNavigate } from "react-router-dom"

function WorkoutCard({workout, setWorkouts}) {

  const navigate = useNavigate()

  async function handleDelete() {
    const result = await deleteWorkout(workout.id)
    if (!result.error) {
      alert("Workout successfully deleted")
      setWorkouts(prev => prev.filter(w => w.id !== workout.id))
    } else {
      alert("Error deleting workout")
    }
  }

  function handleEdit() {
    navigate("/workouts/workoutForm", {state: {workout}})
  }
  
  return (
    <div className="workout-card">
      <h3>{workout.date}</h3>
      <p>Type: {workout.type}</p>
      <p>Duration: {workout.duration}</p>
      <p>Intensity: {workout.intensity}/10</p>
      {workout.notes === null ? "" : <p>Notes: {workout.notes}</p>}
      {workout.exercises.length > 0 && (
        <div>
          <h4>Exercises:</h4>
          <ul>
            {workout.exercises.map((exercise) => {
              let details = []
              if (exercise.reps) details.push(`${exercise.reps} reps`)
              if (exercise.sets) details.push(`${exercise.sets} sets`)
              let repsSets = details.join(" x ");
              return (
              <li key={exercise.id}>
                {exercise.name}
                {repsSets && ` - ${repsSets}`}
                {exercise.weight && ` @ ${exercise.weight} lbs`}
              </li>
              )
            })}
          </ul>
        </div>
      )}
      <div className="workout-buttons">
        <button onClick={handleEdit} >Edit</button>
        <button onClick={handleDelete}>X Delete</button>
      </div>
    </div>
  )
}

export default WorkoutCard