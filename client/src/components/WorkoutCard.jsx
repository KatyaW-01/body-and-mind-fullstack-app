function WorkoutCard({workout}) {
  return (
    <div>
      <h3>{workout.date}</h3>
      <p>Type: {workout.type}</p>
      <p>Duration: {workout.duration}</p>
      <p>Intensity: {workout.intensity}/10</p>
      <p>Notes: {workout.notes}</p>
      {workout.exercises.length > 0 && (
        <div>
          <h4>Exercises:</h4>
          <ul>
            {workout.exercises.map((exercise) => (
              <li key={exercise.id}>
                {exercise.name} - {exercise.reps} reps x {exercise.sets} sets @ {exercise.weight} lbs
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  )
}

export default WorkoutCard