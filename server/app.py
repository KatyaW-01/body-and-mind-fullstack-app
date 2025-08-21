from flask import Flask, make_response, request
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
import os
from dotenv import load_dotenv
from models import db, Workout, WorkoutSchema, WorkoutExercise, WorkoutExerciseSchema, MoodLog, MoodLogSchema, Weather, WeatherSchema
from marshmallow import ValidationError

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
  try:
    workout_data = WorkoutSchema().load(data)
    workout = Workout(date=workout_data.get('date'), type=workout_data["type"], duration=workout_data["duration"], intensity=workout_data["intensity"], notes = workout_data.get('notes'))
    db.session.add(workout)
    db.session.commit()
    result = WorkoutSchema().dump(workout)
    return make_response(result, 201)
  except ValidationError as err:
    return {'error': err.messages}, 400

@app.route('/api/workouts/<id>', methods=["GET"])
def get_one_workout(id):
  workout = Workout.query.filter_by(id=id).first()
  if workout:
    result = WorkoutSchema().dump(workout)
    status = 200
  else:
    result = {"error": f"Workout {id} not found"}
    status = 404
  return make_response(result, status)

@app.route('/api/workouts/<id>', methods=["PATCH"])
def update_workout(id):
  workout = Workout.query.filter_by(id=id).first()
  if not workout:
    return {'error': f'Workout {id} not found'}, 404
  
  data = request.get_json()

  schema = WorkoutSchema(partial=True)

  try:
    validated_data = schema.load(data)
  except ValidationError as err:
    return {'error': err.messages}, 400
  if 'date' in validated_data:
    workout.date = validated_data['date']
  if 'type' in validated_data:
    workout.type = validated_data['type']
  if 'duration' in validated_data:
    workout.duration = validated_data['duration']
  if 'intensity' in validated_data:
    workout.intensity = validated_data['intensity']
  if 'notes' in validated_data:
    workout.notes = validated_data['notes']

  db.session.commit()
  return {'message': f'Workout {id} updated successfully'}, 200
  
@app.route('/api/workouts/<id>', methods=["DELETE"])
def delete_workout(id):
  workout = Workout.query.filter_by(id=id).first()
  if workout:
    db.session.delete(workout)
    db.session.commit()
    body = {'message': f'Workout {id} deleted successfully.'}
    status = 200
  else:
    body = {'error': f'Workout {id} not found.'}
    status = 404
  return make_response(body,status)

#workout exercise routes
@app.route('/api/workouts/<workout_id>/exercises', methods=["POST"])
def create_workout_exercise(workout_id):
  data = request.get_json()
  try:
    exercise_data = WorkoutExerciseSchema().load(data)
    exercise = WorkoutExercise(workout_id=workout_id,name=exercise_data["name"],sets=exercise_data.get('sets'),reps=exercise_data.get('reps'),weight=exercise_data.get('weight'))
    db.session.add(exercise)
    db.session.commit()
    result = WorkoutExerciseSchema().dump(exercise)
    return make_response(result, 201)
  except ValidationError as err:
    return {'error': err.messages}, 400

@app.route('/api/workouts/<workout_id>/exercises/<id>', methods=["PATCH"])
def update_workout_exercise(workout_id,id):
  workout_exercise = WorkoutExercise.query.filter_by(id=id, workout_id=workout_id).first()
  if not workout_exercise:
    return {'error': f'Workout Exercise {id} not found'}, 404
  
  data = request.get_json()
  schema = WorkoutExerciseSchema(partial=True)
  try:
    validated_data = schema.load(data)
  except ValidationError as err:
    return {'error': err.messages}, 400
  if 'name' in validated_data:
    workout_exercise.name = validated_data['name']
  if 'sets' in validated_data:
    workout_exercise.sets = validated_data['sets']
  if 'reps' in validated_data:
    workout_exercise.reps = validated_data['reps']
  if 'weight' in validated_data:
    workout_exercise.weight = validated_data['weight']

  db.session.commit()
  return {'message': f'Workout Exercise {id} updated successfully'}, 200

@app.route('/api/workouts/<workout_id>/exercises/<id>', methods=["DELETE"])
def delete_workout_exercise(workout_id,id):
  workout_exercise = WorkoutExercise.query.filter_by(id=id, workout_id=workout_id).first()
  if workout_exercise:
    db.session.delete(workout_exercise)
    db.session.commit()
    body = {'message': f'Workout Exercise {id} deleted successfully.'}
    status = 200
  else:
    body = {'error': f'Workout Exercise {id} not found.'}
    status = 404
  return make_response(body,status)

#mood routes
@app.route('/api/moods', methods=["GET"])
def get_moods():
  moods = MoodLog.query.all()
  result = MoodLogSchema(many=True).dump(moods)
  return make_response(result,200)

@app.route('/api/moods', methods=["POST"])
def create_moods():
  data = request.get_json()
  mood_data = MoodLogSchema().load(data)
  mood = MoodLog(date=mood_data['date'], rating=mood_data['rating'], mood=mood_data['mood'], notes=mood_data.get('notes'))
  if mood:
    db.session.add(mood)
    db.session.commit()
    result = MoodLogSchema().dump(mood)
    return make_response(result, 201)
  else:
    return make_response({"error": "mood could not be created. Please try again"},400)

@app.route('/api/moods/<id>', methods=["GET"])
def get_one_mood(id):
  mood = MoodLog.query.filter_by(id=id).first()
  if mood:
    result = MoodLogSchema().dump(mood)
    status = 200
  else:
    result = {"error": f"Mood {id} not found"}
    status = 404
  return make_response(result, status)

@app.route('/api/moods/<id>', methods=["PATCH"])
def update_mood(id):
  mood = MoodLog.query.filter_by(id=id).first()
  data = request.get_json()
  if mood:
    if 'date' in data:
      mood.date = data['date']
    if 'rating' in data:
      mood.rating = data['rating']
    if 'mood' in data:
      mood.mood = data['mood']
    if 'notes' in data:
      mood.notes = data['notes']

    db.session.commit()
    return {'message': f'Mood {id} updated successfully'}, 200
  else:
    return {'error': f'Mood {id} not found'}, 404

@app.route('/api/moods/<id>', methods=["DELETE"])
def delete_mood(id):
  mood = MoodLog.query.filter_by(id=id).first()
  if mood:
    db.session.delete(mood)
    db.session.commit()
    body = {'message': f'Mood {id} deleted successfully.'}
    status = 200
  else:
    body = {'error': f'Mood {id} not found.'}
    status = 404
  return make_response(body,status)

#weather routes

@app.after_request
def add_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', "GET, POST, PATCH, DELETE")
    return response

if __name__ == '__main__':
  app.run(port=5555, debug=True)