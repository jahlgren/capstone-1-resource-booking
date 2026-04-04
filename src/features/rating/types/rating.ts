export type Rating = {
    id: string;
    userId: string;
    resourceId: string;
    stars: number;
    comment: string | null;
    createdAt?: string | Date;
}

export type CreateRating = {
    userId: string;
    resourceId: string;
    stars: number;
    comment: string;
}

export type RateResourceProps = {
    resourceId: string;
    userId: string;
}