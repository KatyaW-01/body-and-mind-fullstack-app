import React from "react"
import NavBar from "../components/NavBar"
import {useEffect, useState} from "react"
import { fetchMoods } from "../api/moods"
import {Outlet, useLocation, useNavigate} from "react-router-dom"

function MoodTracker() {
  const [moods, setMoods] = useState([])

  useEffect(() => {
    fetchMoods().then(data => setMoods(data))
  },[])

  const location = useLocation()
  const navigate = useNavigate()

  function handleLog() {
    navigate("/moods/addMood")
  }

  return (
    <div>
      <NavBar />
      <h1 className="mood-headers">
        {location.pathname === "/moods"
          ? "Moods"
          : location.pathname === "/moods/moodForm"
          ? "Edit your Mood"
          : location.pathname === "/moods/addMood"
          ? "Add a New Mood"
          : ""
        }
      </h1>
      {location.pathname === "/moods" ?
        <div className="add-mood-container"> 
          <button onClick={handleLog} className="add-mood-button">Log a Mood</button> 
        </div> : ""
      }
      <Outlet context = {{moods, setMoods}} />
    </div>
  )
}

export default MoodTracker