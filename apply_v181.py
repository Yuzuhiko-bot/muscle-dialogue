import re
import os

def apply_final_v181():
    # Final optimized SVG code with baked-in coordinates (no transform) and centering.
    # Coordinates were manually adjusted based on the bounds analysis.
    bicep_svg = """<svg viewBox="-5 -5 100 110" fill="currentColor">
                  <path d="M42.4 0.6 C43.1 0.6 43.7 0.7 44.4 0.7 C45.5 0.7 45.5 0.7 46.6 0.8 C56.9 1.2 68.1 4.1 75.4 11.7 C80.5 18.6 82.1 28 84 36.3 C84.2 37.3 84.5 38.2 84.7 39.3 C87.2 50.1 89.5 60.8 89.7 71.9 C89.8 73 89.8 73 89.8 74.2 C89.7 79.4 88.2 82.1 84.6 85.8 C71.9 97.6 56.6 101.6 39.8 101.5 C38.6 101.5 37.5 101.5 36.3 101.5 C32.7 101.5 29.1 101.4 25.4 101.4 C23 101.4 20.5 101.4 18 101.4 C12 101.4 6 101.3 0 101.3 C-0.1 95.3 -0.1 89.4 -0.2 83.5 C-0.2 81.4 -0.2 79.4 -0.2 77.4 C-0.3 74.5 -0.3 71.6 -0.3 68.7 C-0.3 67.8 -0.3 66.8 -0.3 65.9 C-0.3 65.1 -0.3 64.2 -0.3 63.4 C-0.4 62.6 -0.4 61.9 -0.4 61.1 C-0.3 60.5 -0.1 59.9 0 59.3 C3.7 56.8 5.6 56.8 10 57.3 C12.8 59.8 12.8 59.8 15 62.3 C17.7 62.3 18.3 61.3 20.2 59.4 C25.4 54.9 30.8 53.9 37.5 54 C43.3 54.6 49.1 56 54 59.3 C56.1 57.1 56 53.1 56.5 50.3 C56.7 49.5 56.8 48.7 57 48 C57.9 42.7 58.3 37.7 58 32.3 C55 32.3 55 32.3 52 32.6 C46.5 32.2 42.7 30 38 27.3 C37.3 26.9 36.6 26.5 35.8 26 C33 24.2 31.2 22.8 29.9 19.6 C30.2 11.3 32.5 0.7 42.4 0.6 Z M40 7.3 C39.5 8.3 39 9.4 38.4 10.5 C38.1 11.1 37.8 11.7 37.5 12.3 C36.8 15.1 37 16.6 38 19.3 C40.3 21.3 40.3 21.3 43.3 22.7 C44.2 23.2 45.2 23.7 46.1 24.2 C49 25.3 50.9 25.6 54 25.3 C54.5 24.8 54.5 24.8 55 24.3 C60.4 23.8 60.4 23.8 62.6 25.5 C66.5 30.6 65.1 38.4 64.3 44.4 C63.8 48.1 63.2 51.7 62.6 55.4 C62.3 57 62.1 58.5 61.8 60.1 C61.2 63.8 60.6 67.5 60 71.3 C58 71.7 58 71.7 56 72.3 C55.5 71.4 54.9 70.5 54.4 69.5 C51.8 65.7 48.6 63.1 44.2 61.7 C38.3 60.6 32.2 60.6 26.5 62.5 C21.8 65.9 19.4 70.1 17 75.3 C15.7 75.3 14.4 75.3 13 75.3 C12.7 74.6 12.5 73.9 12.2 73.1 C11.9 72.2 11.5 71.3 11.2 70.3 C10.8 69.4 10.5 68.5 10.1 67.6 C9.1 64.9 9.1 64.9 6 64.3 C6 74.5 6 84.7 6 95.3 C11.3 95.4 16.5 95.4 21.7 95.5 C23.5 95.5 25.3 95.5 27.1 95.5 C46.2 95.8 64.6 94.6 79.8 81.5 C83.3 77.5 83.4 74.7 83.2 69.5 C82.7 63.3 81.5 57.2 80.3 51.1 C80.2 50.5 80 49.8 79.9 49.1 C77.1 29.3 77.1 29.3 67 13.3 C63.9 11.7 63.9 11.7 60.5 10.5 C59.4 10.1 58.3 9.7 57.2 9.3 C52.7 7.9 48.8 7.1 44.2 7.2 C43.4 7.2 42.6 7.2 41.8 7.3 C40.9 7.3 40.9 7.3 40 7.3 Z" />
                  <path d="M48.4 38.4 C53.6 42.7 58.9 47.1 63.4 52.3 C63.4 52.9 63.4 53.6 63.4 54.3 C58.8 52.9 54.7 51 50.5 48.7 C49.3 48.1 48.2 47.5 47 46.8 C46.1 46.4 45.3 45.9 44.3 45.4 C45.4 42.5 46.1 40.6 48.4 38.4 Z" />
                  <path d="M65.4 29.4 C66.7 35.9 68 42.5 69.4 49.3 C68.4 49.3 67.4 49.3 66.4 49.3 C64.9 46.7 63.4 44.1 61.9 41.4 C61.3 40.3 61.3 40.3 60.6 39.2 C60.2 38.5 59.8 37.8 59.4 37.1 C59.0 36.4 58.6 35.7 58.2 35.0 C57.4 33.3 57.4 33.3 57.4 31.3 C63.2 29.3 63.2 29.3 65.4 29.4 Z" />
                  <path d="M75.4 28.4 C78 28.7 80.6 29.1 83.3 29.4 C82.6 33.8 81 37.7 79.2 41.7 C78.9 42.4 78.6 43.1 78.3 43.7 C77.6 45.3 76.9 46.9 76.3 48.5 C75.3 48.5 74.3 48.5 73.3 48.5 C74 42.1 74.7 35.5 75.4 28.4 Z" />
                </svg>"""

    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # Use a more flexible regex to find whatever SVG was left there
    onboard_pattern = re.compile(r'(<label class="radio-card"><input type="radio" name="goal" value="筋肥大" checked>\s*<span class="radio-visual">\s*)(<svg.*?</svg>)', re.DOTALL)
    content = onboard_pattern.sub(fr'\1{bicep_svg}', content)

    profile_pattern = re.compile(r'(<label class="radio-card"><input type="radio" name="p-goal" value="筋肥大">\s*<span class="radio-visual">\s*)(<svg.*?</svg>)', re.DOTALL)
    content = profile_pattern.sub(fr'\1{bicep_svg}', content)

    # Bump version
    content = content.replace('?v=180', '?v=181')

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)

    # Update app.js
    with open('app.js', 'r', encoding='utf-8') as f:
        app_js = f.read()
    app_js = app_js.replace("const APP_VERSION = 'v180';", "const APP_VERSION = 'v181';")
    with open('app.js', 'w', encoding='utf-8') as f:
        f.write(app_js)

    # Update sw.js
    with open('sw.js', 'r', encoding='utf-8') as f:
        sw_js = f.read()
    sw_js = sw_js.replace("muscle-dialogue-v180", "muscle-dialogue-v181")
    sw_js = sw_js.replace("?v=180", "?v=181")
    with open('sw.js', 'w', encoding='utf-8') as f:
        f.write(sw_js)

    print("Success: Applied V181 updates locally.")

if __name__ == "__main__":
    apply_final_v181()
