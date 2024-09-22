"use client";

import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoLogoPwa } from "react-icons/io5";

interface BeforeInstallPromptEvent extends Event {
    prompt: () => void;
}

export default function PwaNotif() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [instalPromt, setInstalPromt] = useState<BeforeInstallPromptEvent | null>(null);
    const [hasShownModal, setHasShownModal] = useState(false); // Track if modal has been shown

    useEffect(() => {
        if (!hasShownModal) { // Only trigger on first mount
            const handleBeforeInstallPrompt = (e: any) => {
                e.preventDefault(); // Prevent automatic prompt
                setInstalPromt(e); // Save the event to trigger it later
                onOpen(); // Open the modal
            };

            window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

            return () => {
                window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
            };
        }
    }, [hasShownModal, onOpen]);

    useEffect(() => {
        if (isOpen) {
            setHasShownModal(true); // Mark modal as shown when opened
        }
    }, [isOpen]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Install app</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Install the web app to use it easily!
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='red' variant='outline' mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button onClick={() => {
                        instalPromt?.prompt();
                    }} colorScheme='blue' variant='outline' leftIcon={<IoLogoPwa size='30px' />}>
                        Install
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
