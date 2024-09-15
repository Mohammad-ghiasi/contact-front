"use client";

import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, useDisclosure, Spinner, Alert, AlertIcon, Box, Text, useToast } from '@chakra-ui/react';
import api from '@/services/api';
import EditContactModal from './EditeContact';

type Contact = {
    name: string;
    phone: string;
    user: string;
    _id: string;
};

// Fetch contacts function
const fetchContacts = async (): Promise<Contact[]> => {
    const response = await api.get('/get-contacts');
    console.log('api');
    
    return response.data.data;
};

// Delete contact function
const deleteContact = async (contactId: string) => {
    await api.delete(`/remove-contact?id=${contactId}`);
};

const ContactsList = () => {
    const queryClient = useQueryClient();
    const toast = useToast(); // For showing notifications
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedContact, setSelectedContact] = React.useState<Contact | null>(null);

    // Fetch contacts using React Query
    const { data: contacts, isLoading, isError, error } = useQuery({
        queryKey: ['contacts'],
        queryFn: fetchContacts,
        refetchOnReconnect: true, // Refetch on reconnect
        staleTime: 0, // Data is considered fresh for 30 seconds
        gcTime: 60000 // Cache data for 1 minute
    });

    // Mutation for deleting a contact with optimistic updates
    const { mutate: deleteMutation } = useMutation({
        mutationFn: deleteContact,
        onMutate: async (contactId: string) => {
            // Cancel any in-flight queries
            await queryClient.cancelQueries({ queryKey: ['contacts'] });

            const previousContacts = queryClient.getQueryData<Contact[]>(['contacts']);

            // Optimistically remove the contact from the list
            queryClient.setQueryData(['contacts'], (old: Contact[] | undefined) =>
                old?.filter(contact => contact._id !== contactId)
            );

            return { previousContacts }; // Provide rollback data in case of failure
        },
        onError: (error: Error, contactId: string, context: any) => {
            queryClient.setQueryData(['contacts'], context?.previousContacts); // Rollback on error
            toast({
                title: 'Error deleting contact.',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        },
        onSettled: () => {
            // Refetch contacts whether success or failure happens
            queryClient.invalidateQueries({ queryKey: ['contacts'] });
        },
        onSuccess: () => {
            toast({
                title: 'Contact deleted successfully.',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        }
    });

    // Handle edit button click
    const handleEditClick = (contact: Contact) => {
        setSelectedContact(contact);
        onOpen(); // Open the modal
    };

    // Handle delete button click
    const handleDeleteClick = (contactId: string) => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            deleteMutation(contactId); // Trigger the delete mutation
        }
    };

    // Render loading and error states
    if (isLoading) return <Spinner />;
    if (isError) return <Alert status="error"><AlertIcon />{error.message}</Alert>;

    return (
        <div>
            {contacts?.length ? (
                <>
                    <Box className='grid grid-cols-4'>
                        {contacts.map((contact: Contact) => (
                            <Box className='flex flex-col justify-center items-center space-y-5 my-7 shadow-lg py-3' key={contact._id}>
                                <Box>
                                    <Text>Name: <span className='font-semibold'>{contact.name}</span></Text>
                                    <Text>Phone: <span className='font-semibold'>{contact.phone}</span></Text>
                                </Box>
                                <Box>
                                    <Button onClick={() => handleEditClick(contact)} marginRight={2} colorScheme='blue'>
                                        Edit {contact.name}
                                    </Button>
                                    <Button onClick={() => handleDeleteClick(contact._id)} colorScheme="red">
                                        Delete
                                    </Button>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                    {selectedContact && (
                        <EditContactModal
                            isOpen={isOpen}
                            onClose={() => {
                                setSelectedContact(null); // Clear selected contact
                                onClose(); // Close the modal
                                queryClient.invalidateQueries({ queryKey: ['contacts'] }); // Refetch contacts for fresh data
                            }}
                            contact={selectedContact}
                        />
                    )}
                </>
            ) : (
                <p>No contacts found</p>
            )}
        </div>
    );
};

export default ContactsList;
