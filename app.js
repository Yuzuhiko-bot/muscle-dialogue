// ============================================
// マッスル・ダイアログ - App Logic v3
// ============================================

function getApiKey() { return localStorage.getItem('muscleDialog_apiKey') || ''; }
function saveApiKey(key) { localStorage.setItem('muscleDialog_apiKey', key); }
function getApiUrl() { return `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${getApiKey()}`; }

// ---------- EXERCISE MASTER DATA ----------
const EXERCISE_MASTER = [
  { id: "chest_001", exercise_name: "バーベルベンチプレス", primary_muscle: "大胸筋", secondary_muscles: ["三角筋前部", "上腕三頭筋"], equipment: "パワーラック", weight_step: 2.5 },
  { id: "chest_002", exercise_name: "スミスベンチプレス", primary_muscle: "大胸筋", secondary_muscles: ["三角筋前部", "上腕三頭筋"], equipment: "スミスマシン", weight_step: 2.5 },
  { id: "chest_003", exercise_name: "インクラインダンベルプレス", primary_muscle: "大胸筋上部", secondary_muscles: ["三角筋前部", "上腕三頭筋"], equipment: "ラバーダンベル", weight_step: 2.5 },
  { id: "chest_004", exercise_name: "ダンベルフライ", primary_muscle: "大胸筋", secondary_muscles: ["三角筋前部"], equipment: "ラバーダンベル", weight_step: 2.5 },
  { id: "chest_005", exercise_name: "マシンチェストプレス", primary_muscle: "大胸筋", secondary_muscles: ["三角筋前部", "上腕三頭筋"], equipment: "チェストプレス", weight_step: 5 },
  { id: "chest_006", exercise_name: "プレートアッパーチェスト", primary_muscle: "大胸筋上部", secondary_muscles: ["三角筋前部", "上腕三頭筋"], equipment: "プレートアッパーチェストプレス", weight_step: 5 },
  { id: "chest_007", exercise_name: "マシンペックフライ", primary_muscle: "大胸筋", secondary_muscles: [], equipment: "ペックフライ", weight_step: 5 },
  { id: "back_001", exercise_name: "バーベルデッドリフト", primary_muscle: "脊柱起立筋", secondary_muscles: ["広背筋", "大臀筋", "ハムストリングス"], equipment: "パワーラック", weight_step: 2.5 },
  { id: "back_002", exercise_name: "ベントオーバーローイング", primary_muscle: "広背筋", secondary_muscles: ["僧帽筋", "上腕二頭筋", "脊柱起立筋"], equipment: "パワーラック", weight_step: 2.5 },
  { id: "back_003", exercise_name: "Tバーローイング", primary_muscle: "広背筋", secondary_muscles: ["僧帽筋", "上腕二頭筋"], equipment: "Tバーロー", weight_step: 2.5 },
  { id: "back_004", exercise_name: "ラットプルダウン", primary_muscle: "広背筋", secondary_muscles: ["大円筋", "上腕二頭筋"], equipment: "ラットプル×プーリー", weight_step: 5 },
  { id: "back_005", exercise_name: "マシンシーテッドロウ", primary_muscle: "広背筋", secondary_muscles: ["僧帽筋", "上腕二頭筋"], equipment: "ラットプルシーテッドロウ", weight_step: 5 },
  { id: "back_006", exercise_name: "懸垂（チンニング）", primary_muscle: "広背筋", secondary_muscles: ["大円筋", "上腕二頭筋"], equipment: "アシストチンニング×ディップス", weight_step: 5 },
  { id: "back_007", exercise_name: "バックエクステンション", primary_muscle: "脊柱起立筋", secondary_muscles: ["大臀筋", "ハムストリングス"], equipment: "バックエクステンション", weight_step: 0 },
  { id: "legs_001", exercise_name: "バーベルスクワット", primary_muscle: "大腿四頭筋", secondary_muscles: ["大臀筋", "ハムストリングス"], equipment: "パワーラック", weight_step: 2.5 },
  { id: "legs_002", exercise_name: "スミススクワット", primary_muscle: "大腿四頭筋", secondary_muscles: ["大臀筋", "ハムストリングス"], equipment: "スミスマシン", weight_step: 2.5 },
  { id: "legs_003", exercise_name: "ブルガリアンスクワット", primary_muscle: "大腿四頭筋", secondary_muscles: ["大臀筋"], equipment: "ラバーダンベル", weight_step: 2.5 },
  { id: "legs_004", exercise_name: "レッグプレス", primary_muscle: "大腿四頭筋", secondary_muscles: ["大臀筋", "ハムストリングス"], equipment: "プレートレッグプレス", weight_step: 5 },
  { id: "legs_005", exercise_name: "レッグエクステンション", primary_muscle: "大腿四頭筋", secondary_muscles: [], equipment: "レッグエクステンション", weight_step: 5 },
  { id: "legs_006", exercise_name: "プローンレッグカール", primary_muscle: "ハムストリングス", secondary_muscles: [], equipment: "プローンレッグカール", weight_step: 5 },
  { id: "legs_007", exercise_name: "ヒップアブダクション", primary_muscle: "中臀筋", secondary_muscles: [], equipment: "アブダクター×アダクター", weight_step: 5 },
  { id: "legs_008", exercise_name: "ヒップアダクション", primary_muscle: "内転筋", secondary_muscles: [], equipment: "アブダクター×アダクター", weight_step: 5 },
  { id: "shoulders_001", exercise_name: "バーベルショルダープレス", primary_muscle: "三角筋前部", secondary_muscles: ["三角筋中部", "上腕三頭筋"], equipment: "パワーラック", weight_step: 2.5 },
  { id: "shoulders_002", exercise_name: "ダンベルショルダープレス", primary_muscle: "三角筋前部", secondary_muscles: ["三角筋中部", "上腕三頭筋"], equipment: "ラバーダンベル", weight_step: 2.5 },
  { id: "shoulders_003", exercise_name: "マシンショルダープレス", primary_muscle: "三角筋前部", secondary_muscles: ["三角筋中部", "上腕三頭筋"], equipment: "ショルダープレス", weight_step: 5 },
  { id: "shoulders_004", exercise_name: "ダンベルサイドレイズ", primary_muscle: "三角筋中部", secondary_muscles: [], equipment: "ダンベル1-10kg", weight_step: 1 },
  { id: "shoulders_005", exercise_name: "ケーブルサイドレイズ", primary_muscle: "三角筋中部", secondary_muscles: [], equipment: "ファンクショナルトレーナー", weight_step: 2.5 },
  { id: "shoulders_006", exercise_name: "マシンリアデルトフライ", primary_muscle: "三角筋後部", secondary_muscles: ["僧帽筋"], equipment: "ロー×リアデルト", weight_step: 5 },
  { id: "arms_001", exercise_name: "EZバーアームカール", primary_muscle: "上腕二頭筋", secondary_muscles: ["前腕筋群"], equipment: "EZバー", weight_step: 2.5 },
  { id: "arms_002", exercise_name: "ダンベルアームカール", primary_muscle: "上腕二頭筋", secondary_muscles: ["前腕筋群"], equipment: "ダンベル1-10kg", weight_step: 1 },
  { id: "arms_003", exercise_name: "マシンバイセプスカール", primary_muscle: "上腕二頭筋", secondary_muscles: [], equipment: "アームカール×トライセプス", weight_step: 5 },
  { id: "arms_004", exercise_name: "ケーブルプッシュダウン", primary_muscle: "上腕三頭筋", secondary_muscles: [], equipment: "ファンクショナルトレーナー", weight_step: 2.5 },
  { id: "arms_005", exercise_name: "マシントライセプスエクステンション", primary_muscle: "上腕三頭筋", secondary_muscles: [], equipment: "アームカール×トライセプス", weight_step: 5 },
  { id: "arms_006", exercise_name: "ディップス", primary_muscle: "上腕三頭筋", secondary_muscles: ["大胸筋下部", "三角筋前部"], equipment: "アシストチンニング×ディップス", weight_step: 5 },
  { id: "abs_001", exercise_name: "アブドミナルクランチ", primary_muscle: "腹直筋", secondary_muscles: [], equipment: "アブドミナル", weight_step: 5 },
  { id: "abs_002", exercise_name: "アブベンチクランチ", primary_muscle: "腹直筋", secondary_muscles: [], equipment: "アブベンチ", weight_step: 0 },
  { id: "abs_003", exercise_name: "レッグレイズ", primary_muscle: "腹直筋下部", secondary_muscles: ["腸腰筋"], equipment: "レッグレイズ", weight_step: 0 },
  { id: "abs_004", exercise_name: "ケーブルクランチ", primary_muscle: "腹直筋", secondary_muscles: [], equipment: "ファンクショナルトレーナー", weight_step: 2.5 },
  { id: "cardio_001", exercise_name: "有酸素運動（バイク）", primary_muscle: "心肺機能", secondary_muscles: ["下半身全体"], equipment: "アップライトバイク", weight_step: 0, is_cardio: true },
  { id: "cardio_002", exercise_name: "有酸素運動（ランニング）", primary_muscle: "心肺機能", secondary_muscles: ["下半身全体"], equipment: "ランニングマシン", weight_step: 0, is_cardio: true },
  { id: "cardio_003", exercise_name: "有酸素運動（クロストレーナー）", primary_muscle: "心肺機能", secondary_muscles: ["全身"], equipment: "クロストレーナー", weight_step: 0, is_cardio: true }
];

