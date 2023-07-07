import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import NutritionForm from "../NutritionForm/NutritionForm";
import { Link } from "react-router-dom";
import NutritionCard from "../NutritionCard/NutritionCard";
import "./NutritionPage.css";

const NutritionPage = ({ user }) => {
  const [nutritionData, setNutritionData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/nutrition/${user.id}`)
      .then((response) => {
        console.log("response.data:", response.data);
        setNutritionData(response.data.nutrition);
        console.log("nutritionData:", nutritionData);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  }, [user.id]);

  console.log("user in Nutrition Page:", user);
  return (
    <div>
      <div className="css-1ef7k5z">
        <div className="chakra-stack css-1cgbrw5">
          <h2 className="chakra-heading css-b5coes">Nutrition</h2>
        </div>
      </div>

      <div className="nutrition-content">
        <div className="nutrition-content1">
            <div className="nutrition-container">
                <div className="nutrition-feed">
        <Link to="/nutrition/create" className="button css-spn4bz">Create Nutrition Item</Link>
        {nutritionData ? (
          nutritionData.map((nutrition) => {
            return <NutritionCard key={nutrition.id} nutrition={nutrition} />;
          })
        ) : (
          <h2>No Nutrition Data</h2>
        )}
        </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionPage;
