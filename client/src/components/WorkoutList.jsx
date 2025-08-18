import React from "react"
import {useOutletContext} from "react-router-dom"
import WorkoutCard from "./WorkoutCard"

function WorkoutList() {
  const {workouts} = useOutletContext()
  if(workouts.length == 0) {
    return "No workouts tracked. Please add a workout"
  }
  return (
    <div>
      {
        workouts.map((workout) => (
          <div key={workout.id}>
            <WorkoutCard workout={workout} />
          </div>
        ))
      }
    </div>
  )
}

export default WorkoutList