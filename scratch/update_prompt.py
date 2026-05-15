import sys

def update_app_js(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    start_idx = -1
    end_idx = -1
    for i, line in enumerate(lines):
        if '1. **種目の順序（必須）**' in line:
            start_idx = i
        if '絶対除外リストの遵守（最優先）' in line:
            end_idx = i + 1
    
    if start_idx != -1 and end_idx != -1:
        new_lines = [
            ' 1. **種目の順序（必須）**: 必ず「コンパウンド種目（多関節）」を先に、「アイソレーション種目（単関節）」を後半に配置すること。\n',
            ' 2. **目的別の配布基準（ベースライン）**: \n',
            '    - 【筋肥大】: 8〜12回 / 3〜4セット / 休憩90〜120秒\n',
            '    - 【ダイエット/健康維持】: 15〜20回 / 2〜3セット / 休憩60秒\n',
            ' 3. **分割法（スプリット）の遵守**:\n',
            '    - ユーザーが選択した分割法（PPL、全身法、上下分割など）を最優先で尊重すること。\n',
            '    - PPL法や上下分割の場合、中1〜2日の休息があれば同じ部位を鍛えても良い。\n',
            '    - ブロスプリットの場合のみ、ターゲット部位を厳密に絞り、中6日程度空けること。\n',
            ' 4. **マンネリ打破**: 直近履歴で停滞期（数週間同じ内容）の兆候がある場合は、別種目で刺激を変えるか、理論（負荷帯の変更など）を適用すること。\n',
            ' 5. **怪我の配慮と自由要望**: 指定された痛み部位の種目は完全除外。自由要望がある場合は全てのルールより最優先する。\n',
            ' 6. **トーン＆マナー**: 「礼儀正しく、シンプルで熱いトーン」。長々とした解説は避け、テンポ良くまとめること。最後のメッセージには必ず以下の名言を組み込むこと。\n',
            ' 7. **絶対除外リストの遵守（最優先）**: ユーザー情報の「絶対除外リスト」に掲載されている部位は、他のいかなる理論（「腹筋は毎日やっていい」等の独自解釈を含む）よりも優先して、本日のメニューから「完全除外」すること。\n'
        ]
        lines[start_idx:end_idx] = new_lines
        with open(file_path, 'w', encoding='utf-8') as f:
            f.writelines(lines)
        print("Successfully updated app.js")
    else:
        print(f"Failed to find markers: start_idx={start_idx}, end_idx={end_idx}")

if __name__ == "__main__":
    update_app_js(sys.argv[1])
