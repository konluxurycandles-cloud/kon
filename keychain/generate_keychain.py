#!/usr/bin/env python3
"""
ABO / AL / JEME  –  Hexagon Keychain Generator  (v2)
=====================================================
Solid hexagon base, geometric wireframe frame, three embossed text lines.

Output (written next to this script):
  base_layer.stl  — flat hexagon base              (Color 1 / purple)
  text_layer.stl  — frame + lines + text + keyring (Color 2 / green)

Dimensions:
  Width  ≈ 65 mm  (flat-to-flat)
  Height ≈ 75 mm  (vertex-to-vertex, not counting keyring)
  Max Z  = 4.5 mm (3 mm base + 1.5 mm raised)
"""

import math, os
from build123d import *

HERE = os.path.dirname(os.path.abspath(__file__))

# ═══════════════════════════════════════════════
#  PARAMETERS
# ═══════════════════════════════════════════════
R        = 37.5    # hex circumradius → flat-to-flat ≈ 65 mm, height ≈ 75 mm
FRAME_W  = 2.5     # frame border thickness (uniform on all six sides)
BASE_H   = 3.0     # base plate thickness
RAISE_H  = 1.5     # raised feature height
TOTAL_H  = BASE_H + RAISE_H            # 4.5 mm

# Inner hex: uniform FRAME_W offset on all sides
R_IN = R - FRAME_W * 2 / math.sqrt(3) # ≈ 34.61 mm

BRACKET_LEN = 7.0  # corner bracket bar length (mm)
BAR_W       = 1.5  # bar / separator width (mm)
SEP_W       = 52.0 # horizontal separator width (mm)

FONT_SZ  = 9.0     # text cap-height
DOT_R    = 1.0     # decorative dot radius (⌀ 2 mm)

KR_OD    = 10.0    # keyring outer diameter
KR_ID    =  6.0    # keyring hole diameter
KR_CY    = R + KR_OD / 2 - 2.0   # keyring centre y = 40.5 mm

# ═══════════════════════════════════════════════
#  GEOMETRY HELPERS
# ═══════════════════════════════════════════════

def hex_verts(r, start_angle=90):
    """Six (x, y) vertices of a regular hexagon, pointy-top."""
    return [
        (r * math.cos(math.radians(start_angle + i * 60)),
         r * math.sin(math.radians(start_angle + i * 60)))
        for i in range(6)
    ]

outer_v = hex_verts(R)      # outer boundary (6 pts)
inner_v = hex_verts(R_IN)   # inner boundary for frame ring

def make_bar(cx, cy, angle_rad, length, width, z_bottom):
    """Return a Plane centred at (cx,cy,z_bottom), x-axis along angle_rad."""
    return Plane(
        origin = Vector(cx, cy, z_bottom),
        x_dir  = Vector(math.cos(angle_rad), math.sin(angle_rad), 0),
        z_dir  = Vector(0, 0, 1),
    )

# ═══════════════════════════════════════════════
#  BASE LAYER  —  flat hexagon
# ═══════════════════════════════════════════════
print("Building base_layer …")

with BuildPart() as base_bp:
    with BuildSketch():
        with BuildLine():
            Polyline(*outer_v, close=True)
        make_face()
    extrude(amount=BASE_H)

base_part = base_bp.part
print(f"  volume: {base_part.volume:.0f} mm³")

# ═══════════════════════════════════════════════
#  TEXT LAYER  —  frame + decoration + text + keyring
# ═══════════════════════════════════════════════
print("Building text_layer …")

