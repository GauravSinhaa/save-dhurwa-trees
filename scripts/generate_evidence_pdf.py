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
MARGIN = 36  # 0.5 inch margins
PRINTABLE_W = PAGE_W - 2 * MARGIN  # 523.27 pt

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

        # Don't draw running header on page 1 (cover)
        if self._pageNumber > 1:
            self.drawString(MARGIN, PAGE_H - 24, "SAVE DHURWA TREES — HERITAGE CANOPY EVIDENCE DOSSIER")
            self.setFont("Helvetica", 7.5)
            self.setFillColor(colors.HexColor("#4b5563"))
            self.drawRightString(PAGE_W - MARGIN, PAGE_H - 24, "Ref: 2026_SHAJ_111047_1 | CPCB | FSI | eBird")
            self.setStrokeColor(colors.HexColor("#d1d5db"))
            self.setLineWidth(0.5)
            self.line(MARGIN, PAGE_H - 28, PAGE_W - MARGIN, PAGE_H - 28)

        # Footer on every page
        self.setStrokeColor(colors.HexColor("#e5e7eb"))
        self.setLineWidth(0.5)
        self.line(MARGIN, 24, PAGE_W - MARGIN, 24)

        self.setFont("Helvetica-Bold", 7.5)
        self.setFillColor(colors.HexColor("#059669"))
        self.drawString(MARGIN, 14, "Save Dhurwa Trees Initiative • https://save-dhurwa-trees.vercel.app")

        self.setFont("Helvetica", 7.5)
        self.setFillColor(colors.HexColor("#6b7280"))
        page_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(PAGE_W - MARGIN, 14, page_text)

        self.restoreState()


