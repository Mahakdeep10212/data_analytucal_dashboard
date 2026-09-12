import urllib.request
import os

logos = {
    "hul.png": [
        "https://logo.clearbit.com/unilever.com",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Unilever_logo.svg/200px-Unilever_logo.svg.png"
    ],
    "itc.png": [
        "https://logo.clearbit.com/itcportal.com",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/ITC_Limited_Logo.svg/200px-ITC_Limited_Logo.svg.png"
    ],
    "nestle.png": [
        "https://logo.clearbit.com/nestle.com",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Nestl%C3%A9.svg/200px-Nestl%C3%A9.svg.png"
    ],
    "britannia.png": [
        "https://logo.clearbit.com/britannia.co.in",
        "https://upload.wikimedia.org/wikipedia/en/a/af/Britannia_logo.png"
    ],
    "tata.png": [
        "https://logo.clearbit.com/tataconsumer.com",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Tata_logo.svg/200px-Tata_logo.svg.png"
    ]
}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
output_dir = "dashboard"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

print("--------------------------------------------------")
print("Downloading Official Company Logos for Dashboard...")
print("--------------------------------------------------")

for name, urls in logos.items():
    filepath = os.path.join(output_dir, name)
    downloaded = False
    for url in urls:
        try:
            print(f"Trying to download {name} from {url}...")
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req) as response:
                with open(filepath, "wb") as f:
                    f.write(response.read())
            print(f"Success! Saved to {filepath}\n")
            downloaded = True
            break
        except Exception as e:
            print(f"Failed: {e}")
    if not downloaded:
        print(f"CRITICAL: Could not download {name} from any source.\n")

print("--------------------------------------------------")
print("Finished logo downloads.")
print("--------------------------------------------------")
