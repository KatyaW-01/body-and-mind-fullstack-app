import React from "react"
import {useOutlet, useOutletContext} from "react-router-dom"
import MoodCard from "./MoodCard"

function MoodList() {
  const {moods, setMoods} = useOutletContext()

  if(moods.length === 0) {
    return <p>No moods tracked. Please add a mood.</p>
  }

  return (
    <div className="mood-div">
      {
        moods.map((mood) => (
          <div key={mood.id}> 
            <MoodCard mood={mood} setMoods={setMoods} />
          </div>
        ))
      }
    </div>
  )
}

export default MoodList