function isCardio(id) { return id && id.startsWith('cardio_'); }

// ---------- STATE ----------
let state = { userProfile: null, trainingHistory: {}, currentPlan: null, currentMonth: new Date().getMonth(), currentYear: new Date().getFullYear(), selectedDate: null, selectedTime: 45 };
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

// ---------- INIT ----------
document.addEventListener('DOMContentLoaded', () => {
  loadState(); initSplash(); initOnboarding(); initTabs(); initCalendar(); initTraining(); initModals(); initProfile(); initBackup(); initApiKey();
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => { });
});

function loadState() {
  try {
    const p = localStorage.getItem('muscleDialog_profile');
    const h = localStorage.getItem('muscleDialog_history');
    if (p) state.userProfile = JSON.parse(p);
    if (h) state.trainingHistory = JSON.parse(h);
  } catch (e) { console.error(e); }
}
function saveProfile() { localStorage.setItem('muscleDialog_profile', JSON.stringify(state.userProfile)); }
function saveHistory() { localStorage.setItem('muscleDialog_history', JSON.stringify(state.trainingHistory)); }

function showScreen(id) {
  $$('.screen').forEach(s => s.classList.remove('active'));
  $(`#${id}`).classList.add('active');
}

// ---------- SPLASH ----------
function initSplash() {
  $('#btn-splash-start').addEventListener('click', () => {
    if (state.userProfile) { showScreen('main-screen'); renderCalendar(); } else { showScreen('onboarding-screen'); }
  });
}

