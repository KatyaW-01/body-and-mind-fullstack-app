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

  const moodByDate = {}
  sortedMoods.forEach((mood) => {
    moodByDate[mood.date] = {rating: mood.rating, mood: mood.mood}
  })

  //get an array of all the dates
  const dates = Array.from(new Set([
    ...sortedMoods.map(mood => mood.date),
    ...sortedWorkouts.map(workout => workout.date)
  ])).sort()

  const data = dates.map((date) => ({
    date: date,
    moodRating: moodByDate[date]?.rating ?? null,
    mood: moodByDate[date]?.mood ?? null,
    workoutIntensity: workoutByDate[date] ?? null
  }))

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
  const CustomDot = (props) => {
    const {cx, cy, payload} = props
    if (!payload.mood) return null
    const color = moodColors[payload.mood] || "black"
    return <circle cx={cx} cy={cy} r={6} fill={color} stroke="none" />
    //r is radius
  }

  return(
    <div>
      <NavBar />
      <h1 className="analytics-header">Your Workout and Mood Data</h1>
      <div className="graph-and-legend">
        <div className="graph"> 
          <ComposedChart width={1000} height={700} data={data}>
            <CartesianGrid />
            <XAxis dataKey="date"/>
            <YAxis domain={[0, 11]}/>  
            <Tooltip />
            <Legend />
            <Bar dataKey="workoutIntensity" barSize={40} fill="#000080" fillOpacity={0.7} name="Workout Intensity"/>
            <Line type="monotone" dataKey="moodRating" stroke="grey" strokeWidth={3}  dot={<CustomDot />} connectNulls={true} name="Mood"/>
          </ComposedChart>
        </div>
        <div className="legend">
          <div>
            <span class="color-box" style={{ backgroundColor: "#FF69B4" }}></span>
            <span>Excited</span>
          </div>
          <div>
            <span class="color-box" style={{ backgroundColor: "#FFD700" }}></span>
            <span>Happy</span>
          </div>
          <div>
            <span class="color-box" style={{ backgroundColor: "#32CD32" }}></span>
            <span>Calm</span>
          </div>
          <div>
            <span class="color-box" style={{ backgroundColor: "#A9A9A9" }}></span>
            <span>Tired</span>
          </div>
          <div>
            <span class="color-box" style={{ backgroundColor: "#800080" }}></span>
            <span>Anxious</span>
          </div>
          <div>
            <span class="color-box" style={{ backgroundColor: "#1E90FF" }}></span>
            <span>Sad</span>
          </div>
          <div>
            <span class="color-box" style={{ backgroundColor: "#FF4500" }}></span>
            <span>Angry</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics