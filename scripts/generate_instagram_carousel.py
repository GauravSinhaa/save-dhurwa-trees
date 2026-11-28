import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

OUTPUT_DIR = "instagram_hec_carousel"
os.makedirs(OUTPUT_DIR, exist_ok=True)

W, H = 1080, 1350  # Standard 4:5 Instagram Carousel Resolution

# Fonts
FONT_REG = r"C:\Windows\Fonts\segoeui.ttf"
FONT_BOLD = r"C:\Windows\Fonts\segoeuib.ttf"
FONT_BLACK = r"C:\Windows\Fonts\arialbd.ttf"

def get_font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except Exception:
        return ImageFont.load_default()

def draw_header_footer(draw, slide_num, total_slides=6, topic="HEC-DHURWA TREE CRISIS"):
    # Header tag
    draw.rectangle([60, 60, 60 + 380, 105], fill=(24, 76, 52), outline=(46, 125, 85), width=2)
    f_tag = get_font(FONT_BOLD, 22)
    draw.text((78, 70), "🚨 RANCHI CIVIC DOSSIER", font=f_tag, fill=(167, 243, 208))

    # Page indicator
    f_page = get_font(FONT_BOLD, 24)
    draw.text((W - 140, 72), f"{slide_num}/{total_slides}", font=f_page, fill=(180, 200, 190))

    # Footer
    draw.line([(60, H - 90), (W - 60, H - 90)], fill=(40, 70, 55), width=2)
    f_foot = get_font(FONT_REG, 22)
    draw.text((60, H - 75), "save-dhurwa-trees.vercel.app", font=f_foot, fill=(130, 170, 150))
    f_swipe = get_font(FONT_BOLD, 22)
    if slide_num < total_slides:
        draw.text((W - 220, H - 75), "SWIPE ➔", font=f_swipe, fill=(245, 158, 11))
    else:
        draw.text((W - 240, H - 75), "SIGN PETITION ✍️", font=f_swipe, fill=(52, 211, 153))

def make_slide_1():
    # Slide 1: High Drama Title Card
    img_path = r"Images and Videos\IMG_8776.JPG"
    base = Image.open(img_path).convert("RGB")
    # Crop to 4:5
    bw, bh = base.size
    target_ratio = W / H
    if bw / bh > target_ratio:
        new_w = int(bh * target_ratio)
        offset = (bw - new_w) // 2
        base = base.crop((offset, 0, offset + new_w, bh))
    else:
        new_h = int(bw / target_ratio)
        offset = (bh - new_h) // 2
        base = base.crop((0, offset, bw, offset + new_h))
    base = base.resize((W, H), Image.Resampling.LANCZOS)

    # Dark gradient overlay for readability
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ov_draw = ImageDraw.Draw(overlay)
    for y in range(H):
        if y < 400:
            alpha = int(180 + (400 - y) * 0.15)
        else:
            alpha = int(140 + (y - 400) * 0.22)
        alpha = min(245, alpha)
        ov_draw.line([(0, y), (W, y)], fill=(10, 24, 18, alpha))
    
    img = Image.alpha_composite(base.convert("RGBA"), overlay).convert("RGB")
    draw = ImageDraw.Draw(img)

    draw_header_footer(draw, 1)

    # Category Pill
    draw.rectangle([60, 260, 60 + 290, 310], fill=(220, 38, 38), outline=(254, 202, 202), width=1)
    f_pill = get_font(FONT_BOLD, 22)
    draw.text((80, 272), "URGENT PUBLIC ALERT", font=f_pill, fill=(255, 255, 255))

    # Main Headline
    f_h1 = get_font(FONT_BLACK, 76)
    draw.text((60, 340), "7,000 TREES", font=f_h1, fill=(254, 240, 138))
    draw.text((60, 430), "AT RISK IN HEC", font=f_h1, fill=(255, 255, 255))

    # Accent line
    draw.line([(60, 535), (280, 535)], fill=(16, 185, 129), width=8)

    # Subtitle
    f_sub = get_font(FONT_BOLD, 34)
    draw.text((60, 570), "What is happening to Ranchi's", font=f_sub, fill=(226, 232, 240))
    draw.text((60, 615), "oldest green avenue?", font=f_sub, fill=(52, 211, 153))

    # Key highlight box
    draw.rounded_rectangle([60, 720, W - 60, 1020], radius=24, fill=(15, 38, 28, 240), outline=(52, 211, 153), width=2)
    f_box_h = get_font(FONT_BOLD, 26)
    draw.text((100, 760), "📌 KEY OFFICIAL FACTS (Tender & RTI):", font=f_box_h, fill=(251, 191, 36))
    
    f_box_body = get_font(FONT_REG, 26)
    draw.text((100, 820), "• 6.089 km Dhurwa to Naya Sarai expansion", font=f_box_body, fill=(255, 255, 255))
    draw.text((100, 875), "• 40+ year-old Peepal, Banyan, Mahua canopy", font=f_box_body, fill=(255, 255, 255))
    draw.text((100, 930), "• 84% compensatory saplings die within 2 years", font=f_box_body, fill=(255, 255, 255))

    f_prompt = get_font(FONT_BOLD, 30)
    draw.text((60, 1110), "Swipe to see the data & engineering solution ➔", font=f_prompt, fill=(245, 158, 11))

    img.save(os.path.join(OUTPUT_DIR, "slide_01_hook.png"), quality=95)
    print("Slide 1 generated.")

