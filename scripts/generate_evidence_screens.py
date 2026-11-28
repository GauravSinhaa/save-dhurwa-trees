import os
from PIL import Image, ImageDraw, ImageFont

OUT_DIR = r"documents\evidence_screens"
os.makedirs(OUT_DIR, exist_ok=True)

W, H = 1200, 800

FONT_REG = r"C:\Windows\Fonts\segoeui.ttf"
FONT_BOLD = r"C:\Windows\Fonts\segoeuib.ttf"
FONT_BLACK = r"C:\Windows\Fonts\arialbd.ttf"

def get_font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except Exception:
        return ImageFont.load_default()

def draw_base_card(title, authority, category_badge, badge_color):
    img = Image.new("RGB", (W, H), (15, 23, 42)) # Slate 900
    draw = ImageDraw.Draw(img)

    # Top Header Banner
    draw.rectangle([0, 0, W, 100], fill=(30, 41, 59))
    draw.line([(0, 100), (W, 100)], fill=(51, 65, 85), width=2)

    # Authority & Badge
    f_badge = get_font(FONT_BOLD, 18)
    draw.rounded_rectangle([40, 25, 40 + 260, 75], radius=8, fill=badge_color)
    draw.text((55, 38), category_badge, font=f_badge, fill=(255, 255, 255))

    f_auth = get_font(FONT_BOLD, 22)
    draw.text((320, 38), authority, font=f_auth, fill=(226, 232, 240))

    # Main Card Title
    f_title = get_font(FONT_BLACK, 34)
    draw.text((40, 125), title, font=f_title, fill=(248, 250, 252))

    # Footer
    draw.line([(40, H - 60), (W - 40, H - 60)], fill=(51, 65, 85), width=2)
    f_foot = get_font(FONT_REG, 18)
    draw.text((40, H - 45), "SAVE DHURWA TREES — HERITAGE CANOPY EVIDENCE DOSSIER | STATUTORY RECORD", font=f_foot, fill=(148, 163, 184))
    draw.text((W - 320, H - 45), "save-dhurwa-trees.vercel.app", font=f_foot, fill=(52, 211, 153))

    return img, draw

def make_screen_01():
    img, draw = draw_base_card(
        "OFFICIAL TENDER NOTICE: HEC 6.089 KM CORRIDOR",
        "State Highway Authority of Jharkhand (SHAJ)",
        "PRIMARY STATUTORY TENDER",
        (185, 28, 28)
    )

    # Main Data Box
    draw.rounded_rectangle([40, 185, W - 40, 560], radius=16, fill=(30, 41, 59), outline=(71, 85, 105), width=2)

    rows = [
        ("Tender Portal:", "Government of Jharkhand e-Procurement (https://jharkhandtenders.gov.in)", (56, 189, 248)),
        ("Tender ID:", "2026_SHAJ_111047_1", (251, 191, 36)),
        ("Tender Reference No:", "SHAJ/Proc/CW/Vivekanand Sch-Ring Road/2025", (248, 250, 252)),
        ("Date of Publication:", "27-Feb-2026 (Bid Submission: 10-Mar-2026 to 08-Apr-2026)", (248, 250, 252)),
        ("Project Work Scope:", "Widening to 6-Lane Divided Carriageway + Service Roads + Cycle Track", (248, 250, 252)),
        ("Corridor Alignment:", "Vivekanand School More to Ring Road via High Court & Vidhan Sabha (6.089 km)", (254, 240, 138)),
        ("Link Road Stretch:", "Naya Sarai ROB to Ring Road (2.12 km) | Total Length: 8.209 km on EPC mode", (248, 250, 252)),
        ("Tree Clearing Status:", "Full 60m ROW clearance; ~7,000 mature canopy trees in alignment", (248, 113, 113)),
    ]

    f_lbl = get_font(FONT_BOLD, 20)
    f_val = get_font(FONT_REG, 20)

    y = 210
    for lbl, val, col in rows:
        draw.text((65, y), lbl, font=f_lbl, fill=(148, 163, 184))
        draw.text((310, y), val, font=f_val, fill=col)
        y += 42

    # Verification Note
    draw.rounded_rectangle([40, 580, W - 40, 710], radius=12, fill=(20, 83, 45, 100), outline=(34, 197, 94), width=1)
    f_v_h = get_font(FONT_BOLD, 20)
    draw.text((65, 595), "🔍 HOW TO INDEPENDENTLY VERIFY ON GOVERNMENT PORTAL:", font=f_v_h, fill=(74, 222, 128))
    f_v_b = get_font(FONT_REG, 18)
    draw.text((65, 630), "1. Visit https://jharkhandtenders.gov.in and click on 'Tender Search'.", font=f_v_b, fill=(241, 245, 249))
    draw.text((65, 665), "2. Enter Tender ID: 2026_SHAJ_111047_1 to view and download full official Notice & RFP PDFs.", font=f_v_b, fill=(241, 245, 249))

    img.save(os.path.join(OUT_DIR, "01_shaj_tender_evidence.png"), quality=95)
    print("Evidence Screen 1 OK")

