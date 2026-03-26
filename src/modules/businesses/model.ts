import db from "@/config/db";
import { eq, sql } from "drizzle-orm";
import schema, { vendor_venue_schema, vendor_artist_schema } from "./schema";
import repository from "./repository";
import { VENUE_TYPES } from "./attributes";

/** Check whether a given business type is a venue */
const isVenueType = (type?: string | null): boolean => {
    if (!type) return false;
    return VENUE_TYPES.includes(type as any);
};

class BusinessModel {
    // ─── Create ──────────────────────────────────────────────────────────────

    static async create(params: any) {
        const result = await db
            .insert(schema)
            .values(params as any)
            .returning();
        return result[0] ?? null;
    }

    static async createVenueDetail(params: any) {
        const result = await db
            .insert(vendor_venue_schema)
            .values(params as any)
            .returning();
        return result[0] ?? null;
    }

    static async createArtistDetail(params: any) {
        const result = await db
            .insert(vendor_artist_schema)
            .values(params as any)
            .returning();
        return result[0] ?? null;
    }

    // ─── Read ─────────────────────────────────────────────────────────────────

    /** List all businesses (common fields only) with pagination */
    static async findAll(params: any) {
        const { page = 1, limit = 10 } = params;
        const offset = (Number(page) - 1) * Number(limit);

        const items = await db
            .select(repository.businessSelectQuery)
            .from(schema)
            .limit(Number(limit))
            .offset(offset);

        const [{ count }]: any = await db
            .select({ count: sql<number>`count(*)` })
            .from(schema);

        return {
            items,
            page: Number(page),
            totalItems: parseInt(count.toString(), 10),
            totalPages: Math.ceil(count / limit),
        };
    }

    /**
     * Find a single business by id.
     * Returns a flat row with both business columns AND the relevant detail
     * columns (venue or artist) via LEFT JOINs.  The service layer will then
     * reshape this into `{ business, business_info: { business_detail } }`.
     */
    static async findById(id: number) {
        const rows = await db
            .select(repository.businessWithDetailSelectQuery)
            .from(schema)
            .leftJoin(
                vendor_venue_schema,
                eq(vendor_venue_schema.business_id, schema.id),
            )
            .leftJoin(
                vendor_artist_schema,
                eq(vendor_artist_schema.business_id, schema.id),
            )
            .where(eq(schema.id, id));

        if (!rows[0]) return null;
        return rows[0];
    }

    // ─── Update ────────────────────────────────────────────────────────────────

    static async update(id: number, params: Record<string, any>) {
        const result = await db
            .update(schema)
            .set({ ...params, updatedAt: new Date() } as any)
            .where(eq(schema.id, id))
            .returning();
        return result[0] ?? null;
    }

    // ─── Delete ────────────────────────────────────────────────────────────────

    static async destroy(id: number) {
        const result = await db
            .delete(schema)
            .where(eq(schema.id, id))
            .returning();
        return result;
    }
}

export { isVenueType };
export default BusinessModel;
