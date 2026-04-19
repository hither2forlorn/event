export interface CateringColumn {
  id: number;
  eventId: number;
  vendorId: number | null;
  name: string;
  per_plate_price: string;
  startDateTime: Date;
  endDateTime: Date;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface MenuItemColumn {
  id: number;
  name: string;
  description: string;
  cateringId: number;
  type: string;
  isVegetarian: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
}

class Resource {
  static toJson(
    catering: Partial<CateringColumn>,
  ): Partial<CateringColumn> | null {
    if (!catering) return null;

    const data: Partial<CateringColumn> = {
      id: catering.id,
      eventId: catering.eventId,
      vendorId: catering.vendorId,
      name: catering.name,
      per_plate_price: catering.per_plate_price,
      startDateTime: catering.startDateTime,
      endDateTime: catering.endDateTime,
      createdAt: catering.createdAt,
      updatedAt: catering.updatedAt,
    };

    return data;
  }

  static toJsonMenu(
    menuItem: Partial<MenuItemColumn>,
  ): Partial<MenuItemColumn> | null {
    if (!menuItem) return null;

    const data: Partial<MenuItemColumn> = {
      id: menuItem.id,
      name: menuItem.name,
      description: menuItem.description,
      cateringId: menuItem.cateringId,
      type: menuItem.type,
      isVegetarian: menuItem.isVegetarian,
      createdAt: menuItem.createdAt,
      updatedAt: menuItem.updatedAt,
    };

    return data;
  }

  static collection(
    caterings: Partial<CateringColumn>[],
  ): (Partial<CateringColumn> | null)[] {
    return caterings.map(this.toJson);
  }

  static menuCollection(
    menuItems: Partial<MenuItemColumn>[],
  ): (Partial<MenuItemColumn> | null)[] {
    return menuItems.map(this.toJsonMenu);
  }
}

export default Resource;
