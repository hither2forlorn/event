import Model from "./model";
import Resource from "./resource";
import logger from "@/config/logger";
import { throwNotFoundError, throwUnauthorizedError } from "@/utils/error";
import {
    CreateFullBusinessSchema,
    type CreateFullBusinessType,
} from "./validators";
import { isVenueType } from "./model";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Reshape the flat joined row from `Model.findById` into the
 * `{ business, business_info: { type, business_detail } }` structure.
 */
function reshapeRow(row: Record<string, any>) {
    const {
        // venue-specific columns
        venue_id,
        venue_type,
        capacity,
        area_sqft,
        min_booking_hours,
        max_booking_hours,
        has_catering,
        has_av_equipment,
        is_outDoor,
        price_per_hour,
        parking,
        rooms_available,
        valet_available,
        alcohol_allowed,
        sound_limit_db,
        // artist-specific columns
        artist_id,
        artist_type,
        styles_specialized,
        max_bookings_per_day,
        advance_amount,
        uses_own_material,
        travel_charges,
        portfolio_link,
        available_for_destination,
        // everything else is the common business object
        ...business
    } = row;

    let business_detail: Record<string, any> | null = null;

    if (isVenueType(business.type)) {
        if (venue_id !== null && venue_id !== undefined) {
            business_detail = {
                venue_id, venue_type, capacity, area_sqft,
                min_booking_hours, max_booking_hours,
                has_catering, has_av_equipment, is_outDoor,
                price_per_hour, parking, rooms_available,
                valet_available, alcohol_allowed, sound_limit_db,
            };
        }
    } else {
        if (artist_id !== null && artist_id !== undefined) {
            business_detail = {
                artist_id, artist_type, styles_specialized,
                max_bookings_per_day, advance_amount,
                uses_own_material, travel_charges,
                portfolio_link, available_for_destination,
            };
        }
    }

    return {
        business,
        business_info: {
            type: business.type,
            business_detail,
        },
    };
}

// ─── Service methods ──────────────────────────────────────────────────────────

const list = async (params: any) => {
    try {
        const data = await Model.findAll(params);
        return {
            ...data,
            items: Resource.collection(data.items),
        };
    } catch (err) {
        logger.error(err, "Error listing businesses");
        throw err;
    }
};

const find = async (id: number) => {
    try {
        const row = await Model.findById(id);
        if (!row) return throwNotFoundError("Business not found");

        const shaped = reshapeRow(row as Record<string, any>);
        return {
            business: Resource.toJson(shaped.business as any),
            business_info: shaped.business_info,
        };
    } catch (err) {
        logger.error(err, "Error fetching business");
        throw err;
    }
};

const create = async (input: CreateFullBusinessType, ownerId: number) => {
    try {
        const result = CreateFullBusinessSchema.safeParse(input);
        if (!result.success) {
            throw new Error(result.error.issues.map((i) => i.message).join(", "));
        }

        const { venue_detail, artist_detail, ...businessData } = result.data;

        // 1) Insert the base business row
        const business = await Model.create({ ...businessData, owner_id: ownerId });
        if (!business) throw new Error("Business creation failed");

        let business_detail: Record<string, any> | null = null;

        // 2) Insert the type-specific detail row
        if (isVenueType(business.type) && venue_detail) {
            business_detail = await Model.createVenueDetail({
                ...venue_detail,
                business_id: business.id,
            });
        } else if (!isVenueType(business.type) && artist_detail) {
            business_detail = await Model.createArtistDetail({
                ...artist_detail,
                business_id: business.id,
            });
        }

        return {
            business: Resource.toJson(business),
            business_info: {
                type: business.type,
                business_detail,
            },
        };
    } catch (err) {
        logger.error(err, "Error creating business");
        throw err;
    }
};

const update = async (id: number, input: any, ownerId: number) => {
    try {
        const row = await Model.findById(id);
        if (!row) return throwNotFoundError("Business not found");

        const shaped = reshapeRow(row as Record<string, any>);
        if (shaped.business.owner_id !== ownerId) {
            return throwUnauthorizedError("You are not the owner of this business");
        }

        const updated = await Model.update(id, input);
        return Resource.toJson(updated as any);
    } catch (err) {
        logger.error(err, "Error updating business");
        throw err;
    }
};

const remove = async (id: number, ownerId: number) => {
    try {
        const row = await Model.findById(id);
        if (!row) return throwNotFoundError("Business not found");

        const shaped = reshapeRow(row as Record<string, any>);
        if (shaped.business.owner_id !== ownerId) {
            return throwUnauthorizedError("You are not the owner of this business");
        }

        const deleted = await Model.destroy(id);
        return {
            success: true,
            message: "Business deleted successfully",
            deletedBusiness: Resource.toJson(deleted[0] as any),
        };
    } catch (err) {
        logger.error(err, "Error deleting business");
        throw err;
    }
};

export default { list, find, create, update, remove };
