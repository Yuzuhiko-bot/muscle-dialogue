from PIL import Image
from collections import deque

input_path = r"C:\Users\guihi\.gemini\antigravity\brain\949b476a-537b-480a-87f8-38e55bcfbb89\media__1775475519993.jpg"
output_path = r"C:\Users\guihi\.gemini\antigravity\project\muscle-dialogue\kinnikun_spinner.png"

try:
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    pixels = img.load()

    visited = set()
    queue = deque()
    
    # Add all border pixels to start floodfill
    for x in range(width):
        queue.append((x, 0))
        queue.append((x, height-1))
    for y in range(height):
        queue.append((0, y))
        queue.append((width-1, y))

    while queue:
        x, y = queue.popleft()
        if (x, y) in visited:
            continue
        visited.add((x, y))
        r, g, b, a = pixels[x, y]
        # Remove pixels that are close to white (outside the red border)
        # For JPG, we check for high RGB values
        if r > 240 and g > 240 and b > 240:
            pixels[x, y] = (0, 0, 0, 0)
            for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nx, ny = x + dx, y + dy
                if 0 <= nx < width and 0 <= ny < height and (nx, ny) not in visited:
                    queue.append((nx, ny))

    img.save(output_path, "PNG")
    print("Circle background removed successfully.")
except Exception as e:
    print(f"Error: {e}")
