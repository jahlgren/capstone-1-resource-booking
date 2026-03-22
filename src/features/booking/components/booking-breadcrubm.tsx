"use client";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb";
import { Resource } from "@/features/resource/types/resource";

export default function BookingBreadcrumb({ resource }: { resource: Resource}) {
    return (
        <div className="py-2">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem className="text-md md:text-xl font-medium text-slate-500">
                        <BreadcrumbLink href="/bookings">Bookings</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="[&>svg]:size-6"/>
                    <BreadcrumbItem className="text-md md:text-xl font-bold text-slate-900">
                        <BreadcrumbPage className="line-clamp-1">
                            {resource.name}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}