def make_slide_2():
    # Slide 2: The 4 Big KPI Numbers
    img = Image.new("RGB", (W, H), (11, 26, 19))
    draw = ImageDraw.Draw(img)
    draw_header_footer(draw, 2)

    f_title = get_font(FONT_BLACK, 52)
    draw.text((60, 140), "THE REAL COST OF THE CORRIDOR", font=f_title, fill=(255, 255, 255))
    f_sub = get_font(FONT_REG, 26)
    draw.text((60, 205), "Official numbers from Forest Survey & PWD estimates", font=f_sub, fill=(167, 243, 208))

    cards = [
        ("~7,000", "MATURE TREES THREATENED", "Along Dhurwa–Naya Sarai 6.089 km road", (239, 68, 68), (40, 15, 15)),
        ("6.089 KM", "CONTINUOUS CANOPY ZONE", "Home to 35+ breeding bird species", (245, 158, 11), (40, 30, 15)),
        ("16%", "SAPLING SURVIVAL REALITY", "Official audit: 84% compensatory plants die", (239, 68, 68), (40, 15, 15)),
        ("750+", "CITIZENS ALREADY SIGNED", "Demanding split-carriageway preservation", (16, 185, 129), (15, 40, 25)),
    ]

    coords = [
        (60, 270, 520, 640),
        (560, 270, W - 60, 640),
        (60, 680, 520, 1050),
        (560, 680, W - 60, 1050),
    ]

    f_num = get_font(FONT_BLACK, 58)
    f_lbl = get_font(FONT_BOLD, 22)
    f_desc = get_font(FONT_REG, 20)

    for (num, lbl, desc, col, bg), (x1, y1, x2, y2) in zip(cards, coords):
        draw.rounded_rectangle([x1, y1, x2, y2], radius=20, fill=bg, outline=col, width=2)
        draw.text((x1 + 30, y1 + 40), num, font=f_num, fill=col)
        draw.text((x1 + 30, y1 + 130), lbl, font=f_lbl, fill=(255, 255, 255))
        # Word wrap desc
        draw.text((x1 + 30, y1 + 195), desc, font=f_desc, fill=(203, 213, 225))

    # Bottom Callout
    draw.rounded_rectangle([60, 1090, W - 60, 1190], radius=16, fill=(20, 48, 35), outline=(52, 211, 153), width=1)
    f_btm = get_font(FONT_BOLD, 24)
    draw.text((90, 1125), "💡 'A 40-year-old tree cannot be replaced by a sapling.'", font=f_btm, fill=(254, 240, 138))

    img.save(os.path.join(OUTPUT_DIR, "slide_02_kpis.png"), quality=95)
    print("Slide 2 generated.")

