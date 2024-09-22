"use client";
import { useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie'; // Import js-cookie

export default function Ggg() {
    const [loading, setLoading] = useState(false);

    const handleGetContacts = async () => {
        setLoading(true);

        // Get the auth_token from cookies using js-cookie
        // const token = Cookies.get('auth_token');

        // if (!token) {
        //     console.error("No auth_token found in cookies!");
        //     setLoading(false);
        //     return;
        // }

        const data = {
            phoneNumber: "079187012481"
        }
        try {
            // // Send the token as a query parameter
            const response = await
                axios.post(`https://localhost:7260/Account/PhoneNumber`, data);
            console.log(response);


        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={handleGetContacts} disabled={loading}>
                {loading ? "Loading..." : "Get Contacts"}
            </button>
        </div>
    );
}
