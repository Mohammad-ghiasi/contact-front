"use client"

import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react"

interface BeforeInstallPromptEvent extends Event {
    prompt: () => void;
    // userChoice: Promise<{ outcome: string }>;
}

export default function PwaNotif() {
    const [instalPromt, setInstalPromt] = useState<BeforeInstallPromptEvent | null>(null)

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: any) => {
            e.preventDefault(); // Prevent automatic prompt
            setInstalPromt(e); // Save the event to trigger it later
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);
    console.log(instalPromt);



    return (
        <div className="">
            {instalPromt && (
                <>
                    <h1>PwaNotif</h1>
                    <Button onClick={() => {
                        instalPromt.prompt()
                    }}>Install PWA</Button>
                </>
            )}
        </div>
    )
}
