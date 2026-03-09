"use client";
import React, { use } from "react";
import CreateResourceDialog from "../components/create-resource-dialog";
import { Button } from "@/shared/components/ui/button";
import useResourcesQuery from "../hooks/use-resource-query";
import ListResource from "../components/list-resource";
import { IconPlus } from "@tabler/icons-react";
import SearchResource from "../components/search-resource";
import FilterResource from "../components/filter-resource";
import { Spinner } from "@/shared/components/ui/spinner";
import SkeletonCard from "../components/skeleton-card";

export default function resourceScreen() {
  const { data: resource, isPending } = useResourcesQuery();

  return (
    <div className="bg-[#DDEBF1] flex-1 p-6">
      <div className="flex justify-between items-center mb-10">
        <div className="flex flex-col gap-3">
          <h1 className="text-5xl font-bold">Resources</h1>
          <p className="text-2xl">Browse available Shared Resources</p>
        </div>

        <Button className="h-15 px-5 text-lg">
          <CreateResourceDialog>
            <div className="flex items-center gap-3">
              <IconPlus size={20} /> Add Resource
            </div>
          </CreateResourceDialog>
        </Button>
      </div>

      <div className="flex items-center justify-between mb-10">
        <SearchResource />
        <FilterResource />
      </div>

      <div className="">
        {isPending
          ? <SkeletonCard />
          : <ListResource resource={resource} />}
      </div>
    </div>
  );
}