// ---------- ONBOARDING ----------
function initOnboarding() {
  const form = $('#onboarding-form'), sl = $('#frequency'), sv = $('#frequency-value');
  sl.addEventListener('input', () => { sv.textContent = sl.value; });
  setupExclusiveNone('pain'); setupExclusiveNone('todayPain');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(form);
    state.userProfile = { goal: fd.get('goal'), experience: fd.get('experience'), activity: fd.get('activity'), painAreas: fd.getAll('pain').filter(v => v !== 'なし'), priorityMuscles: fd.getAll('priority'), frequency: parseInt(sl.value), createdAt: new Date().toISOString() };
    saveProfile(); showScreen('main-screen'); renderCalendar(); showToast('ヤー！！プロフィール登録完了！パワー！！💪');
  });
}

function setupExclusiveNone(name) {
  $$(` input[name="${name}"]`).forEach(cb => {
    cb.addEventListener('change', () => {
      if (cb.value === 'なし' && cb.checked) $$(`input[name="${name}"]`).forEach(o => { if (o !== cb) o.checked = false; });
      else if (cb.value !== 'なし' && cb.checked) { const n = [...$$(`input[name="${name}"]`)].find(c => c.value === 'なし'); if (n) n.checked = false; }
    });
  });
}

// ---------- TABS ----------
function initTabs() {
  $$('.tab-btn').forEach(btn => btn.addEventListener('click', () => {
    $$('.tab-btn').forEach(b => b.classList.remove('active'));
    $$('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    $(`#tab-${btn.dataset.tab}`).classList.add('active');
    if (btn.dataset.tab === 'calendar') renderCalendar();
    if (btn.dataset.tab === 'profile') populateProfileForm();
  }));
}

// ---------- CALENDAR ----------
function initCalendar() {
  $('#cal-prev').addEventListener('click', () => { state.currentMonth--; if (state.currentMonth < 0) { state.currentMonth = 11; state.currentYear--; } renderCalendar(); });
  $('#cal-next').addEventListener('click', () => { state.currentMonth++; if (state.currentMonth > 11) { state.currentMonth = 0; state.currentYear++; } renderCalendar(); });
  $('#btn-manual-add').addEventListener('click', openManualAddModal);
  $('#btn-delete-day').addEventListener('click', deleteDayRecord);
}

function renderCalendar() {
  const y = state.currentYear, m = state.currentMonth;
  const mn = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  $('#cal-month-title').textContent = `${y}年 ${mn[m]}`;
  const grid = $('#cal-grid'); grid.innerHTML = '';
  const fd = new Date(y, m, 1).getDay(), dim = new Date(y, m + 1, 0).getDate(), todayStr = formatDate(new Date());
  for (let i = 0; i < fd; i++) { const e = document.createElement('div'); e.className = 'cal-day empty'; grid.appendChild(e); }
  for (let d = 1; d <= dim; d++) {
    const ds = formatDate(new Date(y, m, d)), c = document.createElement('div'); c.className = 'cal-day'; c.textContent = d;
    if (ds === todayStr) c.classList.add('today');
    if (state.trainingHistory[ds]) c.classList.add('has-training');
    if (ds === state.selectedDate) c.classList.add('selected');
    c.addEventListener('click', () => { state.selectedDate = ds; renderCalendar(); showHistoryDetail(ds); });
    grid.appendChild(c);
  }
}

function showHistoryDetail(ds) {
  const det = $('#history-detail'), rec = state.trainingHistory[ds];
  if (!rec) { det.classList.add('hidden'); return; }
  det.classList.remove('hidden');
  const d = new Date(ds + 'T00:00:00'), dn = ['日', '月', '火', '水', '木', '金', '土'];
  $('#history-date-title').textContent = `${d.getMonth() + 1}/${d.getDate()}（${dn[d.getDay()]}）のトレーニング 💪`;
  const content = $('#history-content'); content.innerHTML = '';
  rec.exercises.forEach((ex, idx) => {
    const div = document.createElement('div'); div.className = 'history-exercise';
    const isC = isCardio(ex.id);
    let setsHtml = '';
    if (isC) {
      setsHtml = `<span class="history-set-badge">⏱️ ${ex.duration || 0}分</span>`;
    } else {
      setsHtml = ex.sets.map((s, i) => `<span class="history-set-badge">Set${i + 1}: ${s.weight}kg × ${s.reps}回${s.rpe ? ' (RPE' + s.rpe + ')' : ''}</span>`).join('');
    }
    div.innerHTML = `<div class="history-exercise-name">${ex.name}</div><div class="history-sets">${setsHtml}</div>
      <div class="history-exercise-actions"><button class="btn-edit-ex" data-date="${ds}" data-idx="${idx}">✏️ 編集</button><button class="btn-delete-ex" data-date="${ds}" data-idx="${idx}">🗑️ 削除</button></div>`;
    content.appendChild(div);
  });
  content.querySelectorAll('.btn-edit-ex').forEach(b => b.addEventListener('click', () => openEditExercise(b.dataset.date, parseInt(b.dataset.idx))));
  content.querySelectorAll('.btn-delete-ex').forEach(b => b.addEventListener('click', () => deleteExercise(b.dataset.date, parseInt(b.dataset.idx))));
}

function deleteDayRecord() {
  if (!state.selectedDate || !state.trainingHistory[state.selectedDate]) return;
  showConfirm('この日のトレーニング記録を全て削除しますか？', () => {
    delete state.trainingHistory[state.selectedDate]; saveHistory(); renderCalendar();
    $('#history-detail').classList.add('hidden'); showToast('記録を削除したぞ！');
  });
}

function deleteExercise(date, idx) {
  showConfirm('この種目の記録を削除しますか？', () => {
    const rec = state.trainingHistory[date]; if (!rec) return;
    rec.exercises.splice(idx, 1);
    if (rec.exercises.length === 0) delete state.trainingHistory[date];
    saveHistory(); renderCalendar(); showHistoryDetail(date); showToast('種目を削除したぞ！');
  });
}

function openEditExercise(date, idx) {
  const rec = state.trainingHistory[date]; if (!rec) return;
  const ex = rec.exercises[idx]; const isC = isCardio(ex.id);
  const body = $('#edit-exercise-body');
  let html = `<h3 style="color:var(--pink-light);font-family:var(--font-title);margin-bottom:1rem;">${ex.name}</h3>`;
  if (isC) {
    html += `<div class="form-group"><label class="form-label">⏱️ 実施時間（分）</label><input type="number" class="input-muscle" id="edit-duration" value="${ex.duration || 0}" min="1"></div>`;
  } else {
    ex.sets.forEach((s, i) => {
      html += `<div class="manual-set-row"><span class="set-label">Set${i + 1}</span><input type="number" class="input-muscle edit-weight" value="${s.weight}" step="0.5" placeholder="kg"><input type="number" class="input-muscle edit-reps" value="${s.reps}" placeholder="回"></div>`;
    });
  }
  body.innerHTML = html;
  $('#btn-save-edit').onclick = () => {
    if (isC) { ex.duration = parseInt($('#edit-duration').value) || 0; }
    else {
      const ws = body.querySelectorAll('.edit-weight'), rs = body.querySelectorAll('.edit-reps');
      ex.sets = []; ws.forEach((w, i) => { ex.sets.push({ weight: parseFloat(w.value) || 0, reps: parseInt(rs[i].value) || 0 }); });
    }
    saveHistory(); closeModal('modal-edit-exercise'); showHistoryDetail(date); showToast('更新完了！パワー！💪');
  };
  openModal('modal-edit-exercise');
}

// ---------- TRAINING ----------
function initTraining() {
  $('#btn-generate').addEventListener('click', () => openModal('modal-conditions'));
  $('#btn-regenerate').addEventListener('click', () => { state.currentPlan = null; $('#plan-area').classList.add('hidden'); $('#no-plan').classList.remove('hidden'); $('#btn-complete').classList.add('hidden'); openModal('modal-conditions'); });
  $$('.time-btn').forEach(b => b.addEventListener('click', () => { $$('.time-btn').forEach(x => x.classList.remove('active')); b.classList.add('active'); state.selectedTime = parseInt(b.dataset.time); }));
  $('#btn-start-generate').addEventListener('click', () => { closeModal('modal-conditions'); generatePlan(); });
  $('#btn-complete').addEventListener('click', completePlan);
}

async function generatePlan() {
  $('#no-plan').classList.add('hidden'); $('#plan-area').classList.add('hidden'); $('#loading-area').classList.remove('hidden');
  $('#training-status-text').textContent = '筋肉ルーレット回転中...ヤー！！';
  try {
    const cond = gatherConditions(), hist = getRecentHistory(5), prompt = buildPrompt(cond, hist);
    const resp = await callGeminiAPI(prompt), plan = parseGeminiResponse(resp);
    state.currentPlan = plan; renderPlan(plan);
    $('#loading-area').classList.add('hidden'); $('#plan-area').classList.remove('hidden');
    $('#training-status-text').textContent = 'メニュー生成完了！さあ、始めよう！💪';
  } catch (e) {
    console.error(e); $('#loading-area').classList.add('hidden'); $('#no-plan').classList.remove('hidden');
    $('#training-status-text').textContent = 'さあ、筋肉との対話を始めよう！';
    showToast('エラーだ！もう一度試してくれ！😤 ' + e.message);
  }
}

function gatherConditions() {
  return {
    time: state.selectedTime, fatigue: $('input[name="fatigue"]:checked')?.value || '普通',
    todayPain: [...$$('input[name="todayPain"]:checked')].map(c => c.value).filter(v => v !== 'なし'),
    freeRequest: $('#free-request').value.trim()
  };
}

function getRecentHistory(n) {
  return Object.entries(state.trainingHistory).sort((a, b) => b[0].localeCompare(a[0])).slice(0, n).map(([d, data]) => ({
    date: d, exercises: data.exercises.map(ex => ({ name: ex.name, id: ex.id, sets: ex.sets, rpe: ex.rpe || null, duration: ex.duration || null }))
  }));
}

function buildPrompt(cond, hist) {
  const p = state.userProfile;
  const exData = EXERCISE_MASTER.map(e => `- ${e.exercise_name}(ID:${e.id}) 主動筋:${e.primary_muscle} 補助筋:${e.secondary_muscles.join(',') || 'なし'} 重量刻み:${e.weight_step}kg${e.is_cardio ? ' [有酸素]' : ''}`).join('\n');
  const histText = hist.length > 0 ? hist.map(h => {
    const ed = h.exercises.map(ex => {
      if (isCardio(ex.id)) return `  - ${ex.name}: ${ex.duration || 0}分`;
      return `  - ${ex.name}: ${ex.sets.map((s, i) => `Set${i + 1}:${s.weight}kg×${s.reps}回`).join(', ')}${ex.rpe ? ' RPE:' + ex.rpe : ''}`;
    }).join('\n'); return `【${h.date}】\n${ed}`;
  }).join('\n') : '（履歴なし）';

  const sys = `あなたは世界一エネルギッシュなAIパーソナルトレーナーです。
## 種目マスタ（以下のみ使用可能）:
${exData}

## 絶対ルール:
1. マスタにある種目のみ使用。
2. **重量は各種目のweight_step刻みで設定**（マシン系は5kg刻み、バーベル系は2.5kg刻み、軽ダンベルは1kg刻み）。weight_stepが0の種目は自重。
3. **primary/secondary muscleバランス考慮**: コンパウンド種目のsecondaryで使われた筋群→後続アイソレーションのセット数を1-2減らす。
4. **漸進性過負荷**: 前回RPE≤8→重量をweight_step分増やすか回数+1-2。RPE9-10→維持。
5. **自由要望は最優先**。
6. 痛みある部位の種目は除外or軽負荷。
7. 有酸素種目にはduration_minutesを設定（weight_kg/reps/setsは不要）。

## JSON出力:
\`\`\`json
{"exercises":[{"exercise_id":"chest_001","exercise_name":"バーベルベンチプレス","primary_muscle":"大胸筋","sets":3,"reps":10,"weight_kg":60,"rest_seconds":90,"note":"コメント"}],"cardio_exercises":[{"exercise_id":"cardio_001","exercise_name":"有酸素運動（バイク）","duration_minutes":20,"note":"コメント"}],"warmup":"ウォームアップ内容","cooldown":"クールダウン内容","total_estimated_minutes":45,"trainer_message":"きんに君風メッセージ"}
\`\`\`
JSONのみ出力。`;

  const usr = `## ユーザー: 目的:${p.goal} 経験:${p.experience} 活動量:${p.activity} 痛み:${p.painAreas.length ? p.painAreas.join(',') : 'なし'} 優先:${p.priorityMuscles.length ? p.priorityMuscles.join(',') : '特になし'} 頻度:${p.frequency}回/週
## 今日: 時間:${cond.time}分 疲労:${cond.fatigue} 痛み:${cond.todayPain.length ? cond.todayPain.join(',') : 'なし'}${cond.freeRequest ? ` 【最優先】要望:${cond.freeRequest}` : ''}
## 直近履歴:\n${histText}
最適メニューをJSON生成。重量はweight_step刻みで。`;

  return { systemPrompt: sys, userPrompt: usr };
}

async function callGeminiAPI({ systemPrompt, userPrompt }) {
  const apiKey = getApiKey();
  if (!apiKey) { showApiKeyModal(); throw new Error('APIキーが未設定です'); }
  const url = getApiUrl();
  const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: userPrompt }] }], systemInstruction: { parts: [{ text: systemPrompt }] }, generationConfig: { temperature: 0.7, topP: 0.9, topK: 40, responseMimeType: "application/json" } }) });
  if (r.status === 400 || r.status === 403) { showApiKeyModal(); throw new Error('APIキーが無効です。プロフィールタブから再設定してくれ！'); }
  if (!r.ok) throw new Error(`API Error ${r.status}`);
  return r.json();
}

