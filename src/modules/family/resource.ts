export interface FamilyColumn {
  id: number;
  familyName: string;
  createdBy: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface FamilyMemberColumn {
  familyId: number;
  userId: number;
  relation: string;
  dob: Date | null;
  name: string;
  email: string;
  addedBy: number;
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

  static toJsonMember(
    member: FamilyMemberColumn,
  ): Partial<FamilyMemberColumn> | null {
    if (!member) return null;
    const data: Partial<FamilyMemberColumn> = {
      familyId: member.familyId,
      userId: member.userId,
      relation: member.relation,
      dob: member.dob,
      name: member.name,
      email: member.email,
      addedBy: member.addedBy,
    };
    return data;
  }

  static collectionMembers(members: FamilyMemberColumn[]) {
    return members.map(this.toJsonMember);
  }
}

export default Resource;
