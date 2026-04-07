import re
import os

def get_processed_svg_v3():
    import xml.etree.ElementTree as ET
    
    # ユーザーが用意してくれた新しいファイル
    source_file = r'C:\Users\guihi\Downloads\28490 (1).svg'
    
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
    # findall doesn't handle default namespaces well without a map, 
    # but since there's no prefix in the file, we look for all path tags.
    for path in root.iter('{http://www.w3.org/2000/svg}path'):
        d = path.get('d')
        transform = path.get('transform', '')
        compressed_d = compress_path(d, precision=1)
        
        # fill is now currentColor
        path_tag = f'<path d="{compressed_d}" fill="currentColor"'
        if transform:
            path_tag += f' transform="{transform}"'
        path_tag += ' />'
        result_paths.append(path_tag)
    
    # Use 0 0 89 100 as per the file's width/height
    svg_html = f'<svg viewBox="0 0 89 100" fill="currentColor">\n'
    svg_html += '                  ' + '\n                  '.join(result_paths)
    svg_html += '\n                </svg>'
    return svg_html

if __name__ == "__main__":
    new_svg = get_processed_svg_v3()
    
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update Onboarding Icon
    onboard_pattern = re.compile(r'(<label class="radio-card"><input type="radio" name="goal" value="筋肥大" checked>\s*<span class="radio-visual">\s*)(<svg viewBox="0 0 2463 2771" fill="currentColor">.*?</svg>)', re.DOTALL)
    content = onboard_pattern.sub(fr'\1{new_svg}', content)

    # 2. Update Profile Icon
    profile_pattern = re.compile(r'(<label class="radio-card"><input type="radio" name="p-goal" value="筋肥大">\s*<span class="radio-visual">\s*)(<svg viewBox="0 0 2463 2771" fill="currentColor">.*?</svg>)', re.DOTALL)
    content = profile_pattern.sub(fr'\1{new_svg}', content)

    # 3. Bump version
    content = content.replace('?v=178', '?v=179')

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("index.html updated successfully with V179 (User optimized SVG).")
