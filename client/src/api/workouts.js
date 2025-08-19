export async function fetchWorkouts() {
  try {
    const response = await fetch("http://127.0.0.1:5555/api/workouts")
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching workout data:", error)
    return []
  }
}

export async function deleteWorkout(id) {
  try {
    const response = await fetch(`http://127.0.0.1:5555/api/workouts/${id}`, {
      method: "DELETE"
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error deleting workout:", error)
  }
}

export async function updateWorkout(id,content) {
  try {
    const response = await fetch(`http://127.0.0.1:5555/api/workouts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(content)
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error updating workout:", error)
  }
}

export async function createWorkout(workout) {
  try {
    const response = await fetch("http://127.0.0.1:5555/api/workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(workout)
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error creating workout:", error)
  }
}