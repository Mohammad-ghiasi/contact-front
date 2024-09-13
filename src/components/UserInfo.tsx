"use server";
import { Box, Heading, Text } from "@chakra-ui/react";
import { cookies } from "next/headers";

export default async function UserInfo() {
    const cookieStore = await cookies();
    const username = cookieStore.get('username')?.value || null;

    return (
            <Text fontSize="lg">
                <strong>Wellcome:</strong> {username || "No username found"} !
            </Text>
    );
}
