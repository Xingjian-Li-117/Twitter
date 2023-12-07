import React, { useState, useEffect } from "react";
import axios from "axios";
import Tweet from "./Tweet";
import { useUser } from "../context/UserContext";

const TimelineTweet = () => {
    const [timeline, setTimeline] = useState([]); 
    const { currentUser } = useUser();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/tweets/timeline/all`);
                if (Array.isArray(response.data)) { 
                    setTimeline(response.data);
                } else {

                    setTimeline([]); 
                }
            } catch (error) {
                console.error("Error fetching timeline tweets", error);
                setTimeline([]); 
            }
        };

        fetchData();
    }, [currentUser]);

    return (
        <div className="mt-6">
            {timeline.map((tweet) => (
                <div key={tweet._id} className="p-2">
                    <Tweet tweet={tweet} setData={setTimeline} />
                </div>
            ))}
        </div>
    );
}

export default TimelineTweet;

