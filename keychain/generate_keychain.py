#!/usr/bin/env python3
"""
ABO ALJEME Star Keychain - STL Generator
=========================================
Star-of-David shaped two-color 3D-printable keychain.

Output files (written next to this script):
  base_layer.stl  — star base plate + geometric crossing lines  (Color 1)
  text_layer.stl  — frame border + text + dots + keyring loop   (Color 2)

Both parts align at the same origin; load them together in your slicer
and assign different extruders/colors.

Dimensions (approximate):
  Width:  ~65 mm   Height: ~75 mm (star body ~75 mm, +keyring loop above)
  Total Z: 4.5 mm  (3 mm base + 1.5 mm raised features)
"""

import math
import os
from build123d import *

HERE = os.path.dirname(os.path.abspath(__file__))

# ─────────────────────────────────────────────
#  PARAMETERS  (all millimetres)
# ─────────────────────────────────────────────
R_OUT   = 37.5          # outer-tip circumradius  → star width ≈ 65 mm
R_IN    = R_OUT / math.sqrt(3)   # inner-notch radius ≈ 21.65 mm

BASE_H  = 3.0           # base plate thickness
RAISE_H = 1.5           # raised-feature height above base
TOTAL_H = BASE_H + RAISE_H      # max part height = 4.5 mm

# Frame border: scaled inward so the thinnest wall ≥ 1.5 mm
# At inner notches the wall = R_IN × (1 - frame_scale); at outer tips it's larger.
FRAME_SCALE = 1.0 - 1.55 / R_IN   # ≈ 0.928  → ~1.55 mm at inner notch

LINE_W  = 1.5           # crossing-line width
FONT_SZ = 7.5           # text cap-height

DOT_R   = 0.75          # decorative dot radius (⌀ 1.5 mm)
DOT_H   = RAISE_H       # dot height

KR_OD   = 10.0          # keyring outer ⌀
KR_ID   =  6.0          # keyring inner hole ⌀
# Keyring centre: sit 2 mm above star top so it overlaps frame for strength
KR_CY   = R_OUT + KR_OD / 2 - 2.0    # = 40.5 mm

# ─────────────────────────────────────────────
#  HELPER FUNCTIONS
# ─────────────────────────────────────────────

def star_pts(ro: float, ri: float, n: int = 6):
    """Return 2n (x, y) tuples for a star polygon, outer tips at ±90° start."""
    pts = []
    for i in range(n * 2):
        a = math.radians(90.0 - i * (180.0 / n))
        r = ro if i % 2 == 0 else ri
        pts.append((r * math.cos(a), r * math.sin(a)))
    return pts


def tri_sides(start_deg: float):
    """Return 3 line segments (p1, p2) for one equilateral triangle of the star."""
    tips = [
        (R_OUT * math.cos(math.radians(a)), R_OUT * math.sin(math.radians(a)))
        for a in [start_deg, start_deg + 120, start_deg + 240]
    ]
    return [(tips[i], tips[(i + 1) % 3]) for i in range(3)]


# ─────────────────────────────────────────────
#  GEOMETRY DATA
# ─────────────────────────────────────────────

outer_pts  = star_pts(R_OUT, R_IN)                          # 12 outer vertices
inner_pts  = [(x * FRAME_SCALE, y * FRAME_SCALE)            # scaled-inward ring
              for x, y in outer_pts]

cross_segs = tri_sides(90) + tri_sides(30)                  # 6 crossing lines

# Six decorative dots at 60 % of inner-notch radius, at hexagon angles
dot_positions = [
    (R_IN * 0.62 * math.cos(math.radians(a)),
     R_IN * 0.62 * math.sin(math.radians(a)))
    for a in [0, 60, 120, 180, 240, 300]
]

# ─────────────────────────────────────────────
#  PART 1 — BASE LAYER
#  Contents: star base plate + crossing lines
# ─────────────────────────────────────────────
print("Building base_layer …")

with BuildPart() as base_bp:

    # ── Star base plate (z = 0 … BASE_H) ──────────────────────
    with BuildSketch():
        with BuildLine():
            Polyline(*outer_pts, close=True)
        make_face()
    extrude(amount=BASE_H)

    # ── Crossing lines (z = BASE_H … TOTAL_H) ─────────────────
    for (p1, p2) in cross_segs:
        cx = (p1[0] + p2[0]) / 2
        cy = (p1[1] + p2[1]) / 2
        L  = math.hypot(p2[0] - p1[0], p2[1] - p1[1])
        ar = math.atan2(p2[1] - p1[1], p2[0] - p1[0])

        line_plane = Plane(
            origin = Vector(cx, cy, BASE_H),
            x_dir  = Vector(math.cos(ar), math.sin(ar), 0.0),
            z_dir  = Vector(0.0, 0.0, 1.0),
        )
        with BuildSketch(line_plane):
            RectangleRounded(L, LINE_W, LINE_W * 0.15)
        extrude(amount=RAISE_H)

