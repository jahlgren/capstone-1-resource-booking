import { createResource} from "@/features/resource/server/create-resource";
import { getResources } from "@/features/resource/server/get-resources";

export async function GET() {
    const resources = await getResources();
    return new Response(JSON.stringify(resources), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const newResource = await createResource(body);
        return new Response(JSON.stringify(newResource), {
            status: 201,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (err: any) {
        return new Response(JSON.stringify({ message: err.message || "Failed to create resource" }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } 
}