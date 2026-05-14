import sys

append_code = """
// ========== 分析ダッシュボード (Analysis Dashboard) ==========
let volumeChartInstance = null;
let onermChartInstance = null;

function renderAnalysisCharts() {
  const vCtx = document.getElementById('volumeChart');
  const oCtx = document.getElementById('onermChart');
  if (!vCtx || !oCtx) return;

  // 過去30日間のデータを集計
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const dates = [];
  const volumes = [];
  const oneRMs = { 'ベンチプレス': [], 'スクワット': [], 'デッドリフト': [] };

  // 過去30日の日付リストを生成
  for (let d = new Date(thirtyDaysAgo); d <= today; d.setDate(d.getDate() + 1)) {
    const dStr = formatDate(d);
    dates.push(dStr.slice(5)); // 'MM-DD'
    let dailyVolume = 0;
    
    // その日のBIG3の最大推定1RM
    let max1RM = { 'ベンチプレス': null, 'スクワット': null, 'デッドリフト': null };

    if (state.trainingHistory[dStr]) {
      state.trainingHistory[dStr].exercises.forEach(ex => {
        // ボリューム計算
        if (ex.sets) {
          ex.sets.forEach(set => {
            const w = parseFloat(set.weight) || 0;
            const r = parseInt(set.reps) || 0;
            dailyVolume += (w * r);
            
            // 1RM推定 (Epley式: 重量 * (1 + 回数/30))
            if (oneRMs[ex.name] !== undefined) {
              const epley1RM = w * (1 + r / 30);
              if (max1RM[ex.name] === null || epley1RM > max1RM[ex.name]) {
                max1RM[ex.name] = epley1RM;
              }
            }
          });
        }
      });
    }
    volumes.push(dailyVolume);

    // 1RMデータ構築（nullの場合は前の値を引き継ぐか、0にする）
    ['ベンチプレス', 'スクワット', 'デッドリフト'].forEach(name => {
      const prevArr = oneRMs[name];
      const prevVal = prevArr.length > 0 ? prevArr[prevArr.length - 1] : null;
      if (max1RM[name] !== null) {
        prevArr.push(max1RM[name]);
      } else {
        prevArr.push(prevVal); // 前回の記録を維持
      }
    });
  }

  // ボリュームチャート描画
  if (volumeChartInstance) volumeChartInstance.destroy();
  volumeChartInstance = new Chart(vCtx, {
    type: 'bar',
    data: {
      labels: dates,
      datasets: [{
        label: '総ボリューム (kg)',
        data: volumes,
        backgroundColor: '#FF2D55',
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { x: { display: false }, y: { beginAtZero: true } }
    }
  });

  // 1RMチャート描画
  if (onermChartInstance) onermChartInstance.destroy();
  
  // nullを除外したデータセットを作成（線が途切れないようにする）
  const onermDatasets = [
    { label: 'ベンチプレス', data: oneRMs['ベンチプレス'], borderColor: '#FF2D55', tension: 0.3, spanGaps: true },
    { label: 'スクワット', data: oneRMs['スクワット'], borderColor: '#007AFF', tension: 0.3, spanGaps: true },
    { label: 'デッドリフト', data: oneRMs['デッドリフト'], borderColor: '#34C759', tension: 0.3, spanGaps: true }
  ];

  onermChartInstance = new Chart(oCtx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: onermDatasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom', labels: { color: '#ccc' } } },
      scales: { x: { display: false }, y: { beginAtZero: false } }
    }
  });
}

// ========== Google Drive 同期 (Google Drive Sync) ==========
const G_CLIENT_ID = '753175305658-sf1moahpeeb233lfa0pb9uvo8bkbl04c.apps.googleusercontent.com';
const G_SCOPE = 'https://www.googleapis.com/auth/drive.file';

function setDriveStatus(msg, isError = false) {
  const el = document.getElementById('drive-status-text');
  if (!el) return;
  el.textContent = msg;
  el.style.display = 'block';
  el.style.color = isError ? 'var(--red)' : '#34C759';
  setTimeout(() => { el.style.display = 'none'; }, 5000);
}

function uploadToDrive() {
  if (typeof google === 'undefined') {
    setDriveStatus('Google APIが読み込めていません。リロードしてください。', true);
    return;
  }
  const client = google.accounts.oauth2.initTokenClient({
    client_id: G_CLIENT_ID,
    scope: G_SCOPE,
    callback: async (response) => {
      if (response.error) {
        setDriveStatus('認証エラーだ！パワー！', true);
        return;
      }
      setDriveStatus('Google Drive へ保存中...');
      const token = response.access_token;
      
      const data = {
        version: 1, exportDate: new Date().toISOString(),
        profile: state.userProfile, history: state.trainingHistory,
        body: state.bodyRecord, customExercises: state.customExercises,
        chatHistory: state.chatHistory
      };
      const fileContent = JSON.stringify(data, null, 2);

      try {
        // 1. 既存ファイルの検索
        const searchRes = await fetch('https://www.googleapis.com/drive/v3/files?q=name="muscle_dialogue_backup.json" and spaces="drive"&fields=files(id)', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const searchData = await searchRes.json();
        
        if (searchData.files && searchData.files.length > 0) {
          // 2a. 既存ファイルを更新 (PATCH)
          const fileId = searchData.files[0].id;
          await fetch(`https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`, {
            method: 'PATCH',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: fileContent
          });
        } else {
          // 2b. 新規作成 (POST multipart)
          const metadata = { name: 'muscle_dialogue_backup.json', mimeType: 'application/json' };
          const formData = new FormData();
          formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
          formData.append('file', new Blob([fileContent], { type: 'application/json' }));
          
          await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
          });
        }
        setDriveStatus('Google Drive に保存完了！ヤー！！');
        showToast('バックアップ成功！筋肉の記録は守られた！');
      } catch (err) {
        console.error(err);
        setDriveStatus('保存に失敗したぞ...', true);
      }
    }
  });
  client.requestAccessToken({ prompt: 'consent' });
}

function restoreFromDrive() {
  if (typeof google === 'undefined') {
    setDriveStatus('Google APIが読み込めていません。リロードしてください。', true);
    return;
  }
  const client = google.accounts.oauth2.initTokenClient({
    client_id: G_CLIENT_ID,
    scope: G_SCOPE,
    callback: async (response) => {
      if (response.error) {
        setDriveStatus('認証エラーだ！パワー！', true);
        return;
      }
      setDriveStatus('Google Drive から復元中...');
      const token = response.access_token;
      
      try {
        const searchRes = await fetch('https://www.googleapis.com/drive/v3/files?q=name="muscle_dialogue_backup.json" and spaces="drive"&fields=files(id)', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const searchData = await searchRes.json();
        
        if (searchData.files && searchData.files.length > 0) {
          const fileId = searchData.files[0].id;
          const dlRes = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const text = await dlRes.text();
          const parsed = JSON.parse(text);
          
          if (parsed.profile) state.userProfile = parsed.profile;
          if (parsed.history) state.trainingHistory = parsed.history;
          if (parsed.body) state.bodyRecord = parsed.body;
          if (parsed.customExercises) state.customExercises = parsed.customExercises;
          if (parsed.chatHistory) state.chatHistory = parsed.chatHistory;
          
          saveProfile(); saveHistory(); saveBodyRecord(); saveChatHistory();
          if (state.customExercises.length > 0) {
            localStorage.setItem('muscleDialog_customExercises', JSON.stringify(state.customExercises));
          }
          
          renderCalendar(); renderChatMessages(); populateProfileForm(); renderWeightChart(); renderAnalysisCharts();
          setDriveStatus('復元完了！過去の筋肉が蘇った！');
          showToast('復元成功！パワー！');
        } else {
          setDriveStatus('バックアップファイルが見つからないぞ！', true);
        }
      } catch (err) {
        console.error(err);
        setDriveStatus('復元に失敗したぞ...', true);
      }
    }
  });
  client.requestAccessToken({ prompt: 'consent' });
}
"""

with open("app.js", "a", encoding="utf-8") as f:
    f.write("\n" + append_code + "\n")
