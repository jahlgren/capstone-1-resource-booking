"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";

import { Resource } from "@/features/resource/types/resource";
import { Card, CardFooter, CardHeader } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import DeleteResource from "./delete-resource";
import ModifyResource from "./modify-resource";

export default function ListingCard({ res }: { res: Resource }) {
    return (
        <Card className="group bg-white/80 relative pt-0 overflow-hidden rounded-3xl">
            <div className="relative aspect-video">
                <Image
                    src={res?.image || "/assets/placeholder.svg"}
                    alt={res.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
            </div>

            <div className="absolute left-4 top-4">
                <Badge className="font-black px-3 py-1 bg-gb-blue/85 backdrop-blur-md uppercase tracking-widest shadow-sm text-[10px] group-hover:bg-gb-blue transition-colors duration-300">
                    {res.category}
                </Badge>
            </div>

            <CardHeader className="space-y-2 border-b border-slate-300">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight group-hover:text-gb-blue transition-colors leading-tight">
                    {res.name}
                </h3>
                <p className="text-sm text-slate-500 font-medium line-clamp-2 leading-relaxed">
                    {res.description}
                </p>
            </CardHeader>

            <CardFooter className="flex items-center justify-between">
                <div className="flex flex-col">
                    {/* <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">
                        Daily Rate
                    </span> */}
                    <div className="flex items-baseline gap-0.5">
                        <span className="text-xs font-bold text-slate-900">
                            $
                        </span>
                        <span className="text-2xl font-black text-slate-900 leading-none">
                            {res.price}
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">
                                /{res.priceUnit}
                            </span>
                        </span>
                    </div>
                </div>

                <div className="flex gap-2.5">
                    <ModifyResource res={res}/>

                    <DeleteResource res={res} />

                    <Link href={`/resources/${res.id}`}>
                        <Button
                            variant="secondary"
                            size="icon"
                            className="rounded-2xl bg-slate-900 text-white hover:bg-gb-blue border-none shadow-lg shadow-slate-200 transition-all duration-300"
                        >
                            <Eye className="size-4" />
                        </Button>
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
}
