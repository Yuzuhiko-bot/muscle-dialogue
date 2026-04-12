
function getApiKey() { return localStorage.getItem('muscleDialog_apiKey') || ''; }
function saveApiKey(key) { localStorage.setItem('muscleDialog_apiKey', key); }

// AIモデルの取得と保存
function getSelectedModel() { return localStorage.getItem('muscleDialog_aiModel') || 'gemini-3.1-flash-lite-preview'; }
function saveSelectedModel(model) { localStorage.setItem('muscleDialog_aiModel', model); }

function getApiUrl(model) { 
  return `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${getApiKey()}`; 
}

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
  { id: "cardio_003", exercise_name: "有酸素運動（クロストレーナー）", primary_muscle: "心肺機能", secondary_muscles: ["全身"], equipment: "クロストレーナー", weight_step: 0, is_cardio: true },
  { id: "cardio_004", exercise_name: "有酸素運動（ジョギング）", primary_muscle: "心肺機能", secondary_muscles: ["下半身全体"], equipment: "自重・屋外", weight_step: 0, is_cardio: true }
];

// ---------- KINNIKUN QUOTES ----------
const KINNIKUN_QUOTES = [
  "筋肉は最高のファッションだ！",
  "筋トレは人生の教科書。努力を積み重ねればいつか結果が返ってくる。",
  "トレーニングで大切なのは『各駅停車』。慌てない慌てない、それが1番の近道さ。",
  "トレーニングで一番面白いのは、筋肉に重さが乗ってるとき。",
  "やれることのみをやる。それが大事なんだ！",
  "今日の自分は、昨日より強い！",
  "筋肉は裏切らない！",
  "食には色々気遣うが、全ては筋肉のためだから別にツラくない！"
];

const LOADING_QUOTES = [
  "ただいま大胸筋にお伺いを立てています……",
  "筋肉の神と交信中（ピピピッ）……",
  "どっちなんだいっ！？と筋肉に問いかけています……",
  "プロテインをシェイクしながら考えています……",
  "筋肉コンピューター、フル稼働中！パワー！！",
  "細胞レベルでメニューを構成中……",
  "美味しいブロッコリーを想像しながら処理中……"
];

function isCardio(id) { return id && id.startsWith('cardio_'); }

// ---------- STATE ----------
let state = { userProfile: null, trainingHistory: {}, bodyRecord: {}, currentPlan: null, customExercises: null, currentMonth: new Date().getMonth(), currentYear: new Date().getFullYear(), selectedDate: null, selectedTime: 45 };
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

// ---------- INIT ----------
document.addEventListener('DOMContentLoaded', () => {
  console.log("%c💪 Muscle Dialogue v1.5.3 - Power!!", "color:#FF2D55; font-weight:bold; font-size:1.2rem;");
  loadState(); initSplash(); initOnboarding(); initTabs(); initCalendar(); initTraining(); initModals(); initProfile(); initBackup(); initApiKey(); initExerciseMaster();
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => { });
});

function loadState() {
  try {
    const p = localStorage.getItem('muscleDialog_profile');
    const h = localStorage.getItem('muscleDialog_history');
    const b = localStorage.getItem('muscleDialog_bodyRecord');
    const cp = localStorage.getItem('muscleDialog_currentPlan');
    const ce = localStorage.getItem('muscleDialog_customExercises');
    if (p) state.userProfile = JSON.parse(p);
    if (h) state.trainingHistory = JSON.parse(h);
    if (b) state.bodyRecord = JSON.parse(b);
    if (cp) state.currentPlan = JSON.parse(cp);
    if (ce) state.customExercises = JSON.parse(ce);
  } catch (e) { console.error(e); }
}
function saveProfile() { localStorage.setItem('muscleDialog_profile', JSON.stringify(state.userProfile)); }
function saveHistory() { localStorage.setItem('muscleDialog_history', JSON.stringify(state.trainingHistory)); }
function saveBodyRecord() { localStorage.setItem('muscleDialog_bodyRecord', JSON.stringify(state.bodyRecord)); }
function saveCustomExercises() { 
  if (state.customExercises) {
    localStorage.setItem('muscleDialog_customExercises', JSON.stringify(state.customExercises)); 
  } else {
    localStorage.removeItem('muscleDialog_customExercises');
  }
}

function getAvailableExercises() {
  return state.customExercises || EXERCISE_MASTER;
}
function saveCurrentPlan() {
  if (state.currentPlan) {
    localStorage.setItem('muscleDialog_currentPlan', JSON.stringify(state.currentPlan));
  } else {
    localStorage.removeItem('muscleDialog_currentPlan');
  }
}

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
      if (state.userProfile) { 
        showScreen('main-screen'); 
        renderCalendar(); 
      } else { 
        showScreen('onboarding-screen'); 
      }
      splash.style.display = 'none';
    }, 1000); // 1.0s fadeout
  }, 2500); // 2.5s display time
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
    saveProfile(); showScreen('main-screen'); renderCalendar(); showToast('ヤー！！プロフィール登録完了！パワー！！');
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
    const ds = formatDate(new Date(y, m, d)), c = document.createElement('div'); c.className = 'cal-day'; 
    c.innerHTML = `<span class="cal-date-num">${d}</span>`;
    if (ds === todayStr) c.classList.add('today');
    if (state.trainingHistory[ds]) {
      c.classList.add('has-training');
      
      const dayData = state.trainingHistory[ds];
      let dailyVolume = 0;
      let dailySets = 0;
      let dailyCardioMin = 0;

      // その日のボリュームとセット数、有酸素時間を計算
      dayData.exercises.forEach(ex => {
        if (ex.duration) {
          dailyCardioMin += ex.duration;
        } else if (ex.sets) {
          dailySets += ex.sets.length;
          ex.sets.forEach(s => { dailyVolume += ((s.weight || 0) * (s.reps || 0)); });
        }
      });

      const goal = state.userProfile?.goal || '健康維持';
      let level = 1;

      // 目的別のヒートマップ判定ロジック
      if (goal === '筋肥大' || goal === '筋力アップ') {
        if (dailyVolume >= 8000 || dailySets >= 15) level = 3;
        else if (dailyVolume >= 4000 || dailySets >= 8) level = 2;
      } else {
        if (dailyVolume >= 4000 || dailyCardioMin >= 40 || dailySets >= 10) level = 3;
        else if (dailyVolume >= 2000 || dailyCardioMin >= 20 || dailySets >= 5) level = 2;
      }

      c.classList.add(`heatmap-level-${level}`);
    }
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
  $('#history-date-title').textContent = `${d.getMonth() + 1}/${d.getDate()}（${dn[d.getDay()]}）のトレーニング`;
  const content = $('#history-content'); content.innerHTML = '';
  rec.exercises.forEach((ex, idx) => {
    const div = document.createElement('div'); div.className = 'history-exercise';
    const isC = isCardio(ex.id);
    let setsHtml = '';
    if (isC) {
      setsHtml = `<span class="history-set-badge">${ex.duration || 0}分</span>`;
    } else {
      setsHtml = ex.sets.map((s, i) => {
        // 手動入力のセット単位RPE、またはAI入力の種目単位RPEを取得
        const rpeVal = s.rpe || ex.rpe; 
        return `<span class="history-set-badge">Set${i + 1}: ${s.weight}kg × ${s.reps}回${rpeVal ? ' (RPE' + rpeVal + ')' : ''}</span>`;
      }).join('');
    }
    div.innerHTML = `<div class="history-exercise-name">${ex.name}</div><div class="history-sets">${setsHtml}</div>
      <div class="history-exercise-actions"><button class="btn-edit-ex" data-date="${ds}" data-idx="${idx}">編集</button><button class="btn-delete-ex" data-date="${ds}" data-idx="${idx}">削除</button></div>`;
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
    html += `<div class="form-group"><label class="form-label">実施時間（分）</label><input type="number" class="input-muscle" id="edit-duration" value="${ex.duration || 0}" min="1"></div>`;
  } else {
    ex.sets.forEach((s, i) => {
      html += `<div class="manual-set-row"><span class="set-label">Set${i + 1}</span><input type="number" class="input-muscle edit-weight" value="${s.weight}" step="0.5" placeholder="kg"><input type="number" class="input-muscle edit-reps" value="${s.reps}" placeholder="回"><input type="number" class="input-muscle edit-rpe manual-rpe" value="${s.rpe || ''}" placeholder="RPE" min="1" max="10"></div>`;
    });
  }
  body.innerHTML = html;
  $('#btn-save-edit').onclick = () => {
    if (isC) { ex.duration = parseInt($('#edit-duration').value) || 0; }
    else {
      const ws = body.querySelectorAll('.edit-weight'), rs = body.querySelectorAll('.edit-reps'), rpes = body.querySelectorAll('.edit-rpe');
      ex.sets = []; 
      ws.forEach((w, i) => { 
        ex.sets.push({ 
          weight: parseFloat(w.value) || 0, 
          reps: parseInt(rs[i].value) || 0,
          rpe: parseInt(rpes[i].value) || null
        }); 
      });
    }
    saveHistory(); closeModal('modal-edit-exercise'); showHistoryDetail(date); showToast('更新完了！パワー！');
  };
  openModal('modal-edit-exercise');
}