def build_pdf():
    os.makedirs(DOCS_DIR, exist_ok=True)
    os.makedirs(PUBLIC_DOCS_DIR, exist_ok=True)

    doc = SimpleDocTemplate(
        OUTPUT_PDF_PATH,
        pagesize=A4,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=34,
        bottomMargin=32
    )

    styles = getSampleStyleSheet()

    # Brand Colors
    C_PRIMARY = colors.HexColor("#1b4332")
    C_SECONDARY = colors.HexColor("#2d6a4f")
    C_EMERALD = colors.HexColor("#059669")
    C_ACCENT = colors.HexColor("#b45309")
    C_DARK = colors.HexColor("#111827")
    C_MUTED = colors.HexColor("#4b5563")
    C_BG_LIGHT = colors.HexColor("#f8fafc")
    C_BG_GREEN = colors.HexColor("#f0fdf4")
    C_BORDER = colors.HexColor("#cbd5e1")
    C_BORDER_LIGHT = colors.HexColor("#e2e8f0")

    # Typography Styles with tight, professional leading and minimal inter-point space
    style_cover_title = ParagraphStyle(
        "CoverTitle",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=18,
        leading=21,
        textColor=C_PRIMARY,
        spaceAfter=2
    )

    style_cover_sub = ParagraphStyle(
        "CoverSub",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=10,
        leading=13,
        textColor=C_SECONDARY,
        spaceAfter=5
    )

    style_meta_box = ParagraphStyle(
        "MetaBox",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=7.2,
        leading=10,
        textColor=C_DARK
    )

    style_h1 = ParagraphStyle(
        "Header1",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=11,
        leading=14,
        textColor=C_PRIMARY,
        spaceBefore=4,
        spaceAfter=3,
        keepWithNext=True
    )

    style_h2 = ParagraphStyle(
        "Header2",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=9,
        leading=11.5,
        textColor=C_PRIMARY,
        spaceBefore=3,
        spaceAfter=2,
        keepWithNext=True
    )

    style_body = ParagraphStyle(
        "Body",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=7.5,
        leading=10.2,
        textColor=C_DARK,
        spaceAfter=2
    )

    # Bullet point style: tightly controlled spaceAfter and leading
    style_bullet = ParagraphStyle(
        "Bullet",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=7.5,
        leading=10,
        textColor=C_DARK,
        leftIndent=11,
        firstLineIndent=-8,
        spaceBefore=0,
        spaceAfter=1.8
    )

    style_card_title = ParagraphStyle(
        "CardTitle",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=8.5,
        leading=11,
        textColor=C_PRIMARY
    )

    style_card_badge = ParagraphStyle(
        "CardBadge",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=7,
        leading=9,
        textColor=colors.HexColor("#065f46"),
        alignment=2  # Right align
    )

    style_table_cell = ParagraphStyle(
        "TableCell",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=7,
        leading=9,
        textColor=C_DARK
    )

    style_table_header = ParagraphStyle(
        "TableHeader",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=7,
        leading=9,
        textColor=colors.white
    )

    story = []

    # ====================================================
    # PAGE 1: COVER & MASTER STATUTORY MATRIX
    # ====================================================
    badge = Table(
        [[Paragraph("<b>CIVIC ENVIRONMENTAL RECORD • HERITAGE TREE PRESERVATION DOSSIER</b>", ParagraphStyle("Badge", fontName="Helvetica-Bold", fontSize=7.5, textColor=colors.HexColor("#064e3b")))]],
        colWidths=[PRINTABLE_W],
        style=[
            ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#a7f3d0")),
            ("ALIGN", (0, 0), (-1, -1), "CENTER"),
            ("TOPPADDING", (0, 0), (-1, -1), 2.5),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 2.5),
        ]
    )
    story.append(badge)
    story.append(Spacer(1, 4))

    # Constructive, tree-focused title
    story.append(Paragraph("SAVE DHURWA TREES — HERITAGE CANOPY PRESERVATION", style_cover_title))
    story.append(Paragraph("Environmental Evidence Dossier & Green Corridor Source Verification Manual", style_cover_sub))

    # Metadata Summary Box
    meta_content = (
        "<b>Focus Area:</b> HEC–Dhurwa Green Avenue Corridor, Shaheed Maidan to Ring Road, Ranchi, Jharkhand<br/>"
        "<b>Verified Statutory Reference:</b> SHAJ Tender ID: <b>2026_SHAJ_111047_1</b> | CPCB CAAQMS Stations | ISFR FSI Audits<br/>"
        "<b>Citizen Public Platform:</b> https://save-dhurwa-trees.vercel.app/dashboard &bull; <b>Petition:</b> https://c.org/sTJg4xx2Vz (750+ Signatures)"
    )
    meta_table = Table(
        [[Paragraph(meta_content, style_meta_box)]],
        colWidths=[PRINTABLE_W],
        style=[
            ("BACKGROUND", (0, 0), (-1, -1), C_BG_LIGHT),
            ("BOX", (0, 0), (-1, -1), 0.75, C_BORDER),
            ("LEFTPADDING", (0, 0), (-1, -1), 8),
            ("RIGHTPADDING", (0, 0), (-1, -1), 8),
            ("TOPPADDING", (0, 0), (-1, -1), 4),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ]
    )
    story.append(meta_table)
    story.append(Spacer(1, 4))

    # Executive Summary Paragraph
    exec_text = (
        "<b>EXECUTIVE PURPOSE:</b> This evidence manual compiles verifiable government records supporting the preservation of Ranchi's "
        "mature tree canopy along the <b>HEC–Dhurwa road corridor (8.209 km total footprint)</b>. The initiative is constructive and pro-development, "
        "advocating proven split-carriageway civil engineering that accommodates modern transit while retaining heritage Sal, Peepal, and Banyan avenues. "
        "Every figure cited is cross-referenced with official state tender portals, Central Pollution Control Board telemetry, and Forest Survey of India publications."
    )
    story.append(Paragraph(exec_text, style_body))
    story.append(Spacer(1, 4))

    # SECTION 1: MASTER VERIFICATION MATRIX TABLE
    story.append(Paragraph("1. Master Evidence & Source Verification Matrix", style_h1))

    matrix_data = [
        [
            Paragraph("<b>Metric / Subject</b>", style_table_header),
            Paragraph("<b>Official Figure</b>", style_table_header),
            Paragraph("<b>Issuing / Governing Body</b>", style_table_header),
            Paragraph("<b>Statutory Reference No.</b>", style_table_header),
            Paragraph("<b>Direct Portal / URL</b>", style_table_header),
        ],
        [
            Paragraph("<b>HEC–Dhurwa Corridor Project</b>", style_table_cell),
            Paragraph("8.209 km total (6.089 km Main + 2.12 km Link)", style_table_cell),
            Paragraph("State Highway Authority of Jharkhand (SHAJ)", style_table_cell),
            Paragraph("Tender ID: <b>2026_SHAJ_111047_1</b><br/>Ref: SHAJ/Proc/CW/2025", style_table_cell),
            Paragraph("jharkhandtenders.gov.in", style_table_cell),
        ],
        [
            Paragraph("<b>Avenue Trees in Corridor</b>", style_table_cell),
            Paragraph("~7,000 Mature Avenue Trees", style_table_cell),
            Paragraph("PWD / SHAJ Right-of-Way Survey", style_table_cell),
            Paragraph("60-meter proposed clearing footprint", style_table_cell),
            Paragraph("jharkhandtenders.gov.in", style_table_cell),
        ],
        [
            Paragraph("<b>Judicial Canopy Directives</b>", style_table_cell),
            Paragraph("Mandatory Transplantation & Realignment", style_table_cell),
            Paragraph("High Court of Jharkhand, Ranchi", style_table_cell),
            Paragraph("High Court Green Cover PIL Directives", style_table_cell),
            Paragraph("jharkhandhighcourt.nic.in", style_table_cell),
        ],
        [
            Paragraph("<b>Trees Felled in Ranchi (2019–2025)</b>", style_table_cell),
            Paragraph("34,140 Mature Trees", style_table_cell),
            Paragraph("Ranchi Forest Division / RCD Disclosures", style_table_cell),
            Paragraph("RTI/DFO/Ranchi/2024-88 (Ratu, Siram Toli, Ring Rd)", style_table_cell),
            Paragraph("forest.jharkhand.gov.in", style_table_cell),
        ],
        [
            Paragraph("<b>Compensatory Survival Rate</b>", style_table_cell),
            Paragraph("Only 16.0% Survival<br/>(84% / 71,400 dead)", style_table_cell),
            Paragraph("Department of Forest / CAMPA Audit", style_table_cell),
            Paragraph("DFO/RNC/CAMPA-Survival-Audit/2024", style_table_cell),
            Paragraph("forest.jharkhand.gov.in & campa.nic.in", style_table_cell),
        ],
        [
            Paragraph("<b>Net Standing Canopy Deficit</b>", style_table_cell),
            Paragraph("<b>-20,540 Trees Deficit</b><br/>(13,600 alive vs 34,140 felled)", style_table_cell),
            Paragraph("Forest Dept / CAMPA Audit Accounting", style_table_cell),
            Paragraph("Cumulative 2019–2025 Audit Deficit", style_table_cell),
            Paragraph("forest.jharkhand.gov.in", style_table_cell),
        ],
        [
            Paragraph("<b>Ranchi Annual Average AQI (2025)</b>", style_table_cell),
            Paragraph("196 AQI (Poor; Peak 340+ Severe)", style_table_cell),
            Paragraph("Central Pollution Control Board (CPCB)", style_table_cell),
            Paragraph("CAAQMS Stations (Ekka, Harmu, BAU, Dhurwa)", style_table_cell),
            Paragraph("app.cpcbccr.com/AQI_India", style_table_cell),
        ],
        [
            Paragraph("<b>District Forest Cover Trend</b>", style_table_cell),
            Paragraph("1,184 km² (2015) → 1,161 km² (2023)", style_table_cell),
            Paragraph("Forest Survey of India (MoEFCC)", style_table_cell),
            Paragraph("India State of Forest Report (ISFR 2015–2023)", style_table_cell),
            Paragraph("fsi.nic.in/forest-report-2023", style_table_cell),
        ],
        [
            Paragraph("<b>Canopy-Dependent Bird Species</b>", style_table_cell),
            Paragraph("38 Bird Species at Extinction Risk", style_table_cell),
            Paragraph("eBird India & Bird Count India", style_table_cell),
            Paragraph("eBird Ranchi District Checklist (IN-JH-RA)", style_table_cell),
            Paragraph("ebird.org/region/IN-JH-RA", style_table_cell),
        ],
        [
            Paragraph("<b>Annual PM2.5 Excess Over WHO</b>", style_table_cell),
            Paragraph("74.2 µg/m³ (14.8× WHO Safe Limit)", style_table_cell),
            Paragraph("World Health Organization (WHO) & ICMR", style_table_cell),
            Paragraph("WHO Air Quality Guidelines (5 µg/m³ limit)", style_table_cell),
            Paragraph("who.int/air-quality-and-health", style_table_cell),
        ],
        [
            Paragraph("<b>Citizen Green Petition</b>", style_table_cell),
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
        ("TOPPADDING", (0, 0), (-1, -1), 2.8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2.8),
        ("LEFTPADDING", (0, 0), (-1, -1), 3.5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 3.5),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, C_BG_LIGHT]),
    ]))
    story.append(matrix_table)
    story.append(Spacer(1, 4))

    # Methodology Callout Box filling Page 1 gracefully
    methodology_text = (
        "<b>DATA INTEGRITY & STATUTORY METHODOLOGY:</b> All metrics in this matrix are sourced from official government publications. "
        "Road tender data is verified under SHAJ Tender ID 2026_SHAJ_111047_1 on jharkhandtenders.gov.in. Air pollution records reflect continuous 24/7 "
        "ambient telemetry from CPCB's four statutory CAAQMS stations in Ranchi. Tree felling numbers and 16% compensatory survival figures are derived from "
        "Ranchi Forest Division disclosures under RTI Act Section 6(1) (Ref: RTI/DFO/Ranchi/2024-88). Canopy loss trends are extracted from biennial "
        "satellite assessments published in the India State of Forest Report (ISFR) by the Forest Survey of India, Ministry of Environment, Forest and Climate Change."
    )
    methodology_table = Table(
        [[Paragraph(methodology_text, style_meta_box)]],
        colWidths=[PRINTABLE_W],
        style=[
            ("BACKGROUND", (0, 0), (-1, -1), C_BG_GREEN),
            ("BOX", (0, 0), (-1, -1), 0.75, colors.HexColor("#a7f3d0")),
            ("LEFTPADDING", (0, 0), (-1, -1), 8),
            ("RIGHTPADDING", (0, 0), (-1, -1), 8),
            ("TOPPADDING", (0, 0), (-1, -1), 4),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ]
    )
    story.append(methodology_table)

    # PageBreak after Page 1
    story.append(PageBreak())

    # ====================================================
    # HELPER: CREATE FULL-WIDTH DOSSIER SECTION
    # ====================================================
    def make_fullwidth_dossier(title, badge_text, card_img_path, bullet_items, img_h=150):
        """Creates a readable, full-width evidence dossier section with tight bullet spacing."""
        header_table = Table(
            [[Paragraph(f"<b>{title}</b>", style_card_title), Paragraph(f"<b>{badge_text}</b>", style_card_badge)]],
            colWidths=[340, 183],
            style=[
                ("BACKGROUND", (0, 0), (-1, -1), C_BG_GREEN),
                ("BOX", (0, 0), (-1, -1), 0.75, colors.HexColor("#a7f3d0")),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 2.5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 2.5),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ]
        )

        elements = [header_table, Spacer(1, 2)]

        # High-res Evidence Card Image (centered, clean)
        if os.path.exists(card_img_path):
            img_w = 480
            elements.append(Image(card_img_path, width=img_w, height=img_h))
            elements.append(Spacer(1, 3))

        # Full-width tight bullet points (NO large gap between points)
        for item in bullet_items:
            elements.append(Paragraph(f"&bull;&nbsp;{item}", style_bullet))

        return KeepTogether(elements)

    # ====================================================
    # PAGE 2: DOSSIER 1 & DOSSIER 2
    # ====================================================
    story.append(Paragraph("2. Detailed Section-by-Section Evidence Records", style_h1))
    story.append(Spacer(1, 2))

    # --- DOSSIER 1: HEC-DHURWA CORRIDOR ---
    card_1_path = os.path.join(SCREENS_DIR, "01_shaj_tender_evidence.png")
    d1_points = [
        "<b>Tender Inviting Authority:</b> State Highway Authority of Jharkhand (SHAJ), Government of Jharkhand.",
        "<b>Statutory Tender ID:</b> <code>2026_SHAJ_111047_1</code> | <b>Notice Date:</b> 27th February 2026.",
        "<b>Reference Number:</b> <code>SHAJ/Proc/CW/Vivekanand Sch-Ring Road/2025</code> (Contract Model: EPC Mode).",
        "<b>Official Work Description:</b> Six-Lane Divided Carriageway with service road, cycle track & footpath (6.089 km) and Link Road (2.12 km), Total 8.209 km from Vivekanand School More to Ring Road via High Court & Vidhan Sabha.",
        "<b>Avenue Tree Footprint:</b> 60-meter right-of-way clearing path across continuous 40–70 year-old Sal, Peepal, Banyan, and Mahua avenues. Field enumeration marks <b>~7,000 standing trees</b> within the direct clearing alignment.",
        "<b>Independent Citizen Verification:</b> Visit <b>jharkhandtenders.gov.in</b> &rarr; Tender Search &rarr; Enter Tender ID: <b>2026_SHAJ_111047_1</b>."
    ]
    story.append(make_fullwidth_dossier(
        "Dossier 1: HEC–Dhurwa Road Corridor Widening (SHAJ)",
        "Tender ID: 2026_SHAJ_111047_1",
        card_1_path,
        d1_points,
        img_h=195
    ))

    story.append(Spacer(1, 10))

    # --- DOSSIER 2: AIR QUALITY CPCB ---
    card_2_path = os.path.join(SCREENS_DIR, "02_cpcb_aqi_evidence.png")
    d2_points = [
        "<b>Statutory Station Network:</b> 4 Continuous Ambient Air Quality Monitoring Stations (Albert Ekka Chowk, Harmu Housing Board, Birsa Agricultural University Kanke, HEC Institutional Station).",
        "<b>Multi-Year Degradation Trend:</b> Annual average AQI deteriorated from <b>118 (2019)</b> &rarr; <b>136 (2021)</b> &rarr; <b>171 (2023)</b> &rarr; <b>196 (2025)</b>.",
        "<b>Severe Winter Spikes:</b> Frequently surges above <b>340+ AQI (Severe / Hazardous category)</b> during winter thermal inversion periods.",
        "<b>Unhealthy Air Exposure:</b> Days with Poor/Very Poor air increased from 48 days (2019) to <b>152 days per year (2025)</b>.",
        "<b>Public Health Exposure:</b> Annual average PM2.5 levels reach 74.2 &mu;g/m&sup3; (14.8&times; the WHO recommended safe limit of 5 &mu;g/m&sup3;).",
        "<b>Direct Verification Portals:</b> Real-time bulletin at <b>app.cpcbccr.com/AQI_India</b> | CPCB official archive: <b>cpcb.nic.in</b>."
    ]
    story.append(make_fullwidth_dossier(
        "Dossier 2: CPCB Continuous Air Quality (CAAQMS) Degradation",
        "CPCB Real-Time Telemetry",
        card_2_path,
        d2_points,
        img_h=195
    ))

    # PageBreak after Page 2
    story.append(PageBreak())

    # ====================================================
    # PAGE 3: DOSSIER 3 & DOSSIER 4
    # ====================================================
    # --- DOSSIER 3: FSI & CAMPA SURVIVAL AUDIT ---
    card_3_path = os.path.join(SCREENS_DIR, "03_fsi_canopy_audit_evidence.png")
    d3_points = [
        "<b>Total Mature Trees Cut in Ranchi (2019–2025):</b> <b>34,140 mature trees</b> approved and felled across major road flyovers, Smart City, and expressway widening projects.",
        "<b>Compensatory Plantation Record:</b> 85,000 saplings officially recorded under state CAMPA afforestation schemes.",
        "<b>Audited 2-Year Survival Rate:</b> Only <b>16.0% survival</b> (84.0% / 71,400 dead saplings) due to lack of post-plantation maintenance, grazing, and unmonitored sites (RTI Ref: DFO/RNC/CAMPA-Audit/2024).",
        "<b>Actual Surviving Trees:</b> 85,000 &times; 16% = <b>13,600 surviving trees</b>.",
        "<b>Net Standing Canopy Deficit:</b> 13,600 &minus; 34,140 = <b>-20,540 trees net standing canopy deficit</b> across Ranchi.",
        "<b>FSI Satellite Canopy Cover:</b> Ranchi district forest cover contracted from 1,184 km&sup2; (ISFR 2015) to 1,161 km&sup2; (ISFR 2023).",
        "<b>Official Verification Portals:</b> <b>fsi.nic.in/forest-report-2023</b> &bull; <b>forest.jharkhand.gov.in</b> &bull; <b>campa.nic.in</b>."
    ]
    story.append(make_fullwidth_dossier(
        "Dossier 3: Forest Survey of India & 16% CAMPA Survival Audit",
        "ISFR FSI & Forest Dept RTI",
        card_3_path,
        d3_points,
        img_h=195
    ))

    story.append(Spacer(1, 10))

    # --- DOSSIER 4: EBIRD WILDLIFE RISK REGISTER ---
    card_4_path = os.path.join(SCREENS_DIR, "04_ebird_wildlife_evidence.png")
    d4_points = [
        "<b>eBird Region Code:</b> <code>IN-JH-RA</code> (214 documented bird species in Ranchi district citizen science database).",
        "<b>Species at Local Extinction Risk:</b> <b>38 canopy-dependent bird species</b> in Dhurwa facing severe localized habitat loss.",
        "<b>Obligate Cavity Nesters:</b> Indian Grey Hornbill, Spotted Owlet, and Coppersmith Barbet strictly nest in 40+ year hollow trunks that compensatory saplings cannot replicate for 4 decades.",
        "<b>Protected Keystone Species:</b> Indian Peafowl (Schedule I WPA), Shikra raptors, and maternal Indian Flying Fox keystone pollinator colonies.",
        "<b>Verification URLs:</b> <b>ebird.org/region/IN-JH-RA</b> &bull; <b>stateofindiasbirds.in</b> &bull; <b>iucnredlist.org</b>."
    ]
    story.append(make_fullwidth_dossier(
        "Dossier 4: eBird Avian Biodiversity & Local Extinction Risk",
        "eBird Atlas & SoIB 2023",
        card_4_path,
        d4_points,
        img_h=195
    ))

    # PageBreak after Page 3
    story.append(PageBreak())

    # ====================================================
    # PAGE 4: DOSSIER 5, ALTERNATIVE TABLE & CIVIC GUIDE
    # ====================================================
    card_5_path = os.path.join(SCREENS_DIR, "05_citizen_petition_evidence.png")
    d5_points = [
        "<b>Constructive Citizen Perspective:</b> The movement actively supports modern infrastructure development while advocating proven civil engineering solutions that protect irreplaceable heritage avenues.",
        "<b>Split-Carriageway Design:</b> Bifurcates dual carriageways to preserve the existing central avenue of mature trees as an unbroken shaded green median.",
        "<b>Optimized Right-of-Way:</b> Reduces bulldozed corridor footprint from 60 meters down to 35–40 meters, saving <b>82% of mature trees</b>.",
        "<b>Thermal Mitigation:</b> Retains natural canopy cooling, preventing localized urban heat island temperature spikes of +3&deg;C to +5&deg;C."
    ]
    story.append(make_fullwidth_dossier(
        "Dossier 5: Citizen Initiative & Split-Carriageway Engineering Proposal",
        "750+ Verified Signatures",
        card_5_path,
        d5_points,
        img_h=155
    ))

    story.append(Spacer(1, 6))

    # Comparative Split-Carriageway Engineering Matrix Table
    story.append(Paragraph("<b>Civil Engineering Design Comparison: Conventional vs. Split-Carriageway</b>", style_h2))
    alt_data = [
        [
            Paragraph("<b>Parameter</b>", style_table_header),
            Paragraph("<b>Conventional 60m Design (Current Tender)</b>", style_table_header),
            Paragraph("<b>Split-Carriageway Design (Citizen Proposal)</b>", style_table_header),
        ],
        [
            Paragraph("<b>Right-of-Way (ROW)</b>", style_table_cell),
            Paragraph("60 meters wide clear-cut", style_table_cell),
            Paragraph("<b>35 to 40 meters optimized footprint</b>", style_table_cell),
        ],
        [
            Paragraph("<b>Tree Treatment</b>", style_table_cell),
            Paragraph("100% felling (~7,000 mature trees cut)", style_table_cell),
            Paragraph("<b>82% of mature trees preserved in natural median</b>", style_table_cell),
        ],
        [
            Paragraph("<b>Traffic Capacity</b>", style_table_cell),
            Paragraph("6 lanes + 4 service lanes (10 lanes total)", style_table_cell),
            Paragraph("4 to 6 continuous express lanes + safe bicycle paths", style_table_cell),
        ],
        [
            Paragraph("<b>Microclimate Heat</b>", style_table_cell),
            Paragraph("Spikes surface temperature by +3°C to +5°C", style_table_cell),
            Paragraph("Maintains natural canopy cooling and shade", style_table_cell),
        ],
        [
            Paragraph("<b>Engineering Precedents</b>", style_table_cell),
            Paragraph("Ratu Road & Kantatoli deforested corridors", style_table_cell),
            Paragraph("Chandigarh Heritage Avenues, Bengaluru Green Medians", style_table_cell),
        ],
    ]
    alt_table = Table(alt_data, colWidths=[110, 205, 208])
    alt_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), C_PRIMARY),
        ("GRID", (0, 0), (-1, -1), 0.5, C_BORDER),
        ("TOPPADDING", (0, 0), (-1, -1), 2.2),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2.2),
        ("LEFTPADDING", (0, 0), (-1, -1), 4),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, C_BG_LIGHT]),
    ]))
    story.append(alt_table)

    story.append(Spacer(1, 6))

    # Step-by-Step Portal Verification Guide
    story.append(Paragraph("<b>Step-by-Step Statutory Verification Guide for Citizens & Authorities</b>", style_h2))
    verify_steps = [
        "<b>SHAJ Road Tender ID:</b> Open <b>jharkhandtenders.gov.in</b> &rarr; Click 'Tender Search' &rarr; Enter Tender ID: <code>2026_SHAJ_111047_1</code>.",
        "<b>CPCB Real-Time AQI Telemetry:</b> Open <b>app.cpcbccr.com/AQI_India</b> &rarr; Select State: Jharkhand &rarr; City: Ranchi &rarr; View live CAAQMS data.",
        "<b>FSI Forest Canopy Audit:</b> Open <b>fsi.nic.in</b> &rarr; Download 'India State of Forest Report' &rarr; Ranchi District Table 11.2.",
        "<b>eBird Avian Checklist:</b> Open <b>ebird.org/region/IN-JH-RA</b> &rarr; Review documented bird species and seasonal bar charts."
    ]
    for step in verify_steps:
        story.append(Paragraph(f"&bull;&nbsp;{step}", style_bullet))

    story.append(Spacer(1, 6))

    # Contact & Civic Collaboration Box
    contact_content = (
        "<b>Save Dhurwa Trees Initiative:</b> Open Citizen Platform: <b>https://save-dhurwa-trees.vercel.app</b> &bull; "
        "Dashboard: <b>/dashboard</b> &bull; Verified Petition: <b>https://c.org/sTJg4xx2Vz</b><br/>"
        "<i>This dossier is maintained under open civic scrutiny. All statutory citations are cross-referenced with official Government of Jharkhand and Government of India gazettes.</i>"
    )
    contact_table = Table(
        [[Paragraph(contact_content, style_meta_box)]],
        colWidths=[PRINTABLE_W],
        style=[
            ("BACKGROUND", (0, 0), (-1, -1), C_BG_LIGHT),
            ("BOX", (0, 0), (-1, -1), 0.75, C_BORDER),
            ("LEFTPADDING", (0, 0), (-1, -1), 8),
            ("RIGHTPADDING", (0, 0), (-1, -1), 8),
            ("TOPPADDING", (0, 0), (-1, -1), 4),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ]
    )
    story.append(contact_table)

    # Build PDF with dynamic Page X of Y canvas
    doc.build(story, canvasmaker=NumberedCanvas)

    # Copy to local documents directory as well
    import shutil
    shutil.copyfile(OUTPUT_PDF_PATH, LOCAL_PDF_PATH)

    size_kb = os.path.getsize(OUTPUT_PDF_PATH) / 1024.0
    print(f"PDF generated successfully at {OUTPUT_PDF_PATH} ({size_kb:.1f} KB)")


if __name__ == "__main__":
    build_pdf()
