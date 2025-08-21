import React from "react"

function MoodCard({mood, setMoods}) {
  return (
    <div>
      <h3>{mood.date}</h3>
      <p>Mood: {mood.mood}</p>
      <p>Rating: {mood.rating}/10</p>
      {mood.notes ? <p>Notes: {mood.notes}</p> : ""}
      <div>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  )
}

export default MoodCard