function parseGeminiResponse(r) {
  const t = r.candidates[0].content.parts[0].text;
  try { return JSON.parse(t); } catch { const m = t.match(/```(?:json)?\s*([\s\S]*?)```/); if (m) return JSON.parse(m[1]); throw new Error('JSONパースエラー'); }
}

function renderPlan(plan) {
  const list = $('#plan-list'); list.innerHTML = '';
  if (plan.warmup) { const d = document.createElement('div'); d.className = 'plan-exercise'; d.style.borderLeft = 'none'; d.innerHTML = `<div class="exercise-header"><div class="exercise-number" style="background:linear-gradient(135deg,var(--sky),var(--green))">🔥</div><div class="exercise-name">ウォームアップ</div></div><div class="exercise-note">${plan.warmup}</div>`; list.appendChild(d); }

  const allEx = [...(plan.exercises || []), ...(plan.cardio_exercises || []).map(c => ({ ...c, _isCardio: true }))];
  allEx.forEach((ex, idx) => {
    const div = document.createElement('div'); div.className = 'plan-exercise'; div.style.animation = `exerciseIn 0.4s ease-out ${idx * 0.1}s both`;
    const masterEx = EXERCISE_MASTER.find(m => m.id === ex.exercise_id);
    const isCar = ex._isCardio || isCardio(ex.exercise_id);

    let inputsHtml = '';
    if (isCar) {
      inputsHtml = `<div class="cardio-duration-row"><span class="cardio-duration-label">⏱️ 実施時間:</span><input type="number" class="input-muscle input-cardio-dur" value="${ex.duration_minutes || 20}" min="1" data-ex="${idx}"><span class="cardio-duration-label">分</span></div>`;
    } else {
      inputsHtml = `<div class="sets-container"><div class="set-row"><div class="set-label"></div><div class="input-header">重量(kg)</div><div class="input-header">回数</div><div class="input-header">✓</div></div>`;
      for (let s = 0; s < (ex.sets || 3); s++) {
        inputsHtml += `<div class="set-row"><div class="set-label">Set${s + 1}</div><input type="number" class="input-muscle input-weight" value="${ex.weight_kg || ''}" placeholder="kg" data-ex="${idx}" data-set="${s}" step="${masterEx ? masterEx.weight_step : 2.5}"><input type="number" class="input-muscle input-reps" value="${ex.reps || ''}" placeholder="回" data-ex="${idx}" data-set="${s}"><input type="checkbox" class="set-check" data-ex="${idx}" data-set="${s}" style="width:20px;height:20px;accent-color:var(--green);cursor:pointer"></div>`;
      }
      inputsHtml += `</div><div class="rpe-section"><div class="rpe-label">（筋肉に問いかけながら）<br>どうなんだい！？オレの筋肉！まだいけるのかい！？</div><div class="rpe-slider-row"><span style="font-size:0.75rem;color:var(--green)">余裕</span><input type="range" class="rpe-slider" min="1" max="10" value="7" data-ex="${idx}"><span style="font-size:0.75rem;color:var(--red)">限界</span><span class="rpe-value" data-rpe-display="${idx}">7</span></div></div>`;
    }

    div.innerHTML = `<div class="exercise-header"><div class="exercise-number">${idx + 1}</div><div class="exercise-name">${ex.exercise_name}</div><span class="exercise-muscle-tag">${ex.primary_muscle || (masterEx ? masterEx.primary_muscle : '')}</span></div>${ex.note ? `<div class="exercise-note">💡 ${ex.note}</div>` : ''}${!isCar ? `<div class="exercise-recommendation">推奨: ${ex.weight_kg || '?'}kg × ${ex.reps || '?'}回 × ${ex.sets || '?'}セット 休憩:${ex.rest_seconds || 90}秒</div>` : ''}${inputsHtml}`;
    list.appendChild(div);
    setTimeout(() => {
      const sl = div.querySelector('.rpe-slider'), dp = div.querySelector(`[data-rpe-display="${idx}"]`);
      if (sl && dp) sl.addEventListener('input', () => { dp.textContent = sl.value; });
      div.querySelectorAll('.set-check').forEach(cb => cb.addEventListener('change', checkAllSetsCompleted));
    }, 0);
  });

  if (plan.cooldown) { const d = document.createElement('div'); d.className = 'plan-exercise'; d.style.borderLeft = 'none'; d.innerHTML = `<div class="exercise-header"><div class="exercise-number" style="background:linear-gradient(135deg,var(--green),var(--sky))">🧘</div><div class="exercise-name">クールダウン</div></div><div class="exercise-note">${plan.cooldown}</div>`; list.appendChild(d); }
  if (plan.trainer_message) { const d = document.createElement('div'); d.className = 'plan-exercise'; d.style.textAlign = 'center'; d.style.borderLeft = 'none'; d.innerHTML = `<div style="font-size:1.5rem;margin-bottom:0.5rem">🗣️</div><div style="font-family:var(--font-title);color:var(--yellow-light);font-size:0.95rem">${plan.trainer_message}</div>`; list.appendChild(d); }
  $('#btn-complete').classList.remove('hidden');
}

