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
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import api from "@/services/api";
import { useRouter } from "next/navigation";

// Define the form input types
type LoginFormInputs = {
    username: string;
    password: string;
};

export default function LoginForm() {
    const toast = useToast(); // Initialize the toast hook
    const router = useRouter(); // Initialize the router hook

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
        api.post("/auth/login", data, { withCredentials: true})
            .then((response) => {
                toast({
                    title: "Login Successful.",
                    description: "You've logged in successfully.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                setCookie('username', data.username, 7); // Set cookie for 7 days
                setTimeout(() => {
                    reset()
                    router.push("/");
                    router.refresh()

                }, 3000)
            })
            .catch((error) => {

                toast({
                    title: "Login Failed.",
                    description: error.response.data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            })
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
                                // pattern: {
                                //     value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/,
                                //     message:
                                //         "Password must contain at least one uppercase, one lowercase, one number, and one special character",
                                // },
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
