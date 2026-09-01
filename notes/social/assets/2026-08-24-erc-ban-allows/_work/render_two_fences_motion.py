from __future__ import annotations

import math
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parent
SOURCE = ROOT / "two-fences-motion-source.png"
MP4 = ROOT / "two-fences-motion-1600x900.mp4"
GIF = ROOT / "two-fences-motion-1280x720.gif"

WIDTH = 1600
HEIGHT = 900
FPS = 30
DURATION = 6
FRAME_COUNT = FPS * DURATION

CYAN = (46, 197, 232)
AQUA = (54, 224, 194)
VIOLET = (108, 76, 241)
LAVENDER = (169, 155, 255)


def cubic(t: float, p0: float, p1: float, p2: float, p3: float) -> float:
    u = 1 - t
    return u**3 * p0 + 3 * u**2 * t * p1 + 3 * u * t**2 * p2 + t**3 * p3


def rgba_mix(a: tuple[int, int, int], b: tuple[int, int, int], t: float) -> tuple[int, int, int]:
    return tuple(round(x + (y - x) * t) for x, y in zip(a, b))


def eased_window(value: float, center: float, width: float) -> float:
    distance = min(abs(value - center), 1 - abs(value - center))
    if distance >= width:
        return 0.0
    return 0.5 + 0.5 * math.cos(math.pi * distance / width)


def make_deck(color: tuple[int, int, int], scale: float, opacity: float) -> Image.Image:
    w = max(28, round(92 * scale))
    h = max(38, round(126 * scale))
    pad = max(10, round(24 * scale))
    canvas = Image.new("RGBA", (w + pad * 2, h + pad * 2), (0, 0, 0, 0))
    glow = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    radius = max(3, round(7 * scale))
    box = (pad, pad, pad + w, pad + h)
    gd.rounded_rectangle(box, radius=radius, outline=(*color, round(180 * opacity)), width=max(1, round(3 * scale)))
    glow = glow.filter(ImageFilter.GaussianBlur(max(2, round(8 * scale))))
    canvas.alpha_composite(glow)

    d = ImageDraw.Draw(canvas)
    d.rounded_rectangle(
        box,
        radius=radius,
        fill=(*color, round(38 * opacity)),
        outline=(235, 245, 255, round(190 * opacity)),
        width=max(1, round(2 * scale)),
    )
    line_left = pad + round(13 * scale)
    line_right = pad + w - round(13 * scale)
    for index, line_width in enumerate((1.0, 0.72, 0.86)):
        y = pad + round((22 + index * 15) * scale)
        d.rounded_rectangle(
            (line_left, y, line_left + round((line_right - line_left) * line_width), y + max(2, round(4 * scale))),
            radius=max(1, round(2 * scale)),
            fill=(255, 255, 255, round((120 - index * 22) * opacity)),
        )
    chart_x = line_left
    chart_y = pad + h - round(35 * scale)
    for index, bar in enumerate((0.45, 0.75, 0.58)):
        bw = max(2, round(7 * scale))
        gap = max(2, round(4 * scale))
        bh = max(4, round(24 * scale * bar))
        x = chart_x + index * (bw + gap)
        d.rounded_rectangle((x, chart_y + round(24 * scale) - bh, x + bw, chart_y + round(24 * scale)), radius=1, fill=(*color, round(150 * opacity)))
    return canvas.rotate(-31, resample=Image.Resampling.BICUBIC, expand=True)