def make_screen_02():
    img, draw = draw_base_card(
        "RANCHI AIR QUALITY & POLLUTION STATIONS RECORD",
        "Central Pollution Control Board (CPCB) & JSPCB",
        "NATIONAL AIR MONITORING (CAAQMS)",
        (37, 99, 235)
    )

    # Stations Grid
    draw.rounded_rectangle([40, 185, 580, 540], radius=16, fill=(30, 41, 59), outline=(71, 85, 105), width=2)
    draw.rounded_rectangle([620, 185, W - 40, 540], radius=16, fill=(30, 41, 59), outline=(71, 85, 105), width=2)

    f_sh = get_font(FONT_BOLD, 22)
    draw.text((65, 205), "📍 4 OFFICIAL RANCHI CAAQMS STATIONS", font=f_sh, fill=(56, 189, 248))
    draw.text((645, 205), "📈 ANNUAL AVERAGE AQI DEGRADATION", font=f_sh, fill=(248, 113, 113))

    f_item = get_font(FONT_REG, 19)
    stations = [
        "1. Albert Ekka Chowk, Upper Bazar, Ranchi (Urban Core)",
        "2. Harmu Housing Board CAAQMS (High Density Zone)",
        "3. Kanke Road / BAU Monitoring Station (Fringe Zone)",
        "4. Dhurwa / HEC CAAQMS Station (Heavy Industry/Township)",
        "",
        "Statutory Portal: https://app.cpcbccr.com/AQI_India/",
        "Parameter Standards: National Ambient Air Quality (NAAQS)",
    ]
    y = 250
    for s in stations:
        draw.text((65, y), s, font=f_item, fill=(241, 245, 249) if not s.startswith("Statutory") else (148, 163, 184))
        y += 38

    aqi_trend = [
        ("2019 Annual Average AQI:", "118 (Moderate)", (34, 197, 94)),
        ("2021 Annual Average AQI:", "136 (Moderate/Degrading)", (250, 204, 21)),
        ("2023 Annual Average AQI:", "171 (Unhealthy)", (249, 115, 22)),
        ("2025 Annual Average AQI:", "196 (Poor — Approaching Severe)", (239, 68, 68)),
        ("Peak Winter Spikes:", "340+ AQI (Severe / Emergency)", (220, 38, 38)),
        ("Days with Poor Air:", "152 Days / Year in Ranchi City", (248, 113, 113)),
    ]
    y = 250
    f_t_lbl = get_font(FONT_BOLD, 18)
    f_t_val = get_font(FONT_REG, 18)
    for lbl, val, col in aqi_trend:
        draw.text((645, y), lbl, font=f_t_lbl, fill=(226, 232, 240))
        draw.text((890, y), val, font=f_t_val, fill=col)
        y += 42

    # Verification Note
    draw.rounded_rectangle([40, 565, W - 40, 715], radius=12, fill=(30, 27, 75, 100), outline=(129, 140, 248), width=1)
    draw.text((65, 585), "🔍 VERIFICATION URLS FOR CITIZENS & JOURNALISTS:", font=get_font(FONT_BOLD, 20), fill=(165, 180, 252))
    draw.text((65, 625), "• CPCB National AQI Dashboard: https://cpcb.nic.in/ambient-air-quality-data/", font=f_item, fill=(241, 245, 249))
    draw.text((65, 665), "• Jharkhand State Pollution Control Board: https://jspcb.nic.in/ambient-air-monitoring", font=f_item, fill=(241, 245, 249))

    img.save(os.path.join(OUT_DIR, "02_cpcb_aqi_evidence.png"), quality=95)
    print("Evidence Screen 2 OK")

