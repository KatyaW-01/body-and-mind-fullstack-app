from flask import Flask, make_response, request
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
import os
from dotenv import load_dotenv
from models import db, Workout, WorkoutSchema, WorkoutExercise, WorkoutExerciseSchema, MoodLog, MoodLogSchema, Weather, WeatherSchema

load_dotenv()

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] =  os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)

#workout routes
@app.route('/api/workouts', methods=["GET"])
def get_workouts():
  pass

@app.route('/api/workouts', methods=["POST"])
def create_workout():
  pass

@app.route('/api/workouts/<id>', methods=["GET"])
def get_one_workout(id):
  pass

@app.route('/api/workouts/<id>', methods=["PATCH"])
def update_workout(id):
  pass

@app.route('/api/workouts/<id>', methods=["DELETE"])
def delete_workout(id):
  pass

#workout exercise routes
@app.route('/api/workouts/<workout_id>/exercises', method=["POST"])
def create_workout_exercise(workout_id):
  pass

@app.route('/api/workouts/<workout_id>/exercises/<id>', method=["PATCH"])
def update_workout_exercise(workout_id,id):
  pass

@app.route('/api/workouts/<workout_id>/exercises/<id>', method=["DELETE"])
def delete_workout_exercise(workout_id,id):
  pass