with BuildPart() as text_bp:

    # ── 1. Outer frame ring (uniform FRAME_W on all sides) ──────
    with BuildSketch(Plane.XY.offset(BASE_H)):
        with BuildLine():
            Polyline(*outer_v, close=True)
        make_face()
    extrude(amount=RAISE_H)

    with BuildSketch(Plane.XY.offset(BASE_H)):
        with BuildLine():
            Polyline(*inner_v, close=True)
        make_face()
    extrude(amount=RAISE_H, mode=Mode.SUBTRACT)

    # ── 2. Corner bracket marks ─────────────────────────────────
    # At each inner hex vertex: two short bars along the two adjacent sides
    for i in range(6):
        vx, vy = inner_v[i]
        for step in (-1, +1):
            nx, ny = inner_v[(i + step) % 6]
            dx, dy = nx - vx, ny - vy
            dist   = math.hypot(dx, dy)
            dx    /= dist;  dy /= dist       # unit vector along side
            ar     = math.atan2(dy, dx)
            # bar centre: start at vertex, advance half-length inward
            bcx    = vx + dx * BRACKET_LEN / 2
            bcy    = vy + dy * BRACKET_LEN / 2
            with BuildSketch(make_bar(bcx, bcy, ar, BRACKET_LEN, BAR_W, BASE_H)):
                RectangleRounded(BRACKET_LEN, BAR_W, BAR_W * 0.2)
            extrude(amount=RAISE_H)

    # ── 3. Horizontal separators above / below the text block ───
    # (gives a "panel" look around the text)
    for sep_y in (+18.5, -18.5):
        with BuildSketch(Plane.XY.offset(BASE_H)):
            with Locations((0, sep_y)):
                RectangleRounded(SEP_W, BAR_W, BAR_W * 0.3)
        extrude(amount=RAISE_H)

    # Two short vertical side bars flanking the text block
    for vbar_x in (+26.0, -26.0):
        with BuildSketch(Plane.XY.offset(BASE_H)):
            with Locations((vbar_x, 0)):
                RectangleRounded(BAR_W, 34.0, BAR_W * 0.3)
        extrude(amount=RAISE_H)

    # ── 4. Three text lines ─────────────────────────────────────
    # Vertical centres chosen so all three lines sit within the
    # horizontal separators and are clearly separated from each other.
    TEXT_ROWS = [
        ("ABO",  12.0),   # top line
        ("AL",    0.0),   # middle line
        ("JEME", -12.0),  # bottom line
    ]
    for (label, ty) in TEXT_ROWS:
        with BuildSketch(Plane.XY.offset(BASE_H)):
            with Locations((0, ty)):
                Text(
                    label,
                    font_size  = FONT_SZ,
                    font_style = FontStyle.BOLD,
                    align      = (Align.CENTER, Align.CENTER),
                )
        extrude(amount=RAISE_H)

    # ── 5. Decorative dots at inner frame corner positions ───────
    for (dx, dy) in inner_v:
        with Locations(Location((dx, dy, BASE_H))):
            Cylinder(DOT_R, RAISE_H,
                     align=(Align.CENTER, Align.CENTER, Align.MIN))

    # ── 6. Keyring loop ─────────────────────────────────────────
    with Locations(Location((0.0, KR_CY, 0.0))):
        Cylinder(KR_OD / 2, TOTAL_H,
                 align=(Align.CENTER, Align.CENTER, Align.MIN))
    with Locations(Location((0.0, KR_CY, -0.5))):
        Cylinder(KR_ID / 2, TOTAL_H + 1.0,
                 mode=Mode.SUBTRACT,
                 align=(Align.CENTER, Align.CENTER, Align.MIN))

text_part = text_bp.part
print(f"  volume: {text_part.volume:.0f} mm³")

# ═══════════════════════════════════════════════
#  EXPORT
# ═══════════════════════════════════════════════
base_stl = os.path.join(HERE, "base_layer.stl")
text_stl = os.path.join(HERE, "text_layer.stl")

print(f"\nExporting {base_stl} …")
export_stl(base_part, base_stl)

print(f"Exporting {text_stl} …")
export_stl(text_part, text_stl)

W = R * math.sqrt(3)
print(f"\n✓  Done!")
print(f"   Hex width  (flat-to-flat) : {W:.1f} mm")
print(f"   Hex height (vertex-vertex): {R*2:.1f} mm")
print(f"   Total height (+ keyring)  : {KR_CY + KR_OD/2:.1f} mm")
print(f"   Max Z                     : {TOTAL_H:.1f} mm")
print(f"   Frame wall thickness      : {FRAME_W:.1f} mm (uniform)")
