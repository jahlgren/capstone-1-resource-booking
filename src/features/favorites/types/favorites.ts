import { InferSelectModel } from "drizzle-orm";
import { favorites } from "../model/favorites";

export type Favorites = InferSelectModel<typeof favorites>;

export type CreateFavoriteInput = { companyId: string };
