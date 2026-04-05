export type Rating = {
    id: string;
    userId: string;
    resourceId: string;
    stars: number;
    comment: string | null;
    createdAt?: string | Date;
    reviewerName?: string | null;
    reviewerImage?: string | null;
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

export type ReviewCardProps = {
    review: Rating;
    className?: string;
};