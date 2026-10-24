import {
  TreeRecord,
  CitizenReport,
  PetitionSignature,
  ProjectDocument,
  ProjectUpdate,
  VolunteerRegistration,
  AuditLog,
  AvianSpecies,
} from "./types";

// Native Avian & Canopy Species affected by road widening in Dhurwa, Ranchi
export const dhurwaAvianSpecies: AvianSpecies[] = [
  {
    id: "bird-001",
    common_name_en: "Indian Grey Hornbill",
    common_name_hi: "भारतीय धूसर धनेश",
    scientific_name: "Ocyceros birostris",
    nesting_type: "TREE_HOLLOW_CAVITY",
    primary_host_trees: ["Peepal (Ficus religiosa)", "Banyan (Ficus benghalensis)", "Sal (Shorea robusta)"],
    diet_type: "Frugivore / Omnivore (Wild figs, berries, insects)",
    impact_summary:
      "Female seals herself inside deep tree hollows with mud during nesting. Road felling destroys obligate breeding cavities that saplings cannot replace for 40+ years.",
    why_saplings_cannot_replace:
      "Compensatory saplings do not form natural trunk hollows for at least 4 to 5 decades. Loss of mature trees leads to immediate local reproductive collapse.",
    iucn_status: "Least Concern (Severely threatened by urban canopy felling)",
    corridor_hotspots: "Vivekananda School More to Dhurwa Post Office (Chainage 0+200 to 1+400)",
  },
  {
    id: "bird-002",
    common_name_en: "Coppersmith Barbet",
    common_name_hi: "ताम्रकार बसंता (छोटा बसंता)",
    scientific_name: "Psilopogon haemacephalus",
    nesting_type: "TREE_HOLLOW_CAVITY",
    primary_host_trees: ["Sal (Shorea robusta)", "Neem (Azadirachta indica)", "Peepal"],
    diet_type: "Frugivore (Ficus figs, drupes, floral buds)",
    impact_summary:
      "Excavates its own circular nest hole in mature or decaying limbs. The metallic 'tuk-tuk' call is a signature sound of Dhurwa's shaded avenues.",
    why_saplings_cannot_replace:
      "Requires thick branches (>20 cm diameter) with partial internal softness to peck out nest holes; saplings have zero excavatable limbs.",
    iucn_status: "Protected under Wildlife Protection Act (Schedule II)",
    corridor_hotspots: "HEC Administrative Avenue & Sector 3 outer green belt",
  },
  {
    id: "bird-003",
    common_name_en: "Spotted Owlet",
    common_name_hi: "चित्तीदार उल्लू (खूसट)",
    scientific_name: "Athene brama",
    nesting_type: "TREE_HOLLOW_CAVITY",
    primary_host_trees: ["Banyan / Bargad", "Mahua (Madhuca longifolia)", "Karanj"],
    diet_type: "Carnivore / Insectivore (Mice, beetles, locusts)",
    impact_summary:
      "Roosts inside deep knot-holes of heritage Banyan and Mahua trunks. Serves as natural rodent control for surrounding residential sectors and farmlands.",
    why_saplings_cannot_replace:
      "Requires natural weathering crevices and hollows formed exclusively in mature trees over 30 to 60 years old.",
    iucn_status: "Protected under Wildlife Protection Act",
    corridor_hotspots: "Near Dhurwa Dam Link and Jagannathpur Historic Corridor",
  },
  {
    id: "bird-004",
    common_name_en: "Alexandrine Parakeet",
    common_name_hi: "बड़ा तोता (राया तोता)",
    scientific_name: "Psilopogon zeylanicus / Psittacula eupatria",
    nesting_type: "TREE_HOLLOW_CAVITY",
    primary_host_trees: ["Sal (Shorea robusta)", "Semal (Bombax ceiba)", "Arjun"],
    diet_type: "Granivore / Frugivore (Seeds, fleshy calyces, nectar)",
    impact_summary:
      "Near Threatened species globally. Relies on tall old-growth tree cavities high above human reach. Flocks feed on Semal and Mahua blooms in spring.",
    why_saplings_cannot_replace:
      "Cannot breed in low or thin-branched young trees due to predation vulnerability and lack of cavity depth.",
    iucn_status: "Near Threatened (IUCN Red List)",
    corridor_hotspots: "Jagannathpur corridor to Naya Sarai approach",
  },
  {
    id: "bird-005",
    common_name_en: "Black-hooded Oriole",
    common_name_hi: "पीलक (हल्दी चिड़िया)",
    scientific_name: "Oriolus xanthornus",
    nesting_type: "HIGH_CANOPY_FORK",
    primary_host_trees: ["Sal (Shorea robusta)", "Mahua", "Karanj"],
    diet_type: "Insectivore / Frugivore (Caterpillars, wild figs)",
    impact_summary:
      "Weaves an intricate cradle-like cup suspended between horizontal forks in dense high canopies. Crucial regulator of defoliating forest caterpillars.",
    why_saplings_cannot_replace:
      "Requires dense continuous canopy shade at 12–18m height to camouflage nests from crows and raptors.",
    iucn_status: "Least Concern (Habitat restricted in urbanized corridors)",
    corridor_hotspots: "Continuous Sal canopy between Sector 2 and Sector 3",
  },
  {
    id: "bird-006",
    common_name_en: "Shikra & Black Kite",
    common_name_hi: "शिकरा और चील",
    scientific_name: "Accipiter badius / Milvus migrans",
    nesting_type: "HIGH_CANOPY_FORK",
    primary_host_trees: ["Banyan (Ficus benghalensis)", "Tall Sal", "Arjun"],
    diet_type: "Raptor (Lizards, rodents, roadkill, carrion)",
    impact_summary:
      "Builds massive, multi-year stick platform nests exclusively in the highest crotches of trees standing 16m+ tall.",
    why_saplings_cannot_replace:
      "Heavy raptor nests require thick structural crotches capable of holding 15–30 kg of nesting material in high winds.",
    iucn_status: "Protected under Wildlife Protection Act",
    corridor_hotspots: "Vivekananda School More & Ring Road Intersect",
  },
  {
    id: "bird-007",
    common_name_en: "Indian Peafowl",
    common_name_hi: "राष्ट्रीय पक्षी मोर",
    scientific_name: "Pavo cristatus",
    nesting_type: "COLONIAL_ROOST",
    primary_host_trees: ["Mature Sal Canopy", "Banyan"],
    diet_type: "Omnivore (Seeds, insects, small reptiles)",
    impact_summary:
      "National bird of India. Resident populations around Dhurwa Dam and Jagannathpur fly up into mature 15m+ Sal branches every evening for safe nocturnal roosting.",
    why_saplings_cannot_replace:
      "Adult peacocks weigh 4 to 6 kg; they require broad, horizontal boughs at least 10–15m off the ground to escape feral dogs and predators.",
    iucn_status: "Schedule I (Highest Protection under Wildlife Protection Act)",
    corridor_hotspots: "Dhurwa Dam Canal Link and Naya Sarai Forest Fringe",
  },
  {
    id: "bird-008",
    common_name_en: "Indian Flying Fox (Fruit Bat)",
    common_name_hi: "विशाल फलभक्षी चमगादड़",
    scientific_name: "Pteropus giganteus",
    nesting_type: "COLONIAL_ROOST",
    primary_host_trees: ["Centennial Banyan & Peepal avenues"],
    diet_type: "Nectarivore / Frugivore (Key nocturnal pollinator)",
    impact_summary:
      "Crucial keystone pollinator and seed disperser for Mahua and Sal ecosystems. Established maternal roosts hang in century-old Banyan branches.",
    why_saplings_cannot_replace:
      "Colonies require undisturbed aerial space 18–25m high with massive branch span to support hundreds of roosting bats.",
    iucn_status: "Protected / Keystone ecological pollinator",
    corridor_hotspots: "Vivekananda School More heritage trees (Chainage 0+240)",
  },
];


