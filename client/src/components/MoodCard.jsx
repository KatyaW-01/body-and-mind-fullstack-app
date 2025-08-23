import React from "react"
import { useNavigate } from "react-router-dom"
import { deleteMood } from "../api/moods"

function MoodCard({mood, setMoods}) {
  const navigate = useNavigate()

  function handleEdit() {
    navigate("/moods/moodForm", {state: {mood}})
  }

  async function handleDelete() {
    const result = await deleteMood(mood.id)
    if(!result.error) {
      alert("Mood successfully deleted")
      setMoods(prev => prev.filter(m => m.id !== mood.id))
    } else {
      alert("Error deleting mood")
    }
  }

  

  return (
    <div className={`mood-card ${mood.mood ? mood.mood.toLowerCase() : ""}`}>
      <h3>{mood.date}</h3>
      <p>Mood: {mood.mood}</p>
      <p>Rating: {mood.rating}/10</p>
      {mood.notes ? <p>Notes: {mood.notes}</p> : ""}
      <div className="mood-buttons">
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>X Delete</button>
      </div>
    </div>
  )
}

export default MoodCard