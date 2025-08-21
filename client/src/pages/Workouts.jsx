import React from "react"
import NavBar from "../components/NavBar"
import { fetchWorkouts } from "../api/workouts"
import {useEffect, useState} from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  
  useEffect(() => {
    fetchWorkouts().then(data => setWorkouts(data))
  },[])
  
  const location = useLocation()
  const navigate = useNavigate()

  function handleLog() {
    navigate("/workouts/addWorkoutForm")
  }

  return (
    <div>
      <NavBar />
      <h1>
        {location.pathname === "/workouts"
          ? "Workouts"
          : location.pathname === "/workouts/workoutForm"
          ? "Edit your Workout"
          : location.pathname === "/workouts/addWorkoutForm"
          ? "Add a New Workout"
          : ""
        }
      </h1>
       {location.pathname === "/workouts" ?
        <button onClick={handleLog}>Log a Workout</button> : ""
      }
      <Outlet context = {{workouts, setWorkouts}} />
    </div>
  )
}

export default Workouts