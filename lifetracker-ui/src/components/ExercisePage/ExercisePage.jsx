import React from "react";
import "./ExercisePage.css";
import { useState, useEffect } from "react";
import ExerciseCard from "../ExerciseCard/ExerciseCard";
import { Link } from "react-router-dom";
import axios from "axios";



const ExercisePage = ({ user }) => {

    const [exerciseData, setExerciseData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/exercise/${user.id}`)
        .then((response) => {
            setExerciseData(response.data.allExercises);
        })
        .catch((error) => {
            console.log("error:", error);
        })
    }, [user.id])

    console.log("user in Exercise Page:", user);
    return (
        <div>
            ExercisePage
            <Link to="/exercise/create">Create Exercise Item</Link>
            {exerciseData ? (
                exerciseData.map((exercise) => {
                    return (
                        <ExerciseCard 
                            key={exercise.id}
                            exercise={exercise}
                        />
                    )
                })) : (<h2>No Exercise Data</h2>) }
        </div>
    );
};

export default ExercisePage; 