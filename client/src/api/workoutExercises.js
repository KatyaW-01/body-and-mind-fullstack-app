export async function updateWorkoutExercise(workout_id, id, content) {
  try {
    const response = await fetch(`/api/workouts/${workout_id}/exercises/${id}`, {
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