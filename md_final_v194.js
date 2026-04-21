// ============================================
// マッスル・ダイアログ - App Logic v1.9.4
// ============================================
const APP_VERSION = 'v1.9.4';
function getApiKey() { return localStorage.getItem('muscleDialog_apiKey') || ''; }
function saveApiKey(key) { localStorage.setItem('muscleDialog_apiKey', key); }
function getApiUrl() { return `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${getApiKey()}`; }

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
let state = { userProfile: null, trainingHistory: {}, currentPlan: null, currentMonth: new Date().getMonth(), currentYear: new Date().getFullYear(), selectedDate: null, selectedTime: 45, chatHistory: [] };
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

// ---------- INIT ----------
document.addEventListener('DOMContentLoaded', () => {
  console.log('Muscle Dialogue Initializing...', APP_VERSION);
  loadState(); initSplash(); initOnboarding(); initTabs(); initCalendar(); initTraining(); initModals(); initProfile(); initBackup(); initApiKey();
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(reg => {
      reg.onupdatefound = () => {
        const installingWorker = reg.installing;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('New version available. Refresh to update.');
          }
        };
      };
    }).catch(err => console.error('SW Error:', err));
  }
  
  const fBtn = $('#btn-force-update');
  if(fBtn) fBtn.onclick = () => {
    if(confirm('筋肉（キャッシュ）を最新状態に更新しますか？ヤー！！')) {
      if('serviceWorker' in navigator) {
        caches.keys().then(names => {
          for (let name of names) caches.delete(name);
        });
      }
      location.reload(true);
    }
  };
});

function loadState() {
  try {
    const p = localStorage.getItem('muscleDialog_profile');
    const h = localStorage.getItem('muscleDialog_history');
    if (p) state.userProfile = JSON.parse(p);
    if (h) state.trainingHistory = JSON.parse(h);
    const ch = localStorage.getItem('muscleDialog_chatHistory');
    if (ch) state.chatHistory = JSON.parse(ch);
  } catch (e) { console.error(e); }
}
function saveProfile() { localStorage.setItem('muscleDialog_profile', JSON.stringify(state.userProfile)); }
function saveHistory() { localStorage.setItem('muscleDialog_history', JSON.stringify(state.trainingHistory)); }
function saveChat() { localStorage.setItem('muscleDialog_chatHistory', JSON.stringify(state.chatHistory)); }

function showScreen(id) {
  $$('.screen').forEach(s => s.classList.remove('active'));
  $(`#${id}`).classList.add('active');
}

// ---------- SPLASH ----------
function initSplash() {
  setTimeout(() => {
    const splash = $('#splash-screen');
    splash.style.opacity = '0';
    setTimeout(() => {
      if (state.userProfile) { showScreen('main-screen'); renderCalendar(); }
      else { showScreen('onboarding-screen'); }
      splash.style.display = 'none';
    }, 1000);
  }, 2000);
}

// --- ONBOARDING & SETUP ---
function initOnboarding() {
  const form = $('#onboarding-form'), sl = $('#frequency'), sv = $('#frequency-value');
  if(sl) sl.addEventListener('input', () => { if(sv) sv.textContent = sl.value; });
  setupExclusiveNone('pain'); setupExclusiveNone('todayPain');
  if(form) form.addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(form);
    state.userProfile = { goal: fd.get('goal'), experience: fd.get('experience'), activity: fd.get('activity'), painAreas: fd.getAll('pain').filter(v => v !== 'なし'), priorityMuscles: fd.getAll('priority'), frequency: parseInt(sl.value), createdAt: new Date().toISOString() };
    saveProfile(); showScreen('main-screen'); renderCalendar(); showToast('ヤー！！プロフィール登録完了！パワー！！💪');
  });
}

