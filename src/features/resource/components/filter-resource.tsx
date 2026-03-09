"use client";
import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { cn } from "@/shared/lib/utils";

export default function FilterResource() {
    const [filterByName, setFilterByName] = useState<boolean>(false);
    const [filterByPrice, setFilterByPrice] = useState<boolean>(false);

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            "h-14 text-xl px-8",
                            "w-full sm:w-32 md:w-40 lg:w-48",
                            "transition-all duration-200 shadow-sm bg-white"
                        )}
                    >
                        Filter
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48" align="end">
                    <DropdownMenuGroup>
                        <DropdownMenuLabel>Filter resources</DropdownMenuLabel>
                        <DropdownMenuCheckboxItem
                            checked={filterByName ?? false}
                            onCheckedChange={setFilterByName}
                            className="py-3 text-base"
                        >
                            Name
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={filterByPrice}
                            onCheckedChange={setFilterByPrice}
                            className="py-3 text-base"
                        >
                            Price
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
