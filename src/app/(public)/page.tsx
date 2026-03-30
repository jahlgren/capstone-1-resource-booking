import { headers } from "next/headers";
import { auth } from "@/features/auth/server/auth-server";
import LandingScreen from "@/features/landing/screens/landing-screen";
import HomeScreen from "@/features/home/screens/home-screen";

export default async function IndexPage() {

  const session = await auth.api.getSession({
    headers: await headers()
  });


  if(session?.user) {
    return (
      <div className="flex flex-col gap-4">
        <HomeScreen user={session?.user}/>
      </div>
    )
  }

  return (
    <div>
      <LandingScreen />
    </div>
  )
}
