"use client";
import { useState } from "react";
import axios from "axios";
import api from "@/services/api";

export default function Ggg() {
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        setLoading(true);
        try {
            const response = await api.get('cookie');
            console.log('Axios Response:', response);
        } catch (error) {
            console.error('Error:', error);
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