// ---------- TRAINING ----------
function initTraining() {
  // 既に作成途中のプランがある場合、画面を復元して再描画
  if (state.currentPlan) {
    $('#no-plan').classList.add('hidden');
    $('#plan-area').classList.remove('hidden');
    $('#btn-complete').classList.remove('hidden');
    renderPlan(state.currentPlan);
  } else {
    $('#no-plan').classList.remove('hidden');
    $('#plan-area').classList.add('hidden');
    $('#btn-complete').classList.add('hidden');
  }

  $('#btn-generate').addEventListener('click', () => openModal('modal-conditions'));
  $('#btn-regenerate').addEventListener('click', () => { 
    showConfirm('貴重なAPIパワー（1日20回制限）を消費してメニューを作り直すかい！？', () => {
      state.currentPlan = null;
      saveCurrentPlan(); 
      $('#plan-area').classList.add('hidden'); $('#no-plan').classList.remove('hidden'); $('#btn-complete').classList.add('hidden'); openModal('modal-conditions'); 
    });
  });
  $$('.time-btn').forEach(b => b.addEventListener('click', () => { $$('.time-btn').forEach(x => x.classList.remove('active')); b.classList.add('active'); state.selectedTime = parseInt(b.dataset.time); }));
  $('#btn-start-generate').addEventListener('click', () => { closeModal('modal-conditions'); generatePlan(); });
  $('#btn-complete').addEventListener('click', completePlan);
}

