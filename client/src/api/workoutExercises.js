export async function updateWorkoutExercise(workout_id, id, content) {
  try {
    const response = await fetch(`http://127.0.0.1:5555/api/workouts/${workout_id}/exercises/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(content)
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error updating workout exercise:", error)
  }
}

export async function deleteWorkoutExercise(workout_id, id) {
  try {
    const response = await fetch(`http://127.0.0.1:5555/api/workouts/${workout_id}/exercises/${id}`, {
      method: "DELETE"
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error deleting exercise:", error)
  }
}

export async function createWorkoutExercise(workout_id, exercise) {
  try {
    const response = await fetch(`http://127.0.0.1:5555/api/workouts/${workout_id}/exercises`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(exercise)
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error creating exercise:", error)
  }
}