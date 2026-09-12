"""Generate mobile homepage covers. Run with Python and Pillow after adding works."""
import hashlib
import json
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote

from PIL import Image, ImageOps, ImageFilter, ImageChops

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets' / 'space-previews'


class Covers(HTMLParser):
    def __init__(self):
        super().__init__()
        self.sources = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'img' and attrs.get('src'):
            self.sources.append(attrs['src'])


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    manifest, reflections = {}, {}
    original_pixels = preview_pixels = 0
    for gallery in sorted((ROOT / 'pages/gallery').glob('gallery-*.html')):
        parser = Covers()
        parser.feed(gallery.read_text(encoding='utf-8'))
        for src in parser.sources:
            source = (gallery.parent / unquote(src)).resolve()
            key = source.relative_to(ROOT).as_posix()
            if key in manifest:
                continue
            name = hashlib.sha256(key.encode()).hexdigest()[:16] + '.webp'
            with Image.open(source) as original:
                image = ImageOps.exif_transpose(original).convert('RGB')
                original_pixels += image.width * image.height
                image.thumbnail((960, 1200), Image.Resampling.LANCZOS)
                preview_pixels += image.width * image.height
                image.save(OUT / name, 'WEBP', quality=87, method=6)
                # Match the CSS cover crop, padding, blur and floor fade offline.
                reflection = Image.new('RGBA', (460, 650))
                reflection.paste(ImageOps.fit(image, (442, 546), Image.Resampling.LANCZOS), (9, 9))
                reflection = reflection.filter(ImageFilter.GaussianBlur(2.5))
                stops = [(0, 0), (.32, 0), (.65, 51), (.9, 187), (1, 255)]
                alpha = []
                for y in range(650):
                    t = y / 649
                    for (a, low), (b, high) in zip(stops, stops[1:]):
                        if a <= t <= b:
                            alpha.append(round(low + (high - low) * (t - a) / (b - a)))
                            break
                mask = Image.new('L', (1, 650))
                mask.putdata(alpha)
                reflection.putalpha(ImageChops.multiply(reflection.getchannel('A'), mask.resize((460, 650))))
                reflection_name = name.replace('.webp', '-reflection.webp')
                reflection.save(OUT / reflection_name, 'WEBP', quality=80, method=6)
            manifest[key] = 'assets/space-previews/' + name
            reflections[manifest[key]] = 'assets/space-previews/' + reflection_name
    (OUT / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    (OUT / 'reflections.json').write_text(json.dumps(reflections, indent=2) + '\n', encoding='utf-8')
    print(f'{len(manifest)} covers; decoded pixels {original_pixels:,} -> {preview_pixels:,}')


if __name__ == '__main__':
    main()
