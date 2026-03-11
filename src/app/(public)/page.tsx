import { headers } from "next/headers";
import { auth } from "@/features/auth/server/auth-server";
import LandingScreen from "@/features/landing/screens/landing-screen";

export default async function IndexPage() {
  // This page is server rendererd.

  const session = await auth.api.getSession({
    headers: await headers()
  });


  if(session?.user) {
    return (
      <div className="flex flex-col gap-4">
        Hello {session.user.name}<br />
      </div>
    )
  }

  return (
    <div>
      <LandingScreen />
    </div>
  )
}
