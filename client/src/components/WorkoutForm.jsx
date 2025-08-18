import React from "react"

function WorkoutForm() {
  return (
    <div>
      <form>
        <label htmlFor="date">Date:</label>
        <input type="text" id="date" name="date"/>
        <label htmlFor="type">Type:</label>
        <input type="text" id="type" name="type"/>
        <label htmlFor="duration">Duration:</label>
        <input type="text" id="duration" name="duration"/>
        <label htmlFor="intensity">Intensity:</label>
        <input type="text" id="intensity" name="intensity"/>
        <label htmlFor="notes">Notes:</label>
        <input type="text" id="notes" name="notes"/>
      </form>
    </div>
  )
}

export default WorkoutForm