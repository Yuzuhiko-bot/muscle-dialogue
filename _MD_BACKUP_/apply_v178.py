import re
import os

def get_compressed_svg():
    # Re-running the extraction logic to be sure
    import xml.etree.ElementTree as ET
    
    source_file = r'C:\Users\guihi\Downloads\28490.svg'
    
    def compress_path(d, precision=1):
        def round_val(match):
            val = float(match.group())
            return f"{val:.{precision}f}".rstrip('0').rstrip('.')
        number_pattern = re.compile(r'[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?')
        d = number_pattern.sub(round_val, d)
        d = re.sub(r'\s+', ' ', d).strip()
        return d

    tree = ET.parse(source_file)
    root = tree.getroot()
    
    result_paths = []
    for path in root.findall('.//{http://www.w3.org/2000/svg}path'):
        d = path.get('d')
        transform = path.get('transform', '')
        compressed_d = compress_path(d, precision=1)
        
        path_tag = f'<path d="{compressed_d}"'
        if transform:
            path_tag += f' transform="{transform}"'
        path_tag += ' />'
        result_paths.append(path_tag)
    
    svg_html = f'<svg viewBox="0 0 2463 2771" fill="currentColor">\n'
    svg_html += '                  ' + '\n                  '.join(result_paths)
    svg_html += '\n                </svg>'
    return svg_html

if __name__ == "__main__":
    new_svg = get_compressed_svg()
    
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update Onboarding Icon
    # Looking for the current broken SVG
    onboard_pattern = re.compile(r'(<label class="radio-card"><input type="radio" name="goal" value="筋肥大" checked>\s*<span class="radio-visual">\s*)(<svg viewBox="0 0 2463 2771" fill="currentColor">.*?</svg>)', re.DOTALL)
    content = onboard_pattern.sub(fr'\1{new_svg}', content)

    # 2. Update Profile Icon
    # Looking for the Lucide-like p-goal icon
    # <label class="radio-card"><input type="radio" name="p-goal" value="筋肥大">
    #                 <span class="radio-visual">
    #                   <svg ...> ... </svg>
    profile_pattern = re.compile(r'(<label class="radio-card"><input type="radio" name="p-goal" value="筋肥大">\s*<span class="radio-visual">\s*)(<svg .*?</svg>)', re.DOTALL)
    content = profile_pattern.sub(fr'\1{new_svg}', content)

    # 3. Bump version
    content = content.replace('?v=177', '?v=178')

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("index.html updated successfully with V178 assets.")
