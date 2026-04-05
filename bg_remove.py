from PIL import Image
from collections import deque

def remove_bg_floodfill(input_path, output_path):
    try:
        img = Image.open(input_path).convert("RGBA")
        width, height = img.size
        pixels = img.load()
        
        visited = set()
        # Start BFS from corners
        queue = deque([(0, 0), (width-1, 0), (0, height-1), (width-1, height-1)])
        
        while queue:
            x, y = queue.popleft()
            if (x, y) in visited:
                continue
            visited.add((x, y))
            
            r, g, b, a = pixels[x, y]
            # Threshold for white background
            if r > 180 and g > 180 and b > 180:
                pixels[x, y] = (255, 255, 255, 0)
                # Add neighbors
                for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                    nx, ny = x + dx, y + dy
                    if 0 <= nx < width and 0 <= ny < height and (nx, ny) not in visited:
                        queue.append((nx, ny))
                        
        img.save(output_path, "PNG")
        print(f"Processed {input_path} -> {output_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

remove_bg_floodfill(r"C:\Users\guihi\.gemini\antigravity\brain\949b476a-537b-480a-87f8-38e55bcfbb89\media__1775394179913.png", "rpe_smile.png")
remove_bg_floodfill(r"C:\Users\guihi\.gemini\antigravity\brain\949b476a-537b-480a-87f8-38e55bcfbb89\media__1775394198160.png", "bike.png")
