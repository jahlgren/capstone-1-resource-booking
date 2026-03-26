import { Session } from "@/features/auth/types/session";

export type MyListingsProps = {
    user: NonNullable<Session["user"]>;
}