import React from "react";
import "./SleepPage.css";
import { useState, useEffect } from "react";
import SleepCard from "../SleepCard/SleepCard";
import { Link } from "react-router-dom";
import axios from "axios";

const SleepPage = ({ user }) => {

    const [sleepData, setSleepData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/sleep/${user.id}`)
        .then((response) => {
            console.log(response.data)
            setSleepData(response.data.sleep);
        })
        .catch((error) => {
            console.log("error:", error);
        })
    }, [user.id])

    return (

        <div>
            SleepPage
            <Link to="/sleep/create">Create Sleep Item</Link>
            {sleepData ? (
                sleepData.map((sleep) => {
                    return (
                        <SleepCard 
                            key={sleep.id}
                            sleep={sleep}
                        />
                    )
                })
            ) : (<h2>No Sleep Data</h2>)}
        </div>

    );
};

export default SleepPage;