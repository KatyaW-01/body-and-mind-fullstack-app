import React from "react"
import {useOutletContext, useLocation} from "react-router-dom"
import WorkoutCard from "./WorkoutCard"
import {useEffect} from "react"

function WorkoutList() {
  const {workouts, setWorkouts} = useOutletContext()
  const location = useLocation()
  const editedWorkout = location.state?.editedWorkout

  useEffect(() => {
    if(editedWorkout) {
      setWorkouts(prev => prev.map(w => {
        if(w.id === editedWorkout.id) {
          return editedWorkout
        } else {
          return w
        }
      }))
    }
  },[editedWorkout])

  if(workouts.length == 0) {
    return "No workouts tracked. Please add a workout"
  }

  return (
    <div>
      {
        workouts.map((workout) => (
          <div key={workout.id}>
            <WorkoutCard workout={workout} setWorkouts={setWorkouts}/>
          </div>
        ))
      }
    </div>
  )
}

export default WorkoutList