def add_lens_pulse(frame: Image.Image, center: tuple[int, int], size: tuple[int, int], color: tuple[int, int, int], strength: float) -> None:
    if strength <= 0.01:
        return
    w, h = size
    pad = 36
    pulse = Image.new("RGBA", (w + pad * 2, h + pad * 2), (0, 0, 0, 0))
    glow = Image.new("RGBA", pulse.size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    box = (pad, pad, pad + w, pad + h)
    gd.ellipse(box, outline=(*color, round(120 * strength)), width=max(2, round(6 * strength)))
    glow = glow.filter(ImageFilter.GaussianBlur(round(9 + 10 * strength)))
    pulse.alpha_composite(glow)
    pd = ImageDraw.Draw(pulse)
    pd.ellipse(box, outline=(*color, round(70 * strength)), width=max(1, round(2 * strength)))
    pulse = pulse.rotate(-27, resample=Image.Resampling.BICUBIC, expand=True)
    frame.alpha_composite(pulse, (round(center[0] - pulse.width / 2), round(center[1] - pulse.height / 2)))


def add_metrics(frame: Image.Image, progress: float) -> None:
    overlay = Image.new("RGBA", frame.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    inner_panel = [(1190, 66), (1534, 111), (1478, 157), (1144, 111)]
    draw.polygon(inner_panel, fill=(2, 3, 8, 172))
    draw.line(inner_panel + [inner_panel[0]], fill=(169, 155, 255, 95), width=2)

    font_small = ImageFont.truetype("/System/Library/Fonts/SFNSMono.ttf", 10)
    font_score = ImageFont.truetype("/System/Library/Fonts/SFNS.ttf", 20)
    score = round(84 + 9 * (0.5 + 0.5 * math.sin(progress * math.tau - 0.8)))
    draw.text((1205, 81), "LIVE SCORE", font=font_small, fill=(230, 232, 240, 200))
    draw.text((1458, 103), str(score), font=font_score, fill=(*AQUA, 235), anchor="mm")

    for index in range(7):
        wave = math.sin(progress * math.tau + index * 0.82)
        bar_height = 16 + round((0.5 + 0.5 * wave) * 38)
        x = 1212 + index * 38
        baseline = 133 + index * 5
        color = rgba_mix(VIOLET, AQUA, index / 6)
        polygon = [(x, baseline), (x + 24, baseline + 4), (x + 24, baseline - bar_height + 4), (x, baseline - bar_height)]
        glow = Image.new("RGBA", frame.size, (0, 0, 0, 0))
        gdraw = ImageDraw.Draw(glow)
        gdraw.polygon(polygon, fill=(*color, 150))
        glow = glow.filter(ImageFilter.GaussianBlur(7))
        overlay.alpha_composite(glow)
        draw.polygon(polygon, fill=(*color, 225), outline=(235, 245, 255, 145))
    frame.alpha_composite(overlay)


def render_frame(base: Image.Image, frame_number: int) -> Image.Image:
    progress = frame_number / FRAME_COUNT
    frame = base.copy()

    for index in range(12):
        t = (progress + index / 12) % 1
        x = cubic(t, 400, 770, 1180, 1455)
        y = cubic(t, 960, 875, 390, 160)
        scale = 1.18 - 0.76 * t
        fade_in = min(1.0, t / 0.08)
        fade_out = min(1.0, (1 - t) / 0.13)
        opacity = max(0.0, min(fade_in, fade_out)) * 0.9
        color = rgba_mix(CYAN, LAVENDER, min(1.0, max(0.0, (t - 0.36) / 0.35)))
        deck = make_deck(color, scale, opacity)
        frame.alpha_composite(deck, (round(x - deck.width / 2), round(y - deck.height / 2)))

    cyan_strength = sum(eased_window((progress + index / 12) % 1, 0.42, 0.035) for index in range(12))
    violet_strength = sum(eased_window((progress + index / 12) % 1, 0.66, 0.035) for index in range(12))
    add_lens_pulse(frame, (1020, 710), (250, 315), CYAN, min(0.82, cyan_strength))
    add_lens_pulse(frame, (1210, 442), (225, 285), LAVENDER, min(0.82, violet_strength))
    add_metrics(frame, progress)

    sweep_x = round(-260 + ((progress * 1.0) % 1) * 2100)
    sweep = Image.new("RGBA", frame.size, (0, 0, 0, 0))
    sd = ImageDraw.Draw(sweep)
    sd.polygon([(sweep_x, 0), (sweep_x + 60, 0), (sweep_x - 260, HEIGHT), (sweep_x - 330, HEIGHT)], fill=(255, 255, 255, 13))
    sweep = sweep.filter(ImageFilter.GaussianBlur(16))
    frame.alpha_composite(sweep)
    return frame.convert("RGB")


def main() -> None:
    source = Image.open(SOURCE).convert("RGBA")
    base = source.resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS)
    command = [
        "ffmpeg", "-y", "-loglevel", "error",
        "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{WIDTH}x{HEIGHT}", "-r", str(FPS), "-i", "-",
        "-an", "-c:v", "libx264", "-preset", "slow", "-crf", "16", "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(MP4),
    ]
    process = subprocess.Popen(command, stdin=subprocess.PIPE)
    assert process.stdin is not None
    for frame_number in range(FRAME_COUNT):
        process.stdin.write(render_frame(base, frame_number).tobytes())
        if frame_number % FPS == 0:
            print(f"Rendered {frame_number // FPS + 1}/{DURATION}s", flush=True)
    process.stdin.close()
    if process.wait() != 0:
        raise RuntimeError("FFmpeg MP4 encoding failed")

    gif_filter = (
        "fps=15,scale=1280:-1:flags=lanczos,split[s0][s1];"
        "[s0]palettegen=max_colors=160:stats_mode=diff[p];"
        "[s1][p]paletteuse=dither=sierra2_4a:diff_mode=rectangle"
    )
    subprocess.run([
        "ffmpeg", "-y", "-loglevel", "error", "-i", str(MP4),
        "-filter_complex", gif_filter, "-loop", "0", str(GIF),
    ], check=True)
    print(MP4)
    print(GIF)


if __name__ == "__main__":
    main()
