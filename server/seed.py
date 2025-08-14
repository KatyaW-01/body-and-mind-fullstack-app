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
  w1 = Workout(date=date(2025,8,4), type="Strength Training", duration=90, intensity=8 ,notes="Intense leg day")
  w2 = Workout(date=date(2025,8,5), type="Yoga", duration=60, intensity=4, notes="Relaxing and grounding")
  w3 = Workout(date=, type="", duration= , intensity= ,notes="")
  w4 = Workout(date=, type="", duration= , intensity= ,notes="")
  w5 = Workout(date=, type="", duration= , intensity= ,notes="")
  w6 = Workout(date=, type="", duration= , intensity= ,notes="")
  w7 = Workout(date=, type="", duration= , intensity= ,notes="")
  w8 = Workout(date=, type="", duration= , intensity= ,notes="")
  w9 = Workout(date=, type="", duration= , intensity= ,notes="")
  w10 = Workout(date=, type="", duration= , intensity= ,notes="")