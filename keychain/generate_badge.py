#!/usr/bin/env python3
"""
ABO / ALJEME — Badge-Style Keychain Generator  (v2)
====================================================
Angular polygon badge  ~99 mm wide × 45 mm tall.
Keyring hole on left side.  Flat back for FDM printing.

Layer stack:
  0.0 → 3.2 mm  main body  (badge body + decorative pockets)
  3.2 → 4.4 mm  raised center plate
  4.4 → 5.6 mm  embossed text + decorative bars and dots

Output: keychain_badge.stl  (single printable solid)
"""

import math, os
from build123d import *

HERE = os.path.dirname(os.path.abspath(__file__))

# ═══════════════════════════════════════════════════
#  PARAMETERS  (all mm)
# ═══════════════════════════════════════════════════

# Badge outline
W_R   = 47.0   # right edge x
W_L   = -32.0  # left vertical edge x  →  body width = 79 mm
HH    = 22.5   # half-height           →  total height = 45 mm
CX    = 31.0   # chamfer start x (right side)
CY    = 10.5   # chamfer end   y (right side)

# Keyring ear (left protrusion)
EAR_X = -42.0  # ear centre x
EAR_R = 10.0   # ear outer radius      (99 mm total = 47 + 42 + 10)
KR_R  =  3.0   # keyring hole radius   (6 mm diameter)

# Heights
BH  = 3.2      # body
PH  = 1.2      # plate above body
TH  = 1.2      # text above plate
TZ  = BH + PH  # z-level where text starts = 4.4 mm

# Frame inset (body outline → center plate)
FI = 7.5

# ── Derived plate polygon ──────────────────────────────────────
PL  = W_L + FI   # plate left   = -24.5
PT  = HH  - FI   # plate top    =  15.0
PCX = CX  + 3.0  # plate chamfer start x =  34.0
PCY = CY  - 3.0  # plate chamfer end   y =   7.5
PR  = W_R - FI   # plate right  =  39.5

BADGE_V = [           # angular hexagonal badge outline
    (W_L,  HH),
    (CX,   HH),
    (W_R,  CY),
    (W_R, -CY),
    (CX,  -HH),
    (W_L, -HH),
]

PLATE_V = [           # raised center-plate outline (same angular style)
    (PL,   PT),
    (PCX,  PT),
    (PR,   PCY),
    (PR,  -PCY),
    (PCX, -PT),
    (PL,  -PT),
]

CHAM_ANG = math.degrees(math.atan2(CY - HH, W_R - CX))   # ≈ -38°

# ── Text layout ───────────────────────────────────────────────
FONT     = 8.5      # cap-height
TX_CX    = 7.0      # text centres x  (≈ plate body centre)
TX_Y1    =  6.0     # "ABO"    line y
TX_Y2    = -6.0     # "ALJEME" line y
ABO_HW   = 10.0     # approximate half-width of "ABO"    at FONT=8.5
ALJ_HW   = 17.5     # approximate half-width of "ALJEME" at FONT=8.5
BAR_W    =  7.0     # decorative bar length

# ═══════════════════════════════════════════════════
#  HELPER
# ═══════════════════════════════════════════════════

def down_plane(cx, cy, angle_deg=0.0):
    """Plane at z=BH, facing DOWN (for pocket extrusions), rotated about Z."""
    a = math.radians(angle_deg)
    return Plane(
        origin = Vector(cx, cy, BH),
        x_dir  = Vector(math.cos(a), math.sin(a), 0.0),
        z_dir  = Vector(0.0, 0.0, -1.0),
    )

# ═══════════════════════════════════════════════════
#  BUILD
# ═══════════════════════════════════════════════════
print("Building keychain badge …")

with BuildPart() as bp:

    # ──────────────────────────────────────────────
    #  1. Main badge body
    # ──────────────────────────────────────────────
    with BuildSketch():
        with BuildLine():
            Polyline(*BADGE_V, close=True)
        make_face()
    extrude(amount=BH)

    # ──────────────────────────────────────────────
    #  2. Keyring ear (left circular protrusion)
    # ──────────────────────────────────────────────
    with Locations(Location((EAR_X, 0.0, 0.0))):
        Cylinder(EAR_R, BH, align=(Align.CENTER, Align.CENTER, Align.MIN))

    # ──────────────────────────────────────────────
    #  3. Keyring through-hole  (⌀ 6 mm)
    # ──────────────────────────────────────────────
    with Locations(Location((EAR_X, 0.0, -0.1))):
        Cylinder(KR_R, BH + 0.2, mode=Mode.SUBTRACT,
                 align=(Align.CENTER, Align.CENTER, Align.MIN))

    # ──────────────────────────────────────────────
    #  4. Decorative frame pockets  (front face)
    # ──────────────────────────────────────────────

    # ── 4a. Three rectangular slots along top frame ──
    for sx in [-11.0, 4.0, 19.0]:
        with BuildSketch(down_plane(sx, 19.5)):
            RectangleRounded(8.5, 3.5, 0.6)
        extrude(amount=1.8, mode=Mode.SUBTRACT)

    # ── 4b. Three rectangular slots along bottom frame ──
    for sx in [-11.0, 4.0, 19.0]:
        with BuildSketch(down_plane(sx, -19.5)):
            RectangleRounded(8.5, 3.5, 0.6)
        extrude(amount=1.8, mode=Mode.SUBTRACT)

    # ── 4c. Chamfer-aligned diagonal slot  (upper-right) ──
    with BuildSketch(down_plane(35.0, 14.5, CHAM_ANG)):
        RectangleRounded(11.0, 2.8, 0.5)
    extrude(amount=1.8, mode=Mode.SUBTRACT)

    # ── 4d. Chamfer-aligned diagonal slot  (lower-right) ──
    with BuildSketch(down_plane(35.0, -14.5, -CHAM_ANG)):
        RectangleRounded(11.0, 2.8, 0.5)
    extrude(amount=1.8, mode=Mode.SUBTRACT)

    # ── 4e. Vertical accent slots on left frame ──
    for sy in (11.0, -11.0):
        with BuildSketch(down_plane(-27.5, sy)):
            RectangleRounded(2.5, 9.0, 0.4)
        extrude(amount=1.8, mode=Mode.SUBTRACT)

    # ── 4f. Corner triangular accents (rotated rectangles) ──
    for (acx, acy, aa) in [
        (-29.0,  20.0, -45),   # top-left area
        (-29.0, -20.0,  45),   # bottom-left area
        ( 28.0,  20.0,  45),   # top-right area
        ( 28.0, -20.0, -45),   # bottom-right area
    ]:
        with BuildSketch(down_plane(acx, acy, aa)):
            Rectangle(6.0, 2.0)
        extrude(amount=1.5, mode=Mode.SUBTRACT)

    # ── 4g. Small notch cuts at right badge corners ──
    for cy_notch in (CY, -CY):
        with BuildSketch(down_plane(W_R - 1.5, cy_notch)):
            Rectangle(3.5, 4.0)
        extrude(amount=1.5, mode=Mode.SUBTRACT)

    # ── 4h. Left-edge accent grooves (flanking ear) ──
    for sy in (16.5, -16.5):
        with BuildSketch(down_plane(W_L + 2.5, sy)):
            RectangleRounded(3.0, 5.0, 0.4)
        extrude(amount=1.5, mode=Mode.SUBTRACT)

    # ──────────────────────────────────────────────
    #  5. Raised center plate
    # ──────────────────────────────────────────────
    with BuildSketch(Plane.XY.offset(BH)):
        with BuildLine():
            Polyline(*PLATE_V, close=True)
        make_face()
    extrude(amount=PH)

    # ──────────────────────────────────────────────
    #  6. Embossed text
    # ──────────────────────────────────────────────
    with BuildSketch(Plane.XY.offset(TZ)):
        with Locations((TX_CX, TX_Y1)):
            Text("ABO",    font_size=FONT, font_style=FontStyle.BOLD,
                 align=(Align.CENTER, Align.CENTER))
    extrude(amount=TH)

    with BuildSketch(Plane.XY.offset(TZ)):
        with Locations((TX_CX, TX_Y2)):
            Text("ALJEME", font_size=FONT, font_style=FontStyle.BOLD,
                 align=(Align.CENTER, Align.CENTER))
    extrude(amount=TH)

    # ──────────────────────────────────────────────
    #  7. Decorative bars  (flanking each text line)
    # ──────────────────────────────────────────────
    GAP = 4.0   # gap between text edge and bar centre

    for sign in (-1, +1):
        bx = TX_CX + sign * (ABO_HW + GAP + BAR_W / 2)
        with BuildSketch(Plane.XY.offset(TZ)):
            with Locations((bx, TX_Y1)):
                RectangleRounded(BAR_W, 2.2, 0.4)
        extrude(amount=TH)

    for sign in (-1, +1):
        bx = TX_CX + sign * (ALJ_HW + GAP + BAR_W / 2)
        with BuildSketch(Plane.XY.offset(TZ)):
            with Locations((bx, TX_Y2)):
                RectangleRounded(BAR_W, 2.2, 0.4)
        extrude(amount=TH)

    # ──────────────────────────────────────────────
    #  8. Decorative dots  (2 dots outside each bar)
    # ──────────────────────────────────────────────
    DOT_R = 1.3

    for (text_y, hw) in [(TX_Y1, ABO_HW), (TX_Y2, ALJ_HW)]:
        for sign in (-1, +1):
            bar_cx = TX_CX + sign * (hw + GAP + BAR_W / 2)
            # inner dot (between bar and text)
            dot_inner = bar_cx - sign * (BAR_W / 2 + 2.8)
            # outer dot (far side of bar)
            dot_outer = bar_cx + sign * (BAR_W / 2 + 2.8)
            for dx in (dot_inner, dot_outer):
                with Locations(Location((dx, text_y, TZ))):
                    Cylinder(DOT_R, TH,
                             align=(Align.CENTER, Align.CENTER, Align.MIN))

badge_part = bp.part
print(f"  volume : {badge_part.volume:.0f} mm³")

# ═══════════════════════════════════════════════════
#  EXPORT
# ═══════════════════════════════════════════════════
stl_path = os.path.join(HERE, "keychain_badge.stl")
print(f"\nExporting {stl_path} …")
export_stl(badge_part, stl_path)

W_TOTAL = W_R + abs(EAR_X) + EAR_R
print(f"\n✓  Done!")
print(f"   Total width   : {W_TOTAL:.0f} mm")
print(f"   Total height  : {HH*2:.0f} mm")
print(f"   Max Z (height): {BH+PH+TH:.1f} mm")
print(f"   Keyring hole  : ⌀{KR_R*2:.0f} mm  at x={EAR_X:.0f}, y=0")
print(f"   Min wall      : {EAR_R - KR_R:.1f} mm  (ear wall)")
