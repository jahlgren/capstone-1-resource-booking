import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/features/auth/server/auth-server";
import FavoritesScreen from "@/features/favorites/screens/favorites-screen";

export default async function FavoritesPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (session?.user) {
        return (
            <div>
                <FavoritesScreen />
            </div>
        );
    }

    return (
        redirect("/login")
    );
}