def make_slide_3():
    # Slide 3: Chart Graphic - Felling vs Planting Reality in Ranchi
    img = Image.new("RGB", (W, H), (12, 28, 21))
    draw = ImageDraw.Draw(img)
    draw_header_footer(draw, 3)

    f_title = get_font(FONT_BLACK, 48)
    draw.text((60, 140), "THE COMPENSATORY MYTH", font=f_title, fill=(255, 255, 255))
    f_sub = get_font(FONT_REG, 26)
    draw.text((60, 205), "What happens after Ranchi's trees are cut? (2019-2025)", font=f_sub, fill=(167, 243, 208))

    # Visual Bar Chart Representation
    f_bar_lbl = get_font(FONT_BOLD, 26)
    f_bar_val = get_font(FONT_BLACK, 32)
    f_bar_sub = get_font(FONT_REG, 20)

    # Bar 1: Felled
    draw.text((60, 290), "1. Mature Trees Cut (2019–2025)", font=f_bar_lbl, fill=(255, 255, 255))
    draw.rounded_rectangle([60, 335, W - 60, 415], radius=12, fill=(40, 15, 15), outline=(239, 68, 68), width=2)
    draw.rectangle([60, 335, 60 + 680, 415], fill=(220, 38, 38))
    draw.text((80, 355), "34,140 Trees Felled", font=f_bar_val, fill=(255, 255, 255))
    draw.text((60, 425), "Source: Ranchi Forest Dept / RTI Infrastructure records", font=f_bar_sub, fill=(156, 163, 175))

    # Bar 2: Claimed planted
    draw.text((60, 490), "2. Saplings Claimed Planted (CAMPA)", font=f_bar_lbl, fill=(255, 255, 255))
    draw.rounded_rectangle([60, 535, W - 60, 615], radius=12, fill=(20, 40, 30), outline=(52, 211, 153), width=2)
    draw.rectangle([60, 535, 60 + 850, 615], fill=(16, 185, 129))
    draw.text((80, 555), "85,000 Saplings Planted", font=f_bar_val, fill=(255, 255, 255))
    draw.text((60, 625), "Claimed under Compensatory Afforestation Fund (CAMPA 2019-2025)", font=f_bar_sub, fill=(156, 163, 175))

    # Bar 3: Actual Survived
    draw.text((60, 690), "3. Actual Trees Survived (16% Audit)", font=f_bar_lbl, fill=(255, 255, 255))
    draw.rounded_rectangle([60, 735, W - 60, 815], radius=12, fill=(50, 20, 20), outline=(239, 68, 68), width=2)
    draw.rectangle([60, 735, 60 + 270, 815], fill=(239, 68, 68))
    draw.text((60 + 290, 755), "13,600 Survived (71.4k dead)", font=f_bar_val, fill=(248, 113, 113))
    draw.text((60, 825), "84% die due to unmonitored barren sites, grazing, and zero watering", font=f_bar_sub, fill=(248, 113, 113))

    # Deficit Box
    draw.rounded_rectangle([60, 890, W - 60, 1170], radius=20, fill=(30, 15, 15), outline=(220, 38, 38), width=2)
    f_def_h = get_font(FONT_BLACK, 36)
    draw.text((100, 925), "NET CANOPY DEFICIT: -20,540 TREES", font=f_def_h, fill=(248, 113, 113))
    f_def_b = get_font(FONT_REG, 24)
    draw.text((100, 985), "• Compensatory saplings DO NOT replace mature canopies.", font=f_def_b, fill=(255, 255, 255))
    draw.text((100, 1030), "• It takes 25–40 years for a sapling to absorb equal PM2.5.", font=f_def_b, fill=(255, 255, 255))
    draw.text((100, 1075), "• Felling Dhurwa's trees will create an irreversible deficit.", font=f_def_b, fill=(251, 191, 36))

    img.save(os.path.join(OUTPUT_DIR, "slide_03_deficit_chart.png"), quality=95)
    print("Slide 3 generated.")

