import re

def apply_v182_fixes():
    # V182: Clean Lucide-style bicep with 3 accent lines at the peak, shifted appropriately.
    # We use viewBox="0 0 24 24" to match other icons.
    # We apply filter: drop-shadow to match the shadow reported missing.
    
    bicep_svg = (
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" '
        'stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 1px 1px rgba(0,0,0,0.2));">'
        '<!-- Bicep Outline -->'
        '<path d="M12.409 13.017A5 5 0 0 1 22 15c0 3.866-4 7-9 7c-4.077 0-8.153-.82-10.371-2.462c-.426-.316-.631-.832-.62-1.362C2.118 12.723 2.627 2 10 2a3 3 0 0 1 3 3a2 2 0 0 1-2 2c-1.105 0-1.64-.444-2-1" />'
        '<path d="M15 14a5 5 0 0 0-7.584 2" />'
        '<path d="M9.964 6.825C8.019 7.977 9.5 13 8 15" />'
        '<!-- Accent Power Lines (Impact Marks at peak) -->'
        '<path d="M6 5 L4 3" />'
        '<path d="M10 4 L10 1" />'
        '<path d="M14 5 L16 3" />'
        '</svg>'
    )

    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # Update Onboarding
    onboard_pattern = re.compile(r'(<label class="radio-card"><input type="radio" name="goal" value="筋肥大" checked>\s*<span class="radio-visual">\s*)(<svg.*?</svg>)', re.DOTALL)
    content = onboard_pattern.sub(fr'\1{bicep_svg}', content)

    # Update Profile
    profile_pattern = re.compile(r'(<label class="radio-card"><input type="radio" name="p-goal" value="筋肥大">\s*<span class="radio-visual">\s*)(<svg.*?</svg>)', re.DOTALL)
    content = profile_pattern.sub(fr'\1{bicep_svg}', content)

    # Bump version to V182
    content = content.replace('?v=181', '?v=182')

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)

    # Update app.js
    with open('app.js', 'r', encoding='utf-8') as f:
        app_js = f.read()
    app_js = app_js.replace("const APP_VERSION = 'v181';", "const APP_VERSION = 'v182';")
    with open('app.js', 'w', encoding='utf-8') as f:
        f.write(app_js)

    # Update sw.js
    with open('sw.js', 'r', encoding='utf-8') as f:
        sw_js = f.read()
    sw_js = sw_js.replace("muscle-dialogue-v181", "muscle-dialogue-v182")
    sw_js = sw_js.replace("?v=181", "?v=182")
    with open('sw.js', 'w', encoding='utf-8') as f:
        f.write(sw_js)

    print("Success: Applied V182 Design consistency fix.")

if __name__ == "__main__":
    apply_v182_fixes()
