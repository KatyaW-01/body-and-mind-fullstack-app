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

  const moodColors = {
    happy: "#FFD700",
    calm: "#32CD32",
    excited: "#FF69B4",
    sad: "#1E90FF",
    angry: "#FF4500",
    anxious: "#800080",
    tired: "#A9A9A9",
  };

  //cx is x coordinate, cy is y coordinate, payload is the whole object from the data at that point
  //if you wanted value from props it would be moodRating 
  //r is radius
  const CustomDot = (props) => {
    const {cx, cy, payload} = props
    if (!payload.mood) return null
    const color = moodColors[payload.mood] || "black"
    return <circle cx={cx} cy={cy} r={6} fill={color} stroke="none" />
  }

  return(
    <div>
      <NavBar />
      <h1>View your Data</h1>
      <ComposedChart width={1000} height={700} data={data}>
        <CartesianGrid />
        <XAxis dataKey="date"/>
        <YAxis domain={[0, 10]}/>  
        <Tooltip />
        <Legend />
        <Bar dataKey="workoutIntensity" barSize={40} fill="#8B0000" fillOpacity={0.7} name="Workout Intensity"/>
        <Line type="monotone" dataKey="moodRating" stroke="grey" strokeWidth={3}  dot={<CustomDot />} connectNulls={true} name="Mood"/>
      </ComposedChart>
    </div>
  )
}

export default Analytics