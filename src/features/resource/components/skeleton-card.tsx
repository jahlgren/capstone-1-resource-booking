import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";

export default function SkeletonCard() {
    const skeletonCards: number[] = Array.from({ length: 8 });

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {skeletonCards.map((_, index) => (
                <Card key={index} className="relative mx-auto w-full max-w-sm pt-0 overflow-hidden">
                    <Skeleton className="aspect-video w-full rounded-none" />
                    <CardHeader>
                        <Skeleton className="h-4 w-1/2 mb-2" />
                        <Skeleton className="h-4 w-2/3" />
                    </CardHeader>
                    <CardFooter className="flex items-center justify-evenly gap-3">
                        <Skeleton className="h-10 flex-1" />
                        <Skeleton className="h-10 flex-1" />
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