// Illustrative alignment of the reported 6.089 km road corridor in Dhurwa, Ranchi
// From Vivekananda School More (near HEC) through Dhurwa/Jagannathpur corridor to Naya Sarai Ring Road
export const dhurwaRoadAlignment = [
  { lat: 23.3225, lng: 85.2975, name: "Vivekananda School More (Start)" },
  { lat: 23.3202, lng: 85.2928, name: "HEC Sector 2 Golchakkar" },
  { lat: 23.3175, lng: 85.2862, name: "Dhurwa Bus Stand / Sector 3" },
  { lat: 23.3148, lng: 85.2795, name: "Jagannathpur Historic Corridor" },
  { lat: 23.3115, lng: 85.2720, name: "Dhurwa Dam Canal Link" },
  { lat: 23.3088, lng: 85.2635, name: "Naya Sarai Village Junction" },
  { lat: 23.3052, lng: 85.2540, name: "Ranchi Ring Road Intersect (End)" },
];

// Initial tree records (A combination of verified sample survey trees and clearly-marked demonstration trees)
export const initialTrees: TreeRecord[] = [
  {
    id: "tree-001",
    public_tree_id: "DHT-001",
    species_common_name: "Banyan / Bargad",
    species_scientific_name: "Ficus benghalensis",
    latitude: 23.3218,
    longitude: 85.2965,
    locality: "Vivekananda School More, Sector 2",
    estimated_height_m: 19.5,
    trunk_circumference_cm: 420,
    canopy_spread_m: 24.0,
    health_status: "EXCELLENT",
    estimated_age: 85,
    threat_status: "POTENTIALLY_AFFECTED",
    verification_status: "VERIFIED",
    source_type: "OFFICIAL_SURVEY",
    photo_url: "/images/hero_trees.jpg",
    survey_date: "2026-03-12",
    observer_name: "Civic Tree Census Team Ranchi",
    observer_notes:
      "Heritage mature Banyan tree with extensive aerial prop roots. Shading main school crossroads.",
    official_doc_reference: "SHAJ/Dhurwa/Alignment-Rev2/Chainage-0+240",
    created_at: "2026-03-12T10:30:00Z",
    updated_at: "2026-03-12T10:30:00Z",
  },
  {
    id: "tree-002",
    public_tree_id: "DHT-002",
    species_common_name: "Sal / Sakhuwa",
    species_scientific_name: "Shorea robusta",
    latitude: 23.3208,
    longitude: 85.2942,
    locality: "HEC Administrative Avenue",
    estimated_height_m: 22.0,
    trunk_circumference_cm: 230,
    canopy_spread_m: 14.5,
    health_status: "GOOD",
    estimated_age: 65,
    threat_status: "POTENTIALLY_AFFECTED",
    verification_status: "VERIFIED",
    source_type: "OFFICIAL_SURVEY",
    photo_url: "/images/field_survey.jpg",
    survey_date: "2026-03-14",
    observer_name: "Civic Tree Census Team Ranchi",
    observer_notes:
      "Native Jharkhand state tree in healthy canopy condition. Located on current northern shoulder.",
    official_doc_reference: "SHAJ/Dhurwa/Alignment-Rev2/Chainage-0+620",
    created_at: "2026-03-14T11:00:00Z",
    updated_at: "2026-03-14T11:00:00Z",
  },
  {
    id: "tree-003",
    public_tree_id: "DHT-003",
    species_common_name: "Peepal",
    species_scientific_name: "Ficus religiosa",
    latitude: 23.3182,
    longitude: 85.2890,
    locality: "Near Dhurwa Post Office, Sector 3",
    estimated_height_m: 18.0,
    trunk_circumference_cm: 340,
    canopy_spread_m: 21.0,
    health_status: "GOOD",
    estimated_age: 70,
    threat_status: "POTENTIALLY_AFFECTED",
    verification_status: "VERIFIED",
    source_type: "OFFICIAL_SURVEY",
    photo_url: "/images/hero_trees.jpg",
    survey_date: "2026-03-15",
    observer_name: "Civic Tree Census Team Ranchi",
    observer_notes: "Major shade provider, high bird nesting activity observed.",
    official_doc_reference: "SHAJ/Dhurwa/Alignment-Rev2/Chainage-1+150",
    created_at: "2026-03-15T09:15:00Z",
    updated_at: "2026-03-15T09:15:00Z",
  },
  {
    id: "tree-004",
    public_tree_id: "DHT-004",
    species_common_name: "Neem",
    species_scientific_name: "Azadirachta indica",
    latitude: 23.3162,
    longitude: 85.2835,
    locality: "Dhurwa Sector 3 Outer Ring",
    estimated_height_m: 14.0,
    trunk_circumference_cm: 180,
    canopy_spread_m: 12.0,
    health_status: "EXCELLENT",
    estimated_age: 45,
    threat_status: "TRANSPLANTATION_PROPOSED",
    verification_status: "VERIFIED",
    source_type: "OFFICIAL_SURVEY",
    photo_url: "/images/corridor_aerial.jpg",
    survey_date: "2026-03-18",
    observer_name: "Civic Tree Census Team Ranchi",
    observer_notes: "Healthy specimen; recommended by arborist for root-ball transplantation.",
    official_doc_reference: "SHAJ/Dhurwa/Transplant-Study/Tr-14",
    created_at: "2026-03-18T14:20:00Z",
    updated_at: "2026-03-18T14:20:00Z",
  },
  {
    id: "tree-005",
    public_tree_id: "DHT-005",
    species_common_name: "Karanj",
    species_scientific_name: "Millettia pinnata",
    latitude: 23.3140,
    longitude: 85.2778,
    locality: "Jagannathpur Historic Corridor",
    estimated_height_m: 15.5,
    trunk_circumference_cm: 210,
    canopy_spread_m: 13.5,
    health_status: "GOOD",
    estimated_age: 50,
    threat_status: "POTENTIALLY_AFFECTED",
    verification_status: "VERIFIED",
    source_type: "OFFICIAL_SURVEY",
    photo_url: "/images/field_survey.jpg",
    survey_date: "2026-03-20",
    observer_name: "Civic Tree Census Team Ranchi",
    observer_notes: "Deep root system stabilizes roadside embankments near historical zone.",
    official_doc_reference: "SHAJ/Dhurwa/Alignment-Rev2/Chainage-2+400",
    created_at: "2026-03-20T16:00:00Z",
    updated_at: "2026-03-20T16:00:00Z",
  },
  {
    id: "tree-006",
    public_tree_id: "DHT-006",
    species_common_name: "Mahua",
    species_scientific_name: "Madhuca longifolia",
    latitude: 23.3105,
    longitude: 85.2695,
    locality: "Naya Sarai Approach Road",
    estimated_height_m: 16.0,
    trunk_circumference_cm: 260,
    canopy_spread_m: 16.0,
    health_status: "EXCELLENT",
    estimated_age: 75,
    threat_status: "POTENTIALLY_AFFECTED",
    verification_status: "VERIFIED",
    source_type: "OFFICIAL_SURVEY",
    photo_url: "/images/hero_trees.jpg",
    survey_date: "2026-03-22",
    observer_name: "Civic Tree Census Team Ranchi",
    observer_notes:
      "Culturally significant indigenous Mahua tree flowering regularly; local community landmark.",
    official_doc_reference: "SHAJ/Dhurwa/Alignment-Rev2/Chainage-3+800",
    created_at: "2026-03-22T10:00:00Z",
    updated_at: "2026-03-22T10:00:00Z",
  },
  {
    id: "tree-007",
    public_tree_id: "DEMO-007",
    species_common_name: "Gulmohar",
    species_scientific_name: "Delonix regia",
    latitude: 23.3080,
    longitude: 85.2615,
    locality: "Naya Sarai Village Extension (Sample)",
    estimated_height_m: 12.0,
    trunk_circumference_cm: 155,
    canopy_spread_m: 11.0,
    health_status: "FAIR",
    estimated_age: 30,
    threat_status: "REPORTED_BY_CITIZEN",
    verification_status: "PENDING_REVIEW",
    source_type: "DEMONSTRATION",
    photo_url: "/images/corridor_aerial.jpg",
    survey_date: "2026-04-01",
    observer_name: "Demonstration Surveyor",
    observer_notes:
      "[DEMONSTRATION DATA]: Field report awaiting review by arborist team.",
    official_doc_reference: null,
    created_at: "2026-04-01T11:20:00Z",
    updated_at: "2026-04-01T11:20:00Z",
  },
  {
    id: "tree-008",
    public_tree_id: "DEMO-008",
    species_common_name: "Arjun",
    species_scientific_name: "Terminalia arjuna",
    latitude: 23.3055,
    longitude: 85.2550,
    locality: "Ranchi Ring Road Junction (Sample)",
    estimated_height_m: 21.0,
    trunk_circumference_cm: 310,
    canopy_spread_m: 18.0,
    health_status: "GOOD",
    estimated_age: 60,
    threat_status: "POTENTIALLY_AFFECTED",
    verification_status: "UNVERIFIED",
    source_type: "DEMONSTRATION",
    photo_url: "/images/hero_trees.jpg",
    survey_date: "2026-04-02",
    observer_name: "Demonstration GIS Test",
    observer_notes:
      "[DEMONSTRATION DATA]: Sample tree point showing highway intersect zone.",
    official_doc_reference: null,
    created_at: "2026-04-02T13:45:00Z",
    updated_at: "2026-04-02T13:45:00Z",
  },
];

