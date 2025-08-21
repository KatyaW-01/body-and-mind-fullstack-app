import React from "react"
import {useLocation} from "react-router-dom"

function MoodForm() {
  const location = useLocation()
  const mood = location.state.mood

  if (mood.notes === null) {
    mood['notes'] = ""
  }

  return (
    <div>

    </div>
  )
}

export default MoodForm
