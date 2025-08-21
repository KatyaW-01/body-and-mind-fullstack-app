import React from "react"
import {Routes, Route} from "react-router-dom"
import './App.css'
import Home from "./pages/Home"
import Workouts from "./pages/Workouts"
import MoodTracker from "./pages/MoodTracker"
import Analytics from "./pages/Analytics"
import WorkoutForm from "./components/WorkoutForm"
import AddWorkoutForm from "./components/AddWorkoutForm"
import MoodForm from "./components/MoodForm"
import AddMoodForm from "./components/AddMoodForm"
import WorkoutList from "./components/WorkoutList"
import MoodList from "./components/MoodList"
import AddExerciseForm from "./components/AddExerciseForm"

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/workouts" element={ <Workouts /> } >
        <Route index element={ <WorkoutList /> }/>
        <Route path="workoutForm" element={< WorkoutForm />} />
        <Route path="addWorkoutForm" element={< AddWorkoutForm />} />
        <Route path="addExercise"  element={ <AddExerciseForm /> }/>
      </Route>
      <Route path="/moods" element={ <MoodTracker /> } >
        <Route index element={ <MoodList /> }/>
        <Route path="moodForm" element={<MoodForm />} />
        <Route path="addMood" element={<AddMoodForm /> } />
      </Route>
      <Route path="/analytics" element={ <Analytics />} />
    </Routes>
  )
}

export default App
