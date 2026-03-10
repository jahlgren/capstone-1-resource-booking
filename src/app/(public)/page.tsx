import { headers } from "next/headers";
import { auth } from "@/features/auth/server/auth-server";
import LogoutButton from "@/features/auth/components/logout-button";
import ResourceScreen from "@/features/resource/screens/resource-screen";

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
      Index page
    </div>
  )
}
