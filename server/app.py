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
  workout = Workout(date=workout_data.get('date'), type=workout_data["type"], duration=workout_data["duration"], intensity=workout_data["intensity"], notes = workout_data.get('notes'))
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
    body = {'error': f'Workout {id} not found.'}
    status = 404
  return make_response(body,status)

#workout exercise routes
@app.route('/api/workouts/<workout_id>/exercises', methods=["POST"])
def create_workout_exercise(workout_id):
  data = request.get_json()
  exercise_data = WorkoutExerciseSchema().load(data)
  exercise = WorkoutExercise(workout_id=workout_id,name=exercise_data["name"],sets=exercise_data.get('sets'),reps=exercise_data.get('reps'),weight=exercise_data.get('weight'))
  if exercise:
    db.session.add(exercise)
    db.session.commit()
    result = WorkoutExerciseSchema().dump(exercise)
    return make_response(result, 201)
  else:
    return make_response({"error": "workout exercise could not be created. Please try again"},400)

@app.route('/api/workouts/<workout_id>/exercises/<id>', methods=["PATCH"])
def update_workout_exercise(workout_id,id):
  workout_exercise = WorkoutExercise.query.filter_by(id=id, workout_id=workout_id).first()
  data = request.get_json()
  if workout_exercise:
    if 'name' in data:
      workout_exercise.name = data['name']
    if 'sets' in data:
      workout_exercise.sets = data['sets']
    if 'reps' in data:
      workout_exercise.reps = data['reps']
    if 'weight' in data:
      workout_exercise.weight = data['weight']

    db.session.commit()
    return {'message': f'Workout Exercise {id} updated successfully'}, 200
  else:
    return {'error': f'Workout Exercise {id} not found'}, 404

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
  pass

@app.route('/api/moods/<id>', methods=["DELETE"])
def delete_mood(id):
  pass

#weather routes

if __name__ == '__main__':
  app.run(port=5555, debug=True)