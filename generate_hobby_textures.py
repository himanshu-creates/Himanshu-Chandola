import math
import os
from PIL import Image, ImageDraw, ImageFont

os.makedirs('public/textures/studio', exist_ok=True)
os.makedirs('public/textures/hobbies', exist_ok=True)
preview_dir = r'C:/Users/himan/.gemini/antigravity/brain/0772d1c0-8258-4143-878f-29a20b3b69d9'

try:
    font_phone_title = ImageFont.truetype('C:/Windows/Fonts/segoeprb.ttf', 56)
    font_phone_sub = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 28)
    
    font_mon_title = ImageFont.truetype('C:/Windows/Fonts/segoeprb.ttf', 34)
    font_mon_sub = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 19)
    
    font_tv_title = ImageFont.truetype('C:/Windows/Fonts/segoeprb.ttf', 62)
    font_tv_sub = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 28)
except Exception:
    font_phone_title = font_phone_sub = font_mon_title = font_mon_sub = font_tv_title = font_tv_sub = ImageFont.load_default()

# -------------------------------------------------------------
# 1. 01 — BGMI / GAMING (Phone: 1024 x 2048)
# -------------------------------------------------------------
def generate_bgmi(painted=False):
    # Base phone frame
    img = Image.new('RGBA', (1024, 2048), (255, 255, 255, 255))
    base_draw = ImageDraw.Draw(img)
    
    # Outer body
    bezel_col = (245, 245, 245, 255) if not painted else (45, 55, 72, 255)
    border_col = (30, 30, 30, 255) if not painted else (15, 23, 42, 255)
    base_draw.rounded_rectangle([15, 15, 1009, 2033], radius=44, fill=bezel_col, outline=border_col, width=6)
    
    # Top speaker and camera
    cam_col = (30, 30, 30, 255) if not painted else (15, 23, 42, 255)
    base_draw.ellipse([300, 75, 350, 125], fill=cam_col)
    base_draw.rounded_rectangle([420, 85, 620, 115], radius=15, fill=cam_col)
    
    # Screen Area
    screen_box = [52, 190, 972, 1858]
    screen_bg = (255, 255, 255, 255) if not painted else (248, 250, 252, 255)
    base_draw.rounded_rectangle(screen_box, radius=18, fill=screen_bg, outline=border_col, width=4)
    
    overlay = Image.new('RGBA', img.size, (255, 255, 255, 0))
    draw = ImageDraw.Draw(overlay)
    
    cx, cy = 512, 1050
    
    # Header
    title_text = "01 — BGMI / GAMING"
    sub_text = "Battlegrounds • Strategy • Reflexes"
    
    t_box = draw.textbbox((0, 0), title_text, font=font_phone_title)
    tw = t_box[2] - t_box[0]
    draw.text((cx - tw // 2, 270), title_text, font=font_phone_title, fill=(20, 20, 20, 255))
    
    s_box = draw.textbbox((0, 0), sub_text, font=font_phone_sub)
    sw = s_box[2] - s_box[0]
    draw.text((cx - sw // 2, 350), sub_text, font=font_phone_sub, fill=(100, 100, 100, 220) if not painted else (180, 83, 9, 255))
    
    line_w = 280
    draw.line([(cx - line_w // 2, 410), (cx + line_w // 2, 410)], fill=(40, 40, 40, 180), width=3)
    if painted:
        draw.line([(cx - line_w // 2, 410), (cx + line_w // 2, 410)], fill=(245, 158, 11, 230), width=4)

    # Crosshair Radar in background
    radar_color = (210, 210, 210, 180) if not painted else (6, 182, 212, 140)
    for r in [280, 200, 120]:
        draw.ellipse([cx - r, cy - 80 - r, cx + r, cy - 80 + r], outline=radar_color, width=2)
    draw.line([(cx - 320, cy - 80), (cx + 320, cy - 80)], fill=radar_color, width=1)
    draw.line([(cx, cy - 80 - 320), (cx, cy - 80 + 320)], fill=radar_color, width=1)
    
    # Level 3 Spetsnaz Helmet
    helmet_cx, helmet_cy = cx, cy - 80
    dome_box = [helmet_cx - 150, helmet_cy - 170, helmet_cx + 150, helmet_cy + 100]
    
    if painted:
        draw.chord(dome_box, 180, 360, fill=(45, 55, 72, 255), outline=(15, 23, 42, 255), width=5)
        draw.arc([helmet_cx - 130, helmet_cy - 150, helmet_cx + 130, helmet_cy + 80], 200, 270, fill=(148, 163, 184, 200), width=6)
    else:
        draw.chord(dome_box, 180, 360, fill=(255, 255, 255, 255), outline=(25, 25, 25, 255), width=4)
        for h in range(-120, 120, 15):
            draw.line([(helmet_cx + h, helmet_cy - 140), (helmet_cx + h + 20, helmet_cy - 50)], fill=(80, 80, 80, 140), width=2)

    # Visor
    visor_box = [helmet_cx - 135, helmet_cy - 60, helmet_cx + 135, helmet_cy + 30]
    if painted:
        draw.rounded_rectangle(visor_box, radius=12, fill=(15, 23, 42, 255), outline=(217, 119, 6, 255), width=4)
        draw.rounded_rectangle([helmet_cx - 110, helmet_cy - 25, helmet_cx + 110, helmet_cy - 5], radius=6, fill=(34, 211, 238, 240))
        draw.line([(helmet_cx - 90, helmet_cy - 15), (helmet_cx - 20, helmet_cy - 15)], fill=(255, 255, 255, 255), width=3)
    else:
        draw.rounded_rectangle(visor_box, radius=12, fill=(245, 245, 245, 255), outline=(25, 25, 25, 255), width=4)
        draw.rounded_rectangle([helmet_cx - 110, helmet_cy - 25, helmet_cx + 110, helmet_cy - 5], radius=6, fill=(40, 40, 40, 255))

    # Helmet Cheekguards and Chin Strap
    strap_pts = [(helmet_cx - 140, helmet_cy + 10), (helmet_cx - 110, helmet_cy + 85), (helmet_cx + 110, helmet_cy + 85), (helmet_cx + 140, helmet_cy + 10)]
    draw.line(strap_pts, fill=(25, 25, 25, 255) if not painted else (30, 41, 59, 255), width=6)
    for rx, ry in [(helmet_cx - 130, helmet_cy - 30), (helmet_cx + 130, helmet_cy - 30), (helmet_cx - 110, helmet_cy - 90), (helmet_cx + 110, helmet_cy - 90)]:
        r_fill = (251, 191, 36, 255) if painted else (50, 50, 50, 255)
        draw.ellipse([rx - 6, ry - 6, rx + 6, ry + 6], fill=r_fill, outline=(20, 20, 20, 255), width=2)

    # Headset behind
    head_arc = [cx - 280, cy - 180, cx + 280, cy + 80]
    draw.arc(head_arc, 175, 365, fill=(35, 35, 35, 255) if not painted else (30, 41, 59, 255), width=16)
    if painted:
        draw.arc(head_arc, 195, 345, fill=(239, 68, 68, 220), width=5)
    for ecx in [cx - 270, cx + 270]:
        cup_box = [ecx - 30, cy - 40, ecx + 30, cy + 80]
        c_fill = (30, 41, 59, 255) if painted else (240, 240, 240, 255)
        c_out = (239, 68, 68, 255) if painted else (25, 25, 25, 255)
        draw.rounded_rectangle(cup_box, radius=16, fill=c_fill, outline=c_out, width=4)

    # Gaming Phone (horizontal)
    phone_box = [cx - 260, cy + 180, cx + 260, cy + 460]
    if painted:
        draw.rounded_rectangle(phone_box, radius=24, fill=(30, 41, 59, 255), outline=(245, 158, 11, 255), width=5)
        scr_box = [cx - 240, cy + 200, cx + 240, cy + 440]
        draw.rounded_rectangle(scr_box, radius=16, fill=(15, 23, 42, 255))
        draw.ellipse([cx + 155, cy + 215, cx + 225, cy + 285], outline=(34, 211, 238, 200), width=2)
        draw.point([(cx + 190, cy + 250)], fill=(239, 68, 68, 255))
        draw.ellipse([cx - 215, cy + 325, cx - 165, cy + 375], outline=(148, 163, 184, 180), width=2)
        draw.ellipse([cx - 197, cy + 343, cx - 183, cy + 357], fill=(148, 163, 184, 220))
        draw.rectangle([cx - 100, cy + 410, cx + 100, cy + 424], fill=(51, 65, 85, 255), outline=(100, 116, 139, 255))
        draw.rectangle([cx - 98, cy + 412, cx + 70, cy + 422], fill=(34, 197, 94, 255))
        draw.polygon([(cx - 240, cy + 380), (cx - 130, cy + 320), (cx - 30, cy + 350), (cx + 90, cy + 300), (cx + 240, cy + 370), (cx + 240, cy + 440), (cx - 240, cy + 440)], fill=(71, 85, 105, 160))
        draw.line([(cx + 20, cy + 340), (cx + 30, cy + 260)], fill=(239, 68, 68, 200), width=3)
        draw.rectangle([cx + 10, cy + 335, cx + 38, cy + 358], fill=(220, 38, 38, 255), outline=(30, 41, 59, 255), width=2)
        draw.rectangle([cx + 8, cy + 330, cx + 40, cy + 338], fill=(59, 130, 246, 255))
    else:
        draw.rounded_rectangle(phone_box, radius=24, fill=(255, 255, 255, 255), outline=(25, 25, 25, 255), width=4)
        scr_box = [cx - 240, cy + 200, cx + 240, cy + 440]
        draw.rounded_rectangle(scr_box, radius=16, fill=(250, 250, 250, 255), outline=(35, 35, 35, 255), width=2)
        draw.ellipse([cx + 155, cy + 215, cx + 225, cy + 285], outline=(60, 60, 60, 200), width=2)
        draw.ellipse([cx - 215, cy + 325, cx - 165, cy + 375], outline=(60, 60, 60, 180), width=2)
        draw.rectangle([cx + 10, cy + 335, cx + 38, cy + 358], fill=(230, 230, 230, 255), outline=(25, 25, 25, 255), width=2)
        draw.line([(cx + 24, cy + 335), (cx + 24, cy + 270)], fill=(80, 80, 80, 160), width=2)

    # Clean bottom quote
    quote_text = "\"I enjoy playing BGMI.\""
    q_box = draw.textbbox((0, 0), quote_text, font=font_phone_sub)
    qw = q_box[2] - q_box[0]
    draw.text((cx - qw // 2, 1620), quote_text, font=font_phone_sub, fill=(50, 50, 50, 240) if not painted else (217, 119, 6, 255))
    
    out = Image.alpha_composite(img, overlay)
    return out

# -------------------------------------------------------------
# 2. 02 — CRICKET (Monitor: 1024 x 512)
# -------------------------------------------------------------
def generate_cricket(painted=False):
    img = Image.new('RGBA', (1024, 512), (255, 255, 255, 255))
    base_draw = ImageDraw.Draw(img)
    
    # Outer Bezel
    bezel_col = (245, 245, 245, 255) if not painted else (225, 231, 239, 255)
    border_col = (30, 30, 30, 255) if not painted else (30, 41, 59, 255)
    base_draw.rounded_rectangle([10, 10, 1014, 502], radius=16, fill=bezel_col, outline=border_col, width=5)
    
    # Power LED button on bottom right
    base_draw.ellipse([930, 470, 950, 490], fill=(255, 255, 255, 255) if not painted else (34, 197, 94, 255), outline=border_col, width=2)
    
    # Inner Screen Area
    screen_box = [36, 28, 988, 452]
    screen_bg = (255, 255, 255, 255) if not painted else (252, 252, 250, 255)
    base_draw.rectangle(screen_box, fill=screen_bg, outline=border_col, width=4)
    
    overlay = Image.new('RGBA', img.size, (255, 255, 255, 0))
    draw = ImageDraw.Draw(overlay)
    
    cx, cy = 512, 256
    
    # Header
    title_text = "02 — CRICKET"
    sub_text = "Strategy • Teamwork • Athletic Spirit"
    
    t_box = draw.textbbox((0, 0), title_text, font=font_mon_title)
    tw = t_box[2] - t_box[0]
    draw.text((cx - tw // 2, 48), title_text, font=font_mon_title, fill=(20, 20, 20, 255))
    
    s_box = draw.textbbox((0, 0), sub_text, font=font_mon_sub)
    sw = s_box[2] - s_box[0]
    draw.text((cx - sw // 2, 92), sub_text, font=font_mon_sub, fill=(100, 100, 100, 220) if not painted else (185, 28, 28, 255))
    
    # Pitch Crease Ground Lines
    ground_y = 390
    draw.line([(120, ground_y), (904, ground_y)], fill=(50, 50, 50, 220) if not painted else (34, 197, 94, 255), width=3)
    draw.line([(160, ground_y + 12), (864, ground_y + 12)], fill=(120, 120, 120, 150), width=1)
    
    # 3 Stumps
    stump_x_start = 340
    stump_spacing = 42
    stump_top = 175
    stump_bottom = ground_y
    stump_w = 14
    
    stump_fill = (250, 250, 250, 255) if not painted else (245, 208, 140, 255)
    stump_outline = (25, 25, 25, 255) if not painted else (120, 53, 15, 255)
    
    for i in range(3):
        sx = stump_x_start + i * stump_spacing
        draw.rounded_rectangle([sx - stump_w//2, stump_top, sx + stump_w//2, stump_bottom], radius=4, fill=stump_fill, outline=stump_outline, width=2)
        draw.line([(sx - stump_w//2, stump_top + 18), (sx + stump_w//2, stump_top + 18)], fill=stump_outline, width=1)
        draw.line([(sx - stump_w//2, stump_top + 36), (sx + stump_w//2, stump_top + 36)], fill=stump_outline, width=1)

    # 2 Bails on top
    bail_fill = (240, 240, 240, 255) if not painted else (251, 191, 36, 255)
    draw.rounded_rectangle([stump_x_start - 10, stump_top - 10, stump_x_start + stump_spacing + 4, stump_top], radius=3, fill=bail_fill, outline=stump_outline, width=2)
    draw.rounded_rectangle([stump_x_start + stump_spacing - 4, stump_top - 10, stump_x_start + stump_spacing * 2 + 10, stump_top], radius=3, fill=bail_fill, outline=stump_outline, width=2)

    # Leaning Cricket Bat
    h_top = (490, 130)
    h_bot = (515, 215)
    draw.line([h_top, h_bot], fill=(35, 35, 35, 255) if not painted else (30, 58, 138, 255), width=14)
    if painted:
        for t in [0.2, 0.4, 0.6, 0.8]:
            hx = h_top[0] + (h_bot[0] - h_top[0]) * t
            hy = h_top[1] + (h_bot[1] - h_top[1]) * t
            draw.line([(hx - 6, hy - 2), (hx + 6, hy + 2)], fill=(255, 255, 255, 180), width=2)
            
    bat_pts = [
        (505, 210),
        (535, 218),
        (568, 385),
        (518, 390),
    ]
    bat_fill = (255, 255, 255, 255) if not painted else (254, 243, 199, 255)
    bat_outline = (25, 25, 25, 255) if not painted else (146, 64, 14, 255)
    draw.polygon(bat_pts, fill=bat_fill, outline=bat_outline)
    draw.line([(505, 210), (535, 218), (568, 385), (518, 390), (505, 210)], fill=bat_outline, width=3)
    draw.line([(520, 215), (544, 386)], fill=(180, 180, 180, 180) if not painted else (217, 119, 6, 180), width=2)

    # Cricket Ball in foreground
    ball_cx, ball_cy, ball_r = 680, 360, 35
    if painted:
        draw.ellipse([ball_cx - ball_r, ball_cy - ball_r, ball_cx + ball_r, ball_cy + ball_r], fill=(220, 38, 38, 255), outline=(153, 27, 27, 255), width=3)
        draw.ellipse([ball_cx - ball_r + 4, ball_cy + ball_r - 6, ball_cx + ball_r + 14, ball_cy + ball_r + 6], fill=(0, 0, 0, 70))
        draw.arc([ball_cx - ball_r + 6, ball_cy - ball_r + 6, ball_cx + ball_r - 6, ball_cy + ball_r - 6], 210, 270, fill=(254, 202, 202, 220), width=4)
        draw.line([(ball_cx - 24, ball_cy - 20), (ball_cx + 24, ball_cy + 20)], fill=(255, 255, 255, 255), width=3)
        for d in range(-20, 22, 6):
            draw.line([(ball_cx + d - 3, ball_cy + d * 0.85 + 4), (ball_cx + d + 3, ball_cy + d * 0.85 - 4)], fill=(255, 255, 255, 220), width=2)
    else:
        draw.ellipse([ball_cx - ball_r, ball_cy - ball_r, ball_cx + ball_r, ball_cy + ball_r], fill=(255, 255, 255, 255), outline=(25, 25, 25, 255), width=3)
        draw.line([(ball_cx - 24, ball_cy - 20), (ball_cx + 24, ball_cy + 20)], fill=(25, 25, 25, 255), width=3)
        for d in range(-20, 22, 6):
            draw.line([(ball_cx + d - 3, ball_cy + d * 0.85 + 4), (ball_cx + d + 3, ball_cy + d * 0.85 - 4)], fill=(40, 40, 40, 255), width=2)
        for h in range(-15, 25, 6):
            draw.line([(ball_cx + h, ball_cy + 10), (ball_cx + h + 8, ball_cy + 28)], fill=(80, 80, 80, 160), width=1)

    # Bottom Description
    desc_text = "\"Cricket is one of my favorite sports.\""
    d_box = draw.textbbox((0, 0), desc_text, font=font_mon_sub)
    dw = d_box[2] - d_box[0]
    draw.text((cx - dw // 2, 418), desc_text, font=font_mon_sub, fill=(60, 60, 60, 240) if not painted else (185, 28, 28, 255))
    
    out = Image.alpha_composite(img, overlay)
    return out

# -------------------------------------------------------------
# 3. 03 — DRAWING (Monitor: 1024 x 512)
# -------------------------------------------------------------
def generate_drawing(painted=False):
    img = Image.new('RGBA', (1024, 512), (255, 255, 255, 255))
    base_draw = ImageDraw.Draw(img)
    
    bezel_col = (245, 245, 245, 255) if not painted else (225, 231, 239, 255)
    border_col = (30, 30, 30, 255) if not painted else (30, 41, 59, 255)
    base_draw.rounded_rectangle([10, 10, 1014, 502], radius=16, fill=bezel_col, outline=border_col, width=5)
    
    # Power LED
    base_draw.ellipse([930, 470, 950, 490], fill=(255, 255, 255, 255) if not painted else (99, 102, 241, 255), outline=border_col, width=2)
    
    screen_box = [36, 28, 988, 452]
    screen_bg = (255, 255, 255, 255) if not painted else (252, 252, 250, 255)
    base_draw.rectangle(screen_box, fill=screen_bg, outline=border_col, width=4)
    
    overlay = Image.new('RGBA', img.size, (255, 255, 255, 0))
    draw = ImageDraw.Draw(overlay)
    
    cx, cy = 512, 256
    
    title_text = "03 — DRAWING"
    sub_text = "Observational Sketches • Form • Ideation"
    
    t_box = draw.textbbox((0, 0), title_text, font=font_mon_title)
    tw = t_box[2] - t_box[0]
    draw.text((cx - tw // 2, 48), title_text, font=font_mon_title, fill=(20, 20, 20, 255))
    
    s_box = draw.textbbox((0, 0), sub_text, font=font_mon_sub)
    sw = s_box[2] - s_box[0]
    draw.text((cx - sw // 2, 92), sub_text, font=font_mon_sub, fill=(100, 100, 100, 220) if not painted else (99, 102, 241, 255))
    
    # Sketchbook in Center
    book_left, book_top, book_right, book_bottom = 260, 135, 764, 375
    book_fill = (255, 255, 255, 255) if not painted else (255, 251, 235, 255)
    book_outline = (30, 30, 30, 255) if not painted else (75, 85, 99, 255)
    
    draw.rounded_rectangle([book_left, book_top, cx - 10, book_bottom], radius=8, fill=book_fill, outline=book_outline, width=3)
    draw.rounded_rectangle([cx + 10, book_top, book_right, book_bottom], radius=8, fill=book_fill, outline=book_outline, width=3)
    
    for y_ring in range(book_top + 16, book_bottom - 10, 22):
        r_col = (50, 50, 50, 240) if not painted else (156, 163, 175, 255)
        draw.rounded_rectangle([cx - 16, y_ring, cx + 16, y_ring + 12], radius=6, outline=r_col, width=2)
        draw.ellipse([cx - 20, y_ring + 2, cx - 12, y_ring + 10], fill=(20, 20, 20, 200))
        draw.ellipse([cx + 12, y_ring + 2, cx + 20, y_ring + 10], fill=(20, 20, 20, 200))

    # Left Page: 3D Wireframe Cube & Eye
    cube_ox, cube_oy = 340, 270
    cube_size = 50
    p1 = (cube_ox, cube_oy)
    p2 = (cube_ox + cube_size, cube_oy)
    p3 = (cube_ox + cube_size, cube_oy + cube_size)
    p4 = (cube_ox, cube_oy + cube_size)
    off = 24
    q1 = (cube_ox + off, cube_oy - off)
    q2 = (cube_ox + cube_size + off, cube_oy - off)
    q3 = (cube_ox + cube_size + off, cube_oy + cube_size - off)
    q4 = (cube_ox + off, cube_oy + cube_size - off)
    
    cube_col = (40, 40, 40, 255) if not painted else (79, 70, 229, 255)
    draw.polygon([p1, p2, p3, p4], outline=cube_col, width=2)
    draw.polygon([q1, q2, q3, q4], outline=cube_col, width=2)
    draw.line([p1, q1], fill=cube_col, width=2)
    draw.line([p2, q2], fill=cube_col, width=2)
    draw.line([p3, q3], fill=cube_col, width=2)
    draw.line([p4, q4], fill=cube_col, width=2)
    
    eye_cx, eye_cy = 380, 195
    eye_col = (30, 30, 30, 255) if not painted else (14, 116, 144, 255)
    draw.arc([eye_cx - 60, eye_cy - 40, eye_cx + 60, eye_cy + 40], 210, 330, fill=eye_col, width=3)
    draw.arc([eye_cx - 60, eye_cy - 35, eye_cx + 60, eye_cy + 45], 30, 150, fill=eye_col, width=3)
    draw.ellipse([eye_cx - 16, eye_cy - 16, eye_cx + 16, eye_cy + 16], outline=eye_col, width=2)
    draw.ellipse([eye_cx - 8, eye_cy - 8, eye_cx + 8, eye_cy + 8], fill=eye_col)

    # Right Page: Mountain Landscape & Sun
    m_pts = [(cx + 40, 320), (cx + 100, 220), (cx + 150, 270), (cx + 200, 190), (cx + 250, 320)]
    draw.line(m_pts, fill=(35, 35, 35, 255) if not painted else (13, 148, 136, 255), width=3)
    if painted:
        draw.polygon([(cx + 40, 320), (cx + 100, 220), (cx + 150, 270), (cx + 200, 190), (cx + 250, 320)], fill=(204, 251, 241, 160))
        draw.ellipse([cx + 180, 160, cx + 220, 200], fill=(254, 240, 138, 220))
    else:
        draw.ellipse([cx + 180, 160, cx + 220, 200], outline=(50, 50, 50, 220), width=2)

    # Wooden Pencil
    p_x1, p_y1 = 620, 130
    p_x2, p_y2 = 470, 350
    pencil_w = 12
    draw.line([(p_x1, p_y1), (p_x2, p_y2)], fill=(30, 30, 30, 255) if not painted else (234, 179, 8, 255), width=pencil_w)
    if painted:
        draw.line([(p_x1, p_y1), (p_x1 - 15, p_y1 + 22)], fill=(244, 114, 182, 255), width=pencil_w)
        draw.line([(p_x1 - 15, p_y1 + 22), (p_x1 - 25, p_y1 + 36)], fill=(156, 163, 175, 255), width=pencil_w)
    draw.polygon([(p_x2, p_y2), (p_x2 - 18, p_y2 + 25), (p_x2 + 10, p_y2 + 20)], fill=(254, 243, 199, 255), outline=(30, 30, 30, 255))
    draw.polygon([(p_x2 - 12, p_y2 + 17), (p_x2 - 18, p_y2 + 25), (p_x2 - 6, p_y2 + 23)], fill=(20, 20, 20, 255))

    # Bottom Description
    desc_text = "\"I enjoy drawing and sketching.\""
    d_box = draw.textbbox((0, 0), desc_text, font=font_mon_sub)
    dw = d_box[2] - d_box[0]
    draw.text((cx - dw // 2, 418), desc_text, font=font_mon_sub, fill=(60, 60, 60, 240) if not painted else (99, 102, 241, 255))
    
    out = Image.alpha_composite(img, overlay)
    return out

# -------------------------------------------------------------
# 4. 04 — MOUNTAINS (CRT TV: 2048 x 1024)
# -------------------------------------------------------------
def generate_mountains(painted=False):
    # Base CRT frame from scratch for guaranteed sharpness and zero artifacts
    img = Image.new('RGBA', (2048, 1024), (255, 255, 255, 255))
    base_draw = ImageDraw.Draw(img)
    
    # Outer Cabinet
    cabinet_col = (245, 245, 245, 255) if not painted else (74, 53, 39, 255) # Warm mahogany walnut wood
    border_col = (30, 30, 30, 255) if not painted else (24, 16, 12, 255)
    base_draw.rounded_rectangle([15, 15, 2033, 1009], radius=32, fill=cabinet_col, outline=border_col, width=8)
    
    # Right panel for dials & speaker
    panel_col = (235, 235, 235, 255) if not painted else (54, 38, 28, 255)
    base_draw.rounded_rectangle([1600, 60, 1980, 960], radius=20, fill=panel_col, outline=border_col, width=5)
    
    # CRT Dials
    for dial_y in [220, 430]:
        base_draw.ellipse([1680, dial_y - 80, 1900, dial_y + 80], fill=(220, 220, 220, 255) if not painted else (120, 90, 70, 255), outline=border_col, width=4)
        base_draw.rounded_rectangle([1770, dial_y - 65, 1810, dial_y + 65], radius=10, fill=(40, 40, 40, 255) if not painted else (230, 230, 230, 255))
        
    # Speaker grille lines
    for line_y in range(580, 920, 22):
        base_draw.line([(1650, line_y), (1930, line_y)], fill=border_col, width=4)
        
    # Bottom grille bar under screen
    base_draw.rounded_rectangle([60, 880, 1560, 960], radius=12, fill=panel_col, outline=border_col, width=4)
    for line_x in range(90, 1530, 28):
        base_draw.line([(line_x, 895), (line_x, 945)], fill=border_col, width=3)
        
    # CRT Curved Screen Area
    screen_box = [60, 60, 1560, 850]
    screen_bg = (255, 255, 255, 255) if not painted else (248, 250, 252, 255)
    base_draw.rounded_rectangle(screen_box, radius=40, fill=screen_bg, outline=border_col, width=6)
    
    overlay = Image.new('RGBA', img.size, (255, 255, 255, 0))
    draw = ImageDraw.Draw(overlay)
    
    cx = 810
    
    # Header
    title_text = "04 — MOUNTAINS"
    sub_text = "Himalayan Peace • Alpine Forests • Serenity"
    
    t_box = draw.textbbox((0, 0), title_text, font=font_tv_title)
    tw = t_box[2] - t_box[0]
    draw.text((cx - tw // 2, 110), title_text, font=font_tv_title, fill=(20, 20, 20, 255))
    
    s_box = draw.textbbox((0, 0), sub_text, font=font_tv_sub)
    sw = s_box[2] - s_box[0]
    draw.text((cx - sw // 2, 185), sub_text, font=font_tv_sub, fill=(100, 100, 100, 220) if not painted else (5, 150, 105, 255))
    
    # DRAW HIMALAYAN MOUNTAINS
    base_y = 660
    peak1 = (cx - 480, base_y - 340)
    peak2 = (cx - 160, base_y - 420)
    peak3 = (cx + 180, base_y - 360)
    peak4 = (cx + 480, base_y - 300)
    
    if painted:
        sky_box = [100, 220, 1520, base_y]
        draw.rectangle(sky_box, fill=(224, 242, 254, 180))
        
        draw.polygon([(100, base_y), (220, base_y - 260), peak1, (cx - 320, base_y - 290), peak2, (cx - 20, base_y - 280), peak3, (cx + 310, base_y - 240), peak4, (1520, base_y)], fill=(186, 230, 253, 240))
        draw.polygon([(cx - 480, base_y - 340), (cx - 380, base_y - 220), (cx - 480, base_y)], fill=(255, 255, 255, 255))
        draw.polygon([(cx - 160, base_y - 420), (cx - 40, base_y - 230), (cx - 160, base_y)], fill=(255, 255, 255, 255))
        draw.polygon([(cx + 180, base_y - 360), (cx + 280, base_y - 240), (cx + 180, base_y)], fill=(255, 255, 255, 255))
    
    m_lines = [
        (100, base_y), (220, base_y - 260), peak1, (cx - 320, base_y - 290),
        peak2, (cx - 20, base_y - 280), peak3, (cx + 310, base_y - 240), peak4, (1520, base_y)
    ]
    draw.line(m_lines, fill=(30, 30, 30, 255), width=5)
    
    for peak_pt in [peak1, peak2, peak3, peak4]:
        rx, ry = peak_pt
        ridge_pts = [(rx, ry), (rx + 25, ry + 100), (rx - 15, ry + 200), (rx + 20, base_y)]
        draw.line(ridge_pts, fill=(35, 35, 35, 240), width=3)
        for step in range(ry + 30, base_y - 40, 24):
            draw.line([(rx, step), (rx + 45, step + 25)], fill=(60, 60, 60, 160), width=2)

    # Foothills & Forest
    hill_color = (245, 245, 245, 255) if not painted else (167, 243, 208, 220)
    draw.polygon([(100, base_y), (350, base_y - 120), (cx, base_y - 140), (1200, base_y - 110), (1520, base_y)], fill=hill_color, outline=(30, 30, 30, 255))
    draw.line([(100, base_y), (350, base_y - 120), (cx, base_y - 140), (1200, base_y - 110), (1520, base_y)], fill=(30, 30, 30, 255), width=4)

    tree_color = (25, 25, 25, 255) if not painted else (6, 78, 59, 255)
    for tx in range(160, 1460, 48):
        ty = base_y - 90 + int(math.sin(tx * 0.02) * 35)
        draw.line([(tx, ty), (tx, ty + 30)], fill=tree_color, width=3)
        for level in range(3):
            lw = 24 - level * 5
            lh = 16
            loy = ty - level * 10
            draw.polygon([(tx, loy - lh), (tx - lw, loy + lh//2), (tx + lw, loy + lh//2)], fill=(255, 255, 255, 255) if not painted else (16, 185, 129, 255), outline=tree_color)
            draw.line([(tx, loy - lh), (tx - lw, loy + lh//2), (tx + lw, loy + lh//2), (tx, loy - lh)], fill=tree_color, width=2)

    # River
    river_col = (100, 100, 100, 180) if not painted else (14, 165, 233, 255)
    r_pts = [(cx - 80, base_y - 60), (cx - 40, base_y - 10), (cx + 50, base_y + 40), (cx + 10, base_y + 90), (cx + 120, base_y + 140)]
    draw.line(r_pts, fill=river_col, width=6)
    draw.line([(x + 25, y) for x, y in r_pts], fill=river_col, width=4)

    # Clouds
    cloud_col = (60, 60, 60, 180) if not painted else (255, 255, 255, 240)
    for c_center in [(cx - 450, 300), (cx + 420, 280)]:
        ccx, ccy = c_center
        draw.arc([ccx - 70, ccy - 25, ccx + 20, ccy + 25], 180, 360, fill=cloud_col, width=2)
        draw.arc([ccx - 25, ccy - 40, ccx + 55, ccy + 25], 180, 360, fill=cloud_col, width=2)
        draw.arc([ccx + 25, ccy - 20, ccx + 85, ccy + 25], 180, 360, fill=cloud_col, width=2)
        draw.line([(ccx - 70, ccy + 15), (ccx + 85, ccy + 15)], fill=cloud_col, width=2)

    # Quote
    desc_text = "\"I love mountains, nature and the peaceful mountain atmosphere.\""
    d_box = draw.textbbox((0, 0), desc_text, font=font_tv_sub)
    dw = d_box[2] - d_box[0]
    draw.text((cx - dw // 2, 740), desc_text, font=font_tv_sub, fill=(50, 50, 50, 240) if not painted else (5, 150, 105, 255))

    out = Image.alpha_composite(img, overlay)
    return out

# Execute generation
print("Generating 01 BGMI...")
bgmi_sketch = generate_bgmi(painted=False)
bgmi_painted = generate_bgmi(painted=True)
bgmi_sketch.save('public/textures/studio/hobby_bgmi_sketch.webp', 'WEBP', quality=90)
bgmi_painted.save('public/textures/studio/hobby_bgmi_painted.webp', 'WEBP', quality=90)
bgmi_sketch.convert('RGB').save(os.path.join(preview_dir, 'hobby_bgmi_sketch.jpg'))
bgmi_painted.convert('RGB').save(os.path.join(preview_dir, 'hobby_bgmi_painted.jpg'))

print("Generating 02 CRICKET...")
cricket_sketch = generate_cricket(painted=False)
cricket_painted = generate_cricket(painted=True)
cricket_sketch.save('public/textures/studio/hobby_cricket_sketch.webp', 'WEBP', quality=90)
cricket_painted.save('public/textures/studio/hobby_cricket_painted.webp', 'WEBP', quality=90)
cricket_sketch.convert('RGB').save(os.path.join(preview_dir, 'hobby_cricket_sketch.jpg'))
cricket_painted.convert('RGB').save(os.path.join(preview_dir, 'hobby_cricket_painted.jpg'))

print("Generating 03 DRAWING...")
drawing_sketch = generate_drawing(painted=False)
drawing_painted = generate_drawing(painted=True)
drawing_sketch.save('public/textures/studio/hobby_drawing_sketch.webp', 'WEBP', quality=90)
drawing_painted.save('public/textures/studio/hobby_drawing_painted.webp', 'WEBP', quality=90)
drawing_sketch.convert('RGB').save(os.path.join(preview_dir, 'hobby_drawing_sketch.jpg'))
drawing_painted.convert('RGB').save(os.path.join(preview_dir, 'hobby_drawing_painted.jpg'))

print("Generating 04 MOUNTAINS...")
mountains_sketch = generate_mountains(painted=False)
mountains_painted = generate_mountains(painted=True)
mountains_sketch.save('public/textures/studio/hobby_mountains_sketch.webp', 'WEBP', quality=90)
mountains_painted.save('public/textures/studio/hobby_mountains_painted.webp', 'WEBP', quality=90)
mountains_sketch.convert('RGB').save(os.path.join(preview_dir, 'hobby_mountains_sketch.jpg'))
mountains_painted.convert('RGB').save(os.path.join(preview_dir, 'hobby_mountains_painted.jpg'))

print("Overwriting old fallback textures with clean ones...")
bgmi_sketch.save('public/textures/studio/phone_front.webp', 'WEBP', quality=90)
bgmi_painted.save('public/textures/studio/phone_front_painted.webp', 'WEBP', quality=90)
bgmi_sketch.save('public/textures/studio/phonefront_followmeontiktok.webp', 'WEBP', quality=90)
bgmi_painted.save('public/textures/studio/phonefront_followmeontiktok_painted.webp', 'WEBP', quality=90)

cricket_sketch.save('public/textures/studio/monitor_front.webp', 'WEBP', quality=90)
cricket_painted.save('public/textures/studio/monitor_front_painted.webp', 'WEBP', quality=90)
drawing_sketch.save('public/textures/studio/monitorfront_postnafbdoublewinner.webp', 'WEBP', quality=90)
drawing_painted.save('public/textures/studio/monitorfront_postnafbdoublewinner_painted.webp', 'WEBP', quality=90)

mountains_sketch.save('public/textures/studio/tv_front.webp', 'WEBP', quality=90)
mountains_painted.save('public/textures/studio/tv_front_painted.webp', 'WEBP', quality=90)
mountains_sketch.save('public/textures/studio/tvfront_filmikprojektdlamultiego.webp', 'WEBP', quality=90)
mountains_painted.save('public/textures/studio/tvfront_filmikprojektdlamultiego_painted.webp', 'WEBP', quality=90)
mountains_sketch.save('public/textures/studio/tvfront_filmikedytowaniezdjec.webp', 'WEBP', quality=90)
mountains_painted.save('public/textures/studio/tvfront_filmikedytowaniezdjec_painted.webp', 'WEBP', quality=90)

print("Finished generation cleanly!")
