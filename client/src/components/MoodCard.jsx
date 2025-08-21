import React from "react"
import { useNavigate } from "react-router-dom"

function MoodCard({mood, setMoods}) {
  const navigate = useNavigate()

  function handleEdit() {
    navigate("/moods/moodForm", {state: {mood}})
  }

  return (
    <div>
      <h3>{mood.date}</h3>
      <p>Mood: {mood.mood}</p>
      <p>Rating: {mood.rating}/10</p>
      {mood.notes ? <p>Notes: {mood.notes}</p> : ""}
      <div>
        <button onClick={handleEdit}>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  )
}

export default MoodCard