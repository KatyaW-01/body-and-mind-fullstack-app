# Body and Mind
Welcome to my fullstack app where you can track your workouts and moods and compare the data on a well formatted graph. 

## Features
* Home page with the number of workouts and moods you have tracked as well as buttons that will navigate you to forms for adding a new mood or workout as well as a button to view your graph
* Workout tracker page where you can view all of the workouts you have logged, edit or delete a workout, and log a new workout
* Mood tracker page where you can view all of the moods you have logged, edit or delte a mood, and log a new mood
* Analytics page where you can view the graph of your workout and mood data

## Skills demonstrated
* connecting flask backend to a react frontend
* react router
* useEffect hook
* useNavigate hook
* full CRUD functionality

## Endpoints 
* `GET /api/workouts`
* `POST /api/workouts`
* `PATCH /api/workouts/<id>`
* `DELETE /api/workouts/<id>`
* `POST /api/workouts/<workout_id>/exercises`
* `PATCH /api/workouts/<workout_id>/exercises/<id>`
* `DELETE /api/workouts/<workout_id>/exercises/<id>`
* `GET /api/moods`
* `POST /api/moods`
* `PATCH /api/moods/<id>`
* `DELETE /api/moods/<id>`

## Getting Started
* Clone repo onto your machine
  ```bash
  git clone <your-repo-url>
  cd <your-project-directory>
  ```
* Install necessarry dependencies 
  ```bash
  npm install
  ```
* Start the backend server
  ```bash
  cd server
  python app.py
  ```
* Start the frontend server
  ```bash
  npm run dev
  ```
* Copy the localhost link into your browser to view and interact with the application <br>
http://localhost:5173/
