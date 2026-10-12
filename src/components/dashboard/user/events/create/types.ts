export type CreateEventStep = "basic" | "safety" | "legal";

export interface EventFormData {
  // Step 1: Basic
  bannerImage: string | null;
  name: string;
  description: string;
  frequency: "Weekly" | "Monthly" | "Yearly" | "One Off";
  category: string;
  categories: string[];
  location: string;
  startDate: string;
  startTime: string;
  endTime: string;
  expectedAttendance: string;
  isRegistrationCapped: boolean;
  maxRegistrations: string;
  entryFeeType: "free" | "paid";
  ticketPrice: string;
  organizerEmail: string;
  organizerPhone: string;
  visibility: "everyone" | "group";
  selectedGroupId?: string;

  // Step 2: Safety
  rulesCodeOfConduct: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRole: string;
  emergencyActionPlan: string;
  includesRoadRoute: boolean;
  hasMedicalPlan: boolean;
  hasPoliceControl: boolean;

  // Step 3: Legal
  requiresPermits: boolean;
  venueAuthorizationNotes: string;
  venueAgreementFile: string | null;
  hasInsurance: boolean;
  requiresWaiver: boolean;
}

export const initialEventFormData: EventFormData = {
  // Step 1: Basic
  bannerImage: null,
  name: "",
  description: "",
  frequency: "Weekly",
  category: "Car Meet",
  categories: ["Car Meet"],
  location: "",
  startDate: "",
  startTime: "",
  endTime: "",
  expectedAttendance: "",
  isRegistrationCapped: false,
  maxRegistrations: "",
  entryFeeType: "free",
  ticketPrice: "",
  organizerEmail: "",
  organizerPhone: "",
  visibility: "everyone",
  selectedGroupId: "",

  // Step 2: Safety
  rulesCodeOfConduct: "",
  emergencyContactName: "",
  emergencyContactPhone: "",
  emergencyContactRole: "",
  emergencyActionPlan: "",
  includesRoadRoute: false,
  hasMedicalPlan: false,
  hasPoliceControl: false,

  // Step 3: Legal
  requiresPermits: false,
  venueAuthorizationNotes: "",
  venueAgreementFile: null,
  hasInsurance: false,
  requiresWaiver: false,
};
