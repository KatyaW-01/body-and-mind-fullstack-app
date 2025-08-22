import React from "react"
import {useState} from "react"
import { createWorkout } from "../api/workouts"
import { fetchWorkouts } from "../api/workouts"
import {useOutletContext, useNavigate} from "react-router-dom"

function AddWorkoutForm() {
  const [newWorkout, setNewWorkout] = useState({date: "", type: "", duration: "", intensity: 1, notes: ""})
  const [errors, setErrors] = useState({})
  
  const {setWorkouts} = useOutletContext()

  const navigate = useNavigate()

  const today = new Date().toLocaleDateString("en-CA")

  async function handleSubmit(event) {
    event.preventDefault()
    //if notes is an empty string change it to null, if date is empty change to todays date
    const workout = {
      ...newWorkout, 
      notes: newWorkout.notes === "" ? null : newWorkout.notes, 
      date: newWorkout.date === "" ? today : newWorkout.date
    }
    
    //make POST request
    const result = await createWorkout(workout)

    if(result.error) {
      setErrors(result.error)
      alert("Error adding workout. Please try again!")
      return
    } else {
      alert("Workout successfully logged!")

      //update state from the backend, ensuring the new workout is displayed
      const updatedWorkouts = await fetchWorkouts()
      setWorkouts(updatedWorkouts)

      //clear form in case user wants add another workout
      setNewWorkout({date: "", type: "", duration: "", intensity: 1, notes: ""})
      setErrors({})
    }
  }

  function handleChange(event) {
    const {name, value} = event.target

    //change duration and intensity to integers otherwise keep as a string
    setNewWorkout(prev => ({
      ...prev, [name]: name === "intensity" || name === "duration" ? value === "" ? "" : Number(value) : value
    }))
  }

  function handleFinish() {
    navigate("/workouts");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" max={today} value={newWorkout.date} onChange={handleChange}/>
          {errors.date && <p className="error">{errors.date[0]}</p>}
        </div>

        <div>
        <label htmlFor="type">Type:</label>
        <select name="type" id="type" value={newWorkout.type} onChange={handleChange}>
          <option value="" disabled>Select Type</option>
          <option value="Running">Running</option>
          <option value="Cycling">Cycling</option>
          <option value="Strength Training">Strength Training</option>
          <option value="HIIT">HIIT</option>
          <option value="Swimming">Swimming</option>
          <option value="Walking">Walking</option>
          <option value="Yoga">Yoga</option>
          <option value="Hiking">Hiking</option>
          <option value="Climbing">Climbing</option>
          <option value="Other">Other</option>
        </select> 
        {errors.type && <p className="error">{errors.type[0]}</p>}
        </div>

        <div>
        <label htmlFor="duration">Duration (minutes):</label>
        <input type="number" id="duration" name="duration" value ={newWorkout.duration} onChange={handleChange}/>
        {errors.duration && <p className="error">{errors.duration[0]}</p>}
        </div>

        <div>
        <label htmlFor="intensity">Intensity:</label>
        <input type="range" min="1" max="10" id="intensity" name="intensity" value={newWorkout.intensity} onChange={handleChange}/>
        <p>value: {newWorkout.intensity}</p>
        {errors.intensity && <p className="error">{errors.intensity[0]}</p>}
        </div>

        <div>
          <label htmlFor="notes">Notes (optional):</label>
          <input type="text" id="notes" name="notes" value ={newWorkout.notes} onChange={handleChange}/>
          {errors.notes && <p className="error">{errors.notes[0]}</p>}
        </div>

        <div>
          <button type="submit" value="Submit">Submit</button>
        </div>

      </form>

      <div>
        <button onClick={handleFinish}>Back to Workouts</button>
      </div>
    </div>
  )
}

export default AddWorkoutForm