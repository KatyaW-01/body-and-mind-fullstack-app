export async function fetchMoods() {
  try {
    const response = await fetch("http://127.0.0.1:5555/api/moods")
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching mood data:", error)
    return []
  }
}

export async function updateMood(id, content) {
  try {
    const response = await fetch(`http://127.0.0.1:5555/api/moods/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(content)
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error updating mood:", error)
  }
}