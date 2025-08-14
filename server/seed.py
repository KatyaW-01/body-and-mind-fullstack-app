#!/usr/bin/env python3

from app import app
from models import *
from datetime import date 

with app.app_context():
  #reset data
  Workout.query.delete()
  WorkoutExercise.query.delete()
  MoodLog.query.delete()

  #add workouts
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

  #add Moods
 