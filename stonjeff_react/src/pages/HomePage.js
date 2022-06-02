import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import ExerciseList from '../components/ExerciseList';

function HomePage({ setExerciseToEdit }) {

    const navigate = useNavigate()
    const [exercises, setExercises] = useState([]);

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            setExercises(exercises.filter(e => e._id !== _id));
        } else {
            console.error(`Failed to delete exercise with id = ${_id}, status code = ${response.status}`)
        }
    };

    const onEdit = exercise => {
        setExerciseToEdit(exercise);
        navigate("/edit-exercise");
    }

    const loadExercises = async () => {
      const response = await fetch('/exercises');
        const data = await response.json();
      setExercises(data);
    };

    useEffect(() => {
      loadExercises();
    }, []);

    return (
        <>
            <h2>List of Exercises</h2>
            <ExerciseList exercises={exercises} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
}

export default HomePage;