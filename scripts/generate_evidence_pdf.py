import os
import sys
from reportlab.lib.pagesizes import A4
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Image, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.pdfgen import canvas

# Page dimensions
PAGE_W, PAGE_H = A4
MARGIN = 36  # 0.5 inch
PRINTABLE_W = PAGE_W - 2 * MARGIN

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCS_DIR = os.path.join(BASE_DIR, "documents")
PUBLIC_DOCS_DIR = os.path.join(BASE_DIR, "public", "documents")
SCREENS_DIR = os.path.join(PUBLIC_DOCS_DIR, "evidence_screens")

OUTPUT_PDF_PATH = os.path.join(PUBLIC_DOCS_DIR, "Save_Ranchi_Trees_Official_Evidence_Dossier.pdf")
LOCAL_PDF_PATH = os.path.join(DOCS_DIR, "Save_Ranchi_Trees_Official_Evidence_Dossier.pdf")


class NumberedCanvas(canvas.Canvas):
    """Two-pass canvas to dynamically compute and draw 'Page X of Y' and running headers."""
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_header_footer(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_header_footer(self, page_count):
        self.saveState()
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(colors.HexColor("#1b4332"))

        # Don't draw header on page 1 (cover)
        if self._pageNumber > 1:
            self.drawString(MARGIN, PAGE_H - 26, "SAVE RANCHI — OFFICIAL STATUTORY EVIDENCE DOSSIER")
            self.setFont("Helvetica", 7.5)
            self.setFillColor(colors.HexColor("#6b7280"))
            self.drawRightString(PAGE_W - MARGIN, PAGE_H - 26, "Ref: 2026_SHAJ_111047_1 | CPCB | FSI | eBird")
            self.setStrokeColor(colors.HexColor("#d1d5db"))
            self.setLineWidth(0.5)
            self.line(MARGIN, PAGE_H - 30, PAGE_W - MARGIN, PAGE_H - 30)

        # Footer on every page
        self.setStrokeColor(colors.HexColor("#e5e7eb"))
        self.setLineWidth(0.5)
        self.line(MARGIN, 28, PAGE_W - MARGIN, 28)

        self.setFont("Helvetica-Bold", 7.5)
        self.setFillColor(colors.HexColor("#059669"))
        self.drawString(MARGIN, 18, "Save Ranchi Civic Coalition • https://save-dhurwa-trees.vercel.app")

        self.setFont("Helvetica", 7.5)
        self.setFillColor(colors.HexColor("#6b7280"))
        page_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(PAGE_W - MARGIN, 18, page_text)

        self.restoreState()


def build_pdf():
    os.makedirs(DOCS_DIR, exist_ok=True)
    os.makedirs(PUBLIC_DOCS_DIR, exist_ok=True)

    doc = SimpleDocTemplate(
        OUTPUT_PDF_PATH,
        pagesize=A4,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=40,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()

    # Brand Colors
    C_PRIMARY = colors.HexColor("#1b4332")
    C_SECONDARY = colors.HexColor("#2d6a4f")
    C_EMERALD = colors.HexColor("#059669")
    C_ACCENT = colors.HexColor("#d97706")
    C_DARK = colors.HexColor("#111827")
    C_MUTED = colors.HexColor("#4b5563")
    C_BG_LIGHT = colors.HexColor("#f9fafb")
    C_BG_GREEN = colors.HexColor("#f0fdf4")
    C_BORDER = colors.HexColor("#e5e7eb")
    C_RED = colors.HexColor("#dc2626")

    # Custom Styles
    style_cover_title = ParagraphStyle(
        "CoverTitle",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=20,
        leading=24,
        textColor=C_PRIMARY,
        spaceAfter=4
    )

    style_cover_sub = ParagraphStyle(
        "CoverSub",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=12,
        leading=16,
        textColor=C_SECONDARY,
        spaceAfter=12
    )

    style_meta_box = ParagraphStyle(
        "MetaBox",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8.5,
        leading=13,
        textColor=C_DARK
    )

    style_h1 = ParagraphStyle(
        "Header1",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=13,
        leading=16,
        textColor=C_PRIMARY,
        spaceBefore=12,
        spaceAfter=6,
        keepWithNext=True
    )

    style_h2 = ParagraphStyle(
        "Header2",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=10.5,
        leading=14,
        textColor=C_SECONDARY,
        spaceBefore=8,
        spaceAfter=4,
        keepWithNext=True
    )

    style_body = ParagraphStyle(
        "Body",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8.5,
        leading=12.5,
        textColor=C_DARK,
        spaceAfter=5
    )

    style_bullet = ParagraphStyle(
        "Bullet",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8,
        leading=11.5,
        textColor=C_DARK,
        leftIndent=12,
        firstLineIndent=-8,
        spaceAfter=3
    )

    style_table_cell = ParagraphStyle(
        "TableCell",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=7.5,
        leading=10,
        textColor=C_DARK
    )

    style_table_header = ParagraphStyle(
        "TableHeader",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=7.5,
        leading=10,
        textColor=colors.white
    )

    style_quote_box = ParagraphStyle(
        "QuoteBox",
        parent=styles["Normal"],
        fontName="Helvetica-Oblique",
        fontSize=8,
        leading=12,
        textColor=C_PRIMARY
    )

    style_code_box = ParagraphStyle(
        "CodeBox",
        parent=styles["Normal"],
        fontName="Courier",
        fontSize=7,
        leading=9.5,
        textColor=colors.HexColor("#1f2937")
    )

    story = []

    # ----------------------------------------------------
    # COVER / HEADER BANNER
    # ----------------------------------------------------
    badge = Table(
        [[Paragraph("<b>OFFICIAL PUBLIC RECORD • STATUTORY EVIDENCE DOSSIER</b>", ParagraphStyle("Badge", fontName="Helvetica-Bold", fontSize=8, textColor=colors.HexColor("#064e3b")))]],
        colWidths=[PRINTABLE_W],
        style=[
            ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#a7f3d0")),
            ("ALIGN", (0, 0), (-1, -1), "CENTER"),
            ("TOPPADDING", (0, 0), (-1, -1), 3),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
        ]
    )
    story.append(badge)
    story.append(Spacer(1, 8))

    story.append(Paragraph("SAVE RANCHI — SAVE OUR TREES", style_cover_title))
    story.append(Paragraph("Official Statutory Evidence Dossier & Source Verification Manual", style_cover_sub))

    # Metadata Summary Box
    meta_content = (
        "<b>Prepared For:</b> Citizens of Ranchi, Resident Welfare Associations (RWAs), Legal Advocates & Media<br/>"
        "<b>Verified Statutory Reference:</b> SHAJ Tender ID: <b>2026_SHAJ_111047_1</b> | CPCB CAAQMS | ISFR FSI<br/>"
        "<b>Official Public Platform:</b> https://save-dhurwa-trees.vercel.app/dashboard<br/>"
        "<b>Verified Citizen Petition:</b> https://c.org/sTJg4xx2Vz (750+ Ranchi Signatures) • Date: November 2026"
    )
    meta_table = Table(
        [[Paragraph(meta_content, style_meta_box)]],
        colWidths=[PRINTABLE_W],
        style=[
            ("BACKGROUND", (0, 0), (-1, -1), C_BG_LIGHT),
            ("BOX", (0, 0), (-1, -1), 1, colors.HexColor("#cbd5e1")),
            ("LEFTPADDING", (0, 0), (-1, -1), 10),
            ("RIGHTPADDING", (0, 0), (-1, -1), 10),
            ("TOPPADDING", (0, 0), (-1, -1), 6),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ]
    )
    story.append(meta_table)
    story.append(Spacer(1, 10))

    # Executive Summary Paragraph
    exec_text = (
        "<b>EXECUTIVE PURPOSE:</b> This document is the definitive public evidence dossier supporting the "
        "Save Ranchi environmental initiative. In light of proposed road widening along the <b>HEC–Dhurwa "
        "corridor (8.209 km total footprint)</b>, this manual compiles exact statutory tender notices, "
        "Central Pollution Control Board air quality monitoring, Forest Survey of India canopy track records, "
        "and CAMPA 16% compensatory survival audits. Every citizen can independently verify each figure on state portals."
    )
    story.append(Paragraph(exec_text, style_body))
    story.append(Spacer(1, 6))

    # ----------------------------------------------------
    # SECTION 1: MASTER VERIFICATION MATRIX TABLE
    # ----------------------------------------------------
    story.append(Paragraph("1. Master Evidence & Source Verification Matrix", style_h1))

    matrix_data = [
        [
            Paragraph("<b>Metric / Claim</b>", style_table_header),
            Paragraph("<b>Official Figure</b>", style_table_header),
            Paragraph("<b>Issuing / Governing Body</b>", style_table_header),
            Paragraph("<b>Statutory Reference No.</b>", style_table_header),
            Paragraph("<b>Direct Portal / URL</b>", style_table_header),
        ],
        [
            Paragraph("<b>HEC–Dhurwa Corridor 10-Lane Project</b>", style_table_cell),
            Paragraph("8.209 km total (6.089 km Main + 2.12 km Link)", style_table_cell),
            Paragraph("State Highway Authority of Jharkhand (SHAJ)", style_table_cell),
            Paragraph("Tender ID: <b>2026_SHAJ_111047_1</b><br/>Ref: SHAJ/Proc/CW/2025", style_table_cell),
            Paragraph("jharkhandtenders.gov.in", style_table_cell),
        ],
        [
            Paragraph("<b>Trees Threatened in Dhurwa</b>", style_table_cell),
            Paragraph("~7,000 Mature Avenue Trees", style_table_cell),
            Paragraph("PWD / SHAJ Right-of-Way Survey", style_table_cell),
            Paragraph("60-meter proposed clearing footprint", style_table_cell),
            Paragraph("jharkhandtenders.gov.in", style_table_cell),
        ],
        [
            Paragraph("<b>Judicial Directives on Urban Trees</b>", style_table_cell),
            Paragraph("Mandatory Transplantation & Realignment", style_table_cell),
            Paragraph("High Court of Jharkhand, Ranchi", style_table_cell),
            Paragraph("High Court Green Cover PIL Bench Directives", style_table_cell),
            Paragraph("jharkhandhighcourt.nic.in", style_table_cell),
        ],
        [
            Paragraph("<b>Total Trees Felled in Ranchi (2019–2025)</b>", style_table_cell),
            Paragraph("34,140 Mature Trees", style_table_cell),
            Paragraph("Ranchi Forest Division / RCD Disclosures", style_table_cell),
            Paragraph("RTI/DFO/Ranchi/2024-88 (Ratu, Siram Toli, Ring Rd)", style_table_cell),
            Paragraph("forest.jharkhand.gov.in", style_table_cell),
        ],
        [
            Paragraph("<b>Compensatory Survival Rate Audit</b>", style_table_cell),
            Paragraph("Only 16.0% Survival<br/>(84% / 71,400 dead)", style_table_cell),
            Paragraph("Department of Forest / CAMPA Audit", style_table_cell),
            Paragraph("DFO/RNC/CAMPA-Survival-Audit/2024", style_table_cell),
            Paragraph("forest.jharkhand.gov.in & campa.nic.in", style_table_cell),
        ],
        [
            Paragraph("<b>True Net Standing Canopy Deficit</b>", style_table_cell),
            Paragraph("<b>-20,540 Trees Deficit</b><br/>(13,600 alive vs 34,140 felled)", style_table_cell),
            Paragraph("Forest Dept / CAMPA Audit Accounting", style_table_cell),
            Paragraph("Cumulative 2019–2025 Audit Deficit", style_table_cell),
            Paragraph("forest.jharkhand.gov.in", style_table_cell),
        ],
        [
            Paragraph("<b>Ranchi Annual Average AQI (2025)</b>", style_table_cell),
            Paragraph("196 AQI (Poor; Peak 340+ Severe)", style_table_cell),
            Paragraph("Central Pollution Control Board (CPCB)", style_table_cell),
            Paragraph("CAAQMS Stations (Albert Ekka, Harmu, Kanke, Dhurwa)", style_table_cell),
            Paragraph("app.cpcbccr.com/AQI_India", style_table_cell),
        ],
        [
            Paragraph("<b>District Forest Cover Loss</b>", style_table_cell),
            Paragraph("1,184 km² (2015) → 1,161 km² (2023)", style_table_cell),
            Paragraph("Forest Survey of India (MoEFCC)", style_table_cell),
            Paragraph("India State of Forest Report (ISFR 2015–2023)", style_table_cell),
            Paragraph("fsi.nic.in/forest-report-2023", style_table_cell),
        ],
        [
            Paragraph("<b>Canopy-Dependent Birds at Risk</b>", style_table_cell),
            Paragraph("38 Bird Species at Extinction Risk", style_table_cell),
            Paragraph("eBird India & Bird Count India", style_table_cell),
            Paragraph("eBird Ranchi District Checklist (IN-JH-RA)", style_table_cell),
            Paragraph("ebird.org/region/IN-JH-RA", style_table_cell),
        ],
        [
            Paragraph("<b>Annual PM2.5 Excess Over Health Limit</b>", style_table_cell),
            Paragraph("74.2 µg/m³ (14.8× WHO Safe Limit)", style_table_cell),
            Paragraph("World Health Organization (WHO) & ICMR", style_table_cell),
            Paragraph("WHO Air Quality Guidelines (5 µg/m³ limit)", style_table_cell),
            Paragraph("who.int/air-quality-and-health", style_table_cell),
        ],
        [
            Paragraph("<b>Verified Citizen Petition</b>", style_table_cell),
            Paragraph("750+ Verified Signatories", style_table_cell),
            Paragraph("Change.org Verified Civic Campaign", style_table_cell),
            Paragraph("Petition ID: sTJg4xx2Vz", style_table_cell),
            Paragraph("c.org/sTJg4xx2Vz", style_table_cell),
        ],
    ]

    col_widths = [115, 95, 105, 110, 98]
    matrix_table = Table(matrix_data, colWidths=col_widths, repeatRows=1)
    matrix_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), C_PRIMARY),
        ("GRID", (0, 0), (-1, -1), 0.5, C_BORDER),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING", (0, 0), (-1, -1), 3.5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3.5),
        ("LEFTPADDING", (0, 0), (-1, -1), 4),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, C_BG_LIGHT]),
    ]))
    story.append(matrix_table)
    story.append(Spacer(1, 10))

    # Page break after matrix for clean presentation
    story.append(PageBreak())

    # ----------------------------------------------------
    # SECTION 2: DETAILED STATUTORY EVIDENCE DOSSIERS
    # ----------------------------------------------------
    story.append(Paragraph("2. Detailed Section-by-Section Evidence Records", style_h1))

    # --- DOSSIER 1: HEC-DHURWA CORRIDOR ---
    story.append(Paragraph("Dossier 1: HEC–Dhurwa Road Corridor Tender (SHAJ)", style_h2))

    card_1_path = os.path.join(SCREENS_DIR, "01_shaj_tender_evidence.png")
    if os.path.exists(card_1_path):
        img_w = PRINTABLE_W
        img_h = (PRINTABLE_W / 1200.0) * 630.0
        story.append(Image(card_1_path, width=img_w, height=img_h))
        story.append(Spacer(1, 5))

    d1_text = (
        "<b>Statutory Document Identification:</b><br/>"
        "• <b>Tender Inviting Authority:</b> State Highway Authority of Jharkhand (SHAJ), Government of Jharkhand.<br/>"
        "• <b>Tender ID:</b> <code>2026_SHAJ_111047_1</code> | <b>Notice Date:</b> 27th February 2026.<br/>"
        "• <b>Reference Number:</b> <code>SHAJ/Proc/CW/Vivekanand Sch-Ring Road/2025</code>.<br/>"
        "• <b>Official Work Title:</b> <i>\"Widening & Strengthening/New Construction to Six Lane Divided Carriageway "
        "with service road, Cycle Track and footpath of Vivekanand School More to Ring Road via Jharkhand High Court & "
        "Jharkhand Vidhan Sabha Road (Length 6.089 km) & 2-Lane paved shoulder of Link Road from Naya Sarai ROB to Ring Road "
        "(Length 2.12 km) (Total Length 8.209 km) on EPC mode.\"</i><br/>"
        "• <b>On-Ground Canopy Reality:</b> 60-meter clearing footprint across continuous 40-70 year old Sal, Peepal, "
        "Banyan, and Mahua avenues. Field markings indicate <b>~7,000 standing trees</b> within this direct clearing path.<br/>"
        "• <b>Verification on Portal:</b> Visit <b>jharkhandtenders.gov.in</b> → Enter Tender ID: <b>2026_SHAJ_111047_1</b>."
    )
    story.append(Paragraph(d1_text, style_body))
    story.append(Spacer(1, 8))

    # --- DOSSIER 2: AIR QUALITY CPCB ---
    story.append(Paragraph("Dossier 2: CPCB Continuous Air Quality (CAAQMS) Degradation", style_h2))

    card_2_path = os.path.join(SCREENS_DIR, "02_cpcb_aqi_evidence.png")
    if os.path.exists(card_2_path):
        img_w = PRINTABLE_W
        img_h = (PRINTABLE_W / 1200.0) * 630.0
        story.append(Image(card_2_path, width=img_w, height=img_h))
        story.append(Spacer(1, 5))

    d2_text = (
        "<b>CPCB CAAQMS Station Network in Ranchi:</b><br/>"
        "Continuous 24/7 ambient air quality is recorded across 4 statutory stations: <b>Albert Ekka Chowk</b> (Commercial Core), "
        "<b>Harmu Housing Board</b> (Dense Residential), <b>Birsa Agricultural University Kanke</b> (Green Buffer), "
        "and <b>HEC / Dhurwa Institutional Station</b>.<br/>"
        "• <b>Multi-Year Trend:</b> Annual AQI degraded from <b>118 (2019)</b> → <b>136 (2021)</b> → <b>171 (2023)</b> → <b>196 (2025)</b>.<br/>"
        "• <b>Winter Peak Index:</b> Frequently surges above <b>340+ AQI (Severe/Hazardous)</b> during thermal inversion.<br/>"
        "• <b>Unhealthy Days:</b> Increased from 48 days (2019) to <b>152 days per year (2025)</b>.<br/>"
        "• <b>Direct Verification URLs:</b> CPCB Portal: <b>cpcb.nic.in</b> | Real-Time Live CAAQMS Bulletin: <b>app.cpcbccr.com/AQI_India</b>"
    )
    story.append(Paragraph(d2_text, style_body))
    story.append(Spacer(1, 8))

    story.append(PageBreak())

    # --- DOSSIER 3: FSI & CAMPA SURVIVAL AUDIT ---
    story.append(Paragraph("Dossier 3: Forest Survey of India (FSI) & 16% Compensatory Survival Audit", style_h2))

    card_3_path = os.path.join(SCREENS_DIR, "03_fsi_canopy_audit_evidence.png")
    if os.path.exists(card_3_path):
        img_w = PRINTABLE_W
        img_h = (PRINTABLE_W / 1200.0) * 630.0
        story.append(Image(card_3_path, width=img_w, height=img_h))
        story.append(Spacer(1, 5))

    d3_text = (
        "<b>The Compensatory Afforestation Audit (2019–2025):</b><br/>"
        "• <b>Total Mature Trees Cut in Ranchi:</b> <b>34,140 trees</b> felled for road flyovers, Smart City, and expressway widening.<br/>"
        "• <b>Saplings Claimed Planted under CAMPA:</b> 85,000 saplings.<br/>"
        "• <b>Audited 2-Year Survival Rate (RTI Ref: DFO/RNC/CAMPA-Audit/2024):</b> Only <b>16.0% survival</b> (84.0% / 71,400 dead saplings) "
        "due to absence of post-plantation maintenance, grazing, and unmonitored locations.<br/>"
        "• <b>Actual Surviving Trees:</b> 85,000 × 16% = <b>13,600 trees</b>.<br/>"
        "• <b>True Net Standing Canopy Deficit:</b> 13,600 - 34,140 = <b>-20,540 trees</b>.<br/>"
        "• <b>FSI District Cover:</b> Shrunk from 1,184 km² (ISFR 2015) to 1,161 km² (ISFR 2023) — a continuous loss in urban canopy.<br/>"
        "• <b>Official Portals:</b> <b>fsi.nic.in/forest-report-2023</b> | <b>forest.jharkhand.gov.in</b> | <b>campa.nic.in</b>"
    )
    story.append(Paragraph(d3_text, style_body))
    story.append(Spacer(1, 8))

    # --- DOSSIER 4: EBIRD WILDLIFE RISK REGISTER ---
    story.append(Paragraph("Dossier 4: eBird Avian Biodiversity & Local Extinction Risk", style_h2))

    card_4_path = os.path.join(SCREENS_DIR, "04_ebird_wildlife_evidence.png")
    if os.path.exists(card_4_path):
        img_w = PRINTABLE_W
        img_h = (PRINTABLE_W / 1200.0) * 630.0
        story.append(Image(card_4_path, width=img_w, height=img_h))
        story.append(Spacer(1, 5))

    d4_text = (
        "<b>eBird Citizen Science & State of India's Birds (SoIB 2023):</b><br/>"
        "• <b>Ranchi District Region Code:</b> <code>IN-JH-RA</code> (214 documented bird species).<br/>"
        "• <b>Species at Immediate Extirpation Risk:</b> <b>38 canopy-dependent bird species</b> in Dhurwa.<br/>"
        "• <b>Cavity-Nesting Dependency:</b> Indian Grey Hornbill, Spotted Owlet, and Coppersmith Barbet strictly nest in "
        "40+ year hollow trunks that young saplings cannot reproduce for 30–40 years.<br/>"
        "• <b>Protected Keystone Species:</b> Indian Peafowl (Schedule I WPA), Shikra raptors, and Indian Flying Fox colonies.<br/>"
        "• <b>Verification URLs:</b> <b>ebird.org/region/IN-JH-RA</b> | <b>stateofindiasbirds.in</b>"
    )
    story.append(Paragraph(d4_text, style_body))
    story.append(Spacer(1, 8))

    story.append(PageBreak())

    # --- DOSSIER 5: CITIZEN PETITION & SPLIT-CARRIAGWAY ALTERNATIVE ---
    story.append(Paragraph("Dossier 5: Change.org Citizen Petition & Civil Engineering Alternative", style_h2))

    card_5_path = os.path.join(SCREENS_DIR, "05_citizen_petition_evidence.png")
    if os.path.exists(card_5_path):
        img_w = PRINTABLE_W
        img_h = (PRINTABLE_W / 1200.0) * 630.0
        story.append(Image(card_5_path, width=img_w, height=img_h))
        story.append(Spacer(1, 5))

    d5_text = (
        "<b>The Constructive Citizen Proposal (Split-Carriageway Design):</b><br/>"
        "The Save Ranchi movement is <b>NOT anti-development</b>. Citizens advocate for proven modern highway engineering "
        "that accomplishes high-speed transit while preserving mature natural assets:"
    )
    story.append(Paragraph(d5_text, style_body))

    alt_data = [
        [
            Paragraph("<b>Parameter</b>", style_table_header),
            Paragraph("<b>Conventional 60m Design (Current)</b>", style_table_header),
            Paragraph("<b>Split-Carriageway Design (Citizen Proposal)</b>", style_table_header),
        ],
        [
            Paragraph("<b>Right-of-Way (ROW)</b>", style_table_cell),
            Paragraph("60 meters bulldozed clear-cut", style_table_cell),
            Paragraph("<b>35 to 40 meters optimized footprint</b>", style_table_cell),
        ],
        [
            Paragraph("<b>Tree Treatment</b>", style_table_cell),
            Paragraph("100% felling (~7,000 mature trees cut)", style_table_cell),
            Paragraph("<b>82% of mature trees preserved as natural central median</b>", style_table_cell),
        ],
        [
            Paragraph("<b>Traffic Capacity</b>", style_table_cell),
            Paragraph("6 lanes + 4 service lanes (10 lanes total)", style_table_cell),
            Paragraph("4 to 6 continuous express lanes + safe bicycle paths", style_table_cell),
        ],
        [
            Paragraph("<b>Surface Heat Impact</b>", style_table_cell),
            Paragraph("Spikes microclimate by +3°C to +5°C", style_table_cell),
            Paragraph("Maintains natural canopy cooling and shade", style_table_cell),
        ],
        [
            Paragraph("<b>Precedent</b>", style_table_cell),
            Paragraph("Ratu Road / Kantatoli deforested corridors", style_table_cell),
            Paragraph("Chandigarh Heritage Avenues, Bengaluru Green Medians", style_table_cell),
        ],
    ]
    alt_table = Table(alt_data, colWidths=[120, 195, 208])
    alt_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), C_PRIMARY),
        ("GRID", (0, 0), (-1, -1), 0.5, C_BORDER),
        ("TOPPADDING", (0, 0), (-1, -1), 3),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, C_BG_LIGHT]),
    ]))
    story.append(alt_table)
    story.append(Spacer(1, 14))

    # ----------------------------------------------------
    # CONTACT & COLLABORATION
    # ----------------------------------------------------
    story.append(Paragraph("Contact & Civic Collaboration", style_h2))
    story.append(Paragraph(
        "• <b>Live Environmental Platform:</b> https://save-dhurwa-trees.vercel.app<br/>"
        "• <b>Direct Evidence Dashboard:</b> https://save-dhurwa-trees.vercel.app/dashboard<br/>"
        "• <b>Sign & Share the Petition:</b> https://c.org/sTJg4xx2Vz (750+ verified signatures)<br/>"
        "• <b>Official Dataset:</b> src/data/ranchi-environmental-data.json<br/><br/>"
        "<i>This dossier is maintained under open civic scrutiny. All statutory citations are cross-referenced with official Government of Jharkhand and Government of India gazettes.</i>",
        style_body
    ))

    doc.build(story, canvasmaker=NumberedCanvas)

    # Copy to local documents directory as well
    import shutil
    shutil.copyfile(OUTPUT_PDF_PATH, LOCAL_PDF_PATH)

    size_kb = os.path.getsize(OUTPUT_PDF_PATH) / 1024.0
    print(f"PDF generated successfully at {OUTPUT_PDF_PATH} ({size_kb:.1f} KB)")


if __name__ == "__main__":
    build_pdf()
