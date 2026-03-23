"use client";

import React, { useMemo } from "react";
import useResourcesQuery from "@/features/resource/hooks/use-resource-query";
import useFavoritesQuery from "@/features/favorites/hooks/use-favorite-query";
import ListResource from "@/features/resource/components/list-resource";
import SkeletonCard from "@/features/resource/components/skeleton-card";
import HeaderSection from "../components/header-section";
import EmptyState from "../components/empty-state";
import { Resource } from "@/features/resource/types/resource";
import CategoryFilter from "@/features/resource/components/category-filter";
import useResourceFilter from "@/features/resource/hooks/use-resource-filter";

export default function FavoritesScreen() {
    const { data: resources, isPending: isResourcesLoading } =
        useResourcesQuery();
    const { data: favorites, isLoading: isFavoritesLoading } =
        useFavoritesQuery();

    const favoriteResources = useMemo(() => {
        if (!resources || !favorites) return [];
        return resources.filter((res: Resource) =>
            favorites.some((fav) => fav.resourceId === res.id)
        );
    }, [resources, favorites]);

    const { filteredResources: filteredFavorites } = useResourceFilter(
        favoriteResources,
    );

    if (isResourcesLoading || isFavoritesLoading) {
        return (
            <div className="max-w-7xl mx-auto px-10 py-10">
                <div className="h-32 w-1/2 bg-slate-100 animate-pulse rounded-3xl mb-10" />
                <SkeletonCard />
            </div>
        );
    }

    return (
        <div className="flex-1 py-10 mx-10">
            <div className="max-w-7xl mx-auto space-y-10">
                <HeaderSection count={favoriteResources.length} />

                <div>
                    {favoriteResources.length > 0 && <CategoryFilter />}

                    {favoriteResources.length > 0
                        ? (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <ListResource
                                    resources={filteredFavorites}
                                    userFavorites={favorites || []}
                                />
                            </div>
                        )
                        : <EmptyState />}
                </div>
            </div>
        </div>
    );
}
