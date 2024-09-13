"use server"
import api from '@/services/api';
import { Box, Text } from '@chakra-ui/react'
import axios from 'axios';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { cookies } from 'next/headers';
import Link from 'next/link'
import Logout from '../Logout';
import UserAvatar from '../Avatar';



export default async function Header(): Promise<JSX.Element> {
    const cookieStore: ReadonlyRequestCookies = cookies();
    const authToken: string | undefined = await cookieStore.get('auth_token')?.value;
    const isAuthenticated: boolean = Boolean(authToken);


    return (
        <header>
            <Box className='flex flex-row justify-between items-center shadow-md pb-2'>
                <Box>
                    <Text className='text-2xl font-semibold'>Mycontacts</Text>
                </Box>
                <Box>
                    <Box className='flex space-x-10 text-lg font-semibold'>
                        {/* <Link href='/'>Home</Link>
                        <Link href='/'>Signup</Link>
                        <Link href='/'>Contacts</Link>
                        <Link href='/'>Logout</Link> */}
                        {isAuthenticated ? (
                            <Box className='flex space-x-8 items-center'>
                                {/* if is login */}
                                <Link href='/addContact'>Add contact</Link>
                                <UserAvatar />
                                <Logout />
                            </Box>
                        ) : (
                            // if is not login
                            <Link href='/signup'>signup</Link>
                        )}
                    </Box>
                </Box>
            </Box>
        </header>
    )
}
