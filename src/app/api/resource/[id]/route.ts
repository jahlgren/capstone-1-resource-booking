import { updateResource } from "@/features/resource/server/update-resource";
import { auth } from "@/features/auth/server/auth-server";
import { headers } from "next/headers";
import { getResourceById } from "@/features/resource/server/get-resources";
import { deleteResource } from "@/features/resource/server/delete-resource";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { createId } from "@paralleldrive/cuid2";


export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    } 
    const { id } = await params;
    const contentType = req.headers.get("content-type") ?? "";
    let data: Record<string, unknown> = {};

    if (contentType.includes("application/json")) {
        data = (await req.json()) as Record<string, unknown>;
    } else {
        const formData = await req.formData();
        const name = formData.get("name");
        const category = formData.get("category");
        const description = formData.get("description");
        const priceRaw = formData.get("price");
        const priceUnit = formData.get("priceUnit");
        const imageFile = formData.get("image");
        const removeImageRaw = formData.get("removeImage");
        const removeImage =
            removeImageRaw === "true" ||
            removeImageRaw === "1";

        const price =
            typeof priceRaw === "string"
                ? Number.parseFloat(priceRaw)
                : typeof priceRaw === "number"
                    ? priceRaw
                    : 0;

        let imageUrl: string | undefined;
        if (imageFile instanceof File && imageFile.size > 0) {
            const ext = path.extname(imageFile.name) || ".jpg";
            const filename = `${createId()}${ext}`;
            const uploadsDir = path.join(process.cwd(), "public", "uploads");
            await mkdir(uploadsDir, { recursive: true });
            const filepath = path.join(uploadsDir, filename);
            const buffer = Buffer.from(await imageFile.arrayBuffer());
            await writeFile(filepath, buffer);
            imageUrl = `/uploads/${filename}`;
        }

        data = {
            ...(typeof name === "string" ? { name: name.trim() } : {}),
            ...(typeof category === "string" ? { category } : {}),
            ...(typeof description === "string" ? { description } : {}),
            ...(Number.isFinite(price) ? { price } : {}),
            ...(typeof priceUnit === "string" ? { priceUnit } : {}),
            ...(imageUrl ? { image: imageUrl } : {}),
            ...(!imageUrl && removeImage ? { image: null } : {}),
        };
    }
    try {
        const updatedResource = await updateResource(id, data, session.user.id);
        return new Response(JSON.stringify(updatedResource), { status: 200 });
    } catch (error) {
        console.error("Error updating resource:", error);
        return new Response(JSON.stringify({ error: "Failed to update resource" }), { status: 500 });
    }
}


export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    const { id } = await params;
    try {
        const resource = await getResourceById(id);
        if (!resource) {
            return new Response(JSON.stringify({ error: "Resource not found" }), { status: 404 });
        }
        return new Response(JSON.stringify(resource), { status: 200 });
    } catch (error) {
        console.error("Error fetching resource:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch resource" }), { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    const { id } = await params;
    try {
        const resource = await getResourceById(id); 
        if (!resource) {
            return new Response(JSON.stringify({ error: "Resource not found" }), { status: 404 });
        }
        if (resource.userId !== session.user.id) {
            return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
        }
        await deleteResource(id);
        return new Response(JSON.stringify({ message: "Resource deleted" }), { status: 200 });
    } catch (error) {
        console.error("Error deleting resource:", error);
        return new Response(JSON.stringify({ error: "Failed to delete resource" }), { status: 500 });
    }
}