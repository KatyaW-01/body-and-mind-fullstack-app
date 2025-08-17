import React from "react"
import {Link} from "react-router-dom"

function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/workouts">Workout Tracker</Link>
      <Link to="/moods">Mood Tracker</Link>
      <Link to="/analytics">Analytics</Link>
    </nav>
  )
}

export default NavBar