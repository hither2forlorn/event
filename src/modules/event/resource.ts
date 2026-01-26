export interface EventColumn {
  id: number;
  title: string;
  description: string;
  type: string;
  date: Date;
  duration: number;
  parentid: number | null;
  location: string;
  organizer: any;
  createdAt: any;
  updatedAt: any;
}

class Resource {
  static toJson(category: Partial<EventColumn>): Partial<EventColumn> | null {
    if (!category) return null;
    const data: Partial<EventColumn> = {
      id: category.id,
      title: category.title,
      description: category.description,
      type: category.type,
      date: category.date,
      duration: category.duration,
      parentid: category.parentid,
      location: category.location,
      organizer: category.organizer,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
    return data;
  }
  static collection(event: Partial<EventColumn>[]) {
    return event.map(this.toJson);
  }
}
export default Resource;
