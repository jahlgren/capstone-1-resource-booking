import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createResource } from "../server/create-resource";
import {
    CreateResourceInput,
    createRoesourceSchema,
} from "../validation/create-resource-validator";
import { Resource } from "../types/resource";

async function handleCreateResource(input: CreateResourceInput) {
    const parsed = createRoesourceSchema.safeParse(input);
    if (!parsed.success) {
        throw new Error("Invalid input");
    }
    const res = await fetch("/api/resource", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(parsed.data),
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create resource");
    }
    return res.json();
}

export default function useCreateResourceMutation() {
    const queryClient = useQueryClient();
    return useMutation<
        Resource,
        Error,
        CreateResourceInput,
        { toastId: string }
    >({
        mutationFn: async (data) => await handleCreateResource(data),
        retry: false,
        onMutate: () => {
            const toastId = toast.loading("Creating resource...");
            return { toastId };
        },
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ["resource"] });
            toast.success("Resource created", {
                id: context.toastId,
                duration: 2000,
            });
        },
        onError: (err, _, context) => {
            toast.error(
                (
                    <div>
                        <strong className="font-medium">
                            Företagsskapandet misslyckades
                        </strong>
                        <p>{err.message}</p>
                    </div>
                ),
                {
                    id: context?.toastId,
                    duration: 3000,
                },
            );
        },
    });
}
