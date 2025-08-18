import React from "react"
import { useLocation } from "react-router-dom";

function WorkoutForm() {
  const location = useLocation()
  const workout = location.state.workout
  return (
    <div>
      <form>
        <label htmlFor="date">Date:</label>
        <input type="text" id="date" name="date" defaultValue={workout.date}/>
        <label htmlFor="type">Type:</label>
        <input type="text" id="type" name="type" defaultValue={workout.type}/>
        <label htmlFor="duration">Duration:</label>
        <input type="text" id="duration" name="duration" defaultValue={workout.duration}/>
        <label htmlFor="intensity">Intensity:</label>
        <input type="text" id="intensity" name="intensity" defaultValue={workout.intensity}/>
        <label htmlFor="notes">Notes:</label>
        <input type="text" id="notes" name="notes" defaultValue={workout.notes}/>
      </form>
    </div>
  )
}

export default WorkoutForm