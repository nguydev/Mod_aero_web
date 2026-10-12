export interface AccountSetupFormData {
  // Step 1: Identity
  frontIdFile: string | null;
  frontIdPreview?: string | null;
  backIdFile: string | null;
  backIdPreview?: string | null;
  legalFirstName: string;
  legalLastName: string;
  dateOfBirth: string;
  selfieFile: string | null;
  selfiePreview?: string | null;

  // Step 2: Organizer
  organizerName: string;
  organizerType: string;
  website: string;
  socialProfile: string;
  publicContact: string;
  historyDescription: string;
  brandLogoFile: string | null;
  brandLogoPreview?: string | null;

  // Step 3: Legal Auth
  eventTypes: string[];
  venueTypes: string[];

  // Step 4: Insurance
  coiFile: string | null;

  // Step 5: Before you submit checkboxes
  checkAccurate: boolean;
  checkTerms: boolean;
  checkReview: boolean;
  checkEmailNotification: boolean;
}

export const initialAccountSetupFormData: AccountSetupFormData = {
  frontIdFile: null,
  frontIdPreview: null,
  backIdFile: null,
  backIdPreview: null,
  legalFirstName: "",
  legalLastName: "",
  dateOfBirth: "",
  selfieFile: null,
  selfiePreview: null,

  organizerName: "",
  organizerType: "",
  website: "",
  socialProfile: "",
  publicContact: "",
  historyDescription: "",
  brandLogoFile: null,
  brandLogoPreview: null,

  eventTypes: [],
  venueTypes: [],

  coiFile: null,

  checkAccurate: false,
  checkTerms: false,
  checkReview: false,
  checkEmailNotification: false,
};
