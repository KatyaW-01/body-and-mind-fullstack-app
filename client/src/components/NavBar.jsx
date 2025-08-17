import React from "react"
import {NavLink} from "react-router-dom"
import './NavBar.css'

function NavBar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
      <NavLink to="/workouts" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Workout Tracker</NavLink>
      <NavLink to="/moods" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Mood Tracker</NavLink>
      <NavLink to="/analytics" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Analytics</NavLink>
    </nav>
  )
}

export default NavBar