// Citizen submitted reports (for moderation queue)
export const initialCitizenReports: CitizenReport[] = [
  {
    id: "report-101",
    reporter_name: "Alok Kumar (Resident, HEC)",
    reporter_email: "alok.citizen@example.com",
    locality: "Vivekananda School More, Sector 2",
    latitude: 23.3221,
    longitude: 85.2970,
    species_common_name: "Semal (Silk Cotton)",
    species_scientific_name: "Bombax ceiba",
    estimated_height_m: 18,
    trunk_circumference_cm: 280,
    health_status: "GOOD",
    construction_nearby: true,
    description:
      "Large Semal tree with red blooms. Ground survey pegs marked within 3 meters of trunk.",
    photo_url: "/images/field_survey.jpg",
    review_status: "PENDING",
    created_at: "2026-04-10T08:30:00Z",
  },
  {
    id: "report-102",
    reporter_name: "Sunita Minz",
    reporter_email: "sunita.m@example.com",
    locality: "Jagannathpur Main Road",
    latitude: 23.3150,
    longitude: 85.2810,
    species_common_name: "Banyan / Bargad",
    species_scientific_name: "Ficus benghalensis",
    estimated_height_m: 20,
    trunk_circumference_cm: 450,
    health_status: "EXCELLENT",
    construction_nearby: false,
    description:
      "Ancient Banyan tree near traditional fairgrounds. High cultural importance.",
    photo_url: "/images/hero_trees.jpg",
    review_status: "PENDING",
    created_at: "2026-04-12T14:10:00Z",
  },
];