function checkAllSetsCompleted() { const a = $$('.set-check'), btn = $('#btn-complete'); btn.style.animation = [...a].every(c => c.checked) && a.length > 0 ? 'pulse 0.5s infinite alternate' : 'none'; }

function completePlan() {
  if (!state.currentPlan) return;
  const todayStr = formatDate(new Date()), exercises = [];
  const allEx = [...(state.currentPlan.exercises || []), ...(state.currentPlan.cardio_exercises || []).map(c => ({ ...c, _isCardio: true }))];
  allEx.forEach((ex, idx) => {
    const isCar = ex._isCardio || isCardio(ex.exercise_id);
    if (isCar) {
      const durIn = $(`.input-cardio-dur[data-ex="${idx}"]`);
      exercises.push({ id: ex.exercise_id, name: ex.exercise_name, duration: durIn ? parseInt(durIn.value) || 0 : ex.duration_minutes || 0, sets: [], rpe: null });
    } else {
      const sets = []; $$(`.input-weight[data-ex="${idx}"]`).forEach((w, s) => { const ri = $(`.input-reps[data-ex="${idx}"][data-set="${s}"]`); sets.push({ weight: parseFloat(w.value) || 0, reps: parseInt(ri.value) || 0 }); });
      const rsl = $(`.rpe-slider[data-ex="${idx}"]`);
      exercises.push({ id: ex.exercise_id, name: ex.exercise_name, sets, rpe: rsl ? parseInt(rsl.value) : null });
    }
  });
  if (state.trainingHistory[todayStr]) state.trainingHistory[todayStr].exercises.push(...exercises);
  else state.trainingHistory[todayStr] = { date: todayStr, exercises };
  saveHistory(); showCelebration(exercises);
  state.currentPlan = null; $('#plan-area').classList.add('hidden'); $('#no-plan').classList.remove('hidden'); $('#btn-complete').classList.add('hidden'); $('#training-status-text').textContent = 'さあ、筋肉との対話を始めよう！';
}

