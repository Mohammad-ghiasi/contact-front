"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Box,
    useToast,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from 'js-cookie'; // Import js-cookie
import { useRouter } from "next/navigation";
import api from "@/services/api";

interface Contact {
    _id: string;
    name: string;
    phone: string;
} // Define your Contact type accordingly

// Define the form input types
interface EditContactFormInputs {
    name: string;
    phone: string;
}

interface EditContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    contact: Contact;
}

export default function EditContactModal({
    isOpen,
    onClose,
    contact,
}: EditContactModalProps) {
    const router = useRouter();
    // Initialize useForm with default values
    const { register, handleSubmit, formState: { errors } } = useForm<EditContactFormInputs>({
        defaultValues: {
            name: contact.name,
            phone: contact.phone
        }
    });
    const toast = useToast();

    const onSubmit: SubmitHandler<EditContactFormInputs> = async (data) => {
        const token = Cookies.get('auth_token'); // Get the auth_token from cookies

        if (!token) {
            toast({
                title: "Error",
                description: "No auth_token found in cookies",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        await api.put("/contacts/edit-contact", {
            id: contact._id, // Pass the contact ID to update
            ...data,
        }, {
            params: {
                auth_token: token // Send the token as a query parameter
            }
        })
            .then((response) => {
                toast({
                    title: "Contact updated.",
                    description: response.data.message,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                onClose();
                router.refresh(); // Refresh the router to update the contacts list
            })
            .catch((error) => {
                toast({
                    title: error.response?.data?.message || 'An error occurred',
                    description: error.response?.data?.message || 'An error occurred',
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Contact</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl isInvalid={!!errors.name} mb={4}>
                            <FormLabel htmlFor="name">Name</FormLabel>
                            <Input
                                id="name"
                                placeholder="Enter contact name"
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.name && <Box color="red.500">{errors.name.message}</Box>}
                        </FormControl>

                        <FormControl isInvalid={!!errors.phone} mb={4}>
                            <FormLabel htmlFor="phone">Phone</FormLabel>
                            <Input
                                id="phone"
                                placeholder="Enter contact phone number"
                                {...register("phone", { required: "Phone is required" })}
                            />
                            {errors.phone && <Box color="red.500">{errors.phone.message}</Box>}
                        </FormControl>
                    </form>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSubmit(onSubmit)}>
                        Update Contact
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