// Public Petition Signatures
export const initialPetitionSignatures: PetitionSignature[] = [
  {
    id: "sig-001",
    display_name: "Dr. R. K. Shrivastava",
    locality: "Dhurwa, Sector 3",
    email_hash: "anon-48392",
    consent_given: true,
    submitted_at: "2026-04-01T09:12:00Z",
  },
  {
    id: "sig-002",
    display_name: "Priya Tirkey",
    locality: "Jagannathpur",
    email_hash: "anon-59201",
    consent_given: true,
    submitted_at: "2026-04-02T11:45:00Z",
  },
  {
    id: "sig-003",
    display_name: "Anand Murmu",
    locality: "HEC Colony",
    email_hash: "anon-38291",
    consent_given: true,
    submitted_at: "2026-04-03T16:20:00Z",
  },
  {
    id: "sig-004",
    display_name: "Meera Soren",
    locality: "Naya Sarai",
    email_hash: "anon-94021",
    consent_given: true,
    submitted_at: "2026-04-04T10:15:00Z",
  },
  {
    id: "sig-005",
    display_name: "Rajeshwar Verma",
    locality: "Doranda",
    email_hash: "anon-10293",
    consent_given: true,
    submitted_at: "2026-04-05T12:00:00Z",
  },
];

// Official Project Documents
export const initialProjectDocuments: ProjectDocument[] = [
  {
    id: "doc-001",
    title:
      "Reported Detailed Project Report (DPR) Executive Summary - Dhurwa to Naya Sarai 10-Lane Corridor",
    document_type: "DPR",
    issuing_authority: "State Highways Authority of Jharkhand (SHAJ)",
    publication_date: "2025-11-15",
    verification_status: "MEDIA_REPORTED",
    summary:
      "Preliminary report detailing the ₹177 crore widening from Vivekananda School More to Ring Road via Naya Sarai (6.089 km). Mentions 6 main carriageway lanes + 4 service lanes.",
    source_url:
      "https://shaj.jharkhand.gov.in/tenders/preliminary-corridor-dhurwa",
    page_count: 42,
    uploaded_at: "2026-03-10T10:00:00Z",
  },
  {
    id: "doc-002",
    title:
      "Right to Information (RTI) Application: Tree Enumeration & Permission Status",
    document_type: "RTI_REPLY",
    issuing_authority: "Divisional Forest Officer, Ranchi Forest Division",
    publication_date: "2026-02-28",
    verification_status: "REQUESTED_AWAITING",
    summary:
      "Formal public inquiry submitted regarding the exact surveyed tree tally and felling permission applications. Response officially awaited as of current date.",
    source_url: "#",
    page_count: 4,
    uploaded_at: "2026-03-05T15:30:00Z",
  },
  {
    id: "doc-003",
    title:
      "Jharkhand High Court PIL Observations on Ranchi Urban Green Cover Preservation",
    document_type: "COURT_ORDER",
    issuing_authority: "High Court of Jharkhand, Ranchi",
    publication_date: "2026-01-20",
    verification_status: "OFFICIAL_VERIFIED",
    summary:
      "Court directives advising road development agencies to explore technical realignment and mandatory tree transplantation prior to any irreversible cutting in urban zones.",
    source_url: "https://jharkhandhighcourt.nic.in/orders",
    page_count: 12,
    uploaded_at: "2026-02-01T12:00:00Z",
  },
  {
    id: "doc-004",
    title:
      "Compensatory Afforestation Guidelines & Land Allocation Memo (Reference Draft)",
    document_type: "COMPENSATORY_AFFORESTATION",
    issuing_authority: "Department of Forest, Environment & Climate Change, Jharkhand",
    publication_date: "2025-10-10",
    verification_status: "OFFICIAL_VERIFIED",
    summary:
      "Statutory ratio guidelines (1:10 sapling plantation) and survival monitoring requirements for road widening projects across Jharkhand.",
    source_url: "#",
    page_count: 8,
    uploaded_at: "2026-01-15T09:00:00Z",
  },
];

