import React from "react"
import {useState} from "react"

function AddWorkoutForm() {
  // new Date() is formated as Mon Aug 19 2025 14:35:00 GMT-0600 (Central Standard Time)
  // need to transform it to "2025-08-19"
  const today = new Date().toISOString().split("T")[0];
  return (
    <form>
      <div>
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" name="date" max={today}/>
      </div>

      <div>
      <label htmlFor="type">Type:</label>
      <select name="type" id="type" defaultValue="">
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
      <input type="text" id="duration" name="duration" />
      </div>

      <div>
      <label htmlFor="intensity">Intensity:</label>
      <input type="range" min="1" max="10"/>
      </div>

      <div>
        <label htmlFor="notes">Notes:</label>
        <input type="text" id="notes" name="notes" />
      </div>

      <div>
        <button type="submit" value="Submit">Submit</button>
      </div>

    </form>
  )
}

export default AddWorkoutForm