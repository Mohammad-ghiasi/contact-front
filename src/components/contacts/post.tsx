"use client";
import { useState } from "react";
import axios from "axios";
import api from "@/services/api";

export default function Contact() {
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        setLoading(true);
        // const data = {
        //     username: "Gholi",
        //     password: "1234",
        //     email: "lwndckjnw",
        // };
        const data = {
            name: "Gholi",
            phone: "091888888865",
            email: "lwndckjnw",
        };

        try {
            // const response = await api.post(
            //     "/auth/login",
            //     data
            // );
            // const response = await api.post(
            //     "/contact",
            //     data
            // );
            const response = await api.get(
                "/get-contacts"
            );

            console.log( response.data.data);
        } catch (error) {
            if (error.response) {
                // Request made and server responded with a status code
                // that falls out of the range of 2xx
                console.error("Error response data:", error.response.data);
                console.error("Error response status:", error.response.status);
                console.error("Error response headers:", error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.error("Error request:", error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error("Error message:", error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={handleSignup} disabled={loading}>
                {loading ? "Loading..." : "Sign Up"}
            </button>
        </div>
    );
}
