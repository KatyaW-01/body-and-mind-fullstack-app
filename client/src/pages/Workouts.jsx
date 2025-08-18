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

  console.log("workouts:", workouts)

  return (
    <div>
      <NavBar />
      <p>View, add, edit, delete workouts here</p>
      <Outlet context = {{workouts}} />
    </div>
  )
}

export default Workouts