async function generatePlan() {
  $('#no-plan').classList.add('hidden'); $('#plan-area').classList.add('hidden'); $('#loading-area').classList.remove('hidden');
  const qEl = $('#loading-quote');
  if (qEl) qEl.textContent = LOADING_QUOTES[Math.floor(Math.random() * LOADING_QUOTES.length)];
  const tStatus = $('#training-status-text');
  if (tStatus) tStatus.textContent = '筋肉ルーレット回転中...';
  try {
    const cond = gatherConditions(), hist = getRecentHistory(5), prompt = buildPrompt(cond, hist);
    const resp = await callGeminiAPI(prompt), plan = parseGeminiResponse(resp);
    state.currentPlan = plan;
    saveCurrentPlan(); 
    renderPlan(plan);
    $('#loading-area').classList.add('hidden'); $('#plan-area').classList.remove('hidden');
    if (tStatus) tStatus.textContent = 'メニュー生成完了！さあ、始めよう！';
  } catch (e) {
    console.error(e); $('#loading-area').classList.add('hidden'); $('#no-plan').classList.remove('hidden');
    if (tStatus) tStatus.textContent = 'さあ、筋肉との対話を始めよう！';
    showToast('エラーだ！もう一度試してくれ！ ' + e.message);
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
  const exData = getAvailableExercises().map(e => `- ${e.exercise_name}(ID:${e.id}) 主動筋:${e.primary_muscle} 補助筋:${e.secondary_muscles.join(',') || 'なし'} 重量刻み:${e.weight_step}kg${e.is_cardio ? ' [有酸素]' : ''}`).join('\n');
  const histText = hist.length > 0 ? hist.map(h => {
    const ed = h.exercises.map(ex => {
      if (isCardio(ex.id)) return `  - ${ex.name}: ${ex.duration || 0}分`;
      return `  - ${ex.name}: ${ex.sets.map((s, i) => `Set${i + 1}:${s.weight}kg×${s.reps}回`).join(', ')}${ex.rpe ? ' RPE:' + ex.rpe : ''}`;
    }).join('\n'); return `【${h.date}】\n${ed}`;
  }).join('\n') : '（履歴なし）';

  // ★名言をランダムに1つ選択
  const randomQuote = KINNIKUN_QUOTES[Math.floor(Math.random() * KINNIKUN_QUOTES.length)];

  // 先ほど修正した爽やかなトーンのプロンプトに、名言の指示を追加
  const sys = `あなたは「なかやまきんに君」です。以下のルールを守って、メニュー最後の短いメッセージを作成してください。

## トーン＆マナーの【絶対ルール】（やっつけ仕事・解説の禁止）:
- 現実の「なかやまきんに君」のように、YouTubeの挨拶のような「礼儀正しく、シンプルで熱いトーン」にしてください。
- **長文は絶対に禁止です。** 全体で「3〜4文以内（最大でも80文字程度）」に極限まで短く、テンポ良くまとめてください。
- 今回鍛えた筋肉の部位を全て羅列したり、筋肥大のメカンズムを語るような「AIらしい長々とした説明・解説」は【絶対に】しないでください。
- 語尾に「ヤー！」「パワー！」「ハッ（笑顔）」の【すべてを機械的に繋げて並べること（例：ヤー！パワー！ハッ（笑顔）！）】は不自然なので絶対にやめてください。文脈に合わせて、どれか1つか2つを自然に使って締めてください。

## ★必須条件（名言の組み込み）:
以下の【本日の名言】を、メッセージの中に1文で自然に組み込んでください。
【本日の名言】：${randomQuote}

## 理想のメッセージ出力例（このテンポと自然な語尾を守ること）:
- 「今日のトレーニングもお疲れ様でした！『やれることのみをやる。それが大事なんだ！』明日も筋肉を育てていきましょう！パワー！！」
- 「素晴らしい集中力ですね！『筋肉は最高のファッションだ！』の精神で、これからも頑張りましょう！ヤー！！」
- 「よく最後までやり切りました！『今日の自分は、昨日より強い！』です。しっかり休んで超回復させましょう！ハッ（笑顔）」

## 種目マスタ（以下のみ使用可能）:
${exData}

## メニュー構成の【絶対ルール】（専門的なプログラミング）:
1. **種目の順序（必須）**: 必ず「コンパウンド種目（多関節種目：ベンチプレス、スクワット等）」を先に配置し、「アイソレーション種目（単関節種目：フライ、アームカール等）」を後半に配置すること。
2. **目的別のボリューム設定（必須）**: ユーザーの目的に応じて、以下の基準でセット数・回数（reps）・休憩（rest_seconds）を設定すること。
   - 【筋肥大】: 8〜12回 / 3〜4セット / 休憩90〜120秒
   - 【筋力アップ】: 3〜6回 / 3〜5セット / 休憩180〜300秒
   - 【ダイエット】: 10〜15回 / 3セット / 休憩60〜90秒 ＋ 有酸素運動を必ず組み込む
   - 【健康維持】: 12〜15回 / 2〜3セット / 休憩90秒
3. **重量設定と漸進性過負荷**: 重量は各種目のweight_step刻みで設定（0は自重）。前回の履歴のRPEが8以下なら重量をweight_step分増やすか、回数を増やす。RPEが9〜10なら前回と同じ重量を維持する。
4. **分割法（スプリット）の自動推論**: ユーザーの「週の頻度」と「直近履歴」から本日のターゲット部位を決定すること。
   - 週1〜2回: 全身をバランスよく鍛えるメニュー（全身法）。
   - 週3〜4回: 上半身/下半身、またはプッシュ/プル/脚などで分割し、直近履歴で鍛えた部位と被らないようにする。
   - 週5回以上: 細かく部位を分割し、直近履歴から完全に回復している部位をターゲットにする。
5. **怪我の配慮と自由要望**: ユーザーが指定した「今日痛みがある部位」に関連する種目は完全に除外すること。自由要望がある場合は、上記すべてのルールよりも自由要望を最優先すること。

## JSON出力形式（必ずJSONのみを出力）:
{"exercises":[{"exercise_id":"chest_001","exercise_name":"バーベルベンチプレス","primary_muscle":"大胸筋","sets":3,"reps":10,"weight_kg":60,"rest_seconds":90,"note":"（アドバイス）"}],"cardio_exercises":[{"exercise_id":"cardio_001","exercise_name":"有酸素運動","duration_minutes":20,"note":"（アドバイス）"}],"warmup":"ウォームアップ内容","cooldown":"クールダウン内容","total_estimated_minutes":45,"trainer_message":"（名言を交えた、極めて短く自然なメッセージ）"}
`;

  const usr = `## ユーザー: 目的:${p.goal} 経験:${p.experience} 活動量:${p.activity} 痛み:${p.painAreas.length ? p.painAreas.join(',') : 'なし'} 優先:${p.priorityMuscles.length ? p.priorityMuscles.join(',') : '特になし'} 頻度:${p.frequency}回/週
## 今日: 時間:${cond.time}分 疲労:${cond.fatigue} 痛み:${cond.todayPain.length ? cond.todayPain.join(',') : 'なし'}${cond.freeRequest ? ` 【最優先】要望:${cond.freeRequest}` : ''}
## 直近履歴:\n${histText}
最適メニューをJSON生成。重量はweight_step刻みで。`;

  return { systemPrompt: sys, userPrompt: usr };
}

async function callGeminiAPI({ systemPrompt, userPrompt }) {
  const apiKey = getApiKey();
  if (!apiKey) { 
    showApiKeyModal(); 
    throw new Error('APIキーが未設定だ！設定してくれ！パワー！'); 
  }

  // ★変更: ループを廃止し、現在選択されているモデルのみを愚直に実行する
  const selectedModel = getSelectedModel();
  const url = getApiUrl(selectedModel);

  try {
    console.log(`Trying model: ${selectedModel}...`);
    const r = await fetch(url, { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({ 
        contents: [{ parts: [{ text: userPrompt }] }], 
        systemInstruction: { parts: [{ text: systemPrompt }] }, 
        generationConfig: { 
          temperature: 0.7, 
          topP: 0.9, 
          topK: 40, 
          responseMimeType: "application/json" 
        } 
      }) 
    });

    if (!r.ok) {
      // ★追加: HTTPステータスコードに応じた具体的なエラーメッセージの分岐
      if (r.status === 400) {
        throw new Error('リクエストが不正だ！(400) プロフィールの設定を見直してくれ！');
      }
      if (r.status === 403) { 
        showApiKeyModal(); 
        throw new Error('APIキーが無効だ！(403) 正しいキーを設定してくれ！'); 
      }
      if (r.status === 429) {
        throw new Error(`【${selectedModel}】のAPI上限（回数制限）に達したぞ！(429) 「マイマッスル」から別のAIモデルに変更してくれ！`);
      }
      if (r.status === 500) {
        throw new Error('Googleのサーバーでエラーが発生したぞ！(500) 別のモデルに変更するか、時間を置いて試してくれ！');
      }
      if (r.status === 503) {
        throw new Error('現在AIのサーバーが混み合っているぞ！(503) 別のモデルに変更するか、時間を置いて試してくれ！');
      }
      
      // その他の予期せぬエラー
      throw new Error(`謎のエラーだ！(ステータス: ${r.status}) 「マイマッスル」から別のAIモデルに変更してみてくれ！`);
    }

    const res = await r.json();
    console.log(`Model ${selectedModel} success!`);
    return res;
    
  } catch (e) {
    console.warn(`Model ${selectedModel} failed...`, e);
    // 発生したエラー（カスタムメッセージ）をそのまま generatePlan に投げてトースト表示させる
    throw e; 
  }
}

function parseGeminiResponse(r) {
  // APIからの応答自体が空の場合のガード
  if (!r || !r.candidates || !r.candidates[0] || !r.candidates[0].content) {
    throw new Error('AIから空の返事が来たぞ！パワー！');
  }
  
  const text = r.candidates[0].content.parts[0].text;
  
  try { 
    // 1. そのままパース
    return JSON.parse(text.trim()); 
  } catch (e1) { 
    try {
      // 2. Markdown記号（```json ... ```）の中身だけを抽出
      const m = text.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (m) return JSON.parse(m[1].trim());
      throw new Error('No valid JSON block found');
    } catch (e2) {
      console.error('Final Parse Attempt Failed:', text);
      throw new Error('<span class="text-keep">AIの筋肉（JSON）が</span><span class="text-keep">壊れているようだ！</span><br><span class="text-keep">もう一度ルーレットを回してくれ！</span><span class="text-keep">パワー！</span>');
    }
  }
}

function renderPlan(plan) {
  const list = $('#plan-list'); list.innerHTML = '';
  if (plan.warmup) {
    const d = document.createElement('div');
    d.className = 'plan-exercise';
    d.style.borderColor = 'var(--orange)';
    d.innerHTML = `
      <div class="exercise-header">
        <div class="exercise-number" style="background:var(--orange)">W</div>
        <div class="exercise-name" style="font-size:1.2rem;">ウォームアップ</div>
      </div>
      <div style="display:flex; align-items:center; gap:1rem; margin-top:0.5rem;">
        <img src="bike.png" alt="バイク" style="width:80px; height:auto; filter:drop-shadow(2px 2px 0 rgba(0,0,0,0.2));" onerror="this.style.display='none';">
        <div class="exercise-note" style="flex:1; font-weight:900;">${plan.warmup}</div>
      </div>`;
    list.appendChild(d);
  }

  const allEx = [...(plan.exercises || []), ...(plan.cardio_exercises || []).map(c => ({ ...c, _isCardio: true }))];
  allEx.forEach((ex, idx) => {
    const div = document.createElement('div'); div.className = 'plan-exercise'; div.style.animation = `exerciseIn 0.4s ease-out ${idx * 0.1}s both`;
    const masterEx = EXERCISE_MASTER.find(m => m.id === ex.exercise_id);
    const isCar = ex._isCardio || isCardio(ex.exercise_id);

    let inputsHtml = '';
    if (isCar) {
      inputsHtml = `<div class="cardio-duration-row"><span class="cardio-duration-label">⏱️ 実施時間:</span><input type="number" class="input-muscle input-cardio-dur" value="${ex.duration_minutes || 20}" min="1" data-ex="${idx}"><span class="cardio-duration-label" style="margin-right:auto;">分</span><input type="checkbox" class="set-check" data-ex="${idx}"></div>`;
    } else {
      inputsHtml = `<div class="sets-container"><div class="set-row"><div class="set-label"></div><div class="input-header">重量(kg)</div><div class="input-header">回数</div><div class="input-header">✓</div></div>`;
      for (let s = 0; s < (ex.sets || 3); s++) {
        inputsHtml += `<div class="set-row"><div class="set-label">Set${s + 1}</div><input type="number" class="input-muscle input-weight" value="${ex.weight_kg || ''}" placeholder="kg" data-ex="${idx}" data-set="${s}" step="${masterEx ? masterEx.weight_step : 2.5}"><input type="number" class="input-muscle input-reps" value="${ex.reps || ''}" placeholder="回" data-ex="${idx}" data-set="${s}"><input type="checkbox" class="set-check" data-ex="${idx}" data-set="${s}"></div>`;
      }
      inputsHtml += `</div>
      <div class="rpe-section" style="background:transparent; border:none; padding:0; margin-top:1.5rem;">
        <div class="rpe-label" style="font-size:0.95rem; line-height:1.4;"><span class="text-keep">（筋肉に問いかけながら）</span><br><span class="text-keep">どうなんだい！？オレの筋肉！</span><span class="text-keep">まだいけるのかい！？</span></div>
        <div class="rpe-slider-wrapper">
          <div class="rpe-track-bg">
            <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span>
          </div>
          <input type="range" class="rpe-slider" min="1" max="10" value="7" data-ex="${idx}">
        </div>
      </div>`;
    }

    div.innerHTML = `<div class="exercise-header"><div class="exercise-number">${idx + 1}</div><div class="exercise-name">${ex.exercise_name}</div><span class="exercise-muscle-tag">${ex.primary_muscle || (masterEx ? masterEx.primary_muscle : '')}</span></div>${ex.note ? `<div class="exercise-note">${ex.note}</div>` : ''}${!isCar ? `<div class="exercise-recommendation">推奨: ${ex.weight_kg || '?'}kg × ${ex.reps || '?'}回 × ${ex.sets || '?'}セット 休憩:${ex.rest_seconds || 90}秒</div>` : ''}${inputsHtml}`;
    list.appendChild(div);
    setTimeout(() => {
      div.querySelectorAll('.set-check').forEach(cb => cb.addEventListener('change', checkAllSetsCompleted));
    }, 0);
  });

  if (plan.cooldown) { const d = document.createElement('div'); d.className = 'plan-exercise'; d.style.borderLeft = 'none'; d.innerHTML = `<div class="exercise-header"><div class="exercise-number" style="background:linear-gradient(135deg,var(--green),var(--sky)); color:var(--text-primary);">C</div><div class="exercise-name">クールダウン</div></div><div class="exercise-note">${plan.cooldown}</div>`; list.appendChild(d); }
  if (plan.trainer_message) { const d = document.createElement('div'); d.className = 'plan-exercise'; d.style.textAlign = 'center'; d.style.borderLeft = 'none'; d.innerHTML = `<div style="font-family:var(--font-title);color:var(--text-primary);font-weight:900;margin-bottom:0.8rem;font-size:1.1rem;text-shadow:1px 1px 0 var(--yellow);"><span class="text-keep">★ なかやまきんに君からの</span><span class="text-keep">ひとこと ★</span></div><div style="font-family:var(--font-title);color:var(--red);font-weight:900;font-size:1.05rem;line-height:1.5;letter-spacing:0.5px;padding:0.5rem;background:var(--red-light);border-radius:var(--radius-sm);">${plan.trainer_message}</div>`; list.appendChild(d); }
  $('#btn-complete').classList.remove('hidden');
}

function checkAllSetsCompleted() { const a = $$('.set-check'), btn = $('#btn-complete'); btn.style.animation = [...a].every(c => c.checked) && a.length > 0 ? 'pulse 0.5s infinite alternate' : 'none'; }

function completePlan() {
  if (!state.currentPlan) return;

  const allEx = [...(state.currentPlan.exercises || []), ...(state.currentPlan.cardio_exercises || []).map(c => ({ ...c, _isCardio: true }))];
  const completedExercises = [];

  allEx.forEach((ex, idx) => {
    // この種目のチェックボックスをすべて取得し、一つでもチェックがあるか確認
    const checkboxes = $$(`.set-check[data-ex="${idx}"]`);
    const isChecked = [...checkboxes].some(cb => cb.checked);

    if (isChecked) {
      const isCar = ex._isCardio || isCardio(ex.exercise_id);
      if (isCar) {
        const durIn = $(`.input-cardio-dur[data-ex="${idx}"]`);
        completedExercises.push({ id: ex.exercise_id, name: ex.exercise_name, duration: durIn ? parseInt(durIn.value) || 0 : ex.duration_minutes || 0, sets: [], rpe: null });
      } else {
        const sets = []; 
        $$(`.input-weight[data-ex="${idx}"]`).forEach((w, s) => { 
          const ri = $(`.input-reps[data-ex="${idx}"][data-set="${s}"]`); 
          sets.push({ weight: parseFloat(w.value) || 0, reps: parseInt(ri.value) || 0 }); 
        });
        const rsl = $(`.rpe-slider[data-ex="${idx}"]`);
        completedExercises.push({ id: ex.exercise_id, name: ex.exercise_name, sets, rpe: rsl ? parseInt(rsl.value) : null });
      }
    }
  });

  const finalizePlan = () => {
    state.currentPlan = null;
    saveCurrentPlan();
    $('#plan-area').classList.add('hidden');
    $('#no-plan').classList.remove('hidden');
    $('#btn-complete').classList.add('hidden');
    $('#training-status-text').textContent = 'さあ、筋肉との対話を始めよう！';
    renderCalendar();
  };

  // 一つもチェックがない場合の確認フロー
  if (completedExercises.length === 0) {
    showConfirm('ひとつもチェックが入っていないぞ！このままプランを削除していいですか？', () => {
      finalizePlan();
      showToast('プランを削除したぞ。次はもっと追い込んでいこう！パワー！');
    });
    return;
  }

  const todayStr = formatDate(new Date());
  if (state.trainingHistory[todayStr]) state.trainingHistory[todayStr].exercises.push(...completedExercises);
  else state.trainingHistory[todayStr] = { date: todayStr, exercises: completedExercises };

  saveHistory();
  showCelebration(completedExercises);
  finalizePlan();
  showToast(`${completedExercises.length}種目やりきったな！履歴に保存したぞ！ヤー！`);
}

function showCelebration(exercises) {
  $('#modal-complete').classList.remove('hidden');
  
  // 名言をランダムに表示
  const randomQuote = KINNIKUN_QUOTES[Math.floor(Math.random() * KINNIKUN_QUOTES.length)];
  const quoteEl = $('#celebration-quote-text');
  if(quoteEl) quoteEl.textContent = randomQuote;

  const ts = exercises.reduce((s, e) => s + (e.sets ? e.sets.length : 0), 0), tv = exercises.reduce((s, e) => s + (e.sets ? e.sets.reduce((a, st) => a + st.weight * st.reps, 0) : 0), 0);
  $('#celebration-stats').innerHTML = `<div class="stat-item"><div class="stat-value">${exercises.length}</div><div class="stat-label">種目</div></div><div class="stat-item"><div class="stat-value">${ts}</div><div class="stat-label">セット</div></div><div class="stat-item"><div class="stat-value">${Math.round(tv).toLocaleString()}</div><div class="stat-label"><span class="text-keep">総ボリューム</span><span class="text-keep">(kg)</span></div></div>`;
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
  const exs = getAvailableExercises();
  const groups = {};
  exs.forEach(ex => {
    const pm = ex.primary_muscle || 'その他';
    if (!groups[pm]) groups[pm] = [];
    groups[pm].push(ex);
  });
  const order = ['大胸筋', '大胸筋上部', '広背筋', '脊柱起立筋', '大腿四頭筋', 'ハムストリングス', '大臀筋', '中臀筋', '内転筋', '三角筋前部', '三角筋中部', '三角筋後部', '上腕二頭筋', '上腕三頭筋', '前腕筋群', '腹直筋', '腹直筋下部', '心肺機能', 'その他'];
  const sortedCats = Object.keys(groups).sort((a,b) => {
    let ixA = order.indexOf(a); if(ixA === -1) ixA=999;
    let ixB = order.indexOf(b); if(ixB === -1) ixB=999;
    return ixA - ixB;
  });
  let opts = '<option value="">種目を選択</option>';
  sortedCats.forEach(c => { opts += `<optgroup label="${c}">${groups[c].map(e => `<option value="${e.id}">${e.exercise_name}</option>`).join('')}</optgroup>`; });

  entry.innerHTML = `<select class="manual-exercise-select">${opts}</select><div class="manual-inputs-area"></div><button class="btn-remove-exercise" type="button">✕ 削除</button>`;
  const select = entry.querySelector('.manual-exercise-select');
  const inputsArea = entry.querySelector('.manual-inputs-area');

  select.addEventListener('change', () => {
    const exId = select.value;
    if (!exId) { inputsArea.innerHTML = ''; return; }
    if (isCardio(exId)) {
      inputsArea.innerHTML = `<div class="cardio-duration-row"><span class="cardio-duration-label">実施時間:</span><input type="number" class="input-muscle manual-duration" placeholder="分" min="1" value="20"><span class="cardio-duration-label">分</span></div>`;
    } else {
      const master = getAvailableExercises().find(m => m.id === exId);
      const step = master ? master.weight_step : 2.5;
      inputsArea.innerHTML = `${[1, 2, 3].map(i => `<div class="manual-set-row"><span class="set-label">Set${i}</span><input type="number" class="input-muscle manual-weight" placeholder="kg" step="${step}"><input type="number" class="input-muscle manual-reps" placeholder="回"><input type="number" class="input-muscle manual-rpe" placeholder="RPE" min="1" max="10"></div>`).join('')}`;
      
      // セット1の内容をセット2, 3へ自動反映するロジック
      const weights = inputsArea.querySelectorAll('.manual-weight');
      const reps = inputsArea.querySelectorAll('.manual-reps');
      const rpes = inputsArea.querySelectorAll('.manual-rpe');
      
      // セット1の内容を同期させる関数 (すでにユーザーが触った欄は上書きしない)
      const syncSets = (inputs, type) => {
        if (inputs.length < 2) return;
        
        ['input', 'change'].forEach(evName => {
          inputs.forEach((input, idx) => {
            if (idx > 0) {
              input.addEventListener(evName, () => {
                input.dataset.dirty = 'true';
              });
            }
          });

          inputs[0].addEventListener(evName, (e) => {
            const val = e.target.value;
            for (let i = 1; i < inputs.length; i++) {
              if (inputs[i].dataset.dirty !== 'true') {
                inputs[i].value = val;
              }
            }
          });
        });
      };

      syncSets(weights, 'weight');
      syncSets(reps, 'reps');
      syncSets(rpes, 'rpe');
    }
  });

  entry.querySelector('.btn-remove-exercise').addEventListener('click', () => entry.remove());
  container.appendChild(entry);
}

function saveManualTraining() {
  const ds = $('#manual-date').value; if (!ds) { showToast('日付を入力してくれ！'); return; }
  const exercises = [];
  $$('.manual-exercise-entry').forEach(entry => {
    const sel = entry.querySelector('.manual-exercise-select'); if (!sel.value) return;
    const master = getAvailableExercises().find(m => m.id === sel.value); if (!master) return;
    if (isCardio(sel.value)) {
      const dur = entry.querySelector('.manual-duration');
      exercises.push({ id: master.id, name: master.exercise_name, duration: parseInt(dur?.value) || 0, sets: [], rpe: null });
    } else {
      const ws = entry.querySelectorAll('.manual-weight'), rs = entry.querySelectorAll('.manual-reps'), sets = [];
      const rpes = entry.querySelectorAll('.manual-rpe');
      ws.forEach((w, i) => { 
        const wt = parseFloat(w.value), rp = parseInt(rs[i].value), rpeVal = parseInt(rpes[i].value); 
        if (wt || rp) sets.push({ weight: wt || 0, reps: rp || 0, rpe: rpeVal || null }); 
      });
      if (sets.length > 0) exercises.push({ id: master.id, name: master.exercise_name, sets, rpe: null });
    }
  });
  if (!exercises.length) { showToast('種目を1つ以上入力！パワー！'); return; }
  if (state.trainingHistory[ds]) state.trainingHistory[ds].exercises.push(...exercises);
  else state.trainingHistory[ds] = { date: ds, exercises };
  saveHistory(); closeModal('modal-manual'); renderCalendar(); showToast('手動記録完了！ヤー！！');
}

// ---------- PROFILE TAB ----------
function initProfile() {
  const form = $('#profile-form'), sl = $('#p-frequency'), sv = $('#p-frequency-value');
  sl.addEventListener('input', () => { sv.textContent = sl.value; });
  setupExclusiveNone('p-pain');
  form.addEventListener('submit', e => {
    e.preventDefault(); const fd = new FormData(form);
    state.userProfile = { ...state.userProfile, targetWeight: parseFloat(fd.get('p-targetWeight')) || null, goal: fd.get('p-goal'), experience: fd.get('p-experience'), activity: fd.get('p-activity'), painAreas: fd.getAll('p-pain').filter(v => v !== 'なし'), priorityMuscles: fd.getAll('p-priority'), frequency: parseInt(sl.value) };
    saveProfile(); 
    populateProfileForm(); 
    showToast('<span class="text-keep">プロフィール更新完了！</span><span class="text-keep">ヤー！！パワー！！</span>');
  });

  // モデル選択プルダウンのイベントリスナー
  const modelSelect = $('#profile-ai-model');
  if (modelSelect) {
    modelSelect.addEventListener('change', (e) => {
      saveSelectedModel(e.target.value);
      showToast('AIモデルを変更したぞ！パワー！');
    });
  }
  populateProfileForm();
}

function populateProfileForm() {
  const ak = getApiKey();
  if (ak) {
    $('#profile-api-key').value = '●●●●●●●●●●●●●●～';
  } else {
    $('#profile-api-key').value = '';
  }
  const ms = $('#profile-ai-model');
  if (ms) ms.value = getSelectedModel();

  if (!state.userProfile) return;
  const p = state.userProfile;
  if (p.targetWeight) $('#p-targetWeight').value = p.targetWeight;
  const setRadio = (name, val) => { const r = $(`input[name="${name}"][value="${val}"]`); if (r) r.checked = true; };
  setRadio('p-goal', p.goal); setRadio('p-experience', p.experience); setRadio('p-activity', p.activity);
  $$('input[name="p-pain"]').forEach(cb => { cb.checked = p.painAreas.includes(cb.value) || (p.painAreas.length === 0 && cb.value === 'なし'); });
  $$('input[name="p-priority"]').forEach(cb => { cb.checked = p.priorityMuscles.includes(cb.value); });
  const sl = $('#p-frequency'); sl.value = p.frequency; $('#p-frequency-value').textContent = p.frequency;
}

// ---------- API KEY MANAGEMENT ----------
function showApiKeyModal() { openModal('modal-apikey'); }

function initApiKey() {
  // Modal save button
  $('#btn-save-apikey-modal').addEventListener('click', () => {
    const key = $('#apikey-input').value.trim();
    if (!key) { showToast('APIキーを入力してくれ！💪'); return; }
    saveApiKey(key); closeModal('modal-apikey');
    showToast('<span class="text-keep">APIキー保存完了！</span><span class="text-keep">さあ、筋肉との対話だ！💪</span>');
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
  // 体重記録(bodyRecord)も含めた全データをバックアップ
  const data = { 
    version: 1, 
    exportDate: new Date().toISOString(), 
    profile: state.userProfile, 
    history: state.trainingHistory,
    body: state.bodyRecord,
    customExercises: state.customExercises
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); 
  a.href = url; 
  a.download = `muscle_dialogue_backup.json`; // ★ファイル名を固定化
  document.body.appendChild(a); 
  a.click(); 
  document.body.removeChild(a); 
  URL.revokeObjectURL(url);
  showToast('バックアップ完了！最新のデータを保存したぞ！💪');
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
      if (data.body) state.bodyRecord = data.body;
      if (data.customExercises !== undefined) {
        state.customExercises = data.customExercises;
        saveCustomExercises();
      }
      saveProfile(); saveHistory(); saveBodyRecord(); renderCalendar(); populateProfileForm();
      showToast('<span class="text-keep">復元完了！筋肉のデータが</span><span class="text-keep">蘇ったぞ！ヤー！！💪</span>');
    } catch (err) { showToast('ファイルが読み込めなかったぞ！😤'); }
  };
  reader.readAsText(file); e.target.value = '';
}

// ---------- UTILITIES ----------
function formatDate(d) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }

function showToast(msg) {
  let t = $('#toast-notification');
  if (!t) { 
    t = document.createElement('div'); 
    t.id = 'toast-notification'; 
    // ★ width:max-content と word-break:keep-all を追加して箱のサイズと改行位置を最適化
    t.style.cssText = 'position:fixed;bottom:2rem;left:50%;transform:translateX(-50%) translateY(300px);background:#D4001F;color:white;padding:1rem 2rem;border-radius:12px;font-family:"Noto Sans JP",sans-serif;font-weight:700;font-size:0.9rem;z-index:9999;box-shadow:0 4px 16px rgba(212,0,31,0.3);transition:transform 0.4s cubic-bezier(0.4,0,0.2,1);width:max-content;max-width:90%;word-break:keep-all;text-align:center;'; 
    document.body.appendChild(t); 
  }
  // ★ HTMLタグ（.text-keepなど）をそのまま解釈できるように innerHTML に変更
  t.innerHTML = msg; 
  requestAnimationFrame(() => { t.style.transform = 'translateX(-50%) translateY(0)'; });
  setTimeout(() => { t.style.transform = 'translateX(-50%) translateY(300px)'; }, 3000);
}

// ---------- CUSTOM CONFIRM MODAL ----------
function showConfirm(message, onConfirm) {
  let overlay = $('#custom-confirm-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'custom-confirm-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:10000;display:flex;align-items:center;justify-content:center;padding:1rem;';
    
    // インラインのダークテーマを廃止し、CSS変数と既存のポップ用クラス(btn-primary等)を使用して再構築
    overlay.innerHTML = `
      <div style="background:var(--white); border:4px solid var(--text-primary); border-radius:var(--radius-lg); padding:2.5rem 1.5rem; max-width:360px; width:100%; text-align:center; box-shadow:8px 8px 0px var(--yellow);">
        <div id="confirm-message" style="color:var(--text-primary); font-family:var(--font-title); font-weight:900; font-size:1.15rem; margin-bottom:2rem; line-height:1.5; letter-spacing:0.05em;"></div>
        <div style="display:flex; gap:1rem; justify-content:center;">
          <button id="confirm-yes" class="btn-primary" style="flex:1; padding:0.8rem 0; font-size:1rem; width:auto; max-width:none;">はい</button>
          <button id="confirm-no" class="btn-secondary" style="flex:1; padding:0.8rem 0; font-size:1rem; width:auto; max-width:none; background:var(--white); color:var(--text-primary);">やめる</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
  }
  $('#confirm-message').textContent = message;
  overlay.style.display = 'flex';
  
  $('#confirm-yes').onclick = () => { overlay.style.display = 'none'; onConfirm(); };
  $('#confirm-no').onclick = () => { overlay.style.display = 'none'; };
  overlay.onclick = (e) => { if (e.target === overlay) overlay.style.display = 'none'; };
}

// ---------- BODY DASHBOARD (マイマッスル) ----------
let weightChartInstance = null;

function initBodyDashboard() {
  $('#body-date').value = formatDate(new Date());
  $('#btn-save-weight').addEventListener('click', saveWeight);
  
  // タブ切り替え時にグラフを描画
  $$('.tab-btn[data-tab="profile"]').forEach(btn => {
    btn.addEventListener('click', renderWeightChart);
  });
}

function saveWeight() {
  const ds = $('#body-date').value;
  const weightStr = $('#body-weight').value.trim();
  
  // 日付の入力は必須
  if (!ds) { 
    showToast('日付を選択してくれ！パワー！'); 
    return; 
  }
  
  // ▼ 1. 体重が空欄の場合（削除処理）
  if (weightStr === '') {
    if (state.bodyRecord[ds]) {
      delete state.bodyRecord[ds]; // データを削除
      saveBodyRecord();
      renderWeightChart();
      showToast('記録を削除したぞ！ヤー！');
      $('#body-feedback').classList.add('hidden'); // フィードバックを非表示に戻す
    } else {
      showToast('その日にはまだ記録がないぞ！');
    }
    return;
  }
  
  // ▼ 2. 体重が入力されている場合（新規追加 or 上書き処理）
  const wt = parseFloat(weightStr);
  if (isNaN(wt)) {
    showToast('正しい数値を入力してくれ！パワー！');
    return;
  }
  
  const prevWeight = getLatestWeightBefore(ds);
  
  // 同じ日付 ds が既に存在すれば、自動的にこの1行で上書きされます
  state.bodyRecord[ds] = wt; 
  
  saveBodyRecord();
  renderWeightChart();
  showToast('ボディ記録完了！ヤー！');
  showLocalFeedback(wt, prevWeight);
}

function getLatestWeightBefore(dateStr) {
  const dates = Object.keys(state.bodyRecord).filter(d => d < dateStr).sort();
  return dates.length > 0 ? state.bodyRecord[dates[dates.length - 1]] : null;
}

function showLocalFeedback(current, prev) {
  const box = $('#body-feedback');
  const textEl = $('#body-feedback-text');
  const goal = state.userProfile?.goal || '健康維持';
  let msg = '素晴らしい継続だ！筋肉も喜んでるぞ！ヤー！！';

  if (prev) {
    const diff = current - prev;
    if (goal === 'ダイエット') {
      if (diff < 0) msg = `前回から ${Math.abs(diff).toFixed(1)}kg 減ったぞ！しっかり絞れてきてるな！その調子だ！ハッ（笑顔）`;
      else if (diff > 0) msg = `少し体重が増えたな！だが気にするな！筋肉が増えた証拠かもしれないぞ！パワー！！`;
    } else if (goal === '筋肥大' || goal === '筋力アップ') {
      if (diff > 0) msg = `前回から ${diff.toFixed(1)}kg 増えたぞ！素晴らしいバルクアップだ！筋肉がデカくなりたがってるぞ！ヤー！！`;
      else if (diff < 0) msg = `少し落ちたが気にするな！しっかり食べて、重いものを挙げるだけだ！パワー！！`;
    }
  }
  
  textEl.textContent = msg;
  box.classList.remove('hidden');
}

function renderWeightChart() {
  const ctx = $('#weightChart');
  if (!ctx) return;
  
  const sortedDates = Object.keys(state.bodyRecord).sort().slice(-14); // 直近14日分
  const weights = sortedDates.map(d => state.bodyRecord[d]);
  
  // 目標体重の配列作成（設定されていれば）
  const targetWt = state.userProfile?.targetWeight;
  const targetData = targetWt ? sortedDates.map(() => targetWt) : [];

  if (weightChartInstance) weightChartInstance.destroy();

  weightChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: sortedDates.map(d => d.slice(5).replace('-','/')), // MM/DD
      datasets: [
        {
          label: '体重 (kg)',
          data: weights,
          borderColor: '#D4001F',
          backgroundColor: '#D4001F',
          borderWidth: 3,
          tension: 0.3,
          pointRadius: 5,
        },
        ...(targetWt ? [{
          label: '目標',
          data: targetData,
          borderColor: '#1F7BCB',
          borderWidth: 2,
          borderDash: [5, 5],
          pointRadius: 0,
          fill: false
        }] : [])
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { 
          suggestedMin: Math.min(...weights, targetWt || Infinity) - 2,
          suggestedMax: Math.max(...weights, targetWt || -Infinity) + 2
        }
      }
    }
  });
}

// ---------- EXERCISE MASTER MANAGEMENT ----------
function initExerciseMaster() {
  const btnOpen = $('#btn-open-exercise-master');
  if (btnOpen) {
    btnOpen.addEventListener('click', () => {
      renderExerciseMasterList();
      openModal('modal-exercise-master');
    });
  }
  
  const btnAdd = $('#btn-add-exercise-master');
  if (btnAdd) {
    btnAdd.addEventListener('click', () => {
      openExerciseMasterEdit(null);
    });
  }
  
  const btnReset = $('#btn-reset-exercise-master');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      showConfirm('<span class="text-keep">すべてのカスタム種目を削除し、</span><span class="text-keep">デフォルトに戻しますか？</span>', () => {
        state.customExercises = null;
        saveCustomExercises();
        renderExerciseMasterList();
        showToast('<span class="text-keep">デフォルトリストに</span><span class="text-keep">リセットしたぞ！パワー！</span>');
      });
    });
  }
  
  const btnSave = $('#btn-save-exercise-master');
  if (btnSave) {
    btnSave.addEventListener('click', saveExerciseMasterEntry);
  }
}

function renderExerciseMasterList() {
  const listContainer = $('#exercise-master-list');
  if (!listContainer) return;
  listContainer.innerHTML = '';
  const exs = getAvailableExercises();
  
  // Group by primary_muscle
  const groups = {};
  exs.forEach(ex => {
    const pm = ex.primary_muscle || 'その他';
    if (!groups[pm]) groups[pm] = [];
    groups[pm].push(ex);
  });
  
  const order = ['大胸筋', '大胸筋上部', '広背筋', '脊柱起立筋', '大腿四頭筋', 'ハムストリングス', '大臀筋', '中臀筋', '内転筋', '三角筋前部', '三角筋中部', '三角筋後部', '上腕二頭筋', '上腕三頭筋', '前腕筋群', '腹直筋', '腹直筋下部', '心肺機能', 'その他'];
  
  const sortedKeys = Object.keys(groups).sort((a, b) => {
    let ixA = order.indexOf(a); if (ixA === -1) ixA = 999;
    let ixB = order.indexOf(b); if (ixB === -1) ixB = 999;
    return ixA - ixB;
  });
  
  sortedKeys.forEach(m => {
    const divGroup = document.createElement('div');
    divGroup.className = 'ex-master-group';
    divGroup.innerHTML = `<div class="ex-master-group-title">${m}</div>`;
    groups[m].forEach(ex => {
      const card = document.createElement('div');
      card.className = 'ex-master-card';
      card.innerHTML = `
        <div class="ex-master-info">
          <div class="ex-master-name">${ex.exercise_name}${ex.is_cardio ? ' 🏃‍♂️' : ''}</div>
          <div class="ex-master-meta">補助: ${ex.secondary_muscles && ex.secondary_muscles.length ? ex.secondary_muscles.join(', ') : 'なし'} | 器具: ${ex.equipment || 'なし'} | 刻み: ${ex.weight_step}kg</div>
        </div>
        <div class="ex-master-actions">
          <button class="ex-master-btn ex-master-btn-edit" data-id="${ex.id}">編集</button>
          <button class="ex-master-btn ex-master-btn-del" data-id="${ex.id}">削除</button>
        </div>
      `;
      divGroup.appendChild(card);
    });
    listContainer.appendChild(divGroup);
  });

  listContainer.querySelectorAll('.ex-master-btn-edit').forEach(btn => {
    btn.addEventListener('click', () => openExerciseMasterEdit(btn.dataset.id));
  });
  listContainer.querySelectorAll('.ex-master-btn-del').forEach(btn => {
    btn.addEventListener('click', () => deleteExerciseMasterEntry(btn.dataset.id));
  });
}

function openExerciseMasterEdit(id) {
  const exs = getAvailableExercises();
  let ex = null;
  if (id) ex = exs.find(e => e.id === id);
  
  $('#exercise-edit-title').textContent = ex ? '種目の編集' : '新しい種目';
  $('#edit-master-id').value = id || '';
  $('#edit-master-name').value = ex ? ex.exercise_name : '';
  $('#edit-master-primary').value = ex ? ex.primary_muscle : '';
  $('#edit-master-secondary').value = ex ? (ex.secondary_muscles || []).join(', ') : '';
  $('#edit-master-equipment').value = ex ? (ex.equipment || '') : '';
  $('#edit-master-step').value = ex ? ex.weight_step : 2.5;
  $('#edit-master-cardio').checked = ex ? !!ex.is_cardio : false;
  
  openModal('modal-exercise-edit');
}

function saveExerciseMasterEntry() {
  const id = $('#edit-master-id').value;
  const name = $('#edit-master-name').value.trim();
  const primary = $('#edit-master-primary').value.trim();
  const secondaryStrs = $('#edit-master-secondary').value.split(',').map(s => s.trim()).filter(s => s);
  const equipment = $('#edit-master-equipment').value.trim();
  const step = parseFloat($('#edit-master-step').value) || 0;
  const isCardio = $('#edit-master-cardio').checked;

  if (!name || !primary) {
    showToast('<span class="text-keep">種目名とメイン部位は</span><span class="text-keep">必須だ！パワー！</span>');
    return;
  }

  // Clone defaults if custom list is empty
  if (!state.customExercises) {
    state.customExercises = JSON.parse(JSON.stringify(EXERCISE_MASTER));
  }

  if (id) {
    // Edit existing
    const idx = state.customExercises.findIndex(e => e.id === id);
    if (idx !== -1) {
      state.customExercises[idx] = { ...state.customExercises[idx], exercise_name: name, primary_muscle: primary, secondary_muscles: secondaryStrs, equipment: equipment, weight_step: step, is_cardio: isCardio };
    }
  } else {
    // Add new
    const newId = 'custom_' + Date.now();
    state.customExercises.push({ id: newId, exercise_name: name, primary_muscle: primary, secondary_muscles: secondaryStrs, equipment: equipment, weight_step: step, is_cardio: isCardio });
  }

  saveCustomExercises();
  closeModal('modal-exercise-edit');
  renderExerciseMasterList();
  showToast('<span class="text-keep">種目を保存したぞ！</span><span class="text-keep">ヤー！💪</span>');
}

function deleteExerciseMasterEntry(id) {
  showConfirm('<span class="text-keep">この種目を削除しますか？</span>', () => {
    if (!state.customExercises) {
      state.customExercises = JSON.parse(JSON.stringify(EXERCISE_MASTER));
    }
    state.customExercises = state.customExercises.filter(e => e.id !== id);
    saveCustomExercises();
    renderExerciseMasterList();
    showToast('種目を削除したぞ！');
  });
}
