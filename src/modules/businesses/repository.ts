import schema, { vendor_venue_schema, vendor_artist_schema } from "./schema";

const businessSelectQuery = {
    id: schema.id,
    business_name: schema.business_name,
    type: schema.type,
    category: schema.category,
    avatar: schema.avatar,
    cover: schema.cover,
    location: schema.location,
    city: schema.city,
    country: schema.country,
    legal_document: schema.legal_document,
    is_verified: schema.is_verified,
    owner_id: schema.owner_id,
    description: schema.description,
    price_starting_from: schema.price_starting_from,
    years_of_experience: schema.years_of_experience,
    team_size: schema.team_size,
    service_area: schema.service_area,
    contact_person_name: schema.contact_person_name,
    contact_phone: schema.contact_phone,
    website_url: schema.website_url,
    instagram_url: schema.instagram_url,
    whatsapp_number: schema.whatsapp_number,
    provides_home_service: schema.provides_home_service,
    travel_policy: schema.travel_policy,
    cancellation_policy: schema.cancellation_policy,
    createdAt: schema.createdAt,
    updatedAt: schema.updatedAt,
};


const venueSelectQuery = {
    venue_id: vendor_venue_schema.id,
    venue_type: vendor_venue_schema.venue_type,
    capacity: vendor_venue_schema.capacity,
    area_sqft: vendor_venue_schema.area_sqft,
    min_booking_hours: vendor_venue_schema.min_booking_hours,
    max_booking_hours: vendor_venue_schema.max_booking_hours,
    has_catering: vendor_venue_schema.has_catering,
    has_av_equipment: vendor_venue_schema.has_av_equipment,
    is_outDoor: vendor_venue_schema.is_outDoor,
    price_per_hour: vendor_venue_schema.price_per_hour,
    parking: vendor_venue_schema.parking,
    rooms_available: vendor_venue_schema.rooms_available,
    valet_available: vendor_venue_schema.valet_available,
    alcohol_allowed: vendor_venue_schema.alcohol_allowed,
    sound_limit_db: vendor_venue_schema.sound_limit_db,
};


const artistSelectQuery = {
    artist_id: vendor_artist_schema.id,
    artist_type: vendor_artist_schema.artist_type,
    styles_specialized: vendor_artist_schema.styles_specialized,
    max_bookings_per_day: vendor_artist_schema.max_bookings_per_day,
    advance_amount: vendor_artist_schema.advance_amount,
    uses_own_material: vendor_artist_schema.uses_own_material,
    travel_charges: vendor_artist_schema.travel_charges,
    portfolio_link: vendor_artist_schema.portfolio_link,
    available_for_destination: vendor_artist_schema.available_for_destination,
};


const businessWithDetailSelectQuery = {
    ...businessSelectQuery,
    ...venueSelectQuery,
    ...artistSelectQuery,
};

export default {
    businessSelectQuery,
    venueSelectQuery,
    artistSelectQuery,
    businessWithDetailSelectQuery,
};
