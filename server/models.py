from flask_sqlalchemy import SQLAlchemy
from marshmallow import Schema, fields, validates, ValidationError,validate
from marshmallow.validate import Range, OneOf, Length
from datetime import date

db = SQLAlchemy()

allowed_workout_types = [
  "Running",
  "Cycling",
  "Strength Training",
  "HIIT",
  "Swimming",
  "Walking",
  "Yoga",
  "Hiking",
  "Climbing",
  "Other"
]

class Workout(db.Model):
  __tablename__ = 'workouts'

  id = db.Column(db.Integer, primary_key = True)
  date = db.Column(db.Date, nullable=False, default = date.today)
  type = db.Column(db.String, nullable=False)
  duration = db.Column(db.Integer, nullable=False)
  intensity = db.Column(db.Integer, nullable=False)
  notes = db.Column(db.String, nullable=True)

  exercises = db.relationship('WorkoutExercise', back_populates='workout')

class WorkoutSchema(Schema):
  id = fields.Int(dump_only=True)
  date = fields.Date(required=False)
  type = fields.String(required=True, validate=validate.OneOf(allowed_workout_types))
  #duration is in minutes
  duration = fields.Integer(required=True, validate=validate.Range(min=1,max=500))
  intensity = fields.Integer(required=True,validate=validate.Range(min=1,max=10, error="Intensity must be an integer between 1 and 10"))
  notes = fields.String(required=False,validate = validate.Length(min=0, max=300, error="Notes cannot exceed 300 characters"))

  exercises = fields.Nested(lambda: WorkoutExerciseSchema(exclude=("workout",)),many=True)

  @validates("date")
  def validates_date(self,value):
    if value > date.today():
      raise ValidationError("Date cannot be in the future.")

class WorkoutExercise(db.Model):
  __tablename__ = 'workout_exercises'

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String, nullable=False)
  sets = db.Column(db.Integer, nullable=True)
  reps = db.Column(db.Integer, nullable=True)
  weight = db.Column(db.Float, nullable=True)

  workout_id = db.Column(db.Integer, db.ForeignKey('workouts.id'))
  workout = db.relationship('Workout', back_populates='exercises')

class WorkoutExerciseSchema(Schema):
  id = fields.Int(dump_only=True)
  name = fields.String(required=True, validate=validate.Length(min=1, max=100))
  sets = fields.Integer(validate=validate.Range(min=0,max=50))
  reps = fields.Integer(validate=validate.Range(min=0,max=200))
  weight = fields.Float(validate=validate.Range(min=0))

  workout = fields.Nested(lambda: WorkoutSchema(exclude=("workout_exercises",)))

class MoodLog(db.Model):
  __tablename__ = 'mood_logs'

  id = db.Column(db.Integer, primary_key = True)
  date = db.Column(db.Date, nullable=False, default = date.today)
  rating = db.Column(db.Integer, nullable=False)
  mood = db.Column(db.String, nullable=False)
  notes = db.Column(db.String)

class MoodLogSchema(Schema):
  id = fields.Int(dump_only=True)
  date = fields.Date(required=False)
  rating = fields.Integer(required=True, validate=validate.Range(min=1, max=10, error="Mood rating must be an integer between 1 and 10"))
  mood = fields.String(validate=validate.OneOf(["happy","sad","angry","anxious","calm"]))
  notes = fields.String(validate = validate.Length(min=0, max=300, error="Notes cannot exceed 300 characters"))

  @validates("date")
  def validates_date(self,value):
    if value > date.today():
      raise ValidationError("Date cannot be in the future.")


#the data in this model will come from an API
class Weather(db.Model):
  __tablename__ = 'weather'

  id = db.Column(db.Integer, primary_key = True)
  date = db.Column(db.DateTime)
  temperature = db.Column(db.Float)
  description = db.Column(db.String)

class WeatherSchema(Schema):
  id = fields.Int(dump_only=True)
  date = fields.DateTime()
  temperature = fields.Float()
  description = fields.String()