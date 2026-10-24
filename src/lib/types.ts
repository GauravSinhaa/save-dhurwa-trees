export type ThreatStatus =
  | "REPORTED_BY_CITIZEN"
  | "AWAITING_VERIFICATION"
  | "VERIFIED_EXISTING"
  | "POTENTIALLY_AFFECTED"
  | "OFFICIALLY_LISTED_FELLING"
  | "CONFIRMED_FELLED"
  | "TRANSPLANTATION_PROPOSED"
  | "TRANSPLANTED_MONITORING"
  | "PRESERVED_FOLLOWING_MODIFICATION";

export type HealthStatus = "EXCELLENT" | "GOOD" | "FAIR" | "POOR" | "CRITICAL";

export type VerificationStatus =
  | "VERIFIED"
  | "PENDING_REVIEW"
  | "UNVERIFIED"
  | "REJECTED";

export type SourceType = "DEMONSTRATION" | "OFFICIAL_SURVEY" | "CITIZEN_SUBMISSION";

export interface TreeRecord {
  id: string;
  public_tree_id: string;
  city?: string; // Automatically populated: "Ranchi"
  state?: string; // Automatically populated: "Jharkhand"
  species_common_name: string;
  species_scientific_name: string;
  latitude: number;
  longitude: number;
  locality: string;
  estimated_height_m: number;
  trunk_circumference_cm: number; // GBH in cm
  canopy_spread_m: number;
  health_status: HealthStatus;
  estimated_age: number | null;
  threat_status: ThreatStatus;
  verification_status: VerificationStatus;
  source_type: SourceType;
  photo_url: string;
  survey_date: string;
  observer_name?: string;
  observer_notes?: string;
  official_doc_reference?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CitizenReport {
  id: string;
  reporter_name: string;
  reporter_email?: string;
  city?: string; // Automatically populated: "Ranchi"
  date?: string; // Automatically populated: "YYYY-MM-DD"
  locality: string;
  latitude: number;
  longitude: number;
  species_common_name: string;
  species_scientific_name?: string;
  estimated_height_m: number;
  trunk_circumference_cm: number;
  health_status: HealthStatus;
  construction_nearby: boolean;
  description: string;
  photo_url: string;
  review_status: "PENDING" | "APPROVED" | "REJECTED";
  created_at: string;
}

export interface PetitionSignature {
  id: string;
  display_name: string;
  locality: string;
  email_hash?: string;
  consent_given: boolean;
  submitted_at: string;
}

export type DocumentCategory =
  | "DPR"
  | "ALIGNMENT_DRAWING"
  | "TREE_ENUMERATION"
  | "FELLING_PERMISSION"
  | "ENVIRONMENTAL_MANAGEMENT"
  | "COMPENSATORY_AFFORESTATION"
  | "RTI_REPLY"
  | "COURT_ORDER"
  | "MEDIA_REPORT";

export type DocumentStatus =
  | "OFFICIAL_VERIFIED"
  | "MEDIA_REPORTED"
  | "REQUESTED_AWAITING"
  | "DISPUTED";

export interface ProjectDocument {
  id: string;
  title: string;
  document_type: DocumentCategory;
  issuing_authority: string;
  publication_date: string;
  verification_status: DocumentStatus;
  summary: string;
  source_url: string;
  file_url?: string;
  page_count?: number;
  uploaded_at: string;
}



export interface ProjectUpdate {
  id: string;
  headline: string;
  date: string;
  category:
    | "OFFICIAL_ANNOUNCEMENT"
    | "MEDIA_REPORT"
    | "CITIZEN_OBSERVATION"
    | "ADVOCACY_STATEMENT"
    | "INDEPENDENT_ANALYSIS";
  verification_status: "VERIFIED" | "REPORTED" | "UNVERIFIED";
  summary: string;
  source_name: string;
  source_url: string;
}

export interface VolunteerRegistration {
  id: string;
  display_name: string;
  email: string;
  locality: string;
  areas_of_interest: string[];
  skills: string;
  availability: string;
  consent_contact: boolean;
  registered_at: string;
}

export interface AuditLog {
  id: string;
  actor: string;
  action: string;
  entity_type: string;
  entity_id: string;
  details: string;
  timestamp: string;
}

export type NestingType =
  | "TREE_HOLLOW_CAVITY"
  | "HIGH_CANOPY_FORK"
  | "FOLIAGE_CUP"
  | "COLONIAL_ROOST";

export interface AvianSpecies {
  id: string;
  common_name_en: string;
  common_name_hi: string;
  scientific_name: string;
  nesting_type: NestingType;
  primary_host_trees: string[];
  diet_type: string;
  impact_summary: string;
  why_saplings_cannot_replace: string;
  iucn_status: string;
  corridor_hotspots: string;
}

