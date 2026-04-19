import schema from "./schema";

const cateringSelectQuery = {
  id: schema.schema.id,
  name: schema.schema.name,
  per_plate_price: schema.schema.per_plate_price,
  startDateTime: schema.schema.startDateTime,
  endDateTime: schema.schema.endDateTime,
  eventId: schema.schema.eventId,
  vendorId: schema.schema.vendorId,
  createdAt: schema.schema.createdAt,
  updatedAt: schema.schema.updatedAt,
};

const menuSelectQuery = {
  id: schema.menuSchema.id,
  name: schema.menuSchema.name,
  description: schema.menuSchema.description,
  type: schema.menuSchema.type,
  isVegetarian: schema.menuSchema.isVegetarian,
  cateringId: schema.menuSchema.cateringId,
  createdAt: schema.menuSchema.createdAt,
  updatedAt: schema.menuSchema.updatedAt,
};

export default {
  cateringSelectQuery,
  menuSelectQuery,
};
