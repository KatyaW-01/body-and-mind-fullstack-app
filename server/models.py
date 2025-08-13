from flask_sqlalchemy import SQLAlchemy
from marshmallow import Schema, fields, validates, ValidationError,validate
from marshmallow.validate import Range, OneOf, Length
from datetime import date

db = SQLAlchemy()

class Workout(db.Model):
  __tablename__ = 'workouts'

  id = db.Column(db.Integer, primary_key = True)
  date = db.Column(db.Date, nullable=False, default = date.today)
  type = db.Column(db.String)
  duration = db.Column(db.Integer, nullable=False)
  intensity = db.Column(db.Integer)
  notes = db.Column(db.String)

  workout_exercises = db.relationship('WorkoutExercises', back_populates='workout')

class WorkoutSchema(Schema):
  id = fields.Int(dump_only=True)
  date = fields.Date()
  type = fields.String()
  duration = fields.Integer()
  intensity = fields.Integer()
  notes = fields.String()

  workout_exercises = fields.Nested(lambda: WorkoutExerciseSchema(exclude=("workout",)),many=True)

class WorkoutExercise(db.Model):
  __tablename__ = 'workout_exercises'

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String)
  sets = db.Column(db.Integer)
  reps = db.Column(db.Integer)
  weight = db.Column(db.Float)

  workout_id = db.Column(db.Integer, db.ForeignKey('workouts.id'))
  workout = db.relationship('Workout', back_populates='workout_exercises')

class WorkoutExerciseSchema(Schema):
  id = fields.Int(dump_only=True)
  name = fields.String()
  sets = fields.Integer()
  reps = fields.Integer()
  weight = fields.Float()

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
  rating = fields.Integer(required=True, validate=validate.Range(min=1,max=10))
  mood = fields.String(validate=OneOf(["happy","sad","angry","anxious","calm"]))
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