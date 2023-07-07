import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
const ExerciseForm = ({ user }) => {

    const navigate = useNavigate();
    const [newExerciseData, setNewExerciseData] = useState({
        category: "", 
        name: "", 
        duration: 0,
        intensity: 0,
    });

    const handleNewExerciseInputChange = (event) => {
        const { name, value } = event.target;
        setNewExerciseData((prevNewExerciseData) => ({
            ...prevNewExerciseData,
            [name]: value,
        })); 

        console.log("newExerciseData:", newExerciseData)
    };

    const handleAddExerciseFormSubmit = (event) => {
        event.preventDefault(); 
        const category = newExerciseData.category;
        const name = newExerciseData.name;
        const duration = newExerciseData.duration;
        const intensity = newExerciseData.intensity;
        const exerciseInfo = {
            category: category,
            name: name,
            duration: duration,
            intensity: intensity,
        };

        const params = {
            exerciseInfo: exerciseInfo,
            userID: user.id,
        };

        axios.post("http://localhost:3001/exercise/create", params)
        .then((response) => {
            console.log("Successfully posted into the database!");
            navigate("/exercise");
        }); 
    }

    return (
        <div>
            <form onSubmit={handleAddExerciseFormSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={newExerciseData.name}
                    onChange={handleNewExerciseInputChange}
                />
                <label htmlFor="category">Category:</label>
                <select name="category" id="category" value={newExerciseData.category} onChange={handleNewExerciseInputChange}>
                    <option value="" selected disabled hidden></option>
                    <option value="cardio">Cardio</option>
                    <option value="strength">Strength</option>
                    <option value="flexibility">Flexibility</option>
                    <option value="balance">Balance</option>
                </select>
                <label htmlFor="duration">Duration:</label>
                <input
                    type="number"
                    name="duration"
                    id="duration"
                    value={newExerciseData.duration}
                    onChange={handleNewExerciseInputChange}
                />
                <label htmlFor="intensity">Intensity:</label>
                <input
                    type="number"
                    name="intensity"
                    id="intensity"
                    value={newExerciseData.intensity}
                    onChange={handleNewExerciseInputChange}
                />
                <button type="submit">Add Exercise Item</button>
            </form>
        </div>
    );
};

export default ExerciseForm; 