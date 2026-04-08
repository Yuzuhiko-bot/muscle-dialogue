import re
import xml.etree.ElementTree as ET

def bake_and_normalize(file_path):
    tree = ET.parse(file_path)
    root = tree.getroot()
    
    number_pattern = re.compile(r'[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?')
    
    # First, find bounds to normalize
    min_x = min_y = float('inf')
    max_x = max_y = float('-inf')
    
    paths_data = []
    
    for path in root.iter('{http://www.w3.org/2000/svg}path'):
        d = path.get('d')
        transform = path.get('transform', '')
        
        tx = ty = 0.0
        if 'translate' in transform:
            match = re.search(r'translate\(([^,)]+),?([^)]+)?\)', transform)
            if match:
                tx = float(match.group(1))
                ty = float(match.group(2)) if match.group(2) else 0.0
        
        points = number_pattern.findall(d)
        new_points = []
        for i in range(0, len(points), 2):
            if i + 1 < len(points):
                x = float(points[i]) + tx
                y = float(points[i+1]) + ty
                min_x = min(min_x, x)
                max_x = max(max_x, x)
                min_y = min(min_y, y)
                max_y = max(max_y, y)
                new_points.append((x, y))
        
        # We need to preserve the command letters. 
        # This is tricky with regex if we just swap numbers. 
        # Let's do a simple replacement based on index if the structure is predictable.
        # But even better: just rewrite the path with baked coordinates.
        
        commands = re.findall(r'([MLCHVQSZmlchvqsz])([^MLCHVQSZmlchvqsz]*)', d)
        baked_d = ""
        for cmd, args_str in commands:
            args = number_pattern.findall(args_str)
            baked_args = []
            for i in range(0, len(args), 2):
                if i + 1 < len(args):
                    baked_args.append(f"{float(args[i]) + tx:.1f}")
                    baked_args.append(f"{float(args[i+1]) + ty:.1f}")
                elif i < len(args): # For commands like V or H (single arg)
                    # Actually these paths seem to be only M, L, C, Z.
                    # Let's handle them.
                    pass
            baked_d += cmd + " ".join(baked_args) + " "
        
        paths_data.append(baked_d.strip())

    # Calculate padding to center in 100x100
    width = max_x - min_x
    height = max_y - min_y
    scale = 90 / max(width, height) # Fit in 90% of the box
    
    off_x = (100 - width * scale) / 2 - min_x * scale
    off_y = (100 - height * scale) / 2 - min_y * scale
    
    final_paths = []
    for d in paths_data:
        # Scale and offset
        def adjust(m):
            val = float(m.group())
            # We need to know if it's X or Y. This is hard with raw string.
            # Let's re-parse properly.
            return m.group() # Placeholder

        # Re-processing with scale/offset
        commands = re.findall(r'([MLCHVQSZmlchvqsz])([^MLCHVQSZmlchvqsz]*)', d)
        norm_d = ""
        for cmd, args_str in commands:
            args = number_pattern.findall(args_str)
            norm_args = []
            for i in range(0, len(args), 2):
                if i + 1 < len(args):
                    nx = float(args[i]) * scale + off_x
                    ny = float(args[i+1]) * scale + off_y
                    norm_args.append(f"{nx:.1f}")
                    norm_args.append(f"{ny:.1f}")
            norm_d += cmd + " ".join(norm_args) + " "
        final_paths.append(norm_d.strip())

    svg_html = f'<svg viewBox="0 0 100 100" fill="currentColor">\n'
    for pd in final_paths:
        svg_html += f'                  <path d="{pd}" />\n'
    svg_html += '                </svg>'
    return svg_html

if __name__ == "__main__":
    result = bake_and_normalize(r'C:\Users\guihi\Downloads\28490 (1).svg')
    print(result)
