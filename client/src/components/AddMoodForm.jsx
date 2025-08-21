import React from "react"
import {useOutletContext, useNavigate} from "react-router-dom"
import {createMood} from "../api/moods"

function AddMoodForm() {
  const {setMoods} = useOutletContext()

  const today = new Date().toISOString().split("T")[0]

  return (
    <div>
      <form>
        <div>
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" max={today}  />
          {/* {errors.date && <p className="error">{errors.date[0]}</p>} */}
        </div>
        <div>
          <label htmlFor="mood">Mood:</label>
          <select id="mood" name="mood" >
            <option value="" disabled>Select Mood</option>
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="angry">Angry</option>
            <option value="anxious">Anxious</option>
            <option value="calm">Calm</option>
            <option value="excited">Excited</option>
            <option value="tired">Tired</option>
          </select>
          {/* {errors.mood && <p className="error">{errors.mood[0]}</p>} */}
        </div>
        <div>
          <label htmlFor="rating">Rating:</label>
          <input type="range"  min="1" max="10" id="rating" name="rating" />
          <p>value: {}</p>
          {/* {errors.rating && <p className="error">{errors.rating[0]}</p>} */}
        </div>
        <div>
          <label htmlFor="notes">Notes:</label>
          <input type="text" id="notes" name="notes" />
          {/* {errors.notes && <p className="error">{errors.notes[0]}</p>} */}
        </div>
        <div>
          <button type="submit" value="Submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default AddMoodForm