def make_slide_4():
    # Slide 4: Wildlife & Birds of HEC
    img = Image.new("RGB", (W, H), (10, 24, 18))
    draw = ImageDraw.Draw(img)
    draw_header_footer(draw, 4)

    f_title = get_font(FONT_BLACK, 48)
    draw.text((60, 140), "WHAT LIVES IN HEC'S CANOPY?", font=f_title, fill=(255, 255, 255))
    f_sub = get_font(FONT_REG, 26)
    draw.text((60, 205), "eBird & Jharkhand Biodiversity Board Documentation", font=f_sub, fill=(167, 243, 208))

    species = [
        ("🐦 Indian Grey Hornbill (धनेश)", "Ocyceros birostris", "Strictly nests in 40+ year hollow tree trunks in Dhurwa. Cannot nest in saplings."),
        ("🕊️ Indian Paradise Flycatcher (दूधराज)", "Terpsiphone paradisi", "Migratory canopy insectivore; keeps local mosquito & pest populations balanced."),
        ("🦜 Rose-ringed Parakeet (तोता)", "Psittacula krameri", "Roosts in large colonies along Dhurwa avenue; crucial seed dispersal agent."),
        ("🦇 Indian Flying Fox (चमगादड़)", "Pteropus giganteus", "Keystone night pollinator; 3 roosting colonies documented in HEC sector."),
    ]

    y_start = 280
    f_sp_name = get_font(FONT_BOLD, 26)
    f_sp_sci = get_font(FONT_REG, 20)
    f_sp_desc = get_font(FONT_REG, 22)

    for name, sci, desc in species:
        draw.rounded_rectangle([60, y_start, W - 60, y_start + 165], radius=16, fill=(18, 42, 32), outline=(46, 125, 85), width=2)
        draw.text((90, y_start + 20), name, font=f_sp_name, fill=(254, 240, 138))
        draw.text((90, y_start + 58), f"Scientific: {sci} | IUCN: Least Concern (Locally threatened by tree felling)", font=f_sp_sci, fill=(110, 231, 183))
        draw.text((90, y_start + 98), desc, font=f_sp_desc, fill=(241, 245, 249))
        y_start += 195

    # Bottom takeaway
    draw.rounded_rectangle([60, 1080, W - 60, 1180], radius=16, fill=(40, 25, 10), outline=(245, 158, 11), width=1)
    f_warn = get_font(FONT_BOLD, 24)
    draw.text((90, 1115), "⚠️ When trees are cut, these birds have nowhere in Ranchi to go.", font=f_warn, fill=(253, 224, 71))

    img.save(os.path.join(OUTPUT_DIR, "slide_04_wildlife.png"), quality=95)
    print("Slide 4 generated.")

def make_slide_5():
    # Slide 5: The Engineering Solution (Split Carriageway)
    img = Image.new("RGB", (W, H), (11, 27, 20))
    draw = ImageDraw.Draw(img)
    draw_header_footer(draw, 5)

    f_title = get_font(FONT_BLACK, 48)
    draw.text((60, 140), "THE SOLUTION EXISTS", font=f_title, fill=(255, 255, 255))
    f_sub = get_font(FONT_BOLD, 28)
    draw.text((60, 205), "DEVELOPMENT WITHOUT DESTRUCTION", font=f_sub, fill=(52, 211, 153))

    # Comparison 1: Conventional Rigid Road
    draw.rounded_rectangle([60, 280, W - 60, 570], radius=20, fill=(35, 15, 15), outline=(239, 68, 68), width=2)
    f_box_title = get_font(FONT_BLACK, 28)
    draw.text((90, 310), "❌ CONVENTIONAL RIGID DESIGN (CURRENT PLAN)", font=f_box_title, fill=(248, 113, 113))
    f_box_body = get_font(FONT_REG, 24)
    draw.text((90, 370), "• Full 60-meter right-of-way bulldoze", font=f_box_body, fill=(255, 255, 255))
    draw.text((90, 420), "• Destroys all ~7,000 mature roadside trees", font=f_box_body, fill=(255, 255, 255))
    draw.text((90, 470), "• Urban heat island spikes local temperature by 3–5°C", font=f_box_body, fill=(255, 255, 255))
    draw.text((90, 520), "• Destroys Dhurwa's heritage green character", font=f_box_body, fill=(255, 255, 255))

    # Comparison 2: Smart Split Carriageway
    draw.rounded_rectangle([60, 610, W - 60, 960], radius=20, fill=(16, 45, 32), outline=(52, 211, 153), width=2)
    draw.text((90, 640), "✅ SMART SPLIT-CARRIAGEWAY DESIGN (PROPOSED)", font=f_box_title, fill=(52, 211, 153))
    draw.text((90, 700), "• Uses existing trees as a natural central green median", font=f_box_body, fill=(255, 255, 255))
    draw.text((90, 750), "• Delivers 4 to 6 smooth lanes without widening bulldozers", font=f_box_body, fill=(255, 255, 255))
    draw.text((90, 800), "• Preserves 82% of standing mature avenue canopy", font=f_box_body, fill=(255, 255, 255))
    draw.text((90, 850), "• Successfully implemented in Chandigarh & Bengaluru", font=f_box_body, fill=(255, 255, 255))
    draw.text((90, 900), "• Saves crores in compensatory plantation and erosion control", font=f_box_body, fill=(251, 191, 36))

    # Bottom Callout
    draw.rounded_rectangle([60, 1000, W - 60, 1170], radius=16, fill=(20, 50, 38), outline=(46, 125, 85), width=2)
    f_quote = get_font(FONT_BOLD, 26)
    draw.text((90, 1035), "\"We don't oppose the road.", font=f_quote, fill=(254, 240, 138))
    draw.text((90, 1075), "We demand a road designed around our trees.\"", font=f_quote, fill=(255, 255, 255))

    img.save(os.path.join(OUTPUT_DIR, "slide_05_solution.png"), quality=95)
    print("Slide 5 generated.")

