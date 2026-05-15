import re

file_path = r'C:\Users\guihi\.gemini\antigravity\project\muscle-dialogue\app.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Target part: 12. **サイクルの継続性** ... 【本日の名言】：${randomQuote}
pattern = r'  12\. \*\*サイクルの継続性\*\*.*?\$\{randomQuote\}'
replacement = """  12. **サイクルの継続性**: PPLの「何周目か」を意識し、前回の同一セッション（例：前回のPush）の内容をコピーせず、主役部位を入れ替えることで、1週間（2サイクル）かけて部位全体を網羅的に強化する構成にすること。
  13. **サブ部位の網羅的アプローチ（偏りの防止）**: 
     大筋群や肩は複数の筋繊維（例：大胸筋の上部/中部/下部、三角筋の前部/中部/後部、背中の広がり/厚み）で構成されている。直近の履歴を分析し、特定のサブ部位ばかりに種目が偏ることを絶対に防ぐこと。
     特にPPL法など同一部位を週複数回鍛える場合は、「1周目は胸の全体（中部）と肩の前部」「2周目は胸の上部と肩の中部・後部」といったように、ターゲットとなるサブ部位を意図的にズラして立体的な筋肉をデザインすること。
  15. **最低重量の厳守**: 各種目に【最低重量: Xkg】が設定されている場合、提案する weight_kg は絶対にその数値以上にすること。
     【本日の名言】：${randomQuote}"""

new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Success")