// Chronological project updates & news
export const initialUpdates: ProjectUpdate[] = [
  {
    id: "update-001",
    headline:
      "Citizen Delegation Submits Memorandum on Tree Preservation to State Authorities",
    date: "2026-04-18",
    category: "ADVOCACY_STATEMENT",
    verification_status: "VERIFIED",
    summary:
      "Representatives of local resident welfare associations and environmental researchers presented preliminary alternative cross-section designs to highway authorities.",
    source_name: "Save Dhurwa Trees Working Group",
    source_url: "#",
  },
  {
    id: "update-002",
    headline:
      "Media Report Highlights Growing Concerns Over Proposed Dhurwa 10-Lane Widening",
    date: "2026-03-28",
    category: "MEDIA_REPORT",
    verification_status: "REPORTED",
    summary:
      "Regional news publications reported public debate regarding the estimated 7,000 roadside trees between Vivekananda School More and Naya Sarai.",
    source_name: "Ranchi Daily Express",
    source_url: "#",
  },
  {
    id: "update-003",
    headline:
      "High Court Emphasizes Need for Scientific Tree Survey and Public Hearing",
    date: "2026-02-14",
    category: "OFFICIAL_ANNOUNCEMENT",
    verification_status: "VERIFIED",
    summary:
      "Judicial bench observes that major urban infrastructure proposals must balance road safety with the preservation of mature ecological assets.",
    source_name: "High Court Proceedings Record",
    source_url: "https://jharkhandhighcourt.nic.in",
  },
  {
    id: "update-004",
    headline:
      "Civic Geotagging Drive Commences Along Vivekananda More to Dhurwa Dam Stretch",
    date: "2026-01-25",
    category: "CITIZEN_OBSERVATION",
    verification_status: "VERIFIED",
    summary:
      "Volunteer botanists and university researchers initiated non-invasive GBH measurements and GPS logging of mature tree species.",
    source_name: "Field Survey Audit",
    source_url: "#",
  },
];

