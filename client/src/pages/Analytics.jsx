import React from "react"
import NavBar from "../components/NavBar"
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts"

function Analytics() {
  return(
    <div>
      <NavBar />
      <p>graph with workout and mood data will go here</p>
    </div>
  )
}

export default Analytics