import React from "react"
import { useLocation, useNavigate } from "react-router-dom";
import {useState} from "react"
import { updateWorkout } from "../api/workouts"

function WorkoutForm() {
  const location = useLocation()
  const workout = location.state.workout
  const [editedWorkout,setEditedWorkout] = useState({date: workout.date, type: workout.type, duration: workout.duration, intensity: workout.intensity, notes: workout.notes})

  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    const result = updateWorkout(workout.id, editedWorkout)
    if (!result.error) {
      alert("Workout successfully updated")
      navigate("/workouts", { state: { editedWorkout } });
    }
  }

  

  function handleChange(event) {
    const {name, value} = event.target

    setEditedWorkout(prevWorkout => ({
      ...prevWorkout, [name]:value
    }));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Date:</label>
        <input type="text" id="date" name="date" value={editedWorkout.date} onChange={handleChange}/>
        <label htmlFor="type">Type:</label>
        <input type="text" id="type" name="type" value={editedWorkout.type} onChange={handleChange}/>
        <label htmlFor="duration">Duration:</label>
        <input type="text" id="duration" name="duration" value={editedWorkout.duration} onChange={handleChange}/>
        <label htmlFor="intensity">Intensity:</label>
        <input type="text" id="intensity" name="intensity" value={editedWorkout.intensity} onChange={handleChange}/>
        <label htmlFor="notes">Notes:</label>
        <input type="text" id="notes" name="notes" value={editedWorkout.notes} onChange={handleChange}/>
        <button type="submit" value="Submit">Submit</button>
      </form>
    </div>
  )
}

export default WorkoutForm