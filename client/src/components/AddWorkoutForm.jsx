import React from "react"
import {useState} from "react"

function AddWorkoutForm() {
  const [newWorkout, setNewWorkout] = useState({date: "", type: "", duration: "", intensity: 1, notes: ""})
  // new Date() is formated as Mon Aug 19 2025 14:35:00 GMT-0600 (Central Standard Time)
  // need to transform it to "2025-08-19"
  const today = new Date().toISOString().split("T")[0];

  function handleSubmit(event) {
    event.preventDefault()
    //if notes is an empty string change it to null
    const workout = {
      ...newWorkout, notes: newWorkout.notes === "" ? null : newWorkout.notes
    }
  }

  function handleChange(event) {
    const {name, value} = event.target

    //change duration and intensity to integers otherwise keep as a string
    setNewWorkout(prev => ({
      ...prev, [name]: name === "intensity" || name === "duration" ? value === "" ? "" : Number(value) : value
    }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" name="date" max={today} value={newWorkout.date} onChange={handleChange}/>
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
      </div>

      <div>
      <label htmlFor="duration">Duration (minutes):</label>
      <input type="number" id="duration" name="duration" value ={newWorkout.duration} onChange={handleChange}/>
      </div>

      <div>
      <label htmlFor="intensity">Intensity:</label>
      <input type="range" min="1" max="10" id="intensity" name="intensity" value={newWorkout.intensity} onChange={handleChange}/>
      <p>value: {newWorkout.intensity}</p>
      </div>

      <div>
        <label htmlFor="notes">Notes (optional):</label>
        <input type="text" id="notes" name="notes" value ={newWorkout.notes} onChange={handleChange}/>
      </div>

      <div>
        <button type="submit" value="Submit">Submit</button>
      </div>

    </form>
  )
}

export default AddWorkoutForm