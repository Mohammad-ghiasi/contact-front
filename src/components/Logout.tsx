"use client"
import api from '@/services/api'
import { Button, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function Logout() {
    const toast = useToast();
    const router = useRouter();
    const deleteCookie = (name: string) => {
        document.cookie = `${name}=; Max-Age=-99999999;`; // Set a past expiration date
    };
    const logerout = async () => {
        api.post("/auth/logout")
            .then((response) => {
                toast({
                    title: "Logout Successful.",
                    description: "You've logged out successfully.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                deleteCookie('username'); 
                setTimeout(() => {
                    router.refresh()
                }, 1500)
            })
            .catch((error) => {
                toast({
                    title: "Logout Failed.",
                    description: error.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            })
    }
    return (
        <Button onClick={(): Promise<void> => logerout()} colorScheme='red'>
            Logout
        </Button>
    )
}
