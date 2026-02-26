import { EventColumn } from "@/modules/event/resource";
export interface RsvpColumn {
  id: number;
  event_guest_id: string;
  responded_by: number;
  status: string;
  notes: string;
  respondedAt: string;
  updatedAt: string;
}

export interface Invitation_Event {
  event_detail: EventColumn;
  invitation_status: string;
  invited_by: string;
  role?: string | null; // temp and only done the filtering inthe bacend 
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
  static toEventJson(invitation: Invitation_Event) {
    const data: Partial<Invitation_Event> = {
      event_detail: invitation.event_detail,
      invitation_status: invitation.invitation_status,
      invited_by: invitation.invited_by,
      role: "Guest"
    }
    return data;
  }
}
export default Resource;
