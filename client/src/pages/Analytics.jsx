import React from "react"
import NavBar from "../components/NavBar"
import {useEffect, useState} from "react"
import { fetchWorkouts } from "../api/workouts"
import { fetchMoods } from "../api/moods"
import sortArray from "sort-array";
import {ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from "recharts"

function Analytics() {
  const [workouts, setWorkouts] = useState([])
  const [moods, setMoods] = useState([])
    
  useEffect(() => {
    fetchWorkouts().then(data => setWorkouts(data))
  },[])

  useEffect(() => {
      fetchMoods().then(data => setMoods(data))
  },[])

  //make sure dates are in chronological order
  const sortedMoods = sortArray(moods, {by: "date"})
  const sortedWorkouts = sortArray(workouts, {by: "date"})

  //create object where key is date and value is workout intensity
  const workoutByDate = {}
  sortedWorkouts.forEach(workout => {
    workoutByDate[workout.date] = workout.intensity
  })

  const data = sortedMoods.map((mood) => {
    return {
      date: mood.date, 
      moodRating: mood.rating, 
      mood: mood.mood, 
      //if workoutByDate has a value for the date otherwise null
      workoutIntensity: workoutByDate[mood.date] ?? null
    }
  })

  return(
    <div>
      <NavBar />
    </div>
  )
}

export default Analytics