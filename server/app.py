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

@app.route('/api/workouts', methods=["GET"])
def get_workouts():
  pass

@app.route('/api/workouts', methods=["POST"])
def create_workout():
  pass

@app.route('/api/workouts/<id>', methods=["GET"])
def get_one_workout():
  pass

@app.route('/api/workouts/<id>', methods=["PATCH"])
def update_workout():
  pass

@app.route('/api/workouts/<id>', methods=["DELETE"])
def delete_workout():
  pass