function showCelebration(exercises) {
  $('#modal-complete').classList.remove('hidden');
  const ts = exercises.reduce((s, e) => s + (e.sets ? e.sets.length : 0), 0), tv = exercises.reduce((s, e) => s + (e.sets ? e.sets.reduce((a, st) => a + st.weight * st.reps, 0) : 0), 0);
  $('#celebration-stats').innerHTML = `<div class="stat-item"><div class="stat-value">${exercises.length}</div><div class="stat-label">種目</div></div><div class="stat-item"><div class="stat-value">${ts}</div><div class="stat-label">セット</div></div><div class="stat-item"><div class="stat-value">${Math.round(tv).toLocaleString()}</div><div class="stat-label">総ボリューム(kg)</div></div>`;
  spawnConfetti();
  $('#btn-close-complete').onclick = () => { $('#modal-complete').classList.add('hidden'); $$('.tab-btn').forEach(b => b.classList.remove('active')); $$('.tab-content').forEach(c => c.classList.remove('active')); $$('.tab-btn')[0].classList.add('active'); $('#tab-calendar').classList.add('active'); renderCalendar(); };
}

function spawnConfetti() { const c = $('#confetti'); c.innerHTML = ''; const cols = ['#FF4D8D', '#FFD700', '#4DC9F6', '#FF8C42', '#4ADE80']; for (let i = 0; i < 50; i++) { const p = document.createElement('div'); p.className = 'confetti-piece'; p.style.left = Math.random() * 100 + '%'; p.style.backgroundColor = cols[Math.floor(Math.random() * cols.length)]; p.style.animationDelay = Math.random() * 1.5 + 's'; p.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px'; p.style.width = (Math.random() * 8 + 4) + 'px'; p.style.height = (Math.random() * 8 + 4) + 'px'; c.appendChild(p); } }

// ---------- MODALS ----------
function initModals() {
  $$('.modal-overlay').forEach(o => o.addEventListener('click', () => o.closest('.modal').classList.add('hidden')));
  $$('.modal-close').forEach(b => b.addEventListener('click', () => { const m = b.dataset.modal; if (m) closeModal(m); }));
  $('#btn-add-exercise').addEventListener('click', addManualExerciseEntry);
  $('#btn-save-manual').addEventListener('click', saveManualTraining);
}
function openModal(id) { $(`#${id}`).classList.remove('hidden'); }
function closeModal(id) { $(`#${id}`).classList.add('hidden'); }

// ---------- MANUAL ADD ----------
function openManualAddModal() {
  $('#manual-date').value = formatDate(new Date());
  $('#manual-exercises').innerHTML = ''; addManualExerciseEntry();
  openModal('modal-manual');
}

function addManualExerciseEntry() {
  const container = $('#manual-exercises'), entry = document.createElement('div'); entry.className = 'manual-exercise-entry';
  const cats = { 胸: EXERCISE_MASTER.filter(e => e.id.startsWith('chest')), 背中: EXERCISE_MASTER.filter(e => e.id.startsWith('back')), 下半身: EXERCISE_MASTER.filter(e => e.id.startsWith('legs')), 肩: EXERCISE_MASTER.filter(e => e.id.startsWith('shoulders')), 腕: EXERCISE_MASTER.filter(e => e.id.startsWith('arms')), 腹: EXERCISE_MASTER.filter(e => e.id.startsWith('abs')), 有酸素: EXERCISE_MASTER.filter(e => e.id.startsWith('cardio')) };
  let opts = '<option value="">種目を選択</option>';
  Object.entries(cats).forEach(([c, exs]) => { opts += `<optgroup label="${c}">${exs.map(e => `<option value="${e.id}">${e.exercise_name}</option>`).join('')}</optgroup>`; });

  entry.innerHTML = `<select class="manual-exercise-select">${opts}</select><div class="manual-inputs-area"></div><button class="btn-remove-exercise" type="button">✕ 削除</button>`;
  const select = entry.querySelector('.manual-exercise-select');
  const inputsArea = entry.querySelector('.manual-inputs-area');

  select.addEventListener('change', () => {
    const exId = select.value;
    if (!exId) { inputsArea.innerHTML = ''; return; }
    if (isCardio(exId)) {
      inputsArea.innerHTML = `<div class="cardio-duration-row"><span class="cardio-duration-label">⏱️ 実施時間:</span><input type="number" class="input-muscle manual-duration" placeholder="分" min="1" value="20"><span class="cardio-duration-label">分</span></div>`;
    } else {
      const master = EXERCISE_MASTER.find(m => m.id === exId);
      const step = master ? master.weight_step : 2.5;
      inputsArea.innerHTML = `${[1, 2, 3].map(i => `<div class="manual-set-row"><span class="set-label">Set${i}</span><input type="number" class="input-muscle manual-weight" placeholder="kg" step="${step}"><input type="number" class="input-muscle manual-reps" placeholder="回"></div>`).join('')}`;
    }
  });

  entry.querySelector('.btn-remove-exercise').addEventListener('click', () => entry.remove());
  container.appendChild(entry);
}

function saveManualTraining() {
  const ds = $('#manual-date').value; if (!ds) { showToast('日付を入力してくれ！💪'); return; }
  const exercises = [];
  $$('.manual-exercise-entry').forEach(entry => {
    const sel = entry.querySelector('.manual-exercise-select'); if (!sel.value) return;
    const master = EXERCISE_MASTER.find(m => m.id === sel.value); if (!master) return;
    if (isCardio(sel.value)) {
      const dur = entry.querySelector('.manual-duration');
      exercises.push({ id: master.id, name: master.exercise_name, duration: parseInt(dur?.value) || 0, sets: [], rpe: null });
    } else {
      const ws = entry.querySelectorAll('.manual-weight'), rs = entry.querySelectorAll('.manual-reps'), sets = [];
      ws.forEach((w, i) => { const wt = parseFloat(w.value), rp = parseInt(rs[i].value); if (wt || rp) sets.push({ weight: wt || 0, reps: rp || 0 }); });
      if (sets.length > 0) exercises.push({ id: master.id, name: master.exercise_name, sets, rpe: null });
    }
  });
  if (!exercises.length) { showToast('種目を1つ以上入力！パワー！💪'); return; }
  if (state.trainingHistory[ds]) state.trainingHistory[ds].exercises.push(...exercises);
  else state.trainingHistory[ds] = { date: ds, exercises };
  saveHistory(); closeModal('modal-manual'); renderCalendar(); showToast('手動記録完了！ヤー！！💪');
}

// ---------- PROFILE TAB ----------
function initProfile() {
  const form = $('#profile-form'), sl = $('#p-frequency'), sv = $('#p-frequency-value');
  sl.addEventListener('input', () => { sv.textContent = sl.value; });
  setupExclusiveNone('p-pain');
  form.addEventListener('submit', e => {
    e.preventDefault(); const fd = new FormData(form);
    state.userProfile = { ...state.userProfile, goal: fd.get('p-goal'), experience: fd.get('p-experience'), activity: fd.get('p-activity'), painAreas: fd.getAll('p-pain').filter(v => v !== 'なし'), priorityMuscles: fd.getAll('p-priority'), frequency: parseInt(sl.value) };
    saveProfile(); showToast('プロフィール更新完了！ヤー！！パワー！！💪');
  });
}

function populateProfileForm() {
  if (!state.userProfile) return;
  const p = state.userProfile;
  const setRadio = (name, val) => { const r = $(`input[name="${name}"][value="${val}"]`); if (r) r.checked = true; };
  setRadio('p-goal', p.goal); setRadio('p-experience', p.experience); setRadio('p-activity', p.activity);
  $$('input[name="p-pain"]').forEach(cb => { cb.checked = p.painAreas.includes(cb.value) || (p.painAreas.length === 0 && cb.value === 'なし'); });
  $$('input[name="p-priority"]').forEach(cb => { cb.checked = p.priorityMuscles.includes(cb.value); });
  const sl = $('#p-frequency'); sl.value = p.frequency; $('#p-frequency-value').textContent = p.frequency;
  // Show masked API key
  const ak = getApiKey();
  if (ak) $('#profile-api-key').value = ak.substring(0, 8) + '...' + ak.substring(ak.length - 4);
}

// ---------- API KEY MANAGEMENT ----------
function showApiKeyModal() { openModal('modal-apikey'); }

function initApiKey() {
  // Modal save button
  $('#btn-save-apikey-modal').addEventListener('click', () => {
    const key = $('#apikey-input').value.trim();
    if (!key) { showToast('APIキーを入力してくれ！💪'); return; }
    saveApiKey(key); closeModal('modal-apikey');
    showToast('APIキー保存完了！さあ、筋肉との対話だ！💪');
  });
  // Profile tab save button
  $('#btn-save-apikey').addEventListener('click', () => {
    const key = $('#profile-api-key').value.trim();
    if (!key || key.includes('...')) { showToast('新しいAPIキーを入力してくれ！'); return; }
    saveApiKey(key);
    showToast('APIキー更新完了！パワー！💪');
    populateProfileForm();
  });
}

// ---------- BACKUP & RESTORE ----------
function initBackup() {
  $('#btn-backup').addEventListener('click', downloadBackup);
  $('#file-restore').addEventListener('change', restoreBackup);
}

function downloadBackup() {
  const data = { version: 1, exportDate: new Date().toISOString(), profile: state.userProfile, history: state.trainingHistory };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = `muscle_dialogue_backup_${formatDate(new Date())}.json`;
  document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  showToast('バックアップ完了！データを守ったぞ！💪');
}

function restoreBackup(e) {
  const file = e.target.files[0]; if (!file) return;
  // confirm replaced by inline proceed
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      const data = JSON.parse(ev.target.result);
      if (data.profile) state.userProfile = data.profile;
      if (data.history) state.trainingHistory = data.history;
      saveProfile(); saveHistory(); renderCalendar(); populateProfileForm();
      showToast('復元完了！筋肉のデータが蘇ったぞ！ヤー！！💪');
    } catch (err) { showToast('ファイルが読み込めなかったぞ！😤'); }
  };
  reader.readAsText(file); e.target.value = '';
}

