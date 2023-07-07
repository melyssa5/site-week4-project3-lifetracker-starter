import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react"; 
const SleepForm = ({ user }) => {

    const navigate = useNavigate();
    const [sleepStartData, setSleepStartData] = useState("2023-01-01T12:00")
    const [sleepEndData, setSleepEndData] = useState("2023-01-01T12:00")

    const handleSleepStartInputChange = (event) => {
        const { name, value } = event.target;
        setSleepStartData((prevSleepStartData) => ({
            ...prevSleepStartData,
            [name]: value,
        }));

        console.log("sleepStartData:", sleepStartData)
    }

    const handleSleepEndInputChange = (event) => {
        const { name, value } = event.target;
        setSleepEndData((prevSleepEndData) => ({
            ...prevSleepEndData,
            [name]: value,
        }));

        console.log("sleepEndData:", sleepEndData)
    }

    const handleAddSleepFormSubmit = (event) => {
        event.preventDefault(); 
        const sleepStart = sleepStartData;
        const sleepEnd = sleepEndData;
        console.log("sleepStart:", sleepStart);
        console.log("sleepEnd:", sleepEnd);
        const sleepInfo = {
            start_time: sleepStart,
            end_time: sleepEnd,
        }

        console.log("sleepInfo:", sleepInfo)
        const params = {
            sleepInfo: sleepInfo,
            userID: user.id,
        }; 

        console.log("params:", params)

        axios.post("http://localhost:3001/sleep/create", params)
        .then((response) => {
            console.log("Successfully posted into the database!");
            navigate("/sleep");
        })
    }


    return (
        <div>
            <form onSubmit={handleAddSleepFormSubmit}>
                <label htmlFor="sleepStart">Sleep Start:</label>
                <input
                    defaultValue="2023-01-01T12:00"
                    type="datetime-local"
                    name="sleepStart"
                    id="sleepStart"
                    value={sleepStartData.sleepStart}
                    onChange={handleSleepStartInputChange}
                />
                <label htmlFor="sleepEnd">Sleep End:</label>
                <input
                    type="datetime-local"
                    defaultValue="2023-01-01T12:00"
                    name="sleepEnd"
                    id="sleepEnd"
                    value={sleepEndData.sleepEnd}
                    onChange={handleSleepEndInputChange}
                />
                <button type="submit">Add Sleep Item</button>
            </form>
        </div>
    );
};

export default SleepForm;