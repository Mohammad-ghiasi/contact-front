"use client";
import { useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie'; // Import js-cookie

export default function Ggg() {
    const [loading, setLoading] = useState(false);

    const handleGetContacts = async () => {
        setLoading(true);
        
        // Get the auth_token from cookies using js-cookie
        const token = Cookies.get('auth_token');
        
        if (!token) {
            console.error("No auth_token found in cookies!");
            setLoading(false);
            return;
        }

        try {
            // // Send the token as a query parameter
            const response = await axios.get(`http://localhost:3000/contacts/get-contacts?auth_token=${token}`);
            console.log(response.data.data);

            
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
