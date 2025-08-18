import React from "react"
import { deleteWorkout } from "../api/workouts"

function WorkoutCard({workout}) {

  function handleDelete() {
    deleteWorkout(workout.id)
    const result = deleteWorkout(workout.id)
    if (!result.error) {
      alert("Workout successfully deleted")
    }
  }
  

  return (
    <div>
      <h3>{workout.date}</h3>
      <p>Type: {workout.type}</p>
      <p>Duration: {workout.duration}</p>
      <p>Intensity: {workout.intensity}/10</p>
      <p>Notes: {workout.notes}</p>
      {workout.exercises.length > 0 && (
        <div>
          <h4>Exercises:</h4>
          <ul>
            {workout.exercises.map((exercise) => (
              <li key={exercise.id}>
                {exercise.name} - {exercise.reps} reps x {exercise.sets} sets @ {exercise.weight} lbs
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <button>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}

export default WorkoutCard