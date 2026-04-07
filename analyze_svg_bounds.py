import re
import xml.etree.ElementTree as ET

def get_svg_bounds(file_path):
    tree = ET.parse(file_path)
    root = tree.getroot()
    
    number_pattern = re.compile(r'[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?')
    
    min_x = min_y = float('inf')
    max_x = max_y = float('-inf')
    
    for path in root.iter('{http://www.w3.org/2000/svg}path'):
        d = path.get('d')
        transform = path.get('transform', '')
        
        # Parse translate
        tx = ty = 0.0
        if 'translate' in transform:
            match = re.search(r'translate\(([^,)]+),?([^)]+)?\)', transform)
            if match:
                tx = float(match.group(1))
                ty = float(match.group(2)) if match.group(2) else 0.0
        
        # Parse points in d
        points = number_pattern.findall(d)
        for i in range(0, len(points), 2):
            if i + 1 < len(points):
                x = float(points[i]) + tx
                y = float(points[i+1]) + ty
                min_x = min(min_x, x)
                max_x = max(max_x, x)
                min_y = min(min_y, y)
                max_y = max(max_y, y)
                
    return min_x, min_y, max_x, max_y

if __name__ == "__main__":
    file_path = r'C:\Users\guihi\Downloads\28490 (1).svg'
    min_x, min_y, max_x, max_y = get_svg_bounds(file_path)
    print(f"Bounds: min_x={min_x}, min_y={min_y}, max_x={max_x}, max_y={max_y}")
    print(f"Width: {max_x - min_x}, Height: {max_y - min_y}")
    print(f"Suggested viewBox: {min_x} {min_y} {max_x - min_x} {max_y - min_y}")
