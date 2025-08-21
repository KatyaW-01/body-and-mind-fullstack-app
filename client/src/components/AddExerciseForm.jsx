import React from "react"
import {useState} from "react"
import { useLocation, useOutletContext, useNavigate } from "react-router-dom"
import { createWorkoutExercise } from "../api/workoutExercises"
import { fetchWorkouts } from "../api/workouts"

function AddExerciseForm() {
  const [newExercise, setNewExercise] = useState({name: "", sets: "", reps: "", weight: ""})
  const [errors, setErrors] = useState({})

  const {setWorkouts} = useOutletContext()
  const navigate = useNavigate()

  const location = useLocation()
  const workout = location.state.workout
  const workout_id = workout.id

  async function handleSubmit(event) {
    event.preventDefault()

    const exercise = {
      ...newExercise,
      sets: newExercise.sets === "" ? null : newExercise.sets,
      reps: newExercise.reps === "" ? null : newExercise.reps,
      weight: newExercise.weight === "" ? null : newExercise.weight,
    }

    //Make POST request
    const result = await createWorkoutExercise(workout_id, exercise)

    if(result.error) {
      setErrors(result.error)
      alert("Error adding exercise. Please try again!")
      return
    } else {
      alert("Exercise successfully added!")
      //update state
      const updatedWorkouts = await fetchWorkouts()
      setWorkouts(updatedWorkouts)
      //clear form so user can add another exercise
      setNewExercise({name: "", sets: "", reps: "", weight: ""})
    }
  }

  function handleChange(event) {
    const {name, value} = event.target

    setNewExercise(prev => ({
      ...prev, [name]: name === "sets" || name === "reps" || name === "weight" ? value === "" ? "" : Number(value) : value
    }))
  }

  function handleFinish() {
    navigate("/workouts");
  }

  return (
    <div>
      <h2>Add an exercise to your {workout.type.toLowerCase()} workout from {workout.date} </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" >Name:</label>
          <input type="text" id="name" name="name" value={newExercise.name} onChange={handleChange} />
          {errors.name && <p className="error">{errors.name[0]}</p>}
        </div>
        <div>
          <label htmlFor="sets" >Sets (optional):</label>
          <input type="number" id="sets" name="sets" value={newExercise.sets} onChange={handleChange} />
          {errors.sets && <p className="error">{errors.sets[0]}</p>}
        </div>
        <div>
          <label htmlFor="reps" >Reps (optional):</label>
          <input type="number" id="reps" name="reps" value={newExercise.reps} onChange={handleChange} />
          {errors.reps && <p className="error">{errors.reps[0]}</p>}
        </div>
        <div>
          <label htmlFor="weight" >Weight (optional):</label>
          <input type="number" id="weight" name="weight" value={newExercise.weight} onChange={handleChange} />
          {errors.weight && <p className="error">{errors.weight[0]}</p>}
        </div>
        <div>
           <button type="submit" value="Submit">Submit</button>
        </div>
      </form>
      <button onClick={handleFinish}>Back to Workouts</button>
    </div>
  )
}

export default AddExerciseForm