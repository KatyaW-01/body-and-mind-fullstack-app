import React from "react"
import {useState} from "react"
import {useLocation, useOutletContext, useNavigate} from "react-router-dom"
import { updateMood, fetchMoods } from "../api/moods"

function MoodForm() {
  const location = useLocation()
  const mood = location.state.mood
  
  const [editedMood, setEditedMood] = useState({id: mood.id, date: mood.date, mood: mood.mood, rating: mood.rating, notes: mood.notes})

  const [errors, setErrors] = useState({})

  const {setMoods} = useOutletContext()

  const navigate = useNavigate()

  if (mood.notes === null) {
    mood['notes'] = ""
  }

  const today = new Date().toLocaleDateString("en-CA")
  
  async function handleSubmit(event) {
    event.preventDefault()
    //if notes is empty make it null
    const newMood = {
      ...editedMood,
      notes: editedMood.notes === "" ? null : editedMood.notes
    }
    //remove id before making the patch request
    const {id, ...updatedMood} = newMood
    //make PATCH request
    const result = await updateMood(id, updatedMood)

    if(result.error) {
      setErrors(result.error)
      alert("Error updating mood, please try again!")
      return
    }

    if(!result.error) {
      alert("Mood successfully updated")
      //update data in state
      const updatedMoodData = await fetchMoods()
      setMoods(updatedMoodData)
    }
  }

  function handleChange(event) {
    const {name, value} = event.target

    setEditedMood(prevMood => ({
      ...prevMood, [name]:value
    }))
  }

  function handleFinish() {
    navigate("/moods");
  }

  return (
    <div>
      <div className={`edit-mood-form-div ${mood.mood ? mood.mood.toLowerCase() : ""}`}>
        <form onSubmit={handleSubmit} className="edit-mood-form"> 
          <div>
            <label htmlFor="date">Date:</label>
            <input type="date" id="date" name="date" max={today} value={editedMood.date} onChange={handleChange} className="input"/>
            {errors.date && <p className="error">{errors.date[0]}</p>}
          </div>
          <div>
            <label htmlFor="mood">Mood:</label>
            <select id="mood" name="mood" value={editedMood.mood} onChange={handleChange} className="input">
              <option value="happy">Happy</option>
              <option value="sad">Sad</option>
              <option value="angry">Angry</option>
              <option value="anxious">Anxious</option>
              <option value="calm">Calm</option>
              <option value="excited">Excited</option>
              <option value="tired">Tired</option>
            </select>
            {errors.mood && <p className="error">{errors.mood[0]}</p>}
          </div>
          <div>
            <label htmlFor="rating">Rating:</label>
            <input type="range"  min="1" max="10" id="rating" name="rating" value={editedMood.rating} onChange={handleChange} />
            <p>value: {editedMood.rating}</p>
            {errors.rating && <p className="error">{errors.rating[0]}</p>}
          </div>
          <div>
            <label htmlFor="notes">Notes:</label>
            <textarea type="text" id="notes" name="notes" value={editedMood.notes} onChange={handleChange} className="input notes"/>
            {errors.notes && <p className="error">{errors.notes[0]}</p>}
          </div>
          <div>
            <button type="submit" value="Submit">Submit</button>
          </div>
        </form>
      </div>
      <div className="back-to-moods-button">
        <button onClick={handleFinish}>Back to Moods</button>
      </div>
    </div>
  )
}

export default MoodForm
