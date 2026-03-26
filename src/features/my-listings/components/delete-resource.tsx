"use client";
import useDeleteResourceMutation from "@/features/resource/hooks/use-resource-delete-query";
import { Resource } from "@/features/resource/types/resource";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog";
import { Button } from "@/shared/components/ui/button";
import { Trash2 } from "lucide-react";

export default function DeleteResource({ res }: { res: Resource }) {
    const { mutate } = useDeleteResourceMutation();

    const onDelete = () => {
        mutate({
            id: res.id,
        });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-2xl bg-slate-50 hover:bg-red-500 hover:text-white border-none shadow-none transition-all duration-300"
                >
                    <Trash2 className="size-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-3xl">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action will permanently delete your resource from
                        our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="!rounded-2xl">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="!rounded-2xl"
                        onClick={onDelete}
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
