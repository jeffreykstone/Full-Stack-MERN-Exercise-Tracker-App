import './App.css';
import React, { useState }  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddExercisePage from './pages/AddExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import Navigation from "./components/Navigation";
import { GiWeightLiftingUp } from 'react-icons/gi'

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState([]);

  return (
    <div className="App">
      <Router>
        <header>
          <h1><GiWeightLiftingUp/> Exercise Tracker <GiWeightLiftingUp/></h1> <br /><br />
          <p>Track your workouts here!</p>
        </header>

        <Navigation />
        <main>
          <Routes className="App-header">
            <Route path="/" element={<HomePage setExerciseToEdit=
              {setExerciseToEdit}/>} />
            <Route path="/add-exercise" element={<AddExercisePage />} />
            <Route path="/edit-exercise" element={<EditExercisePage exerciseToEdit=
              {exerciseToEdit} />} />
          </Routes>
        </main>

        <footer>&copy; 2022
            <a href="https://gist.github.com/jeffreykstone"> &nbsp;
            Gent Stone
          </a>
        </footer>

      </Router>
    </div>
  );
}

export default App;
