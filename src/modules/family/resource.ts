export interface FamilyColumn {
  id: number;
  familyName: string;
  createdBy: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type FamilyInsert = Omit<FamilyColumn, "id" | "createdAt" | "updatedAt">;

class Resource {
  static toJson(family: FamilyColumn): Partial<FamilyColumn> | null {
    if (!family) return null;
    const data: Partial<FamilyColumn> = {
      id: family.id,
      familyName: family.familyName,
      createdBy: family.createdBy,
    };
    return data;
  }
  static collection(admins: FamilyColumn[]) {
    return admins.map(this.toJson);
  }
}

export default Resource;
