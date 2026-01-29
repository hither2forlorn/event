export interface EventColumn {
  id: number;
  title: string;
  description: string;
  type: string;
  startDate: Date;
  endDate: Date;
  budget: number | null;
  theme: string | null;
  duration?: number;
  parentId: number | null;
  location: string;
  organizer: number;
  createdAt: Date;
  updatedAt: Date;
}

class Resource {
  static toJson(event: Partial<EventColumn>): Partial<EventColumn> | null {
    if (!event) return null;
    const data: Partial<EventColumn> = {
      id: event.id,
      title: event.title,
      description: event.description,
      type: event.type,
      startDate: event.startDate,
      endDate: event.endDate,
      budget: event.budget,
      theme: event.theme,
      parentId: event.parentId,
      location: event.location,
      organizer: event.organizer,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    };
    return data;
  }
  static collection(events: Partial<EventColumn>[]) {
    return events.map(this.toJson);
  }
}
export default Resource;
