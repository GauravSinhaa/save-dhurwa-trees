import os
import io
import json
import urllib.request
import urllib.parse
from PIL import Image

OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'public', 'images', 'birds')
os.makedirs(OUTPUT_DIR, exist_ok=True)

HEADERS = {
    'User-Agent': 'SaveDhurwaTreesCivicApp/1.0 (https://save-dhurwa-trees.vercel.app; contact@savedhurwatrees.org)'
}

BIRD_FILES = {
    'hornbill.jpg': 'File:Indian Grey Hornbill I IMG 4051.jpg',
    'paradise_flycatcher.jpg': 'File:Indian paradise flycatcher (2018).jpg',
    'parakeet.jpg': 'File:Rose-ringed parakeet (Psittacula krameri borealis) male Jaipur.jpg',
    'barn_owl.jpg': 'File:Eastern Barn Owl - Tyto javanica, Pune, India.jpg',
    'spotted_owlet.jpg': 'File:Spotted Owlet Bokkapuram Nilgiris Sep22 A7C 02968.jpg',
    'asian_koel.jpg': 'File:Asian koel.jpg',
    'purple_sunbird.jpg': 'File:Purple Sunbird Male, Bangalore, India.jpeg',
    'tailor_bird.jpg': 'File:Common tailorbird (Orthotomus sutorius guzuratus) male Kerala.jpg',
    'black_drongo.jpg': 'File:Bdrongo-Sandeep1.jpg',
    'flying_fox.jpg': 'File:047 Indian flying fox in Keoladeo National Park Photo by Giles Laurent.jpg',
    'peafowl.jpg': 'File:Peacock on tree (52077240794).jpg',
    'coppersmith_barbet.jpg': 'File:Coppersmith Barbet (Megalaima haemacephala) by Shantanu Kuveskar.jpg',
    'alexandrine_parakeet.jpg': 'File:Alexandrine parakeet (Psittacula eupatria eupatria) male.jpg',
    'black_hooded_oriole.jpg': 'File:Black-hooded Oriole in Rabindra Sarobar January 2025 by Tisha Mukherjee 01.jpg',
    'shikra.jpg': 'File:Shikra1.jpg'
}

def get_wikimedia_url(file_title):
    api_url = f"https://commons.wikimedia.org/w/api.php?action=query&titles={urllib.parse.quote(file_title)}&prop=imageinfo&iiprop=url&iiurlwidth=800&format=json"
    req = urllib.request.Request(api_url, headers=HEADERS)
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        pages = data['query']['pages']
        for pid, p in pages.items():
            if 'imageinfo' in p:
                ii = p['imageinfo'][0]
                return ii.get('thumburl') or ii.get('url')
    return None

def download_and_optimize(filename, file_title):
    dest_path = os.path.join(OUTPUT_DIR, filename)
    print(f"Fetching URL for {filename} ({file_title})...")
    img_url = get_wikimedia_url(file_title)
    if not img_url:
        print(f"  [ERROR] Could not resolve URL for {file_title}")
        return False

    print(f"  Downloading from {img_url}...")
    req = urllib.request.Request(img_url, headers=HEADERS)
    with urllib.request.urlopen(req) as resp:
        content = resp.read()

    # Open with PIL and resize / optimize
    img = Image.open(io.BytesIO(content))
    img = img.convert('RGB')
    
    # Resize if wider than 800px
    if img.width > 800:
        ratio = 800 / img.width
        new_height = int(img.height * ratio)
        img = img.resize((800, new_height), Image.Resampling.LANCZOS)

    img.save(dest_path, format='JPEG', quality=88, optimize=True)
    size_kb = os.path.getsize(dest_path) / 1024
    print(f"  [SUCCESS] Saved {filename} ({img.width}x{img.height}, {size_kb:.1f} KB)")
    return True

def main():
    print(f"Target directory: {OUTPUT_DIR}")
    success_count = 0
    for filename, title in BIRD_FILES.items():
        if download_and_optimize(filename, title):
            success_count += 1
    print(f"\nCompleted! {success_count}/{len(BIRD_FILES)} bird photos downloaded and optimized.")

if __name__ == '__main__':
    main()