base_part = base_bp.part
print(f"  solids: {len(base_part.solids())}  volume: {base_part.volume:.0f} mm³")


# ─────────────────────────────────────────────
#  PART 2 — TEXT LAYER
#  Contents: frame border + "ABO ALJEME" text + dots + keyring
# ─────────────────────────────────────────────
print("Building text_layer …")

with BuildPart() as text_bp:

    # ── Frame border ring (z = BASE_H … TOTAL_H) ──────────────
    # Outer star slab
    with BuildSketch(Plane.XY.offset(BASE_H)):
        with BuildLine():
            Polyline(*outer_pts, close=True)
        make_face()
    extrude(amount=RAISE_H)

    # Hollow out interior → ring
    with BuildSketch(Plane.XY.offset(BASE_H)):
        with BuildLine():
            Polyline(*inner_pts, close=True)
        make_face()
    extrude(amount=RAISE_H, mode=Mode.SUBTRACT)

    # ── Text "ABO"  (upper line) ───────────────────────────────
    with BuildSketch(Plane.XY.offset(BASE_H)):
        with Locations((0, 7.0)):
            Text(
                "ABO",
                font_size   = FONT_SZ,
                font_style  = FontStyle.BOLD,
                align       = (Align.CENTER, Align.CENTER),
            )
    extrude(amount=RAISE_H)

    # ── Text "ALJEME"  (lower line) ────────────────────────────
    with BuildSketch(Plane.XY.offset(BASE_H)):
        with Locations((0, -5.5)):
            Text(
                "ALJEME",
                font_size   = FONT_SZ,
                font_style  = FontStyle.BOLD,
                align       = (Align.CENTER, Align.CENTER),
            )
    extrude(amount=RAISE_H)

    # ── Decorative dots  (z = BASE_H … TOTAL_H) ───────────────
    for (dx, dy) in dot_positions:
        with Locations(Location((dx, dy, BASE_H))):
            Cylinder(
                DOT_R, DOT_H,
                align = (Align.CENTER, Align.CENTER, Align.MIN),
            )

    # ── Keyring loop ───────────────────────────────────────────
    # Solid ring cylinder (z = 0 … TOTAL_H) — outer material
    with Locations(Location((0.0, KR_CY, 0.0))):
        Cylinder(
            KR_OD / 2, TOTAL_H,
            align = (Align.CENTER, Align.CENTER, Align.MIN),
        )
    # Subtract the through-hole (extend ±0.5 mm to ensure clean cut)
    with Locations(Location((0.0, KR_CY, -0.5))):
        Cylinder(
            KR_ID / 2, TOTAL_H + 1.0,
            mode  = Mode.SUBTRACT,
            align = (Align.CENTER, Align.CENTER, Align.MIN),
        )

    # ── Neck / bridge: fills the gap between star-tip and ring bottom ──
    # The ring overlaps the star frame (frame outer tip at y=37.5,
    # ring bottom at y=35.5), so they are already connected.  A small
    # neck below the ring reinforces the joint.
    neck_half_w = (KR_OD - KR_ID) / 2 - 0.2   # ≈ 1.8 mm half-width
    neck_top    = KR_CY - KR_OD / 2            # = 35.5 mm (ring bottom)
    neck_bot    = R_OUT - 1.5                   # = 36.0 mm (inside star tip)
    if neck_top < neck_bot:
        neck_h = neck_bot - neck_top
        neck_cy = (neck_top + neck_bot) / 2
        with BuildSketch(Plane.XY.offset(0.0)):
            with Locations((0.0, neck_cy)):
                Rectangle(neck_half_w * 2, neck_h)
        extrude(amount=TOTAL_H)

text_part = text_bp.part
print(f"  solids: {len(text_part.solids())}  volume: {text_part.volume:.0f} mm³")


# ─────────────────────────────────────────────
#  EXPORT
# ─────────────────────────────────────────────
base_stl = os.path.join(HERE, "base_layer.stl")
text_stl = os.path.join(HERE, "text_layer.stl")

print(f"\nExporting {base_stl} …")
export_stl(base_part, base_stl)

print(f"Exporting {text_stl} …")
export_stl(text_part, text_stl)

print("\n✓  Done!")
print(f"   Star width   : {R_OUT * math.sqrt(3):.1f} mm")
print(f"   Star height  : {R_OUT * 2:.1f} mm  (body only)")
print(f"   Total height : {KR_CY + KR_OD / 2:.1f} mm  (incl. keyring)")
print(f"   Max Z        : {TOTAL_H:.1f} mm")
print(f"   Frame wall   : outer tips ~{R_OUT*(1-FRAME_SCALE):.1f} mm, "
      f"inner notch ~{R_IN*(1-FRAME_SCALE):.1f} mm")
