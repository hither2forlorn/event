export interface RsvpColumn {
  id: number;
  event_guest_id: string;
  responded_by: number;
  status: string;
  notes: string;
  respondedAt: string;
  updatedAt: string;
}
class Resource {
  static toJson(rsvp: RsvpColumn) {
    const data: Partial<RsvpColumn> = {
      id: rsvp.id,
      event_guest_id: rsvp.event_guest_id,
      responded_by: rsvp.responded_by,
      notes: rsvp.notes,
      status: rsvp.status,
      respondedAt: rsvp.respondedAt,
      updatedAt: rsvp.updatedAt,
    };
    return data;
  }
}
export default Resource;
