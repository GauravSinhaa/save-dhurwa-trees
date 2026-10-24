# SAVE DHURWA TREES
### A Digital Platform to Protect Ranchi's Urban Green Cover

**"Development Without Destruction."**  
*Better roads. Smarter planning. Living trees.*

---

## 1. Overview

**Save Dhurwa Trees** is a production-oriented, fact-based civic technology and environmental platform built to document, map, and advocate for the preservation of mature trees potentially threatened by the proposed **10-lane road widening project in Dhurwa, Ranchi, Jharkhand, India** (from Vivekananda School More to Ranchi Ring Road via Naya Sarai, approximately 6.089 km).

The project has been reported in media and preliminary tender notices to potentially affect approximately 7,000 trees. This platform treats that figure as an **unverified reported estimate** until official joint-survey records are made public, while offering constructive, engineering-backed alternatives to preserve 60%–80% of mature trees.

---

## 2. Platform Architecture & Pages

The application is built with the **Next.js App Router (TypeScript)**, **Tailwind CSS**, **Leaflet (GIS)**, and **Recharts**.

| Page | URL Path | Key Features |
|---|---|---|
| **Home** | `/` | Hero with authentic Ranchi canopy photography, impact statistics, "Why It Matters" cards, avian habitat biodiversity, grassroots movement spotlight, and embedded GIS map. |
| **The Dhurwa Project** | `/project` | Factual corridor profile (6.089 km, ₹177 Cr, 10-lane footprint), evidentiary fact-check registry, and interactive RTI document checklist modal. |
| **Interactive Tree Map** | `/map` | Fullscreen Leaflet GIS map with 6.089 km road corridor buffer, customizable tree markers (size proportional to girth), search, filters, and tree detail inspection drawer. |
| **Environmental Impact** | `/impact` | Recharts species diversity bar chart, girth class breakdown, avian nesting dependencies, and scientific allometric carbon accounting (Chave et al. equation). Export metrics to CSV or printable report. |
| **Citizen Tree Reporting** | `/report` | Mobile-first field reporting form with instant photo preview, GPS auto-detect, girth & height inputs, construction conflict flag, and review queue integration. |
| **Public Petition** | `/petition` | Formal civic representation addressed to the Government of Jharkhand and SHAJ, privacy-preserving supporter signing, real-time counters, and confetti celebration. |
| **Documents & Transparency** | `/documents` | Searchable public document repository (DPR, notices, court orders) and a built-in **RTI Application Assistant** that auto-formats legal Form 'A' requests. |
| **News & Updates** | `/news` | Chronological milestone timeline with badges for Official Announcements, Media Reports, and Citizen Observations. |
| **Get Involved** | `/get-involved` | Volunteer registration across working groups (GIS, botany, RTI, legal) and WhatsApp/Social Campaign Share Kit. |
| **About the Initiative** | `/about` | Mission charter, nonpartisan ethics, peaceful legal advocacy stance, and official correction notice process. |
| **Admin Dashboard** | `/admin` | Role-based portal (`PIN: dhurwa2026`) with submission moderation queue, tree inventory master editor, and GIS GeoJSON/CSV batch importer. |
| **Privacy Policy** | `/privacy` | Strict data minimisation and confidential email handling safeguards. |
| **Terms of Use** | `/terms` | Open civic data licensing (CC BY 4.0) and user contribution rules. |

---

## 3. Technology Stack

- **Framework**: Next.js 16 (App Router, Turbopack, Cache Components)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS
- **Mapping**: Leaflet 1.9 & OpenStreetMap (SSR-safe dynamic import)
- **Data Visualizations**: Recharts
- **Validation**: Zod 4
- **Civic Effects**: canvas-confetti
- **Icons**: Lucide React
- **Bilingual i18n**: English & Unicode Hindi (हिन्दी) switcher

---

## 4. Local Development & Testing

### Prerequisites
- Node.js (v20+ or v24 LTS)
- npm (v10+ or v11+)

### Installation
```bash
# Clone or navigate to the repository
cd "Save Dhurwa Trees"

# Install dependencies
npm install
```

### Running the Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### Building for Production
```bash
npm run build
npm run start
```

---

## 5. Administrative Access & Moderation

- Navigate to `/admin`.
- Default administrative PIN: **`dhurwa2026`**
- From the admin portal, authorized reviewers can:
  1. **Approve / Reject Citizen Submissions**: Approving immediately creates a verified tree record and plots it on the live GIS map.
  2. **Audit Tree Status**: Update tree status (e.g., from *Potentially Affected* to *Preserved*) with an audit reason and editor signature.
  3. **Batch Import GIS Datasets**: Paste surveyor CSV or GeoJSON files with coordinate validation (checks that points fall within Ranchi/Jharkhand bounds: 22.0°N to 24.5°N, 84.0°E to 86.5°E).

---

## 6. Data Integrity & Scientific Standards

1. **Demonstration Samples**: Trees tagged with `[DEMO]` are clearly labeled samples to facilitate local testing and are never represented as verified official field data.
2. **Carbon Calculation Methodology**:
   - Aboveground Biomass (AGB): $AGB = 0.08 \times DBH^{2.1} \times H^{0.6}$
   - Carbon Stock: $Carbon = AGB \times 0.48$
   - Carbon calculations derive solely from physically documented trees in our database, avoiding crude multiplication of unverified estimates.
3. **Legal Disclaimer**: Save Dhurwa Trees is an independent civic platform and is not affiliated with the Government of Jharkhand or any statutory road authority.
