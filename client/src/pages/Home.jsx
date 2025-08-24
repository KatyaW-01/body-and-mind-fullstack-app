import React from "react"
import NavBar from "../components/NavBar"
import {useEffect, useState} from "react"
import { fetchWorkouts } from "../api/workouts"
import { fetchMoods } from "../api/moods"
import { useNavigate } from "react-router-dom"

function Home() {
  const [workouts, setWorkouts] = useState([])
  const [moods, setMoods] = useState([])

  const navigate = useNavigate()
      
  useEffect(() => {
    fetchWorkouts().then(data => setWorkouts(data))
  },[])
  
  useEffect(() => {
      fetchMoods().then(data => setMoods(data))
  },[])

  function handleWorkout() {
    navigate("/workouts/addWorkoutForm")
  }

  function handleMood() {
    navigate("/moods/addMood")
  }

  function handleData() {
    navigate("/analytics")
  }

  return (
    <div className="home">
      <NavBar />
      <h1>Mind and Body</h1>
      <p>The one place to track all your workouts and moods</p>
      <div className="home-workouts-and-moods">
        <div className="home-workouts">
          <h2>Workouts Logged</h2>
          <h3>{workouts.length}</h3>
          <button onClick={handleWorkout}>+</button>
        </div>
        <div className="home-moods">
          <h2>Moods Logged</h2>
          <h3>{moods.length}</h3>
          <button onClick={handleMood}>+</button>
        </div>
      </div>
      <div className="viewData-button">
        <button onClick={handleData}>View Data</button>
      </div>
    </div>
  )
}

export default Home