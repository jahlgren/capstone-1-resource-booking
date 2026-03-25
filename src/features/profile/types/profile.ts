import { Session } from "@/features/auth/types/session";

interface ProfileHeaderProps {
    user: {
        name: string;
        email: string;
        image?: string;
        createdAt: string;
    };
}

export type ProfileProps = {
    user: NonNullable<Session["user"]>;
}