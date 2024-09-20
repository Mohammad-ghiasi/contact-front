import ContactsList from "@/components/GetContacts";
import Header from "@/components/header/Header";
import PwaNotif from "@/components/PwaNotif";
import UserInfo from "@/components/UserInfo";
import { Text } from "@chakra-ui/react";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers"

export default async function Home() {
  const cookieStore: ReadonlyRequestCookies = cookies();
  const authToken: string | undefined = await cookieStore.get('auth_token')?.value;
  const isAuthenticated: boolean = Boolean(authToken);

  return (
    <>
   
      <Header />
      {(!isAuthenticated) && (
        <Text className="text-lg font-semibold text-center mt-10">Plese signup to useing the app :)</Text>
      )}
      {isAuthenticated && (
        <>
          <UserInfo />
          <ContactsList />
        </>
      )}
      <PwaNotif />
    </>
  );
}




// { withCredentials: true } 
// for cookie settings

// axios.get(`http://localhost:3000/get-contacts`, { withCredentials: true } )