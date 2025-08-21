import React from "react"
import { useLocation } from "react-router-dom"
import { createWorkoutExercise } from "../api/workoutExercises"

function AddExerciseForm() {
  const location = useLocation()
  const workout = location.state.workout
  const workout_id = workout.id

  function handleSubmit() {

  }

  function handleChange() {

  }
  
  return (
    <div>
      <h2>Add an exercise to your {workout.type.toLowerCase()} workout from {workout.date} </h2>
      <form>
        <div>
          <label htmlFor="name" >Name:</label>
          <input type="text" id="name" name="name" />
        </div>
        <div>
          <label htmlFor="sets" >Sets (optional):</label>
          <input type="number" id="sets" name="sets" />
        </div>
        <div>
          <label htmlFor="reps" >Reps (optional):</label>
          <input type="number" id="reps" name="reps" />
        </div>
        <div>
          <label htmlFor="weight" >Weight (optional):</label>
          <input type="number" id="weight" name="weight" />
        </div>
        <div>
           <button type="submit" value="Submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default AddExerciseForm