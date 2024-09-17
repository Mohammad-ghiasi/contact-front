"use client";

import api from '@/services/api';
import { Button, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Logout() {
    const toast = useToast();
    const router = useRouter();

    const deleteCookie = (name: string) => {
        document.cookie = `${name}=; Max-Age=-99999999;`; // Set a past expiration date
    };

    const logout = async () => {
        try {
            await api.post("/auth/logout");
            toast({
                title: "Logout Successful.",
                description: "You've logged out successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            // Remove cookies
            deleteCookie('username'); 
            deleteCookie('auth_token'); // Remove auth_token as well
            // Refresh or redirect after logout
            setTimeout(() => {
                router.refresh();
            }, 1500);
        } catch (error: any) {
            toast({
                title: "Logout Failed.",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Button onClick={logout} colorScheme='red'>
            Logout
        </Button>
    );
}