// ---------- UTILITIES ----------
function formatDate(d) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }

function showToast(msg) {
  let t = $('#toast-notification');
  if (!t) { t = document.createElement('div'); t.id = 'toast-notification'; t.style.cssText = 'position:fixed;bottom:2rem;left:50%;transform:translateX(-50%) translateY(100px);background:#D4001F;color:white;padding:1rem 2rem;border-radius:12px;font-family:"Noto Sans JP",sans-serif;font-weight:700;font-size:0.9rem;z-index:9999;box-shadow:0 4px 16px rgba(212,0,31,0.3);transition:transform 0.4s cubic-bezier(0.4,0,0.2,1);max-width:90%;text-align:center;'; document.body.appendChild(t); }
  t.textContent = msg; requestAnimationFrame(() => { t.style.transform = 'translateX(-50%) translateY(0)'; });
  setTimeout(() => { t.style.transform = 'translateX(-50%) translateY(100px)'; }, 3000);
}

// ---------- CUSTOM CONFIRM MODAL ----------
function showConfirm(message, onConfirm) {
  let overlay = $('#custom-confirm-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'custom-confirm-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:10000;display:flex;align-items:center;justify-content:center;padding:1rem;';
    overlay.innerHTML = `<div style="background:#251A45;border:2px solid #FF4D8D;border-radius:16px;padding:2rem;max-width:360px;width:100%;text-align:center;box-shadow:0 0 30px rgba(255,77,141,0.3);">
      <div id="confirm-message" style="color:white;font-family:'Zen Maru Gothic',sans-serif;font-weight:700;font-size:1rem;margin-bottom:1.5rem;"></div>
      <div style="display:flex;gap:0.75rem;justify-content:center;">
        <button id="confirm-yes" style="padding:0.7rem 1.5rem;border:none;border-radius:12px;background:linear-gradient(135deg,#EF4444,#FF8C42);color:white;font-family:'Dela Gothic One',sans-serif;font-size:0.9rem;cursor:pointer;">削除する！</button>
        <button id="confirm-no" style="padding:0.7rem 1.5rem;border:2px solid #C4B5E0;border-radius:12px;background:transparent;color:#C4B5E0;font-family:'Zen Maru Gothic',sans-serif;font-weight:700;font-size:0.9rem;cursor:pointer;">やめる</button>
      </div>
    </div>`;
    document.body.appendChild(overlay);
  }
  $('#confirm-message').textContent = message;
  overlay.style.display = 'flex';
  $('#confirm-yes').onclick = () => { overlay.style.display = 'none'; onConfirm(); };
  $('#confirm-no').onclick = () => { overlay.style.display = 'none'; };
  overlay.onclick = (e) => { if (e.target === overlay) overlay.style.display = 'none'; };
}
