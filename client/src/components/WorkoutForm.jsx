import React from "react"
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import {useState} from "react"
import { updateWorkout } from "../api/workouts"
import { fetchWorkouts } from "../api/workouts"

function WorkoutForm() {
  const location = useLocation()
  const workout = location.state.workout

  const [editedWorkout,setEditedWorkout] = useState({id: workout.id, date: workout.date, type: workout.type, duration: workout.duration, intensity: workout.intensity, notes: workout.notes})

  const [errors, setErrors] = useState({})

  const {setWorkouts} = useOutletContext()

  const navigate = useNavigate()

  async function handleSubmit(event) {
    //prevent page reload
    event.preventDefault()
    //make the PATCH request
    const result = await updateWorkout(workout.id, editedWorkout)

    if(result.error) {
      setErrors(result.error)
      alert("Error updating workout, please try again!")
      return 
    }
    //if successful, notify user, re-fetch the data from the backend to update state, navigate back to workouts page
    if (!result.error) {
      alert("Workout successfully updated")
      
      const updatedWorkouts = await fetchWorkouts()
      setWorkouts(updatedWorkouts)

      navigate("/workouts");
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
        {errors.date && <p className="error">{errors.date[0]}</p>}
        <label htmlFor="type">Type:</label>
        <input type="text" id="type" name="type" value={editedWorkout.type} onChange={handleChange}/>
        {errors.type && <p className="error">{errors.type[0]}</p>}
        <label htmlFor="duration">Duration:</label>
        <input type="text" id="duration" name="duration" value={editedWorkout.duration} onChange={handleChange}/>
        {errors.duration && <p className="error">{errors.duration[0]}</p>}
        <label htmlFor="intensity">Intensity:</label>
        <input type="text" id="intensity" name="intensity" value={editedWorkout.intensity} onChange={handleChange}/>
        {errors.intensity && <p className="error">{errors.intensity[0]}</p>}
        <label htmlFor="notes">Notes:</label>
        <input type="text" id="notes" name="notes" value={editedWorkout.notes} onChange={handleChange}/>
        {errors.notes && <p className="error">{errors.notes[0]}</p>}
        <button type="submit" value="Submit">Submit</button>
      </form>
    </div>
  )
}

export default WorkoutForm