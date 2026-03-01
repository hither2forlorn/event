export interface BusinessColumn {
  id?: number;
  userId?: number;
  business_name: string;
  description?: string | null;
  avatar?: string | null;
  cover?: string | null;
  location?: string | null;
  legal_document?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  category?: string | null;
  subcategory?: string | null;
  status?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

class Resource {
  static toJson(business: BusinessColumn): Partial<BusinessColumn> | null {
    if (!business) return null;
    const data: Partial<BusinessColumn> = {
      id: business.id,
      userId: business.userId,
      business_name: business.business_name,
      description: business.description,
      avatar: business.avatar,
      cover: business.cover,
      location: business.location,
      legal_document: business.legal_document,
      phone: business.phone,
      email: business.email,
      website: business.website,
      category: business.category,
      subcategory: business.subcategory,
      status: business.status,
      createdAt: business.createdAt,
      updatedAt: business.updatedAt,
    };
    return data;
  }

  static collection(businesses: BusinessColumn[]) {
    return businesses.map(this.toJson);
  }
}

export default Resource;
