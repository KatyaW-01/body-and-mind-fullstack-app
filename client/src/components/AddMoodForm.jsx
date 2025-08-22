import React from "react"
import {useState} from "react"
import {useOutletContext, useNavigate} from "react-router-dom"
import {createMood, fetchMoods} from "../api/moods"

function AddMoodForm() {
  const {setMoods} = useOutletContext()

  const [newMood, setNewMood] = useState({date: "", mood: "", rating: 1, notes: ""})
  const [errors, setErrors] = useState({})

  const navigate = useNavigate()

  const today = new Date().toLocaleDateString("en-CA")

  async function handleSubmit(event) {
    event.preventDefault()

    const mood = {
      ...newMood,
      notes: newMood.notes === "" ? null : newMood.notes,
      date: newMood.date == "" ? today : newMood.date
    }

    const result = await createMood(mood)

    if(result.error) {
      setErrors(result.error)
      alert("Error adding mood. Please try again!")
      return 
    } else {
      alert("Mood successfully logged!")

      const updatedMoods = await fetchMoods()
      setMoods(updatedMoods)

      setNewMood({date: "", mood: "", rating: 1, notes: ""})
      setErrors({})
    }
  }

  function handleChange(event) {
    const {name, value} = event.target

    setNewMood(prev => ({
      ...prev, [name]: name === "rating" ? value === "" ? "" : Number(value) :value
    }))
  }

  function handleFinish() {
    navigate("/moods");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" max={today} value={newMood.date} onChange={handleChange}/>
          {errors.date && <p className="error">{errors.date[0]}</p>}
        </div>
        <div>
          <label htmlFor="mood">Mood:</label>
          <select id="mood" name="mood" value={newMood.mood} onChange={handleChange}>
            <option value="" disabled>Select Mood</option>
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
          <input type="range"  min="1" max="10" id="rating" name="rating" value={newMood.rating} onChange={handleChange} />
          <p>value: {newMood.rating}</p>
          {errors.rating && <p className="error">{errors.rating[0]}</p>}
        </div>
        <div>
          <label htmlFor="notes">Notes:</label>
          <input type="text" id="notes" name="notes" value={newMood.notes} onChange={handleChange}/>
          {errors.notes && <p className="error">{errors.notes[0]}</p>}
        </div>
        <div>
          <button type="submit" value="Submit">Submit</button>
        </div>
      </form>
      <div>
        <button onClick={handleFinish}>Back to Moods</button>
      </div>
    </div>
  )
}

export default AddMoodForm