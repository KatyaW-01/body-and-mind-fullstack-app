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
  workouts = Workout.query.all()
  result = WorkoutSchema(many=True).dump(workouts)
  return make_response(result, 200)

@app.route('/api/workouts', methods=["POST"])
def create_workout():
  data = request.get_json()
  workout_data = WorkoutSchema().load(data)
  workout = Workout(date=workout_data["date"], type=workout_data["type"], duration=workout_data["duration"], intensity=workout_data["intensity"], notes = workout_data["notes"])
  if workout:
    db.session.add(workout)
    db.session.commit()
    result = WorkoutSchema().dump(workout)
    return make_response(result, 201)
  else:
    return make_response({"error": "workout could not be created. Please try again"},400)

@app.route('/api/workouts/<id>', methods=["GET"])
def get_one_workout(id):
  workout = Workout.query.filter_by(id=id).first()
  result = WorkoutSchema().dump(workout)
  return make_response(result,200)

@app.route('/api/workouts/<id>', methods=["PATCH"])
def update_workout(id):
  workout = Workout.query.filter_by(id=id).first()
  data = request.get_json()
  if workout:
    if 'date' in data:
      workout.date = data['date']
    if 'type' in data:
      workout.type = data['type']
    if 'duration' in data:
      workout.duration = data['duration']
    if 'intensity' in data:
      workout.intensity = data['intensity']
    if 'notes' in data:
      workout.notes = data['notes']

    db.session.commit()
    return {'message': f'Workout {id} updated successfully'}, 200
  else:
    return {'error': f'Workout {id} not found'}, 404

@app.route('/api/workouts/<id>', methods=["DELETE"])
def delete_workout(id):
  workout = Workout.query.filter_by(id=id).first()
  if workout:
    db.session.delete(workout)
    db.session.commit()
    body = {'message': f'Workout {id} deleted successfully.'}
    status = 200
  else:
    body = {'message': f'Workout {id} not found.'}
    status = 404
  return make_response(body,status)

#workout exercise routes
@app.route('/api/workouts/<workout_id>/exercises', methods=["POST"])
def create_workout_exercise(workout_id):
  data = request.get_json()
  exercise_data = WorkoutExerciseSchema().load(data)
  exercise = WorkoutExercise(workout_id=workout_id,name=exercise_data["name"],sets=exercise_data["sets"],reps=exercise_data["reps"],weight=exercise_data["weight"])
  if exercise:
    db.session.add(exercise)
    db.session.commit()
    result = WorkoutExerciseSchema().dump(exercise)
    return make_response(result, 201)
  else:
    return make_response({"error": "workout exercise could not be created. Please try again"},400)


@app.route('/api/workouts/<workout_id>/exercises/<id>', methods=["PATCH"])
def update_workout_exercise(workout_id,id):
  pass

@app.route('/api/workouts/<workout_id>/exercises/<id>', methods=["DELETE"])
def delete_workout_exercise(workout_id,id):
  pass

#mood routes
@app.route('/api/moods', methods=["GET"])
def get_moods():
  pass

@app.route('/api/moods', methods=["POST"])
def create_moods():
  pass

@app.route('/api/moods/<id>', methods=["GET"])
def get_one_mood(id):
  pass

@app.route('/api/moods/<id>', methods=["PATCH"])
def update_mood(id):
  pass

@app.route('/api/moods/<id>', methods=["DELETE"])
def delete_mood(id):
  pass

#weather routes

if __name__ == '__main__':
  app.run(port=5555, debug=True)