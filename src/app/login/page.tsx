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
import api from "@/services/api";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

// Define the form input types
type LoginFormInputs = {
    username: string;
    password: string;
};

export default function LoginForm() {
    const toast = useToast();
    const router = useRouter();
    const setCookie = (name: string, value: string, days: number) => {
        Cookies.set(name, value, { expires: days }); // Use js-cookie to set the cookie
    };
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<LoginFormInputs>();

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        try {
            // Perform login
            const response = await api.post("/auth/login", data);
            const token = response.data.token;

            // Set the token in the cookie using your backend route
            await axios.post("http://localhost:3001/api/auth/set-cookie", { token }, { withCredentials: true });
            await setCookie('username', data.username, 7); // Set cookie for 7 days
            toast({
                title: "Login Successful.",
                description: "You've logged in successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            setTimeout(() => {
                reset();
                router.push("/");
                router.refresh();
            }, 1500);
        } catch (error: any) {
            toast({
                title: "Login Failed.",
                description: error.response?.data?.message || "An error occurred",
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
                Login
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
                        Login
                    </Button>
                </VStack>
            </form>
        </Box>
    );
}
