// app/components/UserAvatar.tsx
import { Avatar, Box, Text } from '@chakra-ui/react';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { cookies } from 'next/headers';

const UserAvatar: React.FC =  async () => {
    const cookieStore: ReadonlyRequestCookies = cookies();
    const username: string | undefined = await cookieStore.get('username')?.value;

    return (
        <Box>
            <Avatar name={username} size="md" />
        </Box>
    );
};

export default UserAvatar;
