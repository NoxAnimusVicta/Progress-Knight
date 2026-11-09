"""Build the mobile artwork sheet from a local Remastered 1.9.1 Android package."""
import argparse
import io
import json
import re
import zipfile
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parent
parser = argparse.ArgumentParser()
parser.add_argument("apk", type=Path)
args = parser.parse_args()
source = (root / "balance.js").read_text(encoding="utf-8-sig")
def read_const(name):
    start = source.index("const " + name + " = ") + len("const " + name + " = ")
    return json.JSONDecoder().raw_decode(source[start:])[0]

tiles = {tile: key for key, tile in read_const("artIndex").items()}
for name, record in read_const("entries").items():
    group = record["group"]
    kind = "properties" if group == "Properties" else "misc" if group == "Misc" else "jobs" if "income" in record else "skills"
    slug = re.sub("[^a-z]", "", name.lower()).replace("cottage", "cotage")
    tiles[record["tile"]] = f"icons_{kind}_{slug}"
atlas = Image.new("RGB", (960, 96 * read_const("atlasRows")), "#120f16")
with zipfile.ZipFile(args.apk) as archive:
    for tile, key in tiles.items():
        path = f"res/drawable-mdpi-v4/assets_{key}.png"
        image = Image.open(io.BytesIO(archive.read(path))).convert("RGBA")
        image.thumbnail((96, 96), Image.Resampling.LANCZOS)
        x = tile % 10 * 96 + (96 - image.width) // 2
        y = tile // 10 * 96 + (96 - image.height) // 2
        atlas.paste(image, (x, y), image)
atlas.save(root / "remastered-art.jpg", quality=85)
