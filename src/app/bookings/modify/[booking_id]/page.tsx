import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/features/auth/server/auth-server";
import BookingModifyScreen from "@/features/booking/screens/booking-modify-screen";

export default async function BookingsPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (session?.user) {
        return (
            <div>
                <BookingModifyScreen />
            </div>
        );
    }

    return (
        redirect("/login")
    );
}