function setupExclusiveNone(name) {
  $$(`input[name="${name}"]`).forEach(cb => {
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
  $('#history-date-title').textContent = `${d.getMonth() + 1}/${d.getDate()}（${dn[d.getDay()]}）の記録 💪`;
  const content = $('#history-content'); content.innerHTML = '';
  rec.exercises.forEach((ex, idx) => {
    const div = document.createElement('div'); div.className = 'history-exercise';
    const isC = isCardio(ex.id);
    let setsHtml = '';
    if (isC) { setsHtml = `<span class="history-set-badge">⏱️ ${ex.duration || 0}分</span>`; }
    else { setsHtml = ex.sets.map((s, i) => `<span class="history-set-badge">Set${i + 1}: ${s.weight}kg×${s.reps}回</span>`).join(''); }
    div.innerHTML = `<div class="history-exercise-name">${ex.name}</div><div class="history-sets">${setsHtml}</div>
      <div class="history-exercise-actions"><button class="btn-edit-ex" data-date="${ds}" data-idx="${idx}">✏️</button><button class="btn-delete-ex" data-date="${ds}" data-idx="${idx}">🗑️</button></div>`;
    content.appendChild(div);
  });
  content.querySelectorAll('.btn-edit-ex').forEach(b => b.addEventListener('click', () => openEditExercise(b.dataset.date, parseInt(b.dataset.idx))));
  content.querySelectorAll('.btn-delete-ex').forEach(b => b.addEventListener('click', () => deleteExercise(b.dataset.date, parseInt(b.dataset.idx))));
}
function deleteDayRecord() {
  if (!state.selectedDate || !state.trainingHistory[state.selectedDate]) return;
  showConfirm('この日の成果を全て削除しますか？ヤー！！', () => {
    delete state.trainingHistory[state.selectedDate]; saveHistory(); renderCalendar();
    $('#history-detail').classList.add('hidden'); showToast('データを削除したぞ！パワー！');
  });
}
function deleteExercise(date, idx) {
  showConfirm('この種目を削除しますか？', () => {
    const rec = state.trainingHistory[date]; if (!rec) return;
    rec.exercises.splice(idx, 1);
    if (rec.exercises.length === 0) delete state.trainingHistory[date];
    saveHistory(); renderCalendar(); showHistoryDetail(date);
  });
}
function openEditExercise(date, idx) {
  const rec = state.trainingHistory[date]; if (!rec) return;
  const ex = rec.exercises[idx]; const isC = isCardio(ex.id);
  const body = $('#edit-exercise-body');
  let html = `<h3 class="edit-ex-title">${ex.name}</h3>`;
  if (isC) {
    html += `<div class="form-group"><label class="form-label">⏱️ 実施時間（分）</label><input type="number" class="input-muscle" id="edit-duration" value="${ex.duration || 0}" min="1"></div>`;
  } else {
    ex.sets.forEach((s, i) => {
      html += `<div class="manual-set-row"><span class="set-label">Set${i + 1}</span><input type="number" class="input-muscle edit-weight" value="${s.weight}" step="0.5"><input type="number" class="input-muscle edit-reps" value="${s.reps}"></div>`;
    });
  }
  body.innerHTML = html;
  $('#btn-save-edit').onclick = () => {
    if (isC) { ex.duration = parseInt($('#edit-duration').value) || 0; }
    else {
      const ws = body.querySelectorAll('.edit-weight'), rs = body.querySelectorAll('.edit-reps');
      ex.sets = []; ws.forEach((w, i) => { ex.sets.push({ weight: parseFloat(w.value) || 0, reps: parseInt(rs[i].value) || 0 }); });
    }
    saveHistory(); closeModal('modal-edit-exercise'); showHistoryDetail(date); showToast('更新完了！ヤー！！💪');
  };
  openModal('modal-edit-exercise');
}

// ---------- TRAINING ENGINE ----------
function initTraining() {
  $('#btn-generate').addEventListener('click', () => openModal('modal-conditions'));
  $('#btn-regenerate').addEventListener('click', () => { state.currentPlan = null; $('#plan-area').classList.add('hidden'); $('#no-plan').classList.remove('hidden'); $('#btn-complete').classList.add('hidden'); openModal('modal-conditions'); });
  $$('.time-btn').forEach(b => b.addEventListener('click', () => { $$('.time-btn').forEach(x => x.classList.remove('active')); b.classList.add('active'); state.selectedTime = parseInt(b.dataset.time); }));
  $('#btn-start-generate').addEventListener('click', () => { closeModal('modal-conditions'); generatePlan(); });
  $('#btn-complete').addEventListener('click', completePlan);
}
function gatherConditions() {
  const fatigue = $('input[name="fatigue"]:checked').value;
  const pains = [...$$('input[name="todayPain"]:checked')].map(c => c.value).filter(v => v !== 'なし');
  const req = $('#free-request').value;
  return { time: state.selectedTime, fatigue: fatigue, todayPain: pains, freeRequest: req };
}
function getRecentHistory(n) {
  const dates = Object.keys(state.trainingHistory).sort().reverse().slice(0, n);
  return dates.map(d => ({ date: d, exercises: state.trainingHistory[d].exercises }));
}

function getMuscleRotationStatus(hist) {
  const categories = {
    '胸': ['大胸筋', '大胸筋上部'],
    '背中': ['脊柱起立筋', '広背筋', '僧帽筋'],
    '下半身': ['大腿四頭筋', 'ハムストリングス', '大臀筋', '中臀筋', '内転筋'],
    '肩': ['三角筋前部', '三角筋中部', '三角筋後部'],
    '腕': ['上腕二頭筋', '上腕三頭筋'],
    '腹筋': ['腹直筋', '腹直筋下部']
  };
  const lastDates = {};
  Object.keys(categories).forEach(cat => lastDates[cat] = null);
  hist.forEach(h => {
    const d = new Date(h.date);
    h.exercises.forEach(ex => {
      const master = EXERCISE_MASTER.find(m => m.id === ex.id);
      if (!master) return;
      for (const [cat, muscles] of Object.entries(categories)) {
        if (muscles.includes(master.primary_muscle)) {
          if (!lastDates[cat] || new Date(lastDates[cat]) < d) { lastDates[cat] = h.date; }
        }
      }
    });
  });
  const today = new Date();
  const summary = Object.entries(lastDates).map(([cat, date]) => {
    if (!date) return `- ${cat}: 【記録なし】(最優先候補)`;
    const diffDays = Math.floor((today - new Date(date)) / (1000 * 60 * 60 * 24));
    let status = '';
    if (diffDays >= 6) status = ' (！最優先：放置されすぎだ！)';
    else if (diffDays >= 4) status = ' (そろそろ実施すべき)';
    else status = ' (順調)';
    return `- ${cat}: ${diffDays}日前${status}`;
  }).join('\n');
  return `## 部位別ローテーション状況 (直近21日間分析):\n${summary}`;
}

async function generatePlan() {
  $('#no-plan').classList.add('hidden'); $('#plan-area').classList.add('hidden'); $('#loading-area').classList.remove('hidden');
  try {
    const cond = gatherConditions(), hist = getRecentHistory(10), prompt = buildPrompt(cond, hist);
    const resp = await callGeminiAPI(prompt), plan = parseGeminiResponse(resp);
    state.currentPlan = plan; renderPlan(plan);
    $('#loading-area').classList.add('hidden'); $('#plan-area').classList.remove('hidden');
  } catch (e) {
    console.error(e); $('#loading-area').classList.add('hidden'); $('#no-plan').classList.remove('hidden');
    showToast('エラーだ！もう一度試してくれ！😤 ' + e.message);
  }
}

function buildPrompt(cond, hist) {
  const p = state.userProfile;
  const exData = EXERCISE_MASTER.map(e => `- ${e.exercise_name}(ID:${e.id}) 主動筋:${e.primary_muscle} 補助筋:${e.secondary_muscles.join(',') || 'なし'} 重量刻み:${e.weight_step}kg${e.is_cardio ? ' [有酸素]' : ''}`).join('\n');
  const rotationStatus = getMuscleRotationStatus(hist);
  
  const sys = `あなたは「なかやまきんに君」です。世界最高峰のスポーツ科学知識を持つパーソナルトレーナーとして、ユーザーに最適なメニューを作成してください。
## 👑 メニュー構成の【絶対ルール】
0. **週単位のローテーション管理（【最重要】）**: 特定の主要部位が「7日以上」放置されないよう配慮せよ。4〜5日空いている部位は積極的に組み込むこと。
1. **種目の順序**: コンパウンド種目を先に、アイソレーション種目を後半に配置せよ。
2. **目的別基準**: [筋肥大] 8〜12回/3〜4セット, [ダイエット] 有酸素20分+, [健康維持] 自重重視, [筋力UP] 3〜5回/5セット以上
3. **安全第一**: 痛みがある部位は絶対に避けるか、負荷を極限まで下げた代替メニューにせよ。

## 📥 出力形式（JSONのみ、厳守）
{
  "kinnikun_msg": "元気の出るメッセージ（ヤー！！パワー！！を含む）",
  "exercises": [
    { "id": "MASTER_ID", "name": "種目名", "sets_count": 3, "reps": "10", "note": "解説", "is_cardio": false, "cardio_duration": 0 }
  ]
}`;

  const usr = `${rotationStatus}
## ユーザー情報: 目的:${p.goal} 経験:${p.experience} 活動量:${p.activity} 痛み:${p.painAreas.join(',')} 優先:${p.priorityMuscles.join(',')} 頻度:${p.frequency}回/週
## 今日の状況: 時間:${cond.time}分 疲労:${cond.fatigue} 痛み:${cond.todayPain.join(',')} 要望:${cond.freeRequest || 'なし'}
## 直近の履歴: ${JSON.stringify(hist.slice(0,3))}
## マスタ種目リスト:
${exData}`;

  return `[SYSTEM]\n${sys}\n\n[USER]\n${usr}`;
}

async function callGeminiAPI(prompt) {
  const key = getApiKey();
  if (!key) { openModal('modal-apikey'); throw new Error('APIキーが設定されていません'); }
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${key}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
  });
  if (!response.ok) { const err = await response.json(); throw new Error(err.error?.message || '通信エラー'); }
  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('AIからの応答が空です');
  return text;
}

