export interface EventReportItem {
  id: string;
  eventName: string;
  status: "Pending" | "Resolved" | "Dismissed";
  reportedBy: string;
  reportDate: string;
  organizer: string;
  issueDescription: string;
  fullReason?: string;
}

export const mockEventReports: EventReportItem[] = [
  {
    id: "rep-1",
    eventName: "Event: Midnight Drive",
    status: "Pending",
    reportedBy: "Alex Morgan",
    reportDate: "Aug 04",
    organizer: "Drive Society",
    issueDescription: "Event location information is misleading.",
    fullReason:
      "The pin location on the map was pointing to a private restricted road rather than the designated gathering lot. Multiple attendees were turned away by security.",
  },
  {
    id: "rep-2",
    eventName: "Event: Canyon Run",
    status: "Pending",
    reportedBy: "James Wilson",
    reportDate: "Aug 02",
    organizer: "Road Kings",
    issueDescription: "Dangerous road conditions not disclosed.",
    fullReason:
      "Recent rockslides on Section B of the route were not communicated in the pre-drive safety briefing, causing emergency braking.",
  },
  {
    id: "rep-3",
    eventName: "Event: Quarter Mile Night",
    status: "Pending",
    reportedBy: "Ryan Cooper",
    reportDate: "Aug 01",
    organizer: "Apex Motors Club",
    issueDescription: "Event cancelled without notice.",
    fullReason:
      "Organizer called off the event 10 minutes prior to gate opening with no automated email or ticket refund updates issued to ticket holders.",
  },
];
