import React from "react"
import {useState} from "react"
import {useLocation} from "react-router-dom"

function MoodForm() {
  const location = useLocation()
  const mood = location.state.mood

  const [editedMood, setEditedMood] = useState({id: mood.id, date: mood.date, mood: mood.mood, rating: mood.rating, notes: mood.notes})

  if (mood.notes === null) {
    mood['notes'] = ""
  }

  const today = new Date().toISOString().split("T")[0]

  return (
    <div>
      <h3>Edit your Mood</h3>
      <form>
        <div>
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" max={today} value={editedMood.date}/>
        </div>
        <div>
          <label htmlFor="mood">Mood:</label>
          <select id="mood" name="mood" value={editedMood.mood} >
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="angry">Angry</option>
            <option value="anxious">Anxious</option>
            <option value="calm">Calm</option>
            <option value="excited">Excited</option>
            <option value="tired">Tired</option>
          </select>
        </div>
        <div>
          <label htmlFor="rating">Rating:</label>
          <input type="range"  min="1" max="10" id="rating" name="rating" value={editedMood.rating}/>
          <p>value: {editedMood.rating}</p>
        </div>
        <div>
          <label htmlFor="notes">Notes:</label>
          <input type="text" id="notes" name="notes" value={editedMood.notes} />
        </div>
        <div>
          <button type="submit" value="Submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default MoodForm
