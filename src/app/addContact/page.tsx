"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    Input,
    FormLabel,
    VStack,
    Heading,
    useToast,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from 'js-cookie'; // Import js-cookie
import { useRouter } from "next/navigation";
import api from "@/services/api";

// Define the form input types
type ContactFormInputs = {
    name: string;
    phone: string;
};

export default function ContactForm() {
    const toast = useToast(); // Initialize the toast hook
    const router = useRouter(); // Initialize the router hook
    // Initialize the form
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ContactFormInputs>();

    // Form submit handler
    const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
        const token = Cookies.get('auth_token'); // Get the auth_token from cookies

        if (!token) {
            toast({
                title: "Error",
                description: "No auth_token found in cookies",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        try {
            await api.post('/contacts/contact', data, {
                params: {
                    auth_token: token // Send the token as a query parameter
                }
            });
            toast({
                title: "Contact Added Successful.",
                description: "Contact added successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            setTimeout(() => {
                reset();
                router.push("/");
            }, 3000);
        } catch (error: any) {
            toast({
                title: "Failed to create contact!",
                description: error.response?.data?.message || 'An error occurred',
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            console.log(error);
            
        }
    };

    return (
        <Box
            maxW="md"
            mx="auto"
            mt={8}
            p={6}
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="lg"
        >
            <Heading textAlign="center" mb={6}>
                Contact Form
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing={4}>
                    {/* Name Input */}
                    <FormControl isInvalid={!!errors.name}>
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <Input
                            id="name"
                            placeholder="Enter your name"
                            {...register("name", {
                                required: "Name is required",
                            })}
                        />
                        <FormErrorMessage>
                            {errors.name && errors.name.message}
                        </FormErrorMessage>
                    </FormControl>

                    {/* Phone Input */}
                    <FormControl isInvalid={!!errors.phone}>
                        <FormLabel htmlFor="phone">Phone</FormLabel>
                        <Input
                            id="phone"
                            placeholder="Enter your phone number"
                            {...register("phone", {
                                required: "Phone number is required",
                                pattern: {
                                    value: /^09[0-9]{9}$/, // Iranian mobile numbers start with 09 and are 11 digits long
                                    message: "Phone number must be a valid Iranian number (e.g., 09187012481)",
                                },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.phone && errors.phone.message}
                        </FormErrorMessage>
                    </FormControl>

                    {/* Submit Button */}
                    <Button
                        colorScheme="blue"
                        isLoading={isSubmitting}
                        type="submit"
                        width="full"
                    >
                        Submit
                    </Button>
                </VStack>
            </form>
        </Box>
    );
}
