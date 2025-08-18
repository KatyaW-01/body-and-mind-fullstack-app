import React from "react"
import NavBar from "../components/NavBar"
import { fetchWorkouts } from "../api/workouts"
import {useEffect, useState} from "react"
import { Outlet } from "react-router-dom"

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  
  useEffect(() => {
    fetchWorkouts().then(data => setWorkouts(data))
  },[])

  return (
    <div>
      <NavBar />
      <div>
        <button>Log a Workout</button>
      </div>
      <h1>Workouts</h1>
      <Outlet context = {{workouts, setWorkouts}} />
    </div>
  )
}

export default Workouts