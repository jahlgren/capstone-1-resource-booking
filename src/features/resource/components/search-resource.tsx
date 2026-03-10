"use client";
import { Input } from "@/shared/components/ui/input";
import { cn } from "@/shared/lib/utils";
import { IconSearch } from "@tabler/icons-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchResource() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }

        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="relative w-full max-w-lg">
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10" />
            <Input
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get("query")?.toString()}
                placeholder="Search"
                className={cn(
                    "h-14 pl-12 text-xl md:text-xl",
                    "bg-white brder-2 border-border shadow-sm",
                    "focus:border-primary focus:ring-2 focus:ring-primary/20",
                    "transition-all duration-200",
                    "focus:caret-primary hover:caret-black",
                )}
            />
        </div>
    );
}
