export interface EventColumn {
  id?: number;
  title: string | null;
  description: string | null; 
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
  status?: string | null; // Temp ui 
  organizer: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  role?: string | null; //Temp
  date: string | null; //Temp
}

class Resource {
  static toJson(event: Partial<EventColumn>): Partial<EventColumn> | null {
    if (!event) return null;
    const data: Partial<EventColumn> = {
      id: event.id,
      title: event.title,
      description:
        event.description ||
        "Witness the World comming together, Be part of the celebration in wedding of Bishwas and Salena Gomez",
      type: event.type,
      startDate: event.startDate,
      date:"Nov 12, 2023",
      endDate: event.endDate,
      budget: event.budget || 10000,
      theme: event.theme || "Cozy",
      parentId: event.parentId,
      location: event.location,
      role: "Organizer",
      status: "upcoming",
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
