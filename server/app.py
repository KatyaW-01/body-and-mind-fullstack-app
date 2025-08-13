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
