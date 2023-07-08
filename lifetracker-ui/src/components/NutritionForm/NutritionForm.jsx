import React from "react"; 
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./NutritionForm.css"


const NutritionForm = ({ user }) => {

    const navigate = useNavigate();
    const [newNutritionData, setNewNutritionData] = useState({
        nutritionName: "",
        nutritionCategory: "",
        calories: null,
        imageUrl: "",
        quantity: 1,
    }); 

    const handleNewNutritionInputChange = (event) => {
        const { name, value } = event.target;
        setNewNutritionData((prevNewNutritionData) => ({
            ...prevNewNutritionData,
            [name]: value,
        }));
        console.log(event.target.value)
        console.log("newNutritionData:", newNutritionData)
    }


    const handleAddNutritionFormSubmit = (event) => {
        event.preventDefault(); 
  
        const params = {
            nutritionInfo: newNutritionData,
            userID: user.id,
        }; 

        axios.post("http://localhost:3001/nutrition/create", params)
        .then((response) => {
            console.log("Successfully posted into the database!");
            navigate("/nutrition");
        })
    }



    return (
        <div className="nutrition-form">
            <h2 className="nutrition-heading">Record Nutrition</h2>
            <div className="form-container">
            <form onSubmit={handleAddNutritionFormSubmit}>
                <div className="div-inputs">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    name="nutritionName"
                    id="name"
                    value={newNutritionData.name}
                    onChange={handleNewNutritionInputChange}
                    required
                />
                <label htmlFor="category">Category:</label>
                <select name="nutritionCategory" value={newNutritionData.category} onChange={handleNewNutritionInputChange} required>
                    <option value="">Select a Category</option>
                    <option value="Snack">Snack</option>
                    <option value="Beverage">Beverage</option>
                    <option value="Food">Food</option>
                </select>
                <label htmlFor="calories">Calories:</label>
                <input
                    type="number"
                    name="calories"
                    id="calories"
                    value={newNutritionData.calories}
                    onChange={handleNewNutritionInputChange}
                    step="10"
                    required
                />
                <label htmlFor="quantity">Quantity:</label>
                <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    value={newNutritionData.quantity}
                    onChange={handleNewNutritionInputChange}
                />
                <label htmlFor="imageUrl">Image URL:</label>
                <input
                    type="text"
                    name="imageUrl"
                    id="imageUrl"
                    value={newNutritionData.imageUrl}
                    onChange={handleNewNutritionInputChange}
                />

                <button type="submit" className="save-button">save</button>
                </div>
            </form>
            </div>
        </div>
    );
};

export default NutritionForm; 