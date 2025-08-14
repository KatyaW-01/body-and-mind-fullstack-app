#!/usr/bin/env python3

from app import app
from models import *
from datetime import date 

with app.app_context():
  #reset data
  Workout.query.delete()
  WorkoutExercise.query.delete()
  MoodLog.query.delete()
  Weather.query.delete()

  #create workouts
  w1 = Workout(date=date(2025,7,28), type="Running", duration=20, intensity=3, notes="Easy 2 mile run")
  w2 = Workout(date=date(2025,7,30), type="Hiking", duration=180, intensity=4, notes="Beautiful hike in colorado")
  w3 = Workout(date=date(2025,8,4), type="Strength Training", duration=120, intensity=8 ,notes="Intense leg day")
  w4 = Workout(date=date(2025,8,5), type="Yoga", duration=60, intensity=4, notes="Relaxing and grounding")
  w5 = Workout(date=date(2025,8,7), type="Running", duration=25, intensity=5, notes="3 mile run")
  w6 = Workout(date=date(2025,8,10), type="Strength Training", duration=90, intensity=6, notes="chest and triceps")
  w7 = Workout(date=date(2025,8,11), type="Climbing", duration=90, intensity=7, notes="Great session!")

  db.session.add_all([w1,w2,w3,w4,w5,w6,w7])
  db.session.commit()

  #create related workout exercises
  we1 = WorkoutExercise(workout=w3, name="squats", sets=3, reps=10, weight=75.0)
  we2 = WorkoutExercise(workout=w3, name="deadlifts", sets=3, reps=10, weight=65.0)
  we3 = WorkoutExercise(workout=w3, name="hip thrusts", sets=3, reps=8, weight=115.0)

  we4 = WorkoutExercise(workout=w6, name="bench press", sets=4, reps=8, weight=65.0)
  we5 = WorkoutExercise(workout=w6, name="assisted dips", sets=3, reps=10, weight=70.0)
  we6 = WorkoutExercise(workout=w6, name="incline bench press", sets=3, reps=10, weight=17.5)
  

  db.session.add_all([we1,we2,we3,we4,we5,we6])
  db.session.commit()

  #create moods
  #user tracks mood every day regardless of if they worked out or not
  m1 = MoodLog(date=date(2025,7,28), rating=, mood="", notes="") #worked out 
  m2 = MoodLog(date=date(2025,7,29), rating=, mood="", notes="")
  m3 = MoodLog(date=date(2025,7,30), rating=, mood="", notes="") #worked out 
  m4 = MoodLog(date=date(2025,7,31), rating=, mood="", notes="")
  m5 = MoodLog(date=date(2025,8,1), rating=, mood="", notes="")
  m6 = MoodLog(date=date(2025,8,2), rating=, mood="", notes="")
  m7 = MoodLog(date=date(2025,8,3), rating=, mood="", notes="")
  m8 = MoodLog(date=date(2025,8,4), rating=, mood="", notes="") #worked out 
  m9 = MoodLog(date=date(2025,8,5), rating=, mood="", notes="") #worked out 
  m10 = MoodLog(date=date(2025,8,6), rating=, mood="", notes="")
  m11 = MoodLog(date=date(2025,8,7), rating=, mood="", notes="") #worked out 
  m12 = MoodLog(date=date(2025,8,8), rating=, mood="", notes="")
  m13 = MoodLog(date=date(2025,8,9), rating=, mood="", notes="")
  m14 = MoodLog(date=date(2025,8,10), rating=, mood="", notes="") #worked out
  m15 = MoodLog(date=date(2025,8,11), rating=, mood="", notes="") #worked out 
  m16 = MoodLog(date=date(2025,8,12), rating=, mood="", notes="")
 