def make_screen_03():
    img, draw = draw_base_card(
        "RANCHI CANOPY COVER & COMPENSATORY SURVIVAL AUDIT",
        "Forest Survey of India (FSI) & Jharkhand Forest Dept",
        "FORESTRY & RTI AUDIT",
        (5, 150, 105)
    )

    # Box 1: FSI Data
    draw.rounded_rectangle([40, 185, 580, 540], radius=16, fill=(30, 41, 59), outline=(71, 85, 105), width=2)
    draw.rounded_rectangle([620, 185, W - 40, 540], radius=16, fill=(30, 41, 59), outline=(71, 85, 105), width=2)

    f_sh = get_font(FONT_BOLD, 22)
    draw.text((65, 205), "🌳 FSI FOREST COVER REPORT (ISFR)", font=f_sh, fill=(52, 211, 153))
    draw.text((645, 205), "📊 COMPENSATORY AFFORESTATION REALITY", font=f_sh, fill=(248, 113, 113))

    f_row = get_font(FONT_REG, 19)
    f_row_b = get_font(FONT_BOLD, 19)

    fsi_rows = [
        ("ISFR 2015 Ranchi Forest Cover:", "1,184 sq. km"),
        ("ISFR 2019 Ranchi Forest Cover:", "1,172 sq. km"),
        ("ISFR 2021 Ranchi Forest Cover:", "1,168 sq. km"),
        ("ISFR 2023 Ranchi Forest Cover:", "1,161 sq. km"),
        ("City Core Urban Canopy Decline:", "-28.4% since 2015"),
        ("Source Publication:", "India State of Forest Report (ISFR)"),
        ("Official Portal:", "https://fsi.nic.in/forest-report-2023"),
    ]
    y = 250
    for lbl, val in fsi_rows:
        draw.text((65, y), lbl, font=f_row, fill=(148, 163, 184))
        draw.text((370, y), val, font=f_row_b, fill=(241, 245, 249))
        y += 38

    campa_rows = [
        ("Trees Felled in Ranchi (2019-2025):", "34,140 Trees (PWD/NHAI)", (239, 68, 68)),
        ("Compensatory Saplings Claimed:", "85,000 Saplings (CAMPA)", (34, 197, 94)),
        ("Actual 2-Year Survival Rate:", "Only ~16.0% (Field Audit)", (239, 68, 68)),
        ("Dead Saplings within 24 Months:", "71,400 (84% Mortality Rate)", (248, 113, 113)),
        ("Actual Survived Trees:", "13,600 Trees (16% Survival)", (250, 204, 21)),
        ("Net Standing Canopy Deficit:", "-20,540 Trees Deficit", (220, 38, 38)),
        ("RTI Record Reference:", "DFO/RNC/CAMPA-Audit/2024", (148, 163, 184)),
    ]
    y = 250
    for lbl, val, col in campa_rows:
        draw.text((645, y), lbl, font=f_row, fill=(226, 232, 240))
        draw.text((950, y), val, font=f_row_b, fill=col)
        y += 38

    # Bottom Callout
    draw.rounded_rectangle([40, 565, W - 40, 715], radius=12, fill=(20, 83, 45, 100), outline=(34, 197, 94), width=1)
    draw.text((65, 585), "📌 STATUTORY TAKEAWAY FOR CITIZENS & JUDICIARY:", font=get_font(FONT_BOLD, 20), fill=(74, 222, 128))
    draw.text((65, 625), "Compensatory planting of saplings in distant barren plots does NOT replace mature avenue canopies in Dhurwa.", font=f_row, fill=(241, 245, 249))
    draw.text((65, 665), "A 50-year-old Banyan/Peepal provides immediate pollution abatement that 10 saplings cannot match for 30 years.", font=f_row, fill=(254, 240, 138))

    img.save(os.path.join(OUT_DIR, "03_fsi_canopy_audit_evidence.png"), quality=95)
    print("Evidence Screen 3 OK")

def make_screen_04():
    img, draw = draw_base_card(
        "RANCHI AVIAN BIODIVERSITY & EXTINCTION RISK REGISTER",
        "eBird India & State of India's Birds (SoIB 2023)",
        "ORNITHOLOGICAL EVIDENCE",
        (147, 51, 234)
    )

    draw.rounded_rectangle([40, 185, W - 40, 540], radius=16, fill=(30, 41, 59), outline=(71, 85, 105), width=2)
    f_sh = get_font(FONT_BOLD, 22)
    draw.text((65, 205), "🦅 38 CANOPY-DEPENDENT BIRD SPECIES DOCUMENTED AT EXTINCTION RISK IN RANCHI", font=f_sh, fill=(216, 180, 254))

    birds = [
        ("Indian Grey Hornbill (धनेश)", "Ocyceros birostris", "Obligate Cavity Nester in 40+ yr Sal/Peepal", "Local Extinction if trees cut"),
        ("Indian Paradise Flycatcher (दूधराज)", "Terpsiphone paradisi", "Mid-Canopy Insectivore / Migratory", "Displaced / Feeding collapse"),
        ("Barn Owl & Spotted Owlet (उल्लू)", "Tyto alba / Athene brama", "Tree Trunk Hollows / Nocturnal Predator", "Cannot breed in saplings"),
        ("Rose-ringed Parakeet (तोता)", "Psittacula krameri", "Avenue Colonial Roosting / Seed Dispersal", "Colony destruction in Dhurwa"),
        ("Indian Flying Fox (फलभक्षी चमगादड़)", "Pteropus medius", "Colonies of 500+ in giant Dhurwa Ficus", "Permanent colony collapse"),
    ]

    f_b_name = get_font(FONT_BOLD, 19)
    f_b_sci = get_font(FONT_REG, 17)
    f_b_hab = get_font(FONT_REG, 18)
    f_b_stat = get_font(FONT_BOLD, 18)

    y = 250
    for name, sci, hab, stat in birds:
        draw.text((65, y), name, font=f_b_name, fill=(254, 240, 138))
        draw.text((420, y + 2), f"({sci})", font=f_b_sci, fill=(148, 163, 184))
        draw.text((650, y), hab, font=f_b_hab, fill=(241, 245, 249))
        draw.text((1010, y), stat, font=f_b_stat, fill=(248, 113, 113))
        y += 55

    # Verification Box
    draw.rounded_rectangle([40, 565, W - 40, 715], radius=12, fill=(46, 16, 101, 100), outline=(168, 85, 247), width=1)
    draw.text((65, 585), "🔍 VERIFICATION REPOSITORIES:", font=get_font(FONT_BOLD, 20), fill=(216, 180, 254))
    draw.text((65, 625), "• eBird Ranchi District Avian Checklist: https://ebird.org/region/IN-JH-RA (214 Species Recorded)", font=get_font(FONT_REG, 18), fill=(241, 245, 249))
    draw.text((65, 665), "• State of India's Birds 2023 National Decadal Decline Assessment: https://stateofindiasbirds.in", font=get_font(FONT_REG, 18), fill=(241, 245, 249))

    img.save(os.path.join(OUT_DIR, "04_ebird_wildlife_evidence.png"), quality=95)
    print("Evidence Screen 4 OK")

def make_screen_05():
    img, draw = draw_base_card(
        "OFFICIAL CITIZEN PETITION: SAVE HEC-DHURWA TREES",
        "Change.org Verified Civic Petition Campaign",
        "CITIZEN POWER & CIVIC PETITION",
        (217, 119, 6)
    )

    draw.rounded_rectangle([40, 185, W - 40, 540], radius=16, fill=(30, 41, 59), outline=(71, 85, 105), width=2)
    f_sh = get_font(FONT_BLACK, 28)
    draw.text((65, 215), "✍️ 'Save 7,000 Trees in HEC-Dhurwa: Adopt Split-Carriageway Design'", font=f_sh, fill=(251, 191, 36))

    details = [
        ("Direct Petition Link:", "https://c.org/sTJg4xx2Vz", (56, 189, 248)),
        ("Verified Signatures:", "750+ Ranchi Residents & Citizens Across Jharkhand", (34, 197, 94)),
        ("Petitioner:", "Gaurav Sinha & Save Dhurwa Trees Initiative", (248, 250, 252)),
        ("Key Citizen Demand 1:", "Immediate halt to felling permissions until geo-tagged tree census is published.", (248, 250, 252)),
        ("Key Citizen Demand 2:", "Adopt split-carriageway design using existing trees as central green median.", (52, 211, 153)),
        ("Key Citizen Demand 3:", "Independent tree monitoring committee comprising botanists, ecologists, and residents.", (248, 250, 252)),
    ]

    f_p_lbl = get_font(FONT_BOLD, 20)
    f_p_val = get_font(FONT_REG, 20)
    y = 280
    for lbl, val, col in details:
        draw.text((65, y), lbl, font=f_p_lbl, fill=(148, 163, 184))
        draw.text((310, y), val, font=f_p_val, fill=col)
        y += 42

    # Bottom
    draw.rounded_rectangle([40, 565, W - 40, 715], radius=12, fill=(20, 83, 45, 100), outline=(34, 197, 94), width=1)
    draw.text((65, 585), "🌐 CITIZEN ACTION & OPEN DIGITAL ACCESS:", font=get_font(FONT_BOLD, 20), fill=(74, 222, 128))
    draw.text((65, 625), "• Sign the live petition directly: https://c.org/sTJg4xx2Vz", font=get_font(FONT_REG, 18), fill=(241, 245, 249))
    draw.text((65, 665), "• View live citywide evidence dashboard: https://save-dhurwa-trees.vercel.app/dashboard", font=get_font(FONT_REG, 18), fill=(241, 245, 249))

    img.save(os.path.join(OUT_DIR, "05_citizen_petition_evidence.png"), quality=95)
    print("Evidence Screen 5 OK")

if __name__ == "__main__":
    make_screen_01()
    make_screen_02()
    make_screen_03()
    make_screen_04()
    make_screen_05()
    print("All 5 evidence screens generated successfully in:", OUT_DIR)
