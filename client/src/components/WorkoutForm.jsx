import React from "react"
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import {useState} from "react"
import { updateWorkout, fetchWorkouts } from "../api/workouts"
import {updateWorkoutExercise, deleteWorkoutExercise} from "../api/workoutExercises"

function WorkoutForm() {
  const location = useLocation()
  const workout = location.state.workout
  
  if (workout.notes === null) {
    workout['notes'] = ""
  }

  const [editedWorkout,setEditedWorkout] = useState({id: workout.id, date: workout.date, type: workout.type, duration: workout.duration, intensity: workout.intensity, notes: workout.notes})

  const [editedExercises, setEditedExercises] = useState(workout.exercises || [])

  const [errors, setErrors] = useState({})

  const [exerciseErrors, setExerciseErrors] = useState([])

  const {setWorkouts} = useOutletContext()

  const navigate = useNavigate()

  const today = new Date().toLocaleDateString("en-CA")

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
    } 
  }

  function handleChange(event) {
    const {name, value} = event.target

    setEditedWorkout(prevWorkout => ({
      ...prevWorkout, [name]:value
    }));
  }

  async function handleExerciseSubmit(index, event) {
    //prevent page reload
    event.preventDefault()
    //get just the one exercise object from the array
    const exercise = editedExercises[index]
    const fixedExercise = {
      ...exercise,
      reps: exercise.reps === "" ? null : exercise.reps,
      sets: exercise.sets === "" ? null : exercise.sets,
      weight: exercise.weight === "" ? null : exercise.weight,
    }
    //remove id key
    const {id, ...updatedWorkoutExercise} = fixedExercise
    // Make PATCH request
    const result = await updateWorkoutExercise(workout.id, id, updatedWorkoutExercise)
    if (result.error) {
      const newErrors = [...exerciseErrors]
      newErrors[index] = result.error
      setExerciseErrors(newErrors)
      alert("Error updating workout exercise, please try again!")
      return
    }
    if (!result.error) {
      alert("Exercise successfully updated!")
      const updatedWorkouts = await fetchWorkouts()
      setWorkouts(updatedWorkouts)
    }
  }

  function handleExerciseChange(index,event) {
    const {name, value} = event.target

    setEditedExercises(prevExercises => {
      const updated = [...prevExercises]

      let newValue = value
      if(name === "sets" || name === "reps") {
        if (value === "") {
          newValue = ""
        } else {
          newValue = parseInt(value,10)
        }
      } else if (name === "weight") {
        if (value === "") {
          newValue = ""
        } else {
          newValue = parseFloat(value)
        }
      }
      updated[index] = {...updated[index], [name]: newValue}
      return updated
    })
  }

  async function handleDelete(index, event) {
    const exercise = editedExercises[index]
    const id = exercise.id
    //make DELETE request
    const result = await deleteWorkoutExercise(workout.id, id)
    //if no error, notify the user and update state
    if (!result.error) {
      alert("Exercise successfully deleted")
      const updatedWorkouts = await fetchWorkouts()
      setWorkouts(updatedWorkouts)
    } else {
      console.log(result.error)
    }
  }

  function handleFinish() {
    navigate("/workouts");
  }

  function handleAddExercise() {
    navigate("/workouts/addExercise", {state: {workout}})
  }
  
  return (
    <div >
      <div className="workout-form-div">
        <h3>Workout</h3>
        <form onSubmit={handleSubmit} className="workout-form">
          <div>
            <label htmlFor="date">Date:</label>
            <input type="date" id="date" name="date" max={today} value={editedWorkout.date} onChange={handleChange} className="input"/>
            {errors.date && <p className="error">{errors.date[0]}</p>}
          </div>
          <div>
            <label htmlFor="type">Type:</label>
            <select id="type" name="type" value={editedWorkout.type} onChange={handleChange} className="input">
              <option value="Running">Running</option>
              <option value="Cycling">Cycling</option>
              <option value="Strength Training">Strength Training</option>
              <option value="HIIT">HIIT</option>
              <option value="Swimming">Swimming</option>
              <option value="Walking">Walking</option>
              <option value="Yoga">Yoga</option>
              <option value="Hiking">Hiking</option>
              <option value="Climbing">Climbing</option>
              <option value="Other">Other</option>
            </select>
            {errors.type && <p className="error">{errors.type[0]}</p>}
          </div>
          <div>
            <label htmlFor="duration">Duration:</label>
            <input type="number" id="duration" name="duration" value={editedWorkout.duration} onChange={handleChange} className="input"/>
            {errors.duration && <p className="error">{errors.duration[0]}</p>}
          </div>
          <div>
            <label htmlFor="intensity">Intensity:</label>
            <input type="range" min="1" max="10" id="intensity" name="intensity" value={editedWorkout.intensity} onChange={handleChange} />
            <p>value: {editedWorkout.intensity}</p>
            {errors.intensity && <p className="error">{errors.intensity[0]}</p>}
          </div>
          <div>
            <label htmlFor="notes">Notes:</label>
            <textarea type="text" id="notes" name="notes" maxLength={300} value={editedWorkout.notes} onChange={handleChange} className="notes input" />
            {errors.notes && <p className="error">{errors.notes[0]}</p>}
          </div>
          <div>
            <button type="submit" value="Submit" className="submit-workout-button">Submit</button>
          </div>
        </form>
        {/* if a workout has exercises, create form for editing/deleting them */}
        {workout.exercises.length > 0 && (
        <div className="exercises-form">
          <h3>Exercises</h3>
          {workout.exercises.map((exercise, index) => (
            <div key={exercise.id} className="exercise-card">
              <div>
                <h4>{index + 1}.</h4>
              </div>
              <form onSubmit={(event) => handleExerciseSubmit(index, event)}>
                <div className="exercise-form-div">
                  <label htmlFor="name" >Name:</label>
                  <input type="text" id="name" name="name" value={editedExercises[index].name || ""} onChange={(event) => handleExerciseChange(index,event)} />
                  {exerciseErrors[index]?.name && <p className="error">{exerciseErrors[index].name[0]}</p>}
                </div>
                <div className="exercise-form-div">
                  <label htmlFor="sets" >Sets:</label>
                  <input type="number" id="sets" name="sets" value={editedExercises[index].sets || ""} onChange={(event) => handleExerciseChange(index,event)} />
                  {exerciseErrors[index]?.sets && <p className="error">{exerciseErrors[index].sets[0]}</p>}
                </div>
                <div className="exercise-form-div">
                  <label htmlFor="reps" >Reps:</label>
                  <input type="number" id="reps" name="reps" value={editedExercises[index].reps || ""} onChange={(event) => handleExerciseChange(index,event)} />
                  {exerciseErrors[index]?.reps && <p className="error">{exerciseErrors[index].reps[0]}</p>}
                </div>
                <div className="exercise-form-div">
                  <label htmlFor="weight" >Weight:</label>
                  <input type="number" id="weight" name="weight" value={editedExercises[index].weight || ""} onChange={(event) => handleExerciseChange(index,event)} />
                  {exerciseErrors[index]?.weight && <p className="error">{exerciseErrors[index].weight[0]}</p>}
                </div>
                <div className="exercise-form-div">
                  <button type="submit" value="Submit">Submit Edit</button>
                </div>
              </form>
              <div className="exercise-form-div">
                <button onClick={(event) => handleDelete(index, event)}>Delete Exercise</button>
              </div>
            </div>
          ))}
        </div>
        )}
        <div className="add-exercise-button">
          <button onClick={handleAddExercise}>Add an exercise</button>
        </div>
      </div>
      <div className="back-to-workouts-button">
        <button onClick={handleFinish}>Back to Workouts</button>
      </div>
    </div>
  )
}

export default WorkoutForm