from flask_sqlalchemy import SQLAlchemy
from marshmallow import Schema, fields, validate
from datetime import date

db = SQLAlchemy()

class Workout(db.Model):
  __tablename__ = 'workouts'

  id = db.Column(db.Integer, primary_key = True)
  date = db.Column(db.Date, nullable=False, default = date.today)
  type = db.Column(db.String)
  duration = db.Column(db.Integer)
  intensity = db.Column(db.Integer)
  notes = db.Column(db.String)

  workout_exercises = db.relationship('WorkoutExercises', back_populates='workout')

class WorkoutExercise(db.Model):
  __tablename__ = 'workout_exercises'

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String)
  sets = db.Column(db.Integer)
  reps = db.Column(db.Integer)
  weight = db.Column(db.Float)

  workout_id = db.Column(db.Integer, db.ForeignKey('workouts.id'))
  workout = db.relationship('Workout', back_populates='workout_exercises')

class MoodLog(db.Model):
  __tablename__ = 'mood_logs'

  id = db.Column(db.Integer, primary_key = True)
  date = db.Column(db.Date, nullable=False, default = date.today)
  rating = db.Column(db.Integer)
  mood = db.Column(db.String)
  notes = db.Column(db.String)

class Weather(db.Model):
  __tablename__ = 'weather'

  id = db.Column(db.Integer, primary_key = True)
  date = db.Column(db.DateTime)
  temperature = db.Column(db.Float)
  description = db.Column(db.String)