def make_slide_6():
    # Slide 6: Action CTA & Petition
    img = Image.new("RGB", (W, H), (10, 24, 18))
    draw = ImageDraw.Draw(img)
    draw_header_footer(draw, 6)

    f_title = get_font(FONT_BLACK, 54)
    draw.text((60, 140), "WHAT YOU CAN DO NOW", font=f_title, fill=(255, 255, 255))
    f_sub = get_font(FONT_REG, 26)
    draw.text((60, 215), "3 immediate steps for every concerned Ranchi citizen:", font=f_sub, fill=(167, 243, 208))

    actions = [
        ("1️⃣ SIGN THE CITIZEN PETITION", "Over 750 citizens have already signed on Change.org.", "Link: c.org/sTJg4xx2Vz", (16, 185, 129)),
        ("2️⃣ CHECK THE LIVE EVIDENCE DASHBOARD", "See area-wise AQI, 15 hotspot maps, and tree audits.", "Link: save-dhurwa-trees.vercel.app/dashboard", (52, 211, 153)),
        ("3️⃣ SHARE THIS POST TO YOUR STORY", "Tag friends, college groups, and resident associations in Ranchi.", "Every share breaks the silence.", (245, 158, 11)),
    ]

    y_pos = 280
    f_act_h = get_font(FONT_BLACK, 28)
    f_act_b = get_font(FONT_REG, 22)
    f_act_l = get_font(FONT_BOLD, 22)

    for h, b, l, col in actions:
        draw.rounded_rectangle([60, y_pos, W - 60, y_pos + 180], radius=18, fill=(18, 42, 30), outline=col, width=2)
        draw.text((90, y_pos + 25), h, font=f_act_h, fill=col)
        draw.text((90, y_pos + 75), b, font=f_act_b, fill=(255, 255, 255))
        draw.text((90, y_pos + 120), l, font=f_act_l, fill=(254, 240, 138))
        y_pos += 215

    # Powerful Closing Note
    draw.rounded_rectangle([60, 950, W - 60, 1170], radius=20, fill=(35, 20, 15), outline=(239, 68, 68), width=2)
    f_close_h = get_font(FONT_BLACK, 28)
    draw.text((90, 985), "🚨 SPREAD THE WORD ACROSS RANCHI", font=f_close_h, fill=(248, 113, 113))
    f_close_b = get_font(FONT_REG, 24)
    draw.text((90, 1040), "Once 40-year-old trees are chopped down, no tender", font=f_close_b, fill=(255, 255, 255))
    draw.text((90, 1085), "or budget can bring back Ranchi's living canopy.", font=f_close_b, fill=(255, 255, 255))

    img.save(os.path.join(OUTPUT_DIR, "slide_06_action.png"), quality=95)
    print("Slide 6 generated.")

if __name__ == "__main__":
    make_slide_1()
    make_slide_2()
    make_slide_3()
    make_slide_4()
    make_slide_5()
    make_slide_6()
    print("All 6 Instagram carousel slides successfully generated in:", OUTPUT_DIR)
