import React from "react"
import NavBar from "../components/NavBar"
import { fetchWorkouts } from "../api/workouts"
import {useEffect, useState} from "react"
import { Outlet } from "react-router-dom"
import { useLocation } from "react-router-dom";

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  
  useEffect(() => {
    fetchWorkouts().then(data => setWorkouts(data))
  },[])
  
  const location = useLocation()

  return (
    <div>
      <NavBar />
      <h1>
        {location.pathname === "/workouts"
          ? "Workouts"
          : "Edit your Workout"
        }
      </h1>
       {location.pathname === "/workouts" ?
        <button>Log a Workout</button> : ""
      }
      <Outlet context = {{workouts, setWorkouts}} />
    </div>
  )
}

export default Workouts