// app/login/page.tsx
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
    Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import api from "@/services/api";

// Define the form input types
type SignUpFormInputs = {
    username: string;
    email: string;
    password: string;
};

export default function SignUpForm() {
    const toast = useToast();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<SignUpFormInputs>();

    const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
        try {
            await api.post("/auth/signup", data); // Adjust API endpoint if needed

            toast({
                title: "Sign Up Successful.",
                description: "You've signed up successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });

            setTimeout(() => {
                reset();
                router.push("/login");
            }, 1500);
        } catch (error: any) {
            toast({
                title: "Sign Up Failed.",
                description: error.response?.data?.message || "An error occurred.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
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
                Sign Up
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing={4}>
                    {/* Username */}
                    <FormControl isInvalid={!!errors.username}>
                        <FormLabel htmlFor="username">Username</FormLabel>
                        <Input
                            id="username"
                            placeholder="Enter your username"
                            {...register("username", {
                                required: "Username is required",
                                minLength: {
                                    value: 3,
                                    message: "Username must be at least 3 characters",
                                },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.username && errors.username.message}
                        </FormErrorMessage>
                    </FormControl>

                    {/* Email */}
                    <FormControl isInvalid={!!errors.email}>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Enter a valid email address",
                                },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.email && errors.email.message}
                        </FormErrorMessage>
                    </FormControl>

                    {/* Password */}
                    <FormControl isInvalid={!!errors.password}>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters",
                                },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.password && errors.password.message}
                        </FormErrorMessage>
                    </FormControl>

                    {/* Submit Button */}
                    <Button
                        colorScheme="blue"
                        isLoading={isSubmitting}
                        type="submit"
                        width="full"
                    >
                        Sign Up
                    </Button>
                </VStack>
            </form>
            <Text className="mt-5">Already have an account? <Link href='/login' className="ms-3 font-semibold text-blue-400">Login</Link></Text>
        </Box>
    );
}