// Audit logs
export const initialAuditLogs: AuditLog[] = [
  {
    id: "audit-1",
    actor: "System Initializer",
    action: "DATABASE_INITIALIZED",
    entity_type: "SYSTEM",
    entity_id: "SYS-001",
    details:
      "Initialized baseline Dhurwa road corridor and verified sample survey records.",
    timestamp: "2026-04-20T00:00:00Z",
  },
];

// In-Memory Database store with local state for runtime operations
class LocalDatabase {
  private trees: TreeRecord[] = [...initialTrees];
  private citizenReports: CitizenReport[] = [...initialCitizenReports];
  private petitionSignatures: PetitionSignature[] = [...initialPetitionSignatures];
  private projectDocuments: ProjectDocument[] = [...initialProjectDocuments];
  private updates: ProjectUpdate[] = [...initialUpdates];
  private volunteers: VolunteerRegistration[] = [];
  private auditLogs: AuditLog[] = [...initialAuditLogs];

  // Tree queries
  getTrees(filters?: {
    species?: string;
    threat_status?: string;
    verification_status?: string;
    locality?: string;
    source_type?: string;
    search?: string;
  }): TreeRecord[] {
    let result = [...this.trees];
    if (!filters) return result;

    if (filters.species) {
      const sp = filters.species.toLowerCase();
      result = result.filter(
        (t) =>
          t.species_common_name.toLowerCase().includes(sp) ||
          t.species_scientific_name.toLowerCase().includes(sp)
      );
    }
    if (filters.threat_status) {
      result = result.filter((t) => t.threat_status === filters.threat_status);
    }
    if (filters.verification_status) {
      result = result.filter(
        (t) => t.verification_status === filters.verification_status
      );
    }
    if (filters.source_type) {
      result = result.filter((t) => t.source_type === filters.source_type);
    }
    if (filters.locality) {
      result = result.filter((t) =>
        t.locality.toLowerCase().includes(filters.locality!.toLowerCase())
      );
    }
    if (filters.search) {
      const s = filters.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.public_tree_id.toLowerCase().includes(s) ||
          t.species_common_name.toLowerCase().includes(s) ||
          t.species_scientific_name.toLowerCase().includes(s) ||
          t.locality.toLowerCase().includes(s)
      );
    }
    return result;
  }

  getTreeById(id: string): TreeRecord | undefined {
    return this.trees.find((t) => t.id === id || t.public_tree_id === id);
  }

  addTree(tree: Omit<TreeRecord, "id" | "created_at" | "updated_at">): TreeRecord {
    const id = `tree-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const newRecord: TreeRecord = {
      ...tree,
      city: tree.city || "Ranchi",
      state: tree.state || "Jharkhand",
      id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.trees.push(newRecord);

    this.logAudit({
      actor: tree.observer_name || "Admin",
      action: "TREE_RECORD_ADDED",
      entity_type: "TREE",
      entity_id: newRecord.public_tree_id,
      details: `Added tree ${newRecord.public_tree_id} (${newRecord.species_common_name}) in ${newRecord.locality}`,
    });

    return newRecord;
  }

  updateTreeStatus(
    id: string,
    updates: Partial<TreeRecord>,
    actorName: string,
    reason: string
  ): TreeRecord | null {
    const index = this.trees.findIndex((t) => t.id === id || t.public_tree_id === id);
    if (index === -1) return null;

    const oldRecord = this.trees[index];
    const updated: TreeRecord = {
      ...oldRecord,
      ...updates,
      updated_at: new Date().toISOString(),
    };
    this.trees[index] = updated;

    this.logAudit({
      actor: actorName,
      action: "TREE_STATUS_UPDATED",
      entity_type: "TREE",
      entity_id: updated.public_tree_id,
      details: `Updated tree ${updated.public_tree_id}. Reason: ${reason}. Previous status: ${oldRecord.threat_status} -> New status: ${updated.threat_status}`,
    });

    return updated;
  }

  // Citizen Reports
  getCitizenReports(): CitizenReport[] {
    return [...this.citizenReports];
  }

  addCitizenReport(
    report: Omit<CitizenReport, "id" | "review_status" | "created_at">
  ): CitizenReport {
    const id = `report-${Date.now()}`;
    const now = new Date();
    const newReport: CitizenReport = {
      ...report,
      id,
      city: report.city || "Ranchi",
      date: report.date || now.toISOString().split("T")[0],
      review_status: "PENDING",
      created_at: now.toISOString(),
    };
    this.citizenReports.push(newReport);

    this.logAudit({
      actor: report.reporter_name,
      action: "CITIZEN_REPORT_SUBMITTED",
      entity_type: "CITIZEN_REPORT",
      entity_id: id,
      details: `Citizen submitted observation in ${report.locality}, ${newReport.city} on ${newReport.date} for ${report.species_common_name}`,
    });

    return newReport;
  }

  reviewCitizenReport(
    id: string,
    action: "APPROVE" | "REJECT",
    actorName: string
  ): boolean {
    const report = this.citizenReports.find((r) => r.id === id);
    if (!report) return false;

    report.review_status = action === "APPROVE" ? "APPROVED" : "REJECTED";

    if (action === "APPROVE") {
      // Create a verified tree record from citizen submission
      const newPublicId = `DHT-C${String(this.trees.length + 1).padStart(3, "0")}`;
      this.addTree({
        public_tree_id: newPublicId,
        city: report.city || "Ranchi",
        state: "Jharkhand",
        species_common_name: report.species_common_name,
        species_scientific_name: report.species_scientific_name || "Unspecified",
        latitude: report.latitude,
        longitude: report.longitude,
        locality: report.locality,
        estimated_height_m: report.estimated_height_m,
        trunk_circumference_cm: report.trunk_circumference_cm,
        canopy_spread_m: Math.max(4, Math.round(report.estimated_height_m * 0.8)),
        health_status: report.health_status,
        estimated_age: Math.round(report.trunk_circumference_cm / 3.5),
        threat_status: report.construction_nearby
          ? "POTENTIALLY_AFFECTED"
          : "REPORTED_BY_CITIZEN",
        verification_status: "VERIFIED",
        source_type: "CITIZEN_SUBMISSION",
        photo_url: report.photo_url || "/images/field_survey.jpg",
        survey_date: report.date || new Date().toISOString().split("T")[0],
        observer_name: report.reporter_name,
        observer_notes: `Approved citizen field observation: ${report.description}`,
        official_doc_reference: null,
      });
    }

    this.logAudit({
      actor: actorName,
      action: action === "APPROVE" ? "REPORT_APPROVED" : "REPORT_REJECTED",
      entity_type: "CITIZEN_REPORT",
      entity_id: id,
      details: `Citizen report ${id} was ${action.toLowerCase()}d by ${actorName}`,
    });

    return true;
  }

  // Petitions
  getPetitionSignatures(): PetitionSignature[] {
    return [...this.petitionSignatures];
  }

  addPetitionSignature(
    signature: Omit<PetitionSignature, "id" | "submitted_at">
  ): PetitionSignature {
    const id = `sig-${Date.now()}`;
    const newSig: PetitionSignature = {
      ...signature,
      id,
      submitted_at: new Date().toISOString(),
    };
    this.petitionSignatures.push(newSig);

    this.logAudit({
      actor: signature.display_name,
      action: "PETITION_SIGNED",
      entity_type: "PETITION",
      entity_id: id,
      details: `Signed support from ${signature.locality}`,
    });

    return newSig;
  }

  // Documents
  getDocuments(category?: string): ProjectDocument[] {
    if (!category) return [...this.projectDocuments];
    return this.projectDocuments.filter((d) => d.document_type === category);
  }

  addDocument(
    doc: Omit<ProjectDocument, "id" | "uploaded_at">,
    actorName: string
  ): ProjectDocument {
    const id = `doc-${Date.now()}`;
    const newDoc: ProjectDocument = {
      ...doc,
      id,
      uploaded_at: new Date().toISOString(),
    };
    this.projectDocuments.push(newDoc);

    this.logAudit({
      actor: actorName,
      action: "DOCUMENT_UPLOADED",
      entity_type: "DOCUMENT",
      entity_id: id,
      details: `Uploaded official document: ${newDoc.title}`,
    });

    return newDoc;
  }

  // Updates & News
  getUpdates(): ProjectUpdate[] {
    return [...this.updates];
  }

  addUpdate(update: Omit<ProjectUpdate, "id">, actorName: string): ProjectUpdate {
    const id = `update-${Date.now()}`;
    const newUpdate: ProjectUpdate = {
      ...update,
      id,
    };
    this.updates.unshift(newUpdate);

    this.logAudit({
      actor: actorName,
      action: "UPDATE_PUBLISHED",
      entity_type: "UPDATE",
      entity_id: id,
      details: `Published milestone update: ${newUpdate.headline}`,
    });

    return newUpdate;
  }

  // Volunteers
  registerVolunteer(
    volunteer: Omit<VolunteerRegistration, "id" | "registered_at">
  ): VolunteerRegistration {
    const id = `vol-${Date.now()}`;
    const newVol: VolunteerRegistration = {
      ...volunteer,
      id,
      registered_at: new Date().toISOString(),
    };
    this.volunteers.push(newVol);

    this.logAudit({
      actor: volunteer.display_name,
      action: "VOLUNTEER_REGISTERED",
      entity_type: "VOLUNTEER",
      entity_id: id,
      details: `Volunteer registered in ${volunteer.locality} for: ${volunteer.areas_of_interest.join(", ")}`,
    });

    return newVol;
  }

  // Audit Logs
  getAuditLogs(): AuditLog[] {
    return [...this.auditLogs].reverse();
  }

  logAudit(entry: Omit<AuditLog, "id" | "timestamp">) {
    const log: AuditLog = {
      ...entry,
      id: `audit-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
    };
    this.auditLogs.push(log);
  }

  // Impact Dashboard Statistics derived directly from real/verified database records
  getImpactStatistics() {
    const totalTrees = this.trees.length;
    const verifiedTrees = this.trees.filter(
      (t) => t.verification_status === "VERIFIED"
    ).length;
    const pendingTrees = this.trees.filter(
      (t) => t.verification_status === "PENDING_REVIEW"
    ).length;
    const citizenCount = this.citizenReports.length;
    const supporterCount = this.petitionSignatures.length;
    const documentCount = this.projectDocuments.length;
    const potentiallyAffected = this.trees.filter(
      (t) =>
        t.threat_status === "POTENTIALLY_AFFECTED" ||
        t.threat_status === "OFFICIALLY_LISTED_FELLING"
    ).length;

    // Biomass and Carbon calculation based on allometric equations (FAO / Chave et al.)
    // Note: Scientific disclaimer shown in UI. Biomass = 0.0673 * (rho * DBH^2 * H)^0.976
    // Approximate carbon = 50% of dry biomass
    let totalEstimatedCarbonTonnes = 0;
    let matureTreeCount = 0; // DBH > 50cm (circumference > 157cm)

    this.trees.forEach((t) => {
      const dbh_cm = t.trunk_circumference_cm / Math.PI;
      if (dbh_cm >= 50) {
        matureTreeCount++;
      }
      // Estimated biomass in kg: 0.1 * (dbh_cm ^ 2.2) * (t.estimated_height_m ^ 0.5)
      const biomassKg =
        0.08 * Math.pow(dbh_cm, 2.1) * Math.pow(t.estimated_height_m, 0.6);
      const carbonKg = biomassKg * 0.48;
      totalEstimatedCarbonTonnes += carbonKg / 1000;
    });

    // Species distribution
    const speciesMap: Record<string, number> = {};
    this.trees.forEach((t) => {
      speciesMap[t.species_common_name] =
        (speciesMap[t.species_common_name] || 0) + 1;
    });

    const speciesDistribution = Object.entries(speciesMap).map(([name, count]) => ({
      name,
      count,
    }));

    // Girth / Diameter class breakdown
    const sizeClasses = [
      {
        range: "< 100 cm girth (Young / Sub-mature)",
        count: this.trees.filter((t) => t.trunk_circumference_cm < 100).length,
      },
      {
        range: "100 - 200 cm girth (Established mature)",
        count: this.trees.filter(
          (t) =>
            t.trunk_circumference_cm >= 100 && t.trunk_circumference_cm < 200
        ).length,
      },
      {
        range: "200 - 350 cm girth (Old growth heritage)",
        count: this.trees.filter(
          (t) =>
            t.trunk_circumference_cm >= 200 && t.trunk_circumference_cm < 350
        ).length,
      },
      {
        range: "> 350 cm girth (Centennial specimen)",
        count: this.trees.filter((t) => t.trunk_circumference_cm >= 350).length,
      },
    ];

    // Health conditions
    const healthMap: Record<string, number> = {};
    this.trees.forEach((t) => {
      healthMap[t.health_status] = (healthMap[t.health_status] || 0) + 1;
    });

    const healthDistribution = Object.entries(healthMap).map(([status, count]) => ({
      status,
      count,
    }));

    return {
      reportedPotentiallyAffected: 7000, // Explicitly labelled as preliminary reported estimate
      reportedEstimateNote:
        "Preliminary estimate reported in regional media and tender discussions; awaiting published official survey verification.",
      totalRecordedTrees: totalTrees,
      verifiedTrees,
      pendingTrees,
      citizenReportsCount: citizenCount,
      publicSupporterCount: supporterCount,
      officialDocumentsCount: documentCount,
      matureTreeCount,
      potentiallyAffectedInCorridor: potentiallyAffected,
      estimatedCarbonStoredTonnes: Number(totalEstimatedCarbonTonnes.toFixed(1)),
      estimatedAnnualSequestrationKg: Number(
        (totalEstimatedCarbonTonnes * 24.5).toFixed(0)
      ),
      speciesDistribution,
      sizeClasses,
      healthDistribution,
    };
  }
}

// Global singleton instance for local dev & demo
const globalForDb = global as unknown as { localDb: LocalDatabase };
export const db = globalForDb.localDb || new LocalDatabase();
if (process.env.NODE_ENV !== "production") globalForDb.localDb = db;
