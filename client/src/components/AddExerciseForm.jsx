import React from "react"
import { useLocation } from "react-router-dom"

function AddExerciseForm() {
  const location = useLocation()
  const workout = location.state.workout
  const workout_id = workout.id
  return (
    <div>
  
    </div>
  )
}

export default AddExerciseForm