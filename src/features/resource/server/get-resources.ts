import db from "@/db";
import { resource } from "../model/resource";

export async function getResources() {
    return db.select().from(resource);
}