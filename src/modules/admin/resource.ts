export interface AdminColumn {
  id: number;
  info: any;
  password: string;
  email: string;
  createdAt: Date;
  infos: any;
}
class Resource {
  static toJson(admin: AdminColumn): Partial<AdminColumn> | null {
    if (!admin) return null;
    const data: Partial<AdminColumn> = {
      id: admin.id,
      info: admin.info,
      email: admin.email,
      infos: admin?.infos || null,
      createdAt: admin.createdAt,
    };
    return data;
  }
  static collection(admins: AdminColumn[]) {
    return admins.map(this.toJson);
  }
}

export default Resource;
