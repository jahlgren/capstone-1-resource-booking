import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/features/auth/server/auth-server";
import MyListingsScreen from "@/features/my-listings/screens/my-listings-screen";

export default async function MyListingsPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (session?.user) {
        return (
            <div>
                <MyListingsScreen user={session?.user}/>
            </div>
        );
    }

    return (
        redirect("/login")
    );
}
