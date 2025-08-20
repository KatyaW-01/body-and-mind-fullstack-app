import React from "react"
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import {useState} from "react"
import { updateWorkout } from "../api/workouts"
import { fetchWorkouts } from "../api/workouts"

function WorkoutForm() {
  const location = useLocation()
  const workout = location.state.workout
  //console.log(workout)
  if (workout.notes === null) {
    workout['notes'] = ""
  }

  const [editedWorkout,setEditedWorkout] = useState({id: workout.id, date: workout.date, type: workout.type, duration: workout.duration, intensity: workout.intensity, notes: workout.notes})

  const [editedExercises, setEditedExercises] = useState(workout.exercises || [])

  const [errors, setErrors] = useState({})

  const {setWorkouts} = useOutletContext()

  const navigate = useNavigate()

  const today = new Date().toISOString().split("T")[0];

  async function handleSubmit(event) {
    //prevent page reload
    event.preventDefault()

    //remove id key
    const {id, ...updatedWorkout} = editedWorkout
    if (updatedWorkout.notes === "") {
      updatedWorkout.notes = null;
    }
    
    //make the PATCH request
    const result = await updateWorkout(workout.id, updatedWorkout)

    if(result.error) {
      setErrors(result.error)
      alert("Error updating workout, please try again!")
      return 
    }
    //if successful, notify user, re-fetch the data from the backend to update state, navigate back to workouts page
    if (!result.error) {
      alert("Workout successfully updated")
      
      const updatedWorkouts = await fetchWorkouts()
      setWorkouts(updatedWorkouts)

      navigate("/workouts");
    } 
  }

  function handleChange(event) {
    const {name, value} = event.target

    setEditedWorkout(prevWorkout => ({
      ...prevWorkout, [name]:value
    }));
  }

  return (
    <div>
      <h3>Workout</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" max={today} value={editedWorkout.date} onChange={handleChange}/>
          {errors.date && <p className="error">{errors.date[0]}</p>}
        </div>
        <div>
          <label htmlFor="type">Type:</label>
          <input type="text" id="type" name="type" value={editedWorkout.type} onChange={handleChange}/>
          {errors.type && <p className="error">{errors.type[0]}</p>}
        </div>
        <div>
          <label htmlFor="duration">Duration:</label>
          <input type="text" id="duration" name="duration" value={editedWorkout.duration} onChange={handleChange}/>
          {errors.duration && <p className="error">{errors.duration[0]}</p>}
        </div>
        <div>
          <label htmlFor="intensity">Intensity:</label>
          <input type="text" id="intensity" name="intensity" value={editedWorkout.intensity} onChange={handleChange}/>
          {errors.intensity && <p className="error">{errors.intensity[0]}</p>}
        </div>
        <div>
          <label htmlFor="notes">Notes:</label>
          <input type="text" id="notes" name="notes" value={editedWorkout.notes} onChange={handleChange}/>
          {errors.notes && <p className="error">{errors.notes[0]}</p>}
        </div>
        <div>
          <button type="submit" value="Submit">Submit</button>
        </div>
      </form>
      {/* if a workout has exercises, create form for editing/deleting them */}
      {workout.exercises.length > 0 && (
      <div>
        <h3>Exercises</h3>
        {workout.exercises.map((exercise) => (
          <div key={exercise.id}>
            <form>
              <div>
                <label htmlFor="name" >Name:</label>
                <input type="text" id="name" name="name" value={exercise.name || ""}/>
              </div>
              <div>
                <label htmlFor="sets" >Sets:</label>
                <input type="number" id="sets" name="sets" value={exercise.sets || ""}/>
              </div>
              <div>
                <label htmlFor="reps" >Reps:</label>
                <input type="number" id="reps" name="reps" value={exercise.reps || ""}/>
              </div>
              <div>
                <label htmlFor="weight" >Weight:</label>
                <input type="number" id="weight" name="weight" value={exercise.weight || ""} />
              </div>
              <div>
                <button type="submit" value="Submit">Submit Edit</button>
              </div>
            </form>
            <button>Delete Exercise</button>
          </div>
        ))}
      </div>
      )}
      <button>Add an exercise</button>
    </div>
  )
}

export default WorkoutForm