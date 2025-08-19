import React from "react"
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import {useState} from "react"
import { updateWorkout } from "../api/workouts"
import { fetchWorkouts } from "../api/workouts"

function WorkoutForm() {
  const location = useLocation()
  const workout = location.state.workout
  
  const [editedWorkout,setEditedWorkout] = useState({id: workout.id, date: workout.date, type: workout.type, duration: workout.duration, intensity: workout.intensity, notes: workout.notes})

  const {setWorkouts} = useOutletContext()

  const navigate = useNavigate()

  async function handleSubmit(event) {
    //prevent page reload
    event.preventDefault()
    //make the PATCH request
    const result = await updateWorkout(workout.id, editedWorkout)
    //if successful, notify user, re-fetch the data from the backend to update state, navigate back to workouts page
    if (!result.error) {
      alert("Workout successfully updated")
      
      const updatedWorkouts = await fetchWorkouts()
      setWorkouts(updatedWorkouts)

      navigate("/workouts");
    } 

    if(result.error) {

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