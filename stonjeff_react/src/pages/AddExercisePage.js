import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddExercisePage = () => {
    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const navigate = useNavigate();

    const addExercise = async () => {
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert("Successfully added the exercise!");
        } else {
            alert(`Failed to add exercise, status code = ${response.status}`);
        }
        navigate("/");
    };

    return (
        <div>
            <h2>Add Exercise</h2>
            <input type="text" placeholder={"Exercise"} value={name}
                onChange={e => setName(e.target.value)}/>
            <input type="number" placeholder={"Reps"} value={reps}
                   onChange={e => setReps(e.target.value)}/>
            <input type="number" placeholder={"Weight"} value={weight}
                   onChange={e => setWeight(e.target.value)}/>
            <select name="unit" onChange={e => setUnit(e.target.value)}>
                <option value="" selected={"selected"} disabled hidden>Unit</option>
                <option value="lbs" >lbs</option>
                <option value="kgs">kgs</option>
            </select>
            <input type="text" placeholder={"MM-DD-YY"} value={date}
                   onChange={e => setDate(e.target.value)}/>
            <button onClick={addExercise}>Add</button>
        </div>
    )
}

export default AddExercisePage;