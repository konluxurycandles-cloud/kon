#!/usr/bin/env python3
"""
ABO / ALJEME — Arrow Badge Keychain v3
Two-color FDM matching reference image.

  base_layer.stl  → PURPLE : full arrow badge body + ear
  top_layer.stl   → GREEN  : frame ring + X diagonals + text + dots

Overall: ~98 mm wide × 44 mm tall × 4.8 mm max height
"""

import math, os
from build123d import *

HERE = os.path.dirname(os.path.abspath(__file__))

# ═══════════════════════════════════════════════════════════════
#  PARAMETERS
# ═══════════════════════════════════════════════════════════════

# Arrow badge outline  (convex polygon, points right)
W_L =  -35.0    # left flat edge x
HH  =   22.0    # half-height
MR  =   28.0    # x where chamfers meet badge top/bottom
W_R =   43.0    # right arrow-tip x

BADGE_V = [(W_L, HH), (MR, HH), (W_R, 0.0), (MR, -HH), (W_L, -HH)]

# Keyring ear  (left side, circular protrusion)
EAR_X = -45.0
EAR_R =  10.0
KR_R  =   3.0    # hole radius → ⌀ 6 mm

# Layer heights
BH  = 3.0     # base (purple) height
GH  = 1.8     # green features height above base

# Frame ring vertices  (analytically computed from BADGE_V)
#   Outer edge = badge inset by 4.5 mm
#   Inner edge = badge inset by 7.0 mm   (frame width = 2.5 mm)
FRAME_OUTER_V = [
    (-30.5,  17.5),
    ( 25.62, 17.5),
    ( 37.55,  0.0),
    ( 25.62,-17.5),
    (-30.5, -17.5),
]
FRAME_INNER_V = [
    (-28.0,  15.0),
    ( 24.31, 15.0),
    ( 34.53,  0.0),
    ( 24.31,-15.0),
    (-28.0, -15.0),
]

# X diagonal bars  (connect opposite inner-frame corners)
#   Diagonal \  from  (-28, +15)  to  (+24.31, -15)
#   Diagonal /  from  (-28, -15)  to  (+24.31, +15)
_dx = 24.31 - (-28.0)            # ≈ 52.31
_dy = -15.0 - 15.0               # = -30.0
DIAG_CX  = (-28.0 + 24.31) / 2  # ≈ -1.845
DIAG_CY  = 0.0
DIAG_LEN = math.sqrt(_dx**2 + _dy**2)                   # ≈ 60.3 mm
DIAG_ANG = math.degrees(math.atan2(_dy, _dx))           # ≈ -29.8°
DIAG_W   = 3.0                   # bar width

# Text
FONT    =  9.5     # cap-height (mm), bold
TX      =  4.0     # text centre x  ≈ badge geometric centre
TY_ABO  =  6.5     # "ABO"    centre y
TY_ALJ  = -6.5     # "ALJEME" centre y

# Separator bar between the two text lines
SEP_HW = 19.0      # half-width of separator
SEP_H  =  1.5      # bar thickness

# Corner dots / bolt circles  (4 at corners of text plate)
DOT_R  = 2.8
DOT_HX = 21.0      # half-width  (from TX)
DOT_HY = 10.5      # half-height

# ═══════════════════════════════════════════════════════════════
#  BASE LAYER  (Purple)
# ═══════════════════════════════════════════════════════════════
print("Building base layer (purple)…")

with BuildPart() as base_bp:

    # Arrow badge body
    with BuildSketch():
        with BuildLine():
            Polyline(*BADGE_V, close=True)
        make_face()
    extrude(amount=BH)

    # Circular ear (left side)
    with Locations(Location((EAR_X, 0.0, 0.0))):
        Cylinder(EAR_R, BH, align=(Align.CENTER, Align.CENTER, Align.MIN))

    # Keyring through-hole ⌀ 6 mm
    with Locations(Location((EAR_X, 0.0, -0.1))):
        Cylinder(KR_R, BH + 0.2,
                 mode=Mode.SUBTRACT,
                 align=(Align.CENTER, Align.CENTER, Align.MIN))

base_part = base_bp.part
print(f"  volume = {base_part.volume:.0f} mm³")
base_path = os.path.join(HERE, "base_layer.stl")
export_stl(base_part, base_path)
print(f"  → {base_path}")


# ═══════════════════════════════════════════════════════════════
#  TOP LAYER  (Green)
# ═══════════════════════════════════════════════════════════════
print("\nBuilding top layer (green)…")

TOP = Plane.XY.offset(BH)   # all green features start at z = BH

with BuildPart() as top_bp:

    # ── 1. Frame ring ─────────────────────────────────────────
    # Outer solid (badge-aligned polygon)
    with BuildSketch(TOP):
        with BuildLine():
            Polyline(*FRAME_OUTER_V, close=True)
        make_face()
    extrude(amount=GH)

    # Hollow out the interior
    with BuildSketch(TOP):
        with BuildLine():
            Polyline(*FRAME_INNER_V, close=True)
        make_face()
    extrude(amount=GH, mode=Mode.SUBTRACT)

    # ── 2. X diagonal bars ───────────────────────────────────
    # Bar \   (top-left ↘ bottom-right)
    with BuildSketch(TOP):
        with Locations(Location((DIAG_CX, DIAG_CY), DIAG_ANG)):
            Rectangle(DIAG_LEN, DIAG_W)
    extrude(amount=GH)

    # Bar /   (bottom-left ↗ top-right)
    with BuildSketch(TOP):
        with Locations(Location((DIAG_CX, DIAG_CY), -DIAG_ANG)):
            Rectangle(DIAG_LEN, DIAG_W)
    extrude(amount=GH)

    # ── 3. Text "ABO" ─────────────────────────────────────────
    with BuildSketch(TOP):
        with Locations((TX, TY_ABO)):
            Text("ABO",
                 font_size=FONT,
                 font_style=FontStyle.BOLD,
                 align=(Align.CENTER, Align.CENTER))
    extrude(amount=GH)

    # ── 4. Text "ALJEME" ──────────────────────────────────────
    with BuildSketch(TOP):
        with Locations((TX, TY_ALJ)):
            Text("ALJEME",
                 font_size=FONT,
                 font_style=FontStyle.BOLD,
                 align=(Align.CENTER, Align.CENTER))
    extrude(amount=GH)

    # ── 5. Horizontal separator bar ───────────────────────────
    with BuildSketch(TOP):
        with Locations((TX, 0.0)):
            Rectangle(SEP_HW * 2, SEP_H)
    extrude(amount=GH)

    # ── 6. Corner dots / bolt circles  (4×) ──────────────────
    for sign_x, sign_y in [(-1, +1), (+1, +1), (+1, -1), (-1, -1)]:
        cx = TX   + sign_x * DOT_HX
        cy = 0.0  + sign_y * DOT_HY
        with Locations(Location((cx, cy, BH))):
            Cylinder(DOT_R, GH,
                     align=(Align.CENTER, Align.CENTER, Align.MIN))

top_part = top_bp.part
print(f"  volume = {top_part.volume:.0f} mm³")
top_path = os.path.join(HERE, "top_layer.stl")
export_stl(top_part, top_path)
print(f"  → {top_path}")

# ═══════════════════════════════════════════════════════════════
#  SUMMARY
# ═══════════════════════════════════════════════════════════════
W_TOTAL = W_R + abs(EAR_X) + EAR_R
print(f"""
✓  Done!
   Overall size   : {W_TOTAL:.0f} × {HH*2:.0f} mm
   Max height     : {BH + GH:.1f} mm
   Base height    : {BH:.1f} mm (purple)
   Green height   : {GH:.1f} mm
   Keyring hole   : ⌀{KR_R*2:.0f} mm  at  x = {EAR_X:.0f}

Files to import into slicer (same origin, stacked):
   base_layer.stl  → purple filament
   top_layer.stl   → green  filament
""")
