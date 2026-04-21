import schema, { menuSchema } from "./schema";

const cateringSelectQuery = {
  id: schema.id,
  name: schema.name,
  per_plate_price: schema.per_plate_price,
  startDateTime: schema.startDateTime,
  endDateTime: schema.endDateTime,
  eventId: schema.eventId,
  vendorId: schema.vendorId,
  createdAt: schema.createdAt,
  updatedAt: schema.updatedAt,
};

const menuSelectQuery = {
  id: menuSchema.id,
  name: menuSchema.name,
  description: menuSchema.description,
  type: menuSchema.type,
  isVegetarian: menuSchema.isVegetarian,
  cateringId: menuSchema.cateringId,
  createdAt: menuSchema.createdAt,
  updatedAt: menuSchema.updatedAt,
};

export default {
  cateringSelectQuery,
  menuSelectQuery,
};
