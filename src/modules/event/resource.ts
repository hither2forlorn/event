export interface EventColumn {
  id?: number;
  title: string | null;
  description: string | null ;
  type: any;
  startDate: Date;
  endDate: Date;
  budget: number | null;
  theme: string | null;
  parentId: number | null;
  startTime: string | null;
  endTIme: string | null;
  attire: string | null;
  side: string | null;
  location: string | null;
  organizer: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
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
