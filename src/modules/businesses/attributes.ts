import {
  serial,
  varchar,
  text,
  integer,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
export const tableName = "businesses";
export const vendorVenueTableName = "vendor_venues_table";
export const vendorServiceTableName = "vendor_services_table";
import schema from "./schema"

export const businessesAttribute = {
  id: serial("id").notNull().primaryKey(),
  businessName: varchar("business_name", { length: 100 }).notNull(),
  category: varchar("category", { length: 100 }),
  avatar: text("avatar"),
  cover: text("cover"),
  location: varchar("location", { length: 255 }),
  city: varchar("city", { length: 100 }),
  country: varchar("country", { length: 100 }),
  legalDocument: varchar("legal_document", { length: 255 }),
  isVerified: boolean("is_verified").default(false),
  ownerId: integer("owner_id").notNull(),
  description: text("description"),
  priceStartingFrom: integer("price_starting_from"),
  yearsOfExperience: integer("years_of_experience"),
  teamSize: integer("team_size"),
  serviceArea: varchar("service_area", { length: 255 }),
  contactPersonName: varchar("contact_person_name", { length: 120 }),
  contactPhone: varchar("contact_phone", { length: 20 }),
  email: varchar("email", { length: 60 }),
  websiteUrl: text("website_url"),
  instagramUrl: text("instagram_url"),
  whatsappNumber: varchar("whatsapp_number", { length: 20 }),
  providesHomeService: boolean("provides_home_service").default(false),
  travelPolicy: text("travel_policy"),
  cancellationPolicy: text("cancellation_policy"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),

};

export const venueAttribute = {
  id: serial("id").primaryKey(),
  businessId: integer("business_id").notNull().references(() => schema.id, { onDelete: "cascade" }),
  venueName: varchar("venue_name", { length: 100 }),
  venueType: varchar("venue_type", { length: 100 }),
  capacity: integer("capacity"),
  areaSqft: varchar("area_sqft", { length: 40 }),
  minBookingHours: integer("min_booking_hours").default(1),
  maxBookingHours: integer("max_booking_hours"),
  hasCatering: boolean("has_catering").default(false),
  hasAvEquipment: boolean("has_av_equipment").default(false),
  isOutDoor: boolean("is_outDoor",).default(false),
  pricePerhour: integer("price_per_hour"),
  parking: varchar("parking", { length: 50 }),
  roomsAvailable: integer("rooms_available"),
  valetAvailable: boolean("valet_available").default(false),
  alcoholAllowed: boolean("alcohol_allowed").default(false),
  soundLimitDb: integer("sound_limit_db"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
};

export const vendorServicesAttribute = {
  id: serial("id").primaryKey(),
  businessId: integer("business_id").notNull().references(() => schema.id, { onDelete: "cascade" }),
  artistType: varchar("artist_type", { length: 100 }),
  stylesSpecialized: varchar("styles_specialized", { length: 255 }),
  maxBookingsPerDay: integer("max_bookings_per_day"),
  advanceAmount: integer("advance_amount"),
  usesOwnMaterial: boolean("uses_own_material").default(true),
  travelCharges: integer("travel_charges"),
  portfolioLink: varchar("portfolio_link", { length: 255 }),
  availableForDestination: boolean("available_for_destination").default(false),
  customizationAvailable: boolean("customization_available"),   // jewelry, dress rent, invitations
  servesVeg: boolean("serves_veg"),                            // catering, cake, chaat
  minimumOrder: integer("min_order"),                             // replaces min_plates, min_order_qty
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
};