function parseGeminiResponse(text) {
  const clean = text.replace(/```json|```/g, '').trim();
  try { return JSON.parse(clean); } 
  catch (e) { 
    const match = clean.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw e;
  }
}

function renderPlan(plan) {
  const list = $('#plan-list'); list.innerHTML = '';
  const msgDiv = document.createElement('div'); msgDiv.className = 'plan-message-bubble';
  msgDiv.innerHTML = `<div class="msg-avatar">💪</div><div class="msg-text">${plan.kinnikun_msg}</div>`;
  list.appendChild(msgDiv);
  plan.exercises.forEach((ex, i) => {
    const div = document.createElement('div'); div.className = 'plan-exercise';
    const setsInputs = ex.is_cardio ? '' : `<div class="plan-sets-area">${Array(ex.sets_count).fill(0).map((_, idx) => `<div class="plan-set-row"><span>Set${idx + 1}</span><input type="number" class="set-weight" placeholder="kg"><input type="number" class="set-reps" value="${ex.reps}"></div>`).join('')}</div>`;
    div.innerHTML = `<div class="ex-header"><span class="ex-num">${i + 1}</span><span class="ex-name">${ex.name}</span></div>
      <div class="ex-note">${ex.note}</div>
      ${ex.is_cardio ? `<div class="cardio-timer-row">目標時間: ${ex.cardio_duration}分</div>` : setsInputs}`;
    list.appendChild(div);
  });
  $('#btn-complete').classList.remove('hidden');
}

