
export interface BusinessColumn {
  id: number;
  businessName: string;
  category?: string | null;
  avatar?: string | null;
  cover?: string | null;
  location?: string | null;
  email: string | null | undefined;
  city?: string | null;
  country?: string | null;
  legalDocument?: string | null;
  isVerified?: boolean | null;
  ownerId: number;
  description?: string | null;
  priceStartingFrom?: number | null;
  yearsOfExperience?: number | null;
  teamSize?: number | null;
  serviceArea?: string | null;
  contactPersonname?: string | null;
  contactPhone?: string | null;
  websiteUrl?: string | null;
  instagramUrl?: string | null;
  whatsappNumber?: string | null;
  providesHomeservice?: boolean | null;
  travelPolicy?: string | null;
  cancellationPolicy?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

class Resource {
  /** Shape a raw DB row into the public business object */
  static toJson(row: BusinessColumn): Partial<BusinessColumn> | null {
    if (!row) return null;
    return {
      id: row.id,
      businessName: row.businessName,
      category: row.category,
      avatar: row.avatar,
      cover: row.cover,
      location: row.location,
      email: row.email,
      city: row.city,
      country: row.country,
      isVerified: row.isVerified,
      ownerId: row.ownerId,
      description: row.description,
      priceStartingFrom: row.priceStartingFrom,
      yearsOfExperience: row.yearsOfExperience,
      teamSize: row.teamSize,
      serviceArea: row.serviceArea,
      contactPersonname: row.contactPersonname,
      contactPhone: row.contactPhone,
      websiteUrl: row.websiteUrl,
      instagramUrl: row.instagramUrl,
      whatsappNumber: row.whatsappNumber,
      providesHomeservice: row.providesHomeservice,
      travelPolicy: row.travelPolicy,
      cancellationPolicy: row.cancellationPolicy,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  }

  static collection(rows: BusinessColumn[]) {
    return rows.map((r) => Resource.toJson(r));
  }
}

export default Resource;
