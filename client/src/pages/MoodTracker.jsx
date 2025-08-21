import React from "react"
import NavBar from "../components/NavBar"
import {useEffect, useState} from "react"
import { fetchMoods } from "../api/moods"
import {Outlet} from "react-router-dom"

function MoodTracker() {
  const [moods, setMoods] = useState([])

  useEffect(() => {
    fetchMoods().then(data => setMoods(data))
  },[])

  return (
    <div>
      <NavBar />
      <button>Log a Mood</button>
      <Outlet context = {{moods, setMoods}} />
    </div>
  )
}

export default MoodTracker