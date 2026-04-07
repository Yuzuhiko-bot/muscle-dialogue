import re
import sys

def compress_path(d, precision=1):
    def round_val(match):
        val = float(match.group())
        if precision == 0:
            return str(int(round(val)))
        return f"{val:.{precision}f}".rstrip('0').rstrip('.')
    
    # Regex for numbers
    number_pattern = re.compile(r'[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?')
    d = number_pattern.sub(round_val, d)
    # Cleanup whitespace
    d = re.sub(r'\s+', ' ', d).strip()
    return d

def process_svg(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract paths
    paths = re.findall(r'<path d="([^"]+)"[^>]*transform="([^"]+)"', content)
    # If transform is not there, try without it
    if not paths:
        paths = re.findall(r'<path d="([^"]+)"[^>]*>', content)
        # Note: In the source file, it has transform and fill.
        # Let's be more specific.
        paths = re.findall(r'<path d="([^"]+)"\s*(?:fill="[^"]*"\s*)?(?:transform="([^"]*)")?\s*/>', content)

    # Re-extract more robustly
    import xml.etree.ElementTree as ET
    tree = ET.parse(file_path)
    root = tree.getroot()
    
    result_paths = []
    for path in root.findall('.//{http://www.w3.org/2000/svg}path'):
        d = path.get('d')
        transform = path.get('transform', '')
        fill = path.get('fill', 'currentColor')
        
        compressed_d = compress_path(d, precision=1)
        
        path_tag = f'<path d="{compressed_d}"'
        if transform:
            path_tag += f' transform="{transform}"'
        path_tag += ' />'
        result_paths.append(path_tag)
    
    svg_html = f'<svg viewBox="0 0 2463 2771" fill="currentColor">\n'
    svg_html += '\n'.join(result_paths)
    svg_html += '\n</svg>'
    
    return svg_html

if __name__ == "__main__":
    svg_html = process_svg(r'C:\Users\guihi\Downloads\28490.svg')
    print("---SVG BEGIN---")
    print(svg_html)
    print("---SVG END---")