function completePlan() {
  const plan = state.currentPlan; if (!plan) return;
  const ds = formatDate(new Date()), exResults = [];
  $$('.plan-exercise').forEach((el, i) => {
    const ex = plan.exercises[i];
    if (ex.is_cardio) { exResults.push({ id: ex.id, name: ex.name, duration: ex.cardio_duration }); }
    else {
      const sets = [];
      el.querySelectorAll('.plan-set-row').forEach(row => {
        const w = parseFloat(row.querySelector('.set-weight').value) || 0;
        const r = parseInt(row.querySelector('.set-reps').value) || 0;
        if (r > 0) sets.push({ weight: w, reps: r });
      });
      if (sets.length > 0) exResults.push({ id: ex.id, name: ex.name, sets: sets });
    }
  });
  if (exResults.length === 0) { showToast('一つも記録されていないぞ！？パワー！😤'); return; }
  if (!state.trainingHistory[ds]) state.trainingHistory[ds] = { exercises: [] };
  state.trainingHistory[ds].exercises.push(...exResults);
  saveHistory(); state.currentPlan = null;
  $('#plan-area').classList.add('hidden'); $('#no-plan').classList.remove('hidden'); $('#btn-complete').classList.add('hidden');
  showCelebration(exResults);
}

// --- UTILS ---
function formatDate(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
function showToast(m) {
  let t = $('#toast'); if (!t) { t = document.createElement('div'); t.id = 'toast'; document.body.appendChild(t); }
  t.textContent = m; t.className = 'toast show';
  setTimeout(() => t.className = 'toast', 3000);
}
function openModal(id) { $(`#${id}`).classList.remove('hidden'); }
function closeModal(id) { $(`#${id}`).classList.add('hidden'); }
function showConfirm(m, onC) {
  if (confirm(m)) onC();
}
function showCelebration(exs) {
  openModal('modal-complete');
  const stats = $('#celebration-stats');
  const ts = exs.reduce((s, e) => s + (e.sets ? e.sets.length : 0), 0);
  stats.innerHTML = `<div class="stat-item"><div class="stat-val">${exs.length}</div><div class="stat-label">種目</div></div><div class="stat-item"><div class="stat-val">${ts}</div><div class="stat-label">セット</div></div>`;
  $('#btn-close-complete').onclick = () => { closeModal('modal-complete'); $$('.tab-btn')[0].click(); };
}

// --- PROFILE & BACKUP ---
function initProfile() {
  $('#btn-save-apikey').onclick = () => { saveApiKey($('#profile-api-key').value); showToast('APIキーを筋肉に刻んだぞ！ヤー！！'); };
  $('#profile-form').addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData($('#profile-form'));
    state.userProfile.goal = fd.get('p-goal');
    state.userProfile.experience = fd.get('p-experience');
    state.userProfile.activity = fd.get('p-activity');
    state.userProfile.painAreas = fd.getAll('p-pain').filter(v => v !== 'なし');
    state.userProfile.priorityMuscles = fd.getAll('p-priority');
    state.userProfile.frequency = parseInt($('#p-frequency').value);
    saveProfile(); showToast('プロフィールの進化を確認！パワー！！💪');
  });
  $('#p-frequency').addEventListener('input', () => { $('#p-frequency-value').textContent = $('#p-frequency').value; });
}
function populateProfileForm() {
  const p = state.userProfile; if (!p) return;
  $(`input[name="p-goal"][value="${p.goal}"]`).checked = true;
  $(`input[name="p-experience"][value="${p.experience}"]`).checked = true;
  $(`input[name="p-activity"][value="${p.activity}"]`).checked = true;
  $$('input[name="p-pain"]').forEach(c => c.checked = p.painAreas.includes(c.value));
  if (p.painAreas.length === 0) $('input[name="p-pain"][value="なし"]').checked = true;
  $$('input[name="p-priority"]').forEach(c => c.checked = p.priorityMuscles.includes(c.value));
  $('#p-frequency').value = p.frequency; $('#p-frequency-value').textContent = p.frequency;
  $('#profile-api-key').value = getApiKey();
}
function initApiKey() { $('#apikey-input').value = getApiKey(); $('#btn-save-apikey-modal').onclick = () => { saveApiKey($('#apikey-input').value); closeModal('modal-apikey'); showToast('ヤー！！対話の準備は整った！'); }; }
function initBackup() {
  $('#btn-backup').onclick = () => {
    const data = { profile: state.userProfile, history: state.trainingHistory };
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `muscle_dialogue_backup_${formatDate(new Date())}.json`; a.click();
  };
  $('#file-restore').onchange = e => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.profile) { state.userProfile = data.profile; saveProfile(); }
        if (data.history) { state.trainingHistory = data.history; saveHistory(); }
        showToast('筋肉の記憶を完全復元したぞ！ヤー！！💪'); renderCalendar();
      } catch (err) { showToast('データの形式が違うようだ…😤'); }
    };
    reader.readAsText(file);
  };
}
function initModals() {
  $$('.modal-overlay').forEach(o => o.onclick = () => o.closest('.modal').classList.add('hidden'));
  $$('.modal-close').forEach(b => b.onclick = () => closeModal(b.dataset.modal));
}
function openManualAddModal() {
  $('#manual-date').value = formatDate(new Date());
  const container = $('#manual-exercises'); container.innerHTML = '';
  addManualExerciseRow();
  openModal('modal-manual');
}
function addManualExerciseRow() {
  const row = document.createElement('div'); row.className = 'manual-ex-row';
  row.innerHTML = `<select class="manual-ex-select">${EXERCISE_MASTER.map(e => `<option value="${e.id}">${e.exercise_name}</option>`).join('')}</select>
    <div class="manual-sets-inputs">
      <div class="manual-set-input">Set1: <input type="number" class="m-weight" placeholder="kg"><input type="number" class="m-reps" placeholder="回"></div>
    </div><button class="btn-add-set-manual">＋セット</button>`;
  row.querySelector('.btn-add-set-manual').onclick = () => {
    const inputs = row.querySelector('.manual-sets-inputs');
    const setNum = inputs.querySelectorAll('.manual-set-input').length + 1;
    const div = document.createElement('div'); div.className = 'manual-set-input';
    div.innerHTML = `Set${setNum}: <input type="number" class="m-weight" placeholder="kg"><input type="number" class="m-reps" placeholder="回">`;
    inputs.appendChild(div);
  };
  $('#manual-exercises').appendChild(row);
}
$('#btn-add-exercise').onclick = addManualExerciseRow;
$('#btn-save-manual').onclick = () => {
  const date = $('#manual-date').value; if (!date) return;
  const exs = [];
  $$('.manual-ex-row').forEach(row => {
    const id = row.querySelector('.manual-ex-select').value;
    const name = EXERCISE_MASTER.find(m => m.id === id).exercise_name;
    const sets = [];
    row.querySelectorAll('.manual-set-input').forEach(si => {
      const w = parseFloat(si.querySelector('.m-weight').value) || 0, r = parseInt(si.querySelector('.m-reps').value) || 0;
      if (r > 0) sets.push({ weight: w, reps: r });
    });
    if (sets.length > 0) exs.push({ id, name, sets });
  });
  if (exs.length === 0) return;
  if (!state.trainingHistory[date]) state.trainingHistory[date] = { exercises: [] };
  state.trainingHistory[date].exercises.push(...exs);
  saveHistory(); closeModal('modal-manual'); renderCalendar(); showToast('手動記録完了！ヤー！！');
};
