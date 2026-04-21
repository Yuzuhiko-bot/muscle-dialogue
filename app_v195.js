const APP_VERSION = 'v1.9.5';
function getApiKey() { return localStorage.getItem('muscleDialog_apiKey') || ''; }
function saveApiKey(key) { localStorage.setItem('muscleDialog_apiKey', key); }

// AI繝｢繝・Ν縺ｮ蜿門ｾ励→菫晏ｭ・function getSelectedModel() { return localStorage.getItem('muscleDialog_aiModel') || 'gemini-3.1-flash-lite-preview'; }
function saveSelectedModel(model) { localStorage.setItem('muscleDialog_aiModel', model); }

function getApiUrl(model) { 
  return `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${getApiKey()}`; 
}

// ---------- EXERCISE MASTER DATA ----------
const EXERCISE_MASTER = [
  { id: "chest_001", exercise_name: "繝舌・繝吶Ν繝吶Φ繝√・繝ｬ繧ｹ", primary_muscle: "螟ｧ閭ｸ遲・, secondary_muscles: ["荳芽ｧ堤ｭ句燕驛ｨ", "荳願・荳蛾ｭ遲・], equipment: "繝代Ρ繝ｼ繝ｩ繝・け", weight_step: 2.5 },
  { id: "chest_002", exercise_name: "繧ｹ繝溘せ繝吶Φ繝√・繝ｬ繧ｹ", primary_muscle: "螟ｧ閭ｸ遲・, secondary_muscles: ["荳芽ｧ堤ｭ句燕驛ｨ", "荳願・荳蛾ｭ遲・], equipment: "繧ｹ繝溘せ繝槭す繝ｳ", weight_step: 2.5 },
  { id: "chest_003", exercise_name: "繧､繝ｳ繧ｯ繝ｩ繧､繝ｳ繝繝ｳ繝吶Ν繝励Ξ繧ｹ", primary_muscle: "螟ｧ閭ｸ遲倶ｸ企Κ", secondary_muscles: ["荳芽ｧ堤ｭ句燕驛ｨ", "荳願・荳蛾ｭ遲・], equipment: "繝ｩ繝舌・繝繝ｳ繝吶Ν", weight_step: 2.5 },
  { id: "chest_004", exercise_name: "繝繝ｳ繝吶Ν繝輔Λ繧､", primary_muscle: "螟ｧ閭ｸ遲・, secondary_muscles: ["荳芽ｧ堤ｭ句燕驛ｨ"], equipment: "繝ｩ繝舌・繝繝ｳ繝吶Ν", weight_step: 2.5 },
  { id: "chest_005", exercise_name: "繝槭す繝ｳ繝√ぉ繧ｹ繝医・繝ｬ繧ｹ", primary_muscle: "螟ｧ閭ｸ遲・, secondary_muscles: ["荳芽ｧ堤ｭ句燕驛ｨ", "荳願・荳蛾ｭ遲・], equipment: "繝√ぉ繧ｹ繝医・繝ｬ繧ｹ", weight_step: 5 },
  { id: "chest_006", exercise_name: "繝励Ξ繝ｼ繝医い繝・ヱ繝ｼ繝√ぉ繧ｹ繝・, primary_muscle: "螟ｧ閭ｸ遲倶ｸ企Κ", secondary_muscles: ["荳芽ｧ堤ｭ句燕驛ｨ", "荳願・荳蛾ｭ遲・], equipment: "繝励Ξ繝ｼ繝医い繝・ヱ繝ｼ繝√ぉ繧ｹ繝医・繝ｬ繧ｹ", weight_step: 5 },
  { id: "chest_007", exercise_name: "繝槭す繝ｳ繝壹ャ繧ｯ繝輔Λ繧､", primary_muscle: "螟ｧ閭ｸ遲・, secondary_muscles: [], equipment: "繝壹ャ繧ｯ繝輔Λ繧､", weight_step: 5 },
  { id: "back_001", exercise_name: "繝舌・繝吶Ν繝・ャ繝峨Μ繝輔ヨ", primary_muscle: "閼頑浤襍ｷ遶狗ｭ・, secondary_muscles: ["蠎・レ遲・, "螟ｧ閾遲・, "繝上Β繧ｹ繝医Μ繝ｳ繧ｰ繧ｹ"], equipment: "繝代Ρ繝ｼ繝ｩ繝・け", weight_step: 2.5 },
  { id: "back_002", exercise_name: "繝吶Φ繝医が繝ｼ繝舌・繝ｭ繝ｼ繧､繝ｳ繧ｰ", primary_muscle: "蠎・レ遲・, secondary_muscles: ["蜒ｧ蟶ｽ遲・, "荳願・莠碁ｭ遲・, "閼頑浤襍ｷ遶狗ｭ・], equipment: "繝代Ρ繝ｼ繝ｩ繝・け", weight_step: 2.5 },
  { id: "back_003", exercise_name: "T繝舌・繝ｭ繝ｼ繧､繝ｳ繧ｰ", primary_muscle: "蠎・レ遲・, secondary_muscles: ["蜒ｧ蟶ｽ遲・, "荳願・莠碁ｭ遲・], equipment: "T繝舌・繝ｭ繝ｼ", weight_step: 2.5 },
  { id: "back_004", exercise_name: "繝ｩ繝・ヨ繝励Ν繝繧ｦ繝ｳ", primary_muscle: "蠎・レ遲・, secondary_muscles: ["螟ｧ蜀・ｭ・, "荳願・莠碁ｭ遲・], equipment: "繝ｩ繝・ヨ繝励Νﾃ励・繝ｼ繝ｪ繝ｼ", weight_step: 5 },
  { id: "back_005", exercise_name: "繝槭す繝ｳ繧ｷ繝ｼ繝・ャ繝峨Ο繧ｦ", primary_muscle: "蠎・レ遲・, secondary_muscles: ["蜒ｧ蟶ｽ遲・, "荳願・莠碁ｭ遲・], equipment: "繝ｩ繝・ヨ繝励Ν繧ｷ繝ｼ繝・ャ繝峨Ο繧ｦ", weight_step: 5 },
  { id: "back_006", exercise_name: "諛ｸ蝙ゑｼ医メ繝ｳ繝九Φ繧ｰ・・, primary_muscle: "蠎・レ遲・, secondary_muscles: ["螟ｧ蜀・ｭ・, "荳願・莠碁ｭ遲・], equipment: "繧｢繧ｷ繧ｹ繝医メ繝ｳ繝九Φ繧ｰﾃ励ョ繧｣繝・・繧ｹ", weight_step: 5 },
  { id: "back_007", exercise_name: "繝舌ャ繧ｯ繧ｨ繧ｯ繧ｹ繝・Φ繧ｷ繝ｧ繝ｳ", primary_muscle: "閼頑浤襍ｷ遶狗ｭ・, secondary_muscles: ["螟ｧ閾遲・, "繝上Β繧ｹ繝医Μ繝ｳ繧ｰ繧ｹ"], equipment: "繝舌ャ繧ｯ繧ｨ繧ｯ繧ｹ繝・Φ繧ｷ繝ｧ繝ｳ", weight_step: 0 },
  { id: "legs_001", exercise_name: "繝舌・繝吶Ν繧ｹ繧ｯ繝ｯ繝・ヨ", primary_muscle: "螟ｧ閻ｿ蝗幃ｭ遲・, secondary_muscles: ["螟ｧ閾遲・, "繝上Β繧ｹ繝医Μ繝ｳ繧ｰ繧ｹ"], equipment: "繝代Ρ繝ｼ繝ｩ繝・け", weight_step: 2.5 },
  { id: "legs_002", exercise_name: "繧ｹ繝溘せ繧ｹ繧ｯ繝ｯ繝・ヨ", primary_muscle: "螟ｧ閻ｿ蝗幃ｭ遲・, secondary_muscles: ["螟ｧ閾遲・, "繝上Β繧ｹ繝医Μ繝ｳ繧ｰ繧ｹ"], equipment: "繧ｹ繝溘せ繝槭す繝ｳ", weight_step: 2.5 },
  { id: "legs_003", exercise_name: "繝悶Ν繧ｬ繝ｪ繧｢繝ｳ繧ｹ繧ｯ繝ｯ繝・ヨ", primary_muscle: "螟ｧ閻ｿ蝗幃ｭ遲・, secondary_muscles: ["螟ｧ閾遲・], equipment: "繝ｩ繝舌・繝繝ｳ繝吶Ν", weight_step: 2.5 },
  { id: "legs_004", exercise_name: "繝ｬ繝・げ繝励Ξ繧ｹ", primary_muscle: "螟ｧ閻ｿ蝗幃ｭ遲・, secondary_muscles: ["螟ｧ閾遲・, "繝上Β繧ｹ繝医Μ繝ｳ繧ｰ繧ｹ"], equipment: "繝励Ξ繝ｼ繝医Ξ繝・げ繝励Ξ繧ｹ", weight_step: 5 },
  { id: "legs_005", exercise_name: "繝ｬ繝・げ繧ｨ繧ｯ繧ｹ繝・Φ繧ｷ繝ｧ繝ｳ", primary_muscle: "螟ｧ閻ｿ蝗幃ｭ遲・, secondary_muscles: [], equipment: "繝ｬ繝・げ繧ｨ繧ｯ繧ｹ繝・Φ繧ｷ繝ｧ繝ｳ", weight_step: 5 },
  { id: "legs_006", exercise_name: "繝励Ο繝ｼ繝ｳ繝ｬ繝・げ繧ｫ繝ｼ繝ｫ", primary_muscle: "繝上Β繧ｹ繝医Μ繝ｳ繧ｰ繧ｹ", secondary_muscles: [], equipment: "繝励Ο繝ｼ繝ｳ繝ｬ繝・げ繧ｫ繝ｼ繝ｫ", weight_step: 5 },
  { id: "legs_007", exercise_name: "繝偵ャ繝励い繝悶ム繧ｯ繧ｷ繝ｧ繝ｳ", primary_muscle: "荳ｭ閾遲・, secondary_muscles: [], equipment: "繧｢繝悶ム繧ｯ繧ｿ繝ｼﾃ励い繝繧ｯ繧ｿ繝ｼ", weight_step: 5 },
  { id: "legs_008", exercise_name: "繝偵ャ繝励い繝繧ｯ繧ｷ繝ｧ繝ｳ", primary_muscle: "蜀・ｻ｢遲・, secondary_muscles: [], equipment: "繧｢繝悶ム繧ｯ繧ｿ繝ｼﾃ励い繝繧ｯ繧ｿ繝ｼ", weight_step: 5 },
  { id: "shoulders_001", exercise_name: "繝舌・繝吶Ν繧ｷ繝ｧ繝ｫ繝繝ｼ繝励Ξ繧ｹ", primary_muscle: "荳芽ｧ堤ｭ句燕驛ｨ", secondary_muscles: ["荳芽ｧ堤ｭ倶ｸｭ驛ｨ", "荳願・荳蛾ｭ遲・], equipment: "繝代Ρ繝ｼ繝ｩ繝・け", weight_step: 2.5 },
  { id: "shoulders_002", exercise_name: "繝繝ｳ繝吶Ν繧ｷ繝ｧ繝ｫ繝繝ｼ繝励Ξ繧ｹ", primary_muscle: "荳芽ｧ堤ｭ句燕驛ｨ", secondary_muscles: ["荳芽ｧ堤ｭ倶ｸｭ驛ｨ", "荳願・荳蛾ｭ遲・], equipment: "繝ｩ繝舌・繝繝ｳ繝吶Ν", weight_step: 2.5 },
  { id: "shoulders_003", exercise_name: "繝槭す繝ｳ繧ｷ繝ｧ繝ｫ繝繝ｼ繝励Ξ繧ｹ", primary_muscle: "荳芽ｧ堤ｭ句燕驛ｨ", secondary_muscles: ["荳芽ｧ堤ｭ倶ｸｭ驛ｨ", "荳願・荳蛾ｭ遲・], equipment: "繧ｷ繝ｧ繝ｫ繝繝ｼ繝励Ξ繧ｹ", weight_step: 5 },
  { id: "shoulders_004", exercise_name: "繝繝ｳ繝吶Ν繧ｵ繧､繝峨Ξ繧､繧ｺ", primary_muscle: "荳芽ｧ堤ｭ倶ｸｭ驛ｨ", secondary_muscles: [], equipment: "繝繝ｳ繝吶Ν1-10kg", weight_step: 1 },
  { id: "shoulders_005", exercise_name: "繧ｱ繝ｼ繝悶Ν繧ｵ繧､繝峨Ξ繧､繧ｺ", primary_muscle: "荳芽ｧ堤ｭ倶ｸｭ驛ｨ", secondary_muscles: [], equipment: "繝輔ぃ繝ｳ繧ｯ繧ｷ繝ｧ繝翫Ν繝医Ξ繝ｼ繝翫・", weight_step: 2.5 },
  { id: "shoulders_006", exercise_name: "繝槭す繝ｳ繝ｪ繧｢繝・Ν繝医ヵ繝ｩ繧､", primary_muscle: "荳芽ｧ堤ｭ句ｾ碁Κ", secondary_muscles: ["蜒ｧ蟶ｽ遲・], equipment: "繝ｭ繝ｼﾃ励Μ繧｢繝・Ν繝・, weight_step: 5 },
  { id: "arms_001", exercise_name: "EZ繝舌・繧｢繝ｼ繝繧ｫ繝ｼ繝ｫ", primary_muscle: "荳願・莠碁ｭ遲・, secondary_muscles: ["蜑崎・遲狗ｾ､"], equipment: "EZ繝舌・", weight_step: 2.5 },
  { id: "arms_002", exercise_name: "繝繝ｳ繝吶Ν繧｢繝ｼ繝繧ｫ繝ｼ繝ｫ", primary_muscle: "荳願・莠碁ｭ遲・, secondary_muscles: ["蜑崎・遲狗ｾ､"], equipment: "繝繝ｳ繝吶Ν1-10kg", weight_step: 1 },
  { id: "arms_003", exercise_name: "繝槭す繝ｳ繝舌う繧ｻ繝励せ繧ｫ繝ｼ繝ｫ", primary_muscle: "荳願・莠碁ｭ遲・, secondary_muscles: [], equipment: "繧｢繝ｼ繝繧ｫ繝ｼ繝ｫﾃ励ヨ繝ｩ繧､繧ｻ繝励せ", weight_step: 5 },
  { id: "arms_004", exercise_name: "繧ｱ繝ｼ繝悶Ν繝励ャ繧ｷ繝･繝繧ｦ繝ｳ", primary_muscle: "荳願・荳蛾ｭ遲・, secondary_muscles: [], equipment: "繝輔ぃ繝ｳ繧ｯ繧ｷ繝ｧ繝翫Ν繝医Ξ繝ｼ繝翫・", weight_step: 2.5 },
  { id: "arms_005", exercise_name: "繝槭す繝ｳ繝医Λ繧､繧ｻ繝励せ繧ｨ繧ｯ繧ｹ繝・Φ繧ｷ繝ｧ繝ｳ", primary_muscle: "荳願・荳蛾ｭ遲・, secondary_muscles: [], equipment: "繧｢繝ｼ繝繧ｫ繝ｼ繝ｫﾃ励ヨ繝ｩ繧､繧ｻ繝励せ", weight_step: 5 },
  { id: "arms_006", exercise_name: "繝・ぅ繝・・繧ｹ", primary_muscle: "荳願・荳蛾ｭ遲・, secondary_muscles: ["螟ｧ閭ｸ遲倶ｸ矩Κ", "荳芽ｧ堤ｭ句燕驛ｨ"], equipment: "繧｢繧ｷ繧ｹ繝医メ繝ｳ繝九Φ繧ｰﾃ励ョ繧｣繝・・繧ｹ", weight_step: 5 },
  { id: "abs_001", exercise_name: "繧｢繝悶ラ繝溘リ繝ｫ繧ｯ繝ｩ繝ｳ繝・, primary_muscle: "閻ｹ逶ｴ遲・, secondary_muscles: [], equipment: "繧｢繝悶ラ繝溘リ繝ｫ", weight_step: 5 },
  { id: "abs_002", exercise_name: "繧｢繝悶・繝ｳ繝√け繝ｩ繝ｳ繝・, primary_muscle: "閻ｹ逶ｴ遲・, secondary_muscles: [], equipment: "繧｢繝悶・繝ｳ繝・, weight_step: 0 },
  { id: "abs_003", exercise_name: "繝ｬ繝・げ繝ｬ繧､繧ｺ", primary_muscle: "閻ｹ逶ｴ遲倶ｸ矩Κ", secondary_muscles: ["閻ｸ閻ｰ遲・], equipment: "繝ｬ繝・げ繝ｬ繧､繧ｺ", weight_step: 0 },
  { id: "abs_004", exercise_name: "繧ｱ繝ｼ繝悶Ν繧ｯ繝ｩ繝ｳ繝・, primary_muscle: "閻ｹ逶ｴ遲・, secondary_muscles: [], equipment: "繝輔ぃ繝ｳ繧ｯ繧ｷ繝ｧ繝翫Ν繝医Ξ繝ｼ繝翫・", weight_step: 2.5 },
  { id: "cardio_001", exercise_name: "譛蛾・邏驕句虚・医ヰ繧､繧ｯ・・, primary_muscle: "蠢・ぜ讖溯・", secondary_muscles: ["荳句濠霄ｫ蜈ｨ菴・], equipment: "繧｢繝・・繝ｩ繧､繝医ヰ繧､繧ｯ", weight_step: 0, is_cardio: true },
  { id: "cardio_002", exercise_name: "譛蛾・邏驕句虚・医Λ繝ｳ繝九Φ繧ｰ・・, primary_muscle: "蠢・ぜ讖溯・", secondary_muscles: ["荳句濠霄ｫ蜈ｨ菴・], equipment: "繝ｩ繝ｳ繝九Φ繧ｰ繝槭す繝ｳ", weight_step: 0, is_cardio: true },
  { id: "cardio_003", exercise_name: "譛蛾・邏驕句虚・医け繝ｭ繧ｹ繝医Ξ繝ｼ繝翫・・・, primary_muscle: "蠢・ぜ讖溯・", secondary_muscles: ["蜈ｨ霄ｫ"], equipment: "繧ｯ繝ｭ繧ｹ繝医Ξ繝ｼ繝翫・", weight_step: 0, is_cardio: true },
  { id: "cardio_004", exercise_name: "譛蛾・邏驕句虚・医え繧ｩ繝ｼ繧ｭ繝ｳ繧ｰ・・, primary_muscle: "蠢・ぜ讖溯・", secondary_muscles: ["荳句濠霄ｫ蜈ｨ菴・], equipment: "閾ｪ驥阪・螻句､・, weight_step: 0, is_cardio: true }
];

// ---------- KINNIKUN QUOTES ----------
const KINNIKUN_QUOTES = [
  "遲玖ｉ縺ｯ譛鬮倥・繝輔ぃ繝・す繝ｧ繝ｳ縺・・,
  "遲九ヨ繝ｬ縺ｯ莠ｺ逕溘・謨咏ｧ第嶌縲ょ巻蜉帙ｒ遨阪∩驥阪・繧後・縺・▽縺狗ｵ先棡縺瑚ｿ斐▲縺ｦ縺上ｋ縲・,
  "繝医Ξ繝ｼ繝九Φ繧ｰ縺ｧ螟ｧ蛻・↑縺ｮ縺ｯ縲主推鬧・●霆翫上よ・縺ｦ縺ｪ縺・・縺ｦ縺ｪ縺・√◎繧後′1逡ｪ縺ｮ霑鷹％縺輔・,
  "繝医Ξ繝ｼ繝九Φ繧ｰ縺ｧ荳逡ｪ髱｢逋ｽ縺・・縺ｯ縲∫ｭ玖ｉ縺ｫ驥阪＆縺御ｹ励▲縺ｦ繧九→縺阪・,
  "繧・ｌ繧九％縺ｨ縺ｮ縺ｿ繧偵ｄ繧九ゅ◎繧後′螟ｧ莠九↑繧薙□・・,
  "莉頑律縺ｮ閾ｪ蛻・・縲∵乖譌･繧医ｊ蠑ｷ縺・ｼ・,
  "遲玖ｉ縺ｯ陬丞・繧峨↑縺・ｼ・,
  "鬟溘↓縺ｯ濶ｲ縲・ｰ鈴▲縺・′縲∝・縺ｦ縺ｯ遲玖ｉ縺ｮ縺溘ａ縺縺九ｉ蛻･縺ｫ繝・Λ縺上↑縺・ｼ・
];

const LOADING_QUOTES = [
  "縺溘□縺・∪螟ｧ閭ｸ遲九↓縺贋ｼｺ縺・ｒ遶九※縺ｦ縺・∪縺吮ｦ窶ｦ",
  "遲玖ｉ縺ｮ逾槭→莠､菫｡荳ｭ・医ヴ繝斐ヴ繝・ｼ俄ｦ窶ｦ",
  "縺ｩ縺｣縺｡縺ｪ繧薙□縺・▲・・ｼ溘→遲玖ｉ縺ｫ蝠上＞縺九￠縺ｦ縺・∪縺吮ｦ窶ｦ",
  "繝励Ο繝・う繝ｳ繧偵す繧ｧ繧､繧ｯ縺励↑縺後ｉ閠・∴縺ｦ縺・∪縺吮ｦ窶ｦ",
  "遲玖ｉ繧ｳ繝ｳ繝斐Η繝ｼ繧ｿ繝ｼ縲√ヵ繝ｫ遞ｼ蜒堺ｸｭ・√ヱ繝ｯ繝ｼ・・ｼ・,
  "邏ｰ閭槭Ξ繝吶Ν縺ｧ繝｡繝九Η繝ｼ繧呈ｧ区・荳ｭ窶ｦ窶ｦ",
  "鄒主袖縺励＞繝悶Ο繝・さ繝ｪ繝ｼ繧呈Φ蜒上＠縺ｪ縺後ｉ蜃ｦ逅・ｸｭ窶ｦ窶ｦ"
];

const HYPERTROPHY_THEORY = `
縲先怙譁ｰ迚医鷹ｪｨ譬ｼ遲玖ぇ螟ｧ縺翫ｈ縺ｳ遲句鴨蠅怜ｼｷ縺ｮ譛驕ｩ蛹悶↓髢｢縺吶ｋ蛹・峡逧・い繝励Ο繝ｼ繝・
笆 逕溽炊蟄ｦ繝ｻ遲玖ぇ螟ｧ縺ｮ繝｡繧ｫ繝九ぜ繝
1. 繝｡繧ｫ繝九き繝ｫ繝・Φ繧ｷ繝ｧ繝ｳ縺ｮ譛螟ｧ蛹・遲玖ぇ螟ｧ縺ｮ譛繧る㍾隕√°縺､荳ｻ隕√↑鬧・虚隕∝屏縺ｯ繝｡繧ｫ繝九き繝ｫ繝・Φ繧ｷ繝ｧ繝ｳ・育黄逅・噪蠑ｵ蜉幢ｼ峨〒縺ゅｋ縲ょ腰縺ｫ驥阪＞驥埼㍼繧呈桶縺・％縺ｨ縺縺代′繝｡繧ｫ繝九き繝ｫ繝・Φ繧ｷ繝ｧ繝ｳ繧呈э蜻ｳ縺吶ｋ繧上￠縺ｧ縺ｯ縺ｪ縺・らｭ狗ｷ夂ｶｭ縺悟ｼｵ蜉帙ｒ逋ｺ謠ｮ縺励↑縺後ｉ莨ｸ蠑ｵ縺輔ｌ繧九後い繧ｯ繝・ぅ繝悶・繝｡繧ｫ繝九き繝ｫ繝・Φ繧ｷ繝ｧ繝ｳ縲阪′讌ｵ繧√※驥崎ｦ√〒縺ゅｊ縲∝香蛻・↑蜿ｯ蜍募沺繧帝壹§縺ｦ蟇ｾ雎｡遲九↓雋闕ｷ繧偵°縺醍ｶ壹￠繧九％縺ｨ縺悟ｿ・域擅莉ｶ縺ｨ縺ｪ繧九・
2. 繝｡繧ｿ繝懊Μ繝・け繧ｹ繝医Ξ繧ｹ縺ｨ驕句虚蜊倅ｽ阪・蜍募藤
莉｣隰晉噪繧ｹ繝医Ξ繧ｹ縺ｯ縲∽ｻ｣隰晉肇迚ｩ縺瑚塘遨阪☆繧九％縺ｨ縺ｧ逕溘§繧九よ怙譁ｰ縺ｮ遐皮ｩｶ縺ｧ縺ｯ縲∽ｻ｣隰晉噪繧ｹ繝医Ξ繧ｹ蜊倡峡縺ｧ縺ｮ閧･螟ｧ蜉ｹ譫懊ｈ繧翫ｂ縲∽ｻ｣隰晉噪繧ｹ繝医Ξ繧ｹ縺檎ｭ狗夢蜉ｴ繧定ｪ倡匱縺励√◎繧後↓繧医▲縺ｦ繝｡繧ｫ繝九き繝ｫ繝・Φ繧ｷ繝ｧ繝ｳ繧貞女縺代ｋ鬮倬明蛟､縺ｮ驕句虚蜊倅ｽ搾ｼ医Δ繝ｼ繧ｿ繝ｼ繝ｦ繝九ャ繝茨ｼ峨・蜍募藤謨ｰ縺悟｢怜刈縺吶ｋ縺ｨ縺・≧縲碁俣謗･逧・↑縲榊ｽｹ蜑ｲ縺悟､ｧ縺阪＞縺ｨ縺輔ｌ縺ｦ縺・ｋ縲・enneman縺ｮ繧ｵ繧､繧ｺ縺ｮ蜴溽炊縺ｫ繧医ｌ縺ｰ縲∽ｽ手ｲ闕ｷ縺ｧ縺ゅ▲縺ｦ繧ょ渚蠕ｩ繧帝剞逡後∪縺ｧ邯咏ｶ壹☆繧九％縺ｨ縺ｧ縲∵ｬ｡隨ｬ縺ｫ鬮倬明蛟､縺ｮ驕句虚蜊倅ｽ阪′蜍募藤縺輔ｌ繧九・
3. 遲狗ｹ顔ｶｭ繧ｿ繧､繝励→迚ｹ逡ｰ逧・ヨ繝ｬ繝ｼ繝九Φ繧ｰ繧｢繝励Ο繝ｼ繝・縲御ｽ手ｲ闕ｷ縺ｯ驕・ｭ九・ｫ倩ｲ闕ｷ縺ｯ騾溽ｭ九ｒ閧･螟ｧ縺輔○繧九阪→縺輔ｌ縺ｦ縺阪◆縺後∬ｿ大ｹｴ縺ｮ遐皮ｩｶ縺ｧ縺ｯ縲瑚ｲ闕ｷ縺ｮ螟ｧ蟆上↓縺九°繧上ｉ縺壹∫夢蜉ｴ蝗ｰ諞翫∪縺ｧ霑ｽ縺・ｾｼ繧√・縲∝・遲狗ｷ夂ｶｭ縺ｯ縺ｻ縺ｼ蜷檎ｭ峨↓閧･螟ｧ縺吶ｋ縲阪％縺ｨ縺梧・繧峨°縺ｫ縺ｪ縺｣縺ｦ縺・ｋ縲ら音螳壹・雋闕ｷ蟶ｯ縺ｫ蛛上ｉ縺壹√・繝ｫ繝√Ξ繝ｳ繧ｸ縺ｮ繝医Ξ繝ｼ繝九Φ繧ｰ繧定｡後≧縺薙→縺ｧ縲√≠繧峨ｆ繧矩°蜍募腰菴阪・逍ｲ蜉ｴ縺ｨ驕ｩ蠢懊ｒ貍上ｌ縺ｪ縺丞ｼ輔″蜃ｺ縺吶い繝励Ο繝ｼ繝√′謾ｯ謖√＆繧後ｋ縲・
4. 繧ｨ繧ｭ繧ｻ繝ｳ繝医Μ繝・け蜿守ｸｮ縺ｨ遲区錐蛯ｷ
驕主ｺｦ縺ｪ遲区錐蛯ｷ縺ｯ繧ｿ繝ｳ繝代け雉ｪ縺ｮ菫ｮ蠕ｩ縺ｫ繝ｪ繧ｽ繝ｼ繧ｹ縺悟･ｪ繧上ｌ縲√°縺医▲縺ｦ遲玖ぇ螟ｧ繧帝仆螳ｳ・磯≦蟒ｶ・峨☆繧九％縺ｨ縺悟・縺九▲縺ｦ縺・ｋ縲ゅお繧ｭ繧ｻ繝ｳ繝医Μ繝・け・医ロ繧ｬ繝・ぅ繝厄ｼ牙庶邵ｮ縺梧･ｵ繧√※譛牙柑縺ｪ縺ｮ縺ｯ縲梧錐蛯ｷ縺吶ｋ縺九ｉ縲阪〒縺ｯ縺ｪ縺上√碁ｫ倥＞蜉帛ｭｦ逧・ｼｵ蜉帙阪→縲√ち繧､繝√Φ遲峨・髢｢荳弱↓繧医ｋ縲碁聞遲矩聞縺ｧ縺ｮ蜿怜虚逧・ｼｵ蜉幢ｼ医せ繝医Ξ繝・メ蛻ｺ豼・峨阪′蠑ｷ蜉帙↑蜷悟喧繧ｷ繧ｰ繝翫Ν縺ｨ縺ｪ繧九◆繧√〒縺ゅｋ縲・
笆 繝舌う繧ｪ繝｡繧ｫ繝九け繧ｹ繝ｻ霄ｫ菴捺桃菴・5. 繧ｹ繝医Ξ繝・メ繝昴ず繧ｷ繝ｧ繝ｳ縺ｮ蜆ｪ菴肴ｧ・・MH・・遲玖ｉ縺悟ｼ輔″莨ｸ縺ｰ縺輔ｌ縺溽憾諷具ｼ磯聞遲矩聞・峨〒雋闕ｷ繧偵°縺代ｋ縲後せ繝医Ξ繝・メ繝ｻ繝｡繝・ぅ繧ｨ繧､繝・ャ繝峨・繝上う繝代・繝医Ο繝輔ぅ繝ｼ縲阪′讌ｵ繧√※蠑ｷ縺・ぇ螟ｧ蛻ｺ豼縺ｨ縺ｪ繧九るΚ蛻・噪縺ｪ蜿ｯ蜍募沺縺ｧ縺ゅ▲縺ｦ繧ゅ∫ｭ玖ｉ縺悟ｼ輔″莨ｸ縺ｰ縺輔ｌ縺溘・繧ｸ繧ｷ繝ｧ繝ｳ縺ｧ雋闕ｷ繧貞渚蠕ｩ縺吶ｋ謇区ｳ輔・縲∫洒遲矩聞縺ｧ縺ｮ蜿守ｸｮ繧医ｊ繧らｭ玖ぇ螟ｧ繧貞ｼｷ縺丈ｿ・ｲ縺吶ｋ縲・
6. 繝槭う繝ｳ繝峨・繝槭ャ繧ｹ繝ｫ繝ｻ繧ｳ繝阪け繧ｷ繝ｧ繝ｳ・・MC・・蜊倬未遽遞ｮ逶ｮ縺ｮ荳ｭ縲應ｽ手ｲ闕ｷ縺ｫ縺翫＞縺ｦ縺ｯ縲∫音螳壹・遲玖ｉ縺ｫ諢剰ｭ倥ｒ蜷代￠繧貴MC縺悟ｯｾ雎｡遲九・遲区ｴｻ蜍輔ｒ譛画э縺ｫ蠅怜刈縺輔○繧九ゆｸ譁ｹ縲∝､夐未遽遞ｮ逶ｮ縺ｮ鬮倩ｲ闕ｷ縺ｧ縺ｯ縲∝､夜Κ縺ｮ迚ｩ菴薙ｒ蜍輔°縺吶後お繧ｯ繧ｹ繧ｿ繝ｼ繝翫Ν繝ｻ繝輔か繝ｼ繧ｫ繧ｹ縲阪′驕ｩ縺励※縺・ｋ縲・
笆 繝励Ο繧ｰ繝ｩ繝險ｭ險医・繝懊Μ繝･繝ｼ繝邂｡逅・7. MRV縺ｮ邂怜・縺ｨ荳企剞
繝ｻMEV・域怙蟆乗怏蜉ｹ繝懊Μ繝･繝ｼ繝・・ 蛻晏ｿ・・・蝣ｴ蜷医∝推驛ｨ菴阪≠縺溘ｊ縲碁ｱ3縲・繧ｻ繝・ヨ縲咲ｨ句ｺｦ縺ｮ讌ｵ繧√※蟆代↑縺・・繝ｪ繝･繝ｼ繝縺ｧ繧ょ香蛻・↓譛螟ｧ邏壹・遲玖ぇ螟ｧ縺瑚ｵｷ縺薙ｋ縲・繝ｻMRV・域怙螟ｧ蝗槫ｾｩ蜿ｯ閭ｽ繝懊Μ繝･繝ｼ繝・・ 繧ｻ繝・ヨ謨ｰ繧貞｢励ｄ縺帙・豈比ｾ九＠縺ｦ謌宣聞縺吶ｋ繧上￠縺ｧ縺ｯ縺ｪ縺・ゆｸ顔ｴ夊・〒縺ゅ▲縺ｦ繧ゅ碁Κ菴阪≠縺溘ｊ騾ｱ10縲・0繧ｻ繝・ヨ遞句ｺｦ縲阪ｒ繧ｹ繧､繝ｼ繝医せ繝昴ャ繝医→縺励√◎繧御ｻ･荳翫・繧ｸ繝｣繝ｳ繧ｯ繝懊Μ繝･繝ｼ繝繧帝∩縺代ｋ繧医≧荳企剞繧定ｦ区･ｵ繧√ｋ蠢・ｦ√′縺ゅｋ縲・
8. 譛驕ｩ縺ｪ鬆ｻ蠎ｦ縺ｨ蛻・牡豕・1騾ｱ髢薙≠縺溘ｊ縺ｮ邱上・繝ｪ繝･繝ｼ繝縺悟ｮ悟・縺ｫ蜷御ｸ縺ｧ縺ゅｌ縺ｰ縲・ｱ1蝗槭〒繧るｱ3蝗槭〒繧らｭ玖ぇ螟ｧ蜉ｹ譫懊↓譛画э蟾ｮ縺ｯ縺ｪ縺・ゅ＠縺九＠縲・蝗槭・繧ｻ繝・す繝ｧ繝ｳ縺ｧ縺薙↑縺帙ｋ譛牙柑縺ｪ繝懊Μ繝･繝ｼ繝縺ｫ縺ｯ髯千阜縺後≠繧九◆繧√∫┌鬧・↑繧ｸ繝｣繝ｳ繧ｯ繝懊Μ繝･繝ｼ繝繧帝∩縺代・ｫ伜刀雉ｪ縺ｪ繧ｻ繝・ヨ繧堤｢ｺ菫昴・蛻・淵縺輔○繧句ｮ溯ｷｵ逧・↑謇区ｮｵ縺ｨ縺励※縲碁ｱ2蝗樔ｻ･荳翫・鬆ｻ蠎ｦ・亥・蜑ｲ豕包ｼ峨阪′謗ｨ螂ｨ縺輔ｌ繧九・
笆 逍ｲ蜉ｴ邂｡逅・・繧ｨ繝阪Ν繧ｮ繝ｼ莉｣隰・9. 繧ｻ繝・ヨ髢薙う繝ｳ繧ｿ繝ｼ繝舌Ν縺ｮ譛驕ｩ蛹・繝ｻ螟夐未遽遞ｮ逶ｮ: ATP-CP邉ｻ縺ｨ荳ｭ譫｢逾樒ｵ後・蝗槫ｾｩ繧貞ｾ・▽縺溘ａ縲・縲・蛻・ｻ･荳翫・蜊∝・縺ｪ繧､繝ｳ繧ｿ繝ｼ繝舌Ν縺悟ｿ・医・繝ｻ蜊倬未遽遞ｮ逶ｮ: 莉･蜑阪・60縲・0遘偵→遏ｭ縺剰ｨｭ螳壹＆繧後◆縺後∵怙譁ｰ遐皮ｩｶ縺ｧ縺ｯ縲∵ｬ｡繧ｻ繝・ヨ縺ｧ縺ｮ驥埼㍼菴惹ｸ九ｒ髦ｲ縺弱檎ｷ乗嫌荳翫・繝ｪ繝･繝ｼ繝縲阪ｒ譛螟ｧ蛹悶☆繧九◆繧√∵怙菴弱〒繧・.5蛻・・蛻・ｻ･荳翫・蜊∝・縺ｪ繧､繝ｳ繧ｿ繝ｼ繝舌Ν繧堤｢ｺ菫昴☆繧九％縺ｨ縺梧耳螂ｨ縺輔ｌ繧九・
10. 繝・ぅ繝ｭ繝ｼ繝峨→繧ｪ繝ｼ繝医Ξ繧ｮ繝･繝ｬ繝ｼ繧ｷ繝ｧ繝ｳ
4縲・騾ｱ縺斐→縺ｫ諢丞峙逧・↓繝懊Μ繝･繝ｼ繝繧定誠縺ｨ縺吶後ョ繧｣繝ｭ繝ｼ繝峨阪・謖ｿ蜈･縺御ｸ榊庄谺縺ｧ縺ゅｋ縲ゅ∪縺溘ヽIR・井ｽ吝鴨蝗樊焚・峨ｄRPE繧堤畑縺・◆繧ｪ繝ｼ繝医Ξ繧ｮ繝･繝ｬ繝ｼ繧ｷ繝ｧ繝ｳ繧貞ｮ溯ｷｵ縺励｀RV縺ｮ雜・℃繧帝亟縺舌％縺ｨ縺碁聞譛溽噪縺九▽螳牙ｮ壹＠縺滓・髟ｷ繧呈球菫昴☆繧九・`;

const DIET_HEALTH_THEORY = `
縲先怙譁ｰ迚医醍ｧ大ｭｦ逧・ｹ諡縺ｫ蝓ｺ縺･縺上Ξ繧ｸ繧ｹ繧ｿ繝ｳ繧ｹ繝医Ξ繝ｼ繝九Φ繧ｰ縺ｮ譛驕ｩ蛹厄ｼ壹ム繧､繧ｨ繝・ヨ縺翫ｈ縺ｳ蛛･蠎ｷ蠅鈴ｲ繝励Ο繧ｰ繝ｩ繝

笆 1. 逕溽炊蟄ｦ縺翫ｈ縺ｳ遲玖ぇ螟ｧ縺ｮ繝｡繧ｫ繝九ぜ繝
1. 繝｡繧ｫ繝九き繝ｫ繝・Φ繧ｷ繝ｧ繝ｳ縺ｮ譛螟ｧ蛹・遲玖ぇ螟ｧ縺ｮ譛繧ょｼｷ蜉帙↑繝医Μ繧ｬ繝ｼ縺ｯ縲後Γ繧ｫ繝九き繝ｫ繝・Φ繧ｷ繝ｧ繝ｳ縲阪〒縺ゅｋ縲よэ蝗ｳ逧・↑遲区錐蛯ｷ繧剃ｼｴ縺・ヨ繝ｬ繝ｼ繝九Φ繧ｰ縺ｯ縲√き繝ｭ繝ｪ繝ｼ蛻ｶ髯千憾諷九↓縺ゅｋ繝医Ξ繝ｼ繝九・縺ｫ縺翫＞縺ｦ縺ｯ縲∽ｽ惹ｸ九＠縺溷屓蠕ｩ繝ｪ繧ｽ繝ｼ繧ｹ繧偵御ｿｮ蠕ｩ縲阪↓豬ｪ雋ｻ縺輔○縺ｦ縺励∪縺・◆繧・∩縺代ｋ縺ｹ縺阪〒縺ゅｋ縲ら┌逕ｨ縺ｪ遲区錐蛯ｷ繧呈賜髯､縺励∫ｴ皮ｲ九↑蠑ｵ蜉帙・譛螟ｧ蛹悶↓辟ｦ轤ｹ繧貞ｽ薙※繧九・
2. BFR繝医Ξ繝ｼ繝九Φ繧ｰ縺ｨ遲狗ｷ夂ｶｭ繧ｿ繧､繝励・迚ｹ逡ｰ逧・虚蜩｡
蜉鮨｢縺ｫ莨ｴ縺Уype II邱夂ｶｭ・磯溽ｭ具ｼ峨・關守ｸｮ縺碁ｲ陦後☆繧九る未遽縺ｫ雋諡・ｒ縺九￠繧峨ｌ縺ｪ縺・ｫ倬ｽ｢螻､縺ｫ縺翫＞縺ｦ菴手ｲ闕ｷ縺ｮ陦豬∝宛髯舌ヨ繝ｬ繝ｼ繝九Φ繧ｰ・・FR・峨′譛牙柑縺ｪ縺ｮ縺ｯ縲∵･ｵ遶ｯ縺ｪ菴朱・邏迥ｶ諷九→莉｣隰晉肇迚ｩ縺ｮ闢・ｩ阪↓繧医ｊ縲∵悽譚･縺ｪ繧蛾ｫ倬㍾驥上ｒ謇ｱ繧上↑縺代ｌ縺ｰ蜍募藤縺輔ｌ縺ｪ縺・卦ype II邱夂ｶｭ縲阪ｒ縲∽ｽ手ｲ闕ｷ縺ｧ蠑ｷ蛻ｶ逧・↓譌ｩ譛溷虚蜩｡縺ｧ縺阪ｋ縺溘ａ縺ｧ縺ゅｋ縲・
3. 繧ｨ繧ｭ繧ｻ繝ｳ繝医Μ繝・け蜍穂ｽ懊・繧ｳ繝ｳ繝医Ο繝ｼ繝ｫ
繧ｹ繝医Ξ繝・メ繝昴ず繧ｷ繝ｧ繝ｳ縺ｧ縺ｮ雋闕ｷ縺ｯ閧蛾屬繧後↑縺ｩ縺ｮ諤ｪ謌代↓蟇ｾ縺吶ｋ蠑ｷ蜉帙↑閠先ｧ・亥渚蠕ｩ蜉ｹ譫懶ｼ峨ｒ迯ｲ蠕励＆縺帙ｋ縺溘ａ縲∝▼蠎ｷ蠅鈴ｲ縺ｫ縺翫＞縺ｦ讌ｵ繧√※驥崎ｦ√〒縺ゅｋ縲・
笆 2. 繝舌う繧ｪ繝｡繧ｫ繝九け繧ｹ縺翫ｈ縺ｳ霄ｫ菴捺桃菴・4. 髢｢遽繝｢繝薙Μ繝・ぅ縺ｨSMH
驕ｩ蛻・↑逕滉ｽ灘鴨蟄ｦ逧・い繝ｩ繧､繝｡繝ｳ繝医ｒ遒ｺ菫昴☆繧九％縺ｨ縺ｯ縲・未遽縺ｸ縺ｮ驕主臆縺ｪ繧ｹ繝医Ξ繧ｹ繧呈賜髯､縺励∫函豸ｯ縺ｫ繧上◆繧句ｮ牙・縺ｪ迺ｰ蠅・ｒ讒狗ｯ峨☆繧倶ｸ翫〒荳榊庄谺縲ょ､ｧ谿ｿ遲九ｄ螟ｧ閭ｸ遲九↑縺ｩ讒矩逧・↓蜊∝・縺ｫ蠑輔″莨ｸ縺ｰ縺輔ｌ繧狗ｭ玖ｉ縺ｫ蟇ｾ縺励※SMH・医せ繝医Ξ繝・メ繝昴ず繧ｷ繝ｧ繝ｳ縺ｧ縺ｮ雋闕ｷ・峨ｒ邨・∩霎ｼ繧縺薙→縺ｯ縲√ム繧､繧ｨ繝・ヨ荳ｭ縺ｮ遲玖ｉ驥冗ｶｭ謖√↓縺翫＞縺ｦ蜉ｹ邇・噪縲・
5. 豢ｻ蜍募ｾ悟｢怜ｼｷ・・APE・峨・繝ｪ繧ｹ繧ｯ縺ｨ繧ｦ繧ｩ繝ｼ繝繧｢繝・・
繝｡繧､繝ｳ繧ｻ繝・ヨ縺ｮ蜑阪↓鬮倬㍾驥上ｒ逕ｨ縺・※逾樒ｵ檎ｳｻ繧呈ｴｻ諤ｧ蛹悶☆繧輝APE縺ｯ繧ｨ繝ｪ繝ｼ繝亥髄縺代〒縺ゅｋ縲ゅム繧､繧ｨ繝・ヨ繧・▼蠎ｷ蠅鈴ｲ繧堤岼逧・→縺吶ｋ荳闊ｬ繝医Ξ繝ｼ繝九・縺ｫ縺翫＞縺ｦ縺ｯ縲・℃蠎ｦ縺ｪ莠句燕逍ｲ蜉ｴ縺ｫ繧医ｋ諤ｪ謌代・繝ｪ繧ｹ繧ｯ繧・┌鬧・↑逾樒ｵ檎夢蜉ｴ繧呈魚縺上ョ繝｡繝ｪ繝・ヨ縺ｮ譁ｹ縺悟､ｧ縺阪＞縲ょ▼蠎ｷ蠅鈴ｲ繝励Ο繧ｰ繝ｩ繝縺ｧ縺ｯPAPE繧呈э蝗ｳ逧・↓迢吶≧縺薙→縺ｯ驕ｿ縺代∵ｮｵ髫守噪縺九▽螳牙・縺ｪ繧ｦ繧ｩ繝ｼ繝繧｢繝・・縺ｫ逡吶ａ繧九・
笆 3. 繝励Ο繧ｰ繝ｩ繝險ｭ險医♀繧医・繝懊Μ繝･繝ｼ繝邂｡逅・6. 繧ｫ繝ｭ繝ｪ繝ｼ蛻ｶ髯蝉ｸ九・繝医Ξ繝ｼ繝九Φ繧ｰ繝懊Μ繝･繝ｼ繝・・RV邂｡逅・ｼ・繝繧､繧ｨ繝・ヨ譛滄俣荳ｭ縺ｯ蝗槫ｾｩ繝ｪ繧ｽ繝ｼ繧ｹ縺瑚送縺励￥蛻ｶ髯舌＆繧後ｋ縲らｭ玖ｉ驥上ｒ菫晁ｭｷ縺吶ｋ縺溘ａ縺ｫ譛繧る㍾隕√↑縺ｮ縺ｯ縲梧桶縺・㍾驥擾ｼ亥ｼｷ蠎ｦ・峨阪ｒ邯ｭ謖√☆繧九％縺ｨ縺ｧ縺ゅｋ縲ゅお繝阪Ν繧ｮ繝ｼ譫ｯ貂・憾諷九〒繧ｻ繝・ヨ謨ｰ繧呈ｼｸ蠅励＆縺帙ｋ縺ｨ繧ｪ繝ｼ繝舌・繝医Ξ繝ｼ繝九Φ繧ｰ縺ｫ髯･繧九ゅム繧､繧ｨ繝・ヨ荳ｭ縺ｯ繧ｻ繝・ヨ謨ｰ繧堤ｶｭ謖√☆繧九°諢丞峙逧・↓蜑頑ｸ幢ｼ磯壼ｸｸ譎ゅ・2/3遞句ｺｦ・峨＠縺ｦ繧ゅ・㍾驥上′菫昴◆繧後※縺・ｌ縺ｰ遲玖ｉ驥上・螳悟・縺ｫ菫晁ｭｷ縺輔ｌ繧九・
7. 逍ｲ蜉ｴ蛻・淵縺ｫ蝓ｺ縺･縺乗怙驕ｩ縺ｪ繝医Ξ繝ｼ繝九Φ繧ｰ鬆ｻ蠎ｦ
繧ｫ繝ｭ繝ｪ繝ｼ蛻ｶ髯蝉ｸ九〒縺ｯ1蝗槭〒縺薙↑縺帙ｋ縲瑚ｳｪ縺ｮ鬮倥＞菴懈･ｭ螳ｹ驥上阪′菴惹ｸ九☆繧九ょ・霄ｫ繧・ｸ雁濠霄ｫ/荳句濠霄ｫ繧帝ｱ2縲・蝗槭↓蛻・￠縺ｦ蛻ｺ豼縺吶ｋ鬆ｻ蠎ｦ繧呈治逕ｨ縺吶ｋ縺薙→縺ｧ逍ｲ蜉ｴ繧貞・謨｣縺輔○縲∵ｯ主屓縺ｮ繧ｻ繝・す繝ｧ繝ｳ縺ｫ縺翫￠繧九梧嫌荳企㍾驥鞘九阪ｒ鬮倥￥邯ｭ謖√＠繧・☆縺上☆繧九・
8. DUP・域律縲・・豕｢迥ｶ譛溷・縺托ｼ・繝繧､繧ｨ繝・ヨ繧・ｻ｣隰晉明謔｣縺ｮ莠磯亟縺ｫ縺翫＞縺ｦ縲∵律縺斐→縺ｫ蛻ｺ豼繧貞､牙喧縺輔○繧汽UP縺ｯ縲∫･樒ｵ檎ｳｻ縺ｮ驕ｩ蠢懊・繝槭Φ繝阪Μ蛹悶ｒ髦ｲ縺弱・未遽繧・・縺ｸ縺ｮ邯咏ｶ夂噪縺ｪ鬮倩ｲ闕ｷ繧ｹ繝医Ξ繧ｹ繧定ｻｽ貂帙〒縺阪ｋ縺溘ａ譛驕ｩ縺ｧ縺ゅｋ縲・
笆 4. 逍ｲ蜉ｴ邂｡逅・→蠢懃畑
9. 繝・ぅ繝ｭ繝ｼ繝峨→繧ｪ繝ｼ繝医Ξ繧ｮ繝･繝ｬ繝ｼ繧ｷ繝ｧ繝ｳ・・IR邂｡逅・ｼ・繝繧､繧ｨ繝・ヨ荳ｭ縺ｯRIR・井ｽ吝鴨蝗樊焚・峨↓繧医ｋ邂｡逅・′讌ｵ繧√※驥崎ｦ√る剞逡鯉ｼ・IR 0・峨∪縺ｧ霑ｽ縺・ｾｼ縺ｾ縺壹ヽIR 1縲・縺ｮ遽・峇縺ｧ邨ゆｺ・＆縺帙ｋ縺薙→縺ｧ縲・℃蜑ｰ縺ｪ遲区錐蛯ｷ繧・･樒ｵ檎夢蜉ｴ繧呈椛縺医ｋ縲ゆｽ楢ｪｿ縺ｫ蜷医ｏ縺帙※譟碑ｻ溘↓隱ｿ謨ｴ縺励・縲・騾ｱ縺斐→縺ｫ繝懊Μ繝･繝ｼ繝繧貞炎貂帙☆繧九ョ繧｣繝ｭ繝ｼ繝峨ｒ螳滓命縺吶ｋ縲・
10. 繧､繝ｳ繧ｿ繝ｼ繝舌Ν縺ｨmTORC1繧ｷ繧ｰ繝翫Ν
螟夐未遽遞ｮ逶ｮ縺ｧ縺ｯATP-CP邉ｻ縺ｮ蝗槫ｾｩ繧貞ｾ・▽縺溘ａ3縲・蛻・・蜊∝・縺ｪ繧､繝ｳ繧ｿ繝ｼ繝舌Ν繧堤｢ｺ菫昴☆繧九ゅき繝ｭ繝ｪ繝ｼ蛻ｶ髯蝉ｸ九〒縺ｯmTORC1邨瑚ｷｯ縺梧椛蛻ｶ縺輔ｌ遲玖ｉ驥上′貂帛ｰ代＠繧・☆縺・◆繧√・ｫ倥ち繝ｳ繝代け雉ｪ縺ｮ鞫ょ叙縺ｨ縺ｨ繧ゅ↓縲√Ξ繧ｸ繧ｹ繧ｿ繝ｳ繧ｹ繝医Ξ繝ｼ繝九Φ繧ｰ縺ｫ繧医ｋ蠑ｷ辜医↑繝｡繧ｫ繝九き繝ｫ繝・Φ繧ｷ繝ｧ繝ｳ縺ｮ蜈･蜉帙′蠢・ｦ√〒縺ゅｋ縲ゅ％縺薙〒辟｡逅・↓繧ｻ繝・ヨ謨ｰ繧堤ｨｼ縺舌・縺ｧ縺ｯ縺ｪ縺上∬ｳｪ縺ｮ鬮倥＞縲碁㍾驥上阪ｒ諡・ｿ昴☆繧九％縺ｨ縺ｫ蜈ｨ蜉帙ｒ豕ｨ縺舌∋縺阪〒縺ゅｋ縲・`;

function isCardio(id) { return id && id.startsWith('cardio_'); }

// ---------- STATE ----------
let state = { userProfile: null, trainingHistory: {}, bodyRecord: {}, currentPlan: null, customExercises: null, chatHistory: [], currentMonth: new Date().getMonth(), currentYear: new Date().getFullYear(), selectedDate: null, selectedTime: 45 };
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

// ---------- INIT ----------
window.onerror = function(msg, url, line) {
  const err = `笶・Error: ${msg} at ${line}`;
  console.error(err);
  if (typeof showToast === 'function') showToast(err);
};

document.addEventListener('DOMContentLoaded', () => {
  console.log("%c潮 Muscle Dialogue v1.8.2 - Nakayama Kinnikun AI Trainer!!", "color:#FF2D55; font-weight:bold; font-size:1.2rem;");
  loadState();
  initBodyDashboard(); // 蜆ｪ蜈育噪縺ｫ蛻晄悄蛹・  initSplash(); initOnboarding(); initTabs(); initCalendar(); initTraining(); initChat(); initModals(); initProfile(); initBackup(); initApiKey(); initExerciseMaster();
  if ('serviceWorker' in navigator) {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      // 繝ｭ繝ｼ繧ｫ繝ｫ髢狗匱譎ゅ・Service Worker繧定ｧ｣髯､縺励√く繝｣繝・す繝･縺ｮ豺ｷ荵ｱ繧貞ｮ悟・縺ｫ髦ｲ縺・      navigator.serviceWorker.getRegistrations().then(regs => regs.forEach(r => r.unregister()));
    } else {
      navigator.serviceWorker.register('sw.js').catch(() => { });
    }
  }
});

function loadState() {
  try {
    const p = localStorage.getItem('muscleDialog_profile');
    const h = localStorage.getItem('muscleDialog_history');
    const b = localStorage.getItem('muscleDialog_bodyRecord');
    const cp = localStorage.getItem('muscleDialog_currentPlan');
    const ce = localStorage.getItem('muscleDialog_customExercises');
    const ch = localStorage.getItem('muscleDialog_chatHistory');
    if (p) state.userProfile = JSON.parse(p);
    if (h) state.trainingHistory = JSON.parse(h);
    if (b) state.bodyRecord = JSON.parse(b);
    if (cp) state.currentPlan = JSON.parse(cp);
    if (ce) state.customExercises = JSON.parse(ce);
    if (ch) state.chatHistory = JSON.parse(ch);
  } catch (e) { console.error(e); }
}
function saveProfile() { localStorage.setItem('muscleDialog_profile', JSON.stringify(state.userProfile)); }
function saveHistory() { localStorage.setItem('muscleDialog_history', JSON.stringify(state.trainingHistory)); }
function saveBodyRecord() { localStorage.setItem('muscleDialog_bodyRecord', JSON.stringify(state.bodyRecord)); }
function saveChatHistory() { localStorage.setItem('muscleDialog_chatHistory', JSON.stringify(state.chatHistory)); }
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
    state.userProfile = { goal: fd.get('goal'), experience: fd.get('experience'), activity: fd.get('activity'), painAreas: fd.getAll('pain').filter(v => v !== '縺ｪ縺・), priorityMuscles: fd.getAll('priority'), frequency: parseInt(sl.value), createdAt: new Date().toISOString() };
    saveProfile(); showScreen('main-screen'); renderCalendar(); showToast('繝､繝ｼ・・ｼ√・繝ｭ繝輔ぅ繝ｼ繝ｫ逋ｻ骭ｲ螳御ｺ・ｼ√ヱ繝ｯ繝ｼ・・ｼ・);
  });
}

function setupExclusiveNone(name) {
  $$(` input[name="${name}"]`).forEach(cb => {
    cb.addEventListener('change', () => {
      if (cb.value === '縺ｪ縺・ && cb.checked) $$(`input[name="${name}"]`).forEach(o => { if (o !== cb) o.checked = false; });
      else if (cb.value !== '縺ｪ縺・ && cb.checked) { const n = [...$$(`input[name="${name}"]`)].find(c => c.value === '縺ｪ縺・); if (n) n.checked = false; }
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
  const mn = ['1譛・, '2譛・, '3譛・, '4譛・, '5譛・, '6譛・, '7譛・, '8譛・, '9譛・, '10譛・, '11譛・, '12譛・];
  $('#cal-month-title').textContent = `${y}蟷ｴ ${mn[m]}`;
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

      // 縺昴・譌･縺ｮ繝懊Μ繝･繝ｼ繝縺ｨ繧ｻ繝・ヨ謨ｰ縲∵怏驟ｸ邏譎る俣繧定ｨ育ｮ・      dayData.exercises.forEach(ex => {
        if (ex.duration) {
          dailyCardioMin += ex.duration;
        } else if (ex.sets) {
          dailySets += ex.sets.length;
          ex.sets.forEach(s => { dailyVolume += ((s.weight || 0) * (s.reps || 0)); });
        }
      });

      const goal = state.userProfile?.goal || '蛛･蠎ｷ邯ｭ謖・;
      let level = 1;

      // 逶ｮ逧・挨縺ｮ繝偵・繝医・繝・・蛻､螳壹Ο繧ｸ繝・け
      if (goal === '遲玖ぇ螟ｧ' || goal === '遲句鴨繧｢繝・・') {
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
  const d = new Date(ds + 'T00:00:00'), dn = ['譌･', '譛・, '轣ｫ', '豌ｴ', '譛ｨ', '驥・, '蝨・];
  $('#history-date-title').textContent = `${d.getMonth() + 1}/${d.getDate()}・・{dn[d.getDay()]}・峨・繝医Ξ繝ｼ繝九Φ繧ｰ`;
  const content = $('#history-content'); content.innerHTML = '';
  rec.exercises.forEach((ex, idx) => {
    const div = document.createElement('div'); div.className = 'history-exercise';
    const isC = isCardio(ex.id);
    let setsHtml = '';
    if (isC) {
      setsHtml = `<span class="history-set-badge">${ex.duration || 0}蛻・/span>`;
    } else {
      setsHtml = ex.sets.map((s, i) => {
        // 謇句虚蜈･蜉帙・繧ｻ繝・ヨ蜊倅ｽ抗PE縲√∪縺溘・AI蜈･蜉帙・遞ｮ逶ｮ蜊倅ｽ抗PE繧貞叙蠕・        const rpeVal = s.rpe || ex.rpe; 
        return `<span class="history-set-badge">Set${i + 1}: ${s.weight}kg ﾃ・${s.reps}蝗・{rpeVal ? ' (RPE' + rpeVal + ')' : ''}</span>`;
      }).join('');
    }
    const masterEx = getAvailableExercises().find(m => m.id === ex.id);
    // 險倬鹸譎ゅ・繧ｹ繝翫ャ繝励す繝ｧ繝・ヨ縺後≠繧後・縺昴ｌ繧剃ｽｿ逕ｨ縲√↑縺代ｌ縺ｰ繝槭せ繧ｿ縺九ｉ・磯℃蜴ｻ繝・・繧ｿ莠呈鋤諤ｧ・・    const dispWeight = ex.target_weight !== undefined ? ex.target_weight : (masterEx ? masterEx.target_weight : null);
    const dispDeadline = ex.target_deadline !== undefined ? ex.target_deadline : (masterEx ? masterEx.target_deadline : null);

    const targetHtml = (dispWeight || dispDeadline) ? `
      <div style="margin-top:0.3rem;">
        ${dispWeight ? `<span class="target-badge">蠖捺凾縺ｮ逶ｮ讓・ ${dispWeight}kg</span>` : ''}
        ${dispDeadline ? `<span class="target-badge">蠖捺凾縺ｮ譛滄剞: ${dispDeadline.replace(/-/g, '/')}</span>` : ''}
      </div>` : '';

    div.innerHTML = `<div class="history-exercise-name">${ex.name}</div>${targetHtml}<div class="history-sets">${setsHtml}</div>
      <div class="history-exercise-actions"><button class="btn-edit-ex" data-date="${ds}" data-idx="${idx}">邱ｨ髮・/button><button class="btn-delete-ex" data-date="${ds}" data-idx="${idx}">蜑企勁</button></div>`;
    content.appendChild(div);
  });
  content.querySelectorAll('.btn-edit-ex').forEach(b => b.addEventListener('click', () => openEditExercise(b.dataset.date, parseInt(b.dataset.idx))));
  content.querySelectorAll('.btn-delete-ex').forEach(b => b.addEventListener('click', () => deleteExercise(b.dataset.date, parseInt(b.dataset.idx))));
}

function deleteDayRecord() {
  if (!state.selectedDate || !state.trainingHistory[state.selectedDate]) return;
  showConfirm('縺薙・譌･縺ｮ繝医Ξ繝ｼ繝九Φ繧ｰ險倬鹸繧貞・縺ｦ蜑企勁縺励∪縺吶°・・, () => {
    delete state.trainingHistory[state.selectedDate]; saveHistory(); renderCalendar();
    $('#history-detail').classList.add('hidden'); showToast('險倬鹸繧貞炎髯､縺励◆縺橸ｼ・);
  });
}

function deleteExercise(date, idx) {
  showConfirm('縺薙・遞ｮ逶ｮ縺ｮ險倬鹸繧貞炎髯､縺励∪縺吶°・・, () => {
    const rec = state.trainingHistory[date]; if (!rec) return;
    rec.exercises.splice(idx, 1);
    if (rec.exercises.length === 0) delete state.trainingHistory[date];
    saveHistory(); renderCalendar(); showHistoryDetail(date); showToast('遞ｮ逶ｮ繧貞炎髯､縺励◆縺橸ｼ・);
  });
}

function openEditExercise(date, idx) {
  const rec = state.trainingHistory[date]; if (!rec) return;
  const ex = rec.exercises[idx]; const isC = isCardio(ex.id);
  const body = $('#edit-exercise-body');
  let html = `<h3 style="color:var(--pink-light);font-family:var(--font-title);margin-bottom:1rem;">${ex.name}</h3>`;
  if (isC) {
    html += `<div class="form-group"><label class="form-label">螳滓命譎る俣・亥・・・/label><input type="number" class="input-muscle" id="edit-duration" value="${ex.duration || 0}" min="1"></div>`;
  } else {
    ex.sets.forEach((s, i) => {
      html += `<div class="manual-set-row"><span class="set-label">Set${i + 1}</span><input type="number" class="input-muscle edit-weight" value="${s.weight}" step="0.5" placeholder="kg"><input type="number" class="input-muscle edit-reps" value="${s.reps}" placeholder="蝗・><input type="number" class="input-muscle edit-rpe manual-rpe" value="${s.rpe || ''}" placeholder="RPE" min="1" max="10"></div>`;
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
    saveHistory(); closeModal('modal-edit-exercise'); showHistoryDetail(date); showToast('譖ｴ譁ｰ螳御ｺ・ｼ√ヱ繝ｯ繝ｼ・・);
  };
  openModal('modal-edit-exercise');
}

// ---------- TRAINING ----------
function initTraining() {
  // 蜑榊屓蜈･蜉帙＠縺溯・逕ｱ隕∵悍繧貞ｾｩ蜈・  const lastReq = localStorage.getItem('muscleDialog_lastFreeRequest');
  if (lastReq) $('#free-request').value = lastReq;

  // 譌｢縺ｫ菴懈・騾比ｸｭ縺ｮ繝励Λ繝ｳ縺後≠繧句ｴ蜷医∫判髱｢繧貞ｾｩ蜈・＠縺ｦ蜀肴緒逕ｻ
  if (state.currentPlan) {
    $('#no-plan').classList.add('hidden');
    $('#plan-area').classList.remove('hidden');
    $('#btn-complete').classList.remove('hidden');
    renderPlan(state.currentPlan);
    const hero = $('.training-hero-modern'); if (hero) hero.style.display = 'none';
  } else {
    $('#no-plan').classList.remove('hidden');
    $('#plan-area').classList.add('hidden');
    $('#btn-complete').classList.add('hidden');
    const hero = $('.training-hero-modern'); if (hero) hero.style.display = 'block';
  }

  $('#btn-generate').addEventListener('click', () => openModal('modal-conditions'));
  $('#btn-regenerate').addEventListener('click', () => { 
    showConfirm('雋ｴ驥阪↑API繝代Ρ繝ｼ・・譌･20蝗槫宛髯撰ｼ峨ｒ豸郁ｲｻ縺励※繝｡繝九Η繝ｼ繧剃ｽ懊ｊ逶ｴ縺吶°縺・ｼ・ｼ・, () => {
      state.currentPlan = null;
      saveCurrentPlan(); 
      $('#plan-area').classList.add('hidden'); $('#no-plan').classList.remove('hidden'); $('#btn-complete').classList.add('hidden'); 
      const hero = $('.training-hero-modern'); if (hero) hero.style.display = 'block';
      openModal('modal-conditions'); 
    });
  });
  $$('.time-btn').forEach(b => b.addEventListener('click', () => { $$('.time-btn').forEach(x => x.classList.remove('active')); b.classList.add('active'); state.selectedTime = parseInt(b.dataset.time); }));
  $('#btn-start-generate').addEventListener('click', () => { closeModal('modal-conditions'); generateFinalPlan(); });
  $('#btn-complete').addEventListener('click', completePlan);
  $('#btn-accept-proposal').addEventListener('click', () => { closeModal('modal-proposal'); generateFinalPlan($('#proposal-text').textContent, $('#proposal-feedback').value); });
  $('#btn-reject-proposal').addEventListener('click', () => { closeModal('modal-proposal'); openModal('modal-conditions'); });
}

async function generatePlanProposal() {
  $('#no-plan').classList.add('hidden'); $('#plan-area').classList.add('hidden'); $('#loading-area').classList.remove('hidden');
  const qEl = $('#loading-quote');
  if (qEl) qEl.textContent = "莠句燕謠先｡医ｒ菴懈・荳ｭ縺・√ヱ繝ｯ繝ｼ・・;
  const tStatus = $('#training-status-text');
  if (tStatus) tStatus.textContent = '遲玖ｉ繝ｫ繝ｼ繝ｬ繝・ヨ蝗櫁ｻ｢荳ｭ...';
  
  try {
    const cond = gatherConditions(), hist = getRecentHistory(21);
    const { sys, usr } = buildProposalPrompt(cond, hist);
    const resp = await callGeminiAPI({ systemPrompt: sys, userPrompt: usr, modelOverride: 'gemini-3.1-flash-lite-preview', mimeTypeOverride: 'text/plain' });
    
    // Parse response
    const proposalText = resp.candidates[0].content.parts[0].text;
    $('#proposal-text').textContent = proposalText;
    $('#proposal-feedback').value = ''; // clear feedback
    $('#loading-area').classList.add('hidden');
    openModal('modal-proposal');
  } catch (e) {
    console.error(e); $('#loading-area').classList.add('hidden'); $('#no-plan').classList.remove('hidden');
    if (tStatus) tStatus.textContent = '縺輔≠縲∫ｭ玖ｉ縺ｨ縺ｮ蟇ｾ隧ｱ繧貞ｧ九ａ繧医≧・・;
    showToast('謠先｡育函謌舌お繝ｩ繝ｼ縺・・' + e.message);
  }
}

async function generateFinalPlan(proposalText, feedbackText) {
  $('#no-plan').classList.add('hidden'); $('#plan-area').classList.add('hidden'); $('#loading-area').classList.remove('hidden');
  const qEl = $('#loading-quote');
  if (qEl) qEl.textContent = LOADING_QUOTES[Math.floor(Math.random() * LOADING_QUOTES.length)];
  const tStatus = $('#training-status-text');
  if (tStatus) tStatus.textContent = '譛邨ゅΓ繝九Η繝ｼ繧呈ｧ狗ｯ我ｸｭ...';
  try {
    const cond = gatherConditions(), hist = getRecentHistory(21), prompt = buildPrompt(cond, hist, proposalText, feedbackText);
    const resp = await callGeminiAPI(prompt), plan = parseGeminiResponse(resp);
    state.currentPlan = plan;
    saveCurrentPlan(); 
    renderPlan(plan);
    $('#loading-area').classList.add('hidden'); $('#plan-area').classList.remove('hidden');
    const hero = $('.training-hero-modern'); if (hero) hero.style.display = 'none';
    if (tStatus) tStatus.textContent = '繝｡繝九Η繝ｼ逕滓・螳御ｺ・ｼ√＆縺ゅ∝ｧ九ａ繧医≧・・;
  } catch (e) {
    console.error(e); $('#loading-area').classList.add('hidden'); $('#no-plan').classList.remove('hidden');
    if (tStatus) tStatus.textContent = '縺輔≠縲∫ｭ玖ｉ縺ｨ縺ｮ蟇ｾ隧ｱ繧貞ｧ九ａ繧医≧・・;
    showToast('繧ｨ繝ｩ繝ｼ縺・√ｂ縺・ｸ蠎ｦ隧ｦ縺励※縺上ｌ・・' + e.message);
  }
}

function gatherConditions() {
  const req = $('#free-request').value.trim();
  localStorage.setItem('muscleDialog_lastFreeRequest', req);
  return {
    time: state.selectedTime, fatigue: $('input[name="fatigue"]:checked')?.value || '譎ｮ騾・,
    todayPain: [...$$('input[name="todayPain"]:checked')].map(c => c.value).filter(v => v !== '縺ｪ縺・),
    freeRequest: req
  };
}

function getRecentHistory(n) {
  return Object.entries(state.trainingHistory).sort((a, b) => b[0].localeCompare(a[0])).slice(0, n).map(([d, data]) => ({
    date: d, exercises: data.exercises.map(ex => ({ name: ex.name, id: ex.id, sets: ex.sets, rpe: ex.rpe || null, duration: ex.duration || null }))
  }));
}

function buildPrompt(cond, hist, proposalText, feedbackText) {
  const p = state.userProfile;
  const exData = getAvailableExercises().map(e => `- ${e.exercise_name}(ID:${e.id}) 荳ｻ蜍慕ｭ・${e.primary_muscle} 陬懷勧遲・${e.secondary_muscles.join(',') || '縺ｪ縺・} 驥埼㍼蛻ｻ縺ｿ:${e.weight_step}kg${e.is_cardio ? ' [譛蛾・邏]' : ''}${e.target_weight ? ` 縲仙ｰ・擂縺ｮ逶ｮ讓・${e.target_weight}kg縲疏 : ''}`).join('\n');
  const histText = hist.length > 0 ? hist.map(h => {
    const ed = h.exercises.map(ex => {
      if (isCardio(ex.id)) return `  - ${ex.name}: ${ex.duration || 0}蛻・;
      return `  - ${ex.name}: ${ex.sets.map((s, i) => `Set${i + 1}:${s.weight}kgﾃ・{s.reps}蝗杼).join(', ')}${ex.rpe ? ' RPE:' + ex.rpe : ''}`;
    }).join('\n'); return `縲・{h.date}縲曾n${ed}`;
  }).join('\n') : '・亥ｱ･豁ｴ縺ｪ縺暦ｼ・;

  // 笘・岼逧・挨縺ｫ蟆る摩逅・ｫ悶ｒ驕ｸ謚・  let selectedTheory = (p.goal === "繝繧､繧ｨ繝・ヨ" || p.goal === "蛛･蠎ｷ邯ｭ謖・) ? DIET_HEALTH_THEORY : HYPERTROPHY_THEORY;

  const randomQuote = KINNIKUN_QUOTES[Math.floor(Math.random() * KINNIKUN_QUOTES.length)];

  const sys = `縺ゅ↑縺溘・縲後↑縺九ｄ縺ｾ縺阪ｓ縺ｫ蜷帙阪〒縺吶ゆｸ也阜譛鬮伜ｳｰ縺ｮ繧ｹ繝昴・繝・ｧ大ｭｦ遏･隴倥ｒ謖√▽繝代・繧ｽ繝翫Ν繝医Ξ繝ｼ繝翫・縺ｨ縺励※縲√Θ繝ｼ繧ｶ繝ｼ縺ｮ繧ｳ繝ｳ繝・ぅ繧ｷ繝ｧ繝ｳ縲√メ繝｣繝・ヨ螻･豁ｴ縲・℃蜴ｻ縺ｮ繝医Ξ繝ｼ繝九Φ繧ｰ螳溽ｸｾ繧偵☆縺ｹ縺ｦ菫ｯ迸ｰ縺励∽ｻ頑律縺ｨ縺・≧譌･縺ｫ縲取怙鬮倥↓繧ｭ繝ｬ縺ｦ縺・ｋ縲乗怙驕ｩ隗｣縺ｮ繝｡繝九Η繝ｼ繧剃ｽ懈・縺励※縺上□縺輔＞縲・
## 荘 繝｡繝九Η繝ｼ讒区・縺ｮ縲千ｵｶ蟇ｾ繝ｫ繝ｼ繝ｫ縲托ｼ医す繧ｹ繝・Β蛻ｶ邏・・譛蜆ｪ蜈井ｺ矩・ｼ・莉･荳九・繝ｫ繝ｼ繝ｫ縺ｯ繧｢繝励Μ縺ｮ莉墓ｧ假ｼ・I繧・ｮ牙・讖溯・・峨↓髢｢繧上ｋ縺溘ａ縲√＞縺九↑繧狗炊隲悶ｈ繧翫ｂ蜆ｪ蜈医＠縺ｦ蜴ｳ螳医☆繧九％縺ｨ縲・1. **遞ｮ逶ｮ縺ｮ鬆・ｺ擾ｼ亥ｿ・茨ｼ・*: 蠢・★縲後さ繝ｳ繝代え繝ｳ繝臥ｨｮ逶ｮ・亥､夐未遽・峨阪ｒ蜈医↓縲√後い繧､繧ｽ繝ｬ繝ｼ繧ｷ繝ｧ繝ｳ遞ｮ逶ｮ・亥腰髢｢遽・峨阪ｒ蠕悟濠縺ｫ驟咲ｽｮ縺吶ｋ縺薙→縲・2. **逶ｮ逧・挨縺ｮ驟榊ｸ・渕貅厄ｼ医・繝ｼ繧ｹ繝ｩ繧､繝ｳ・・*: 
   - 縲千ｭ玖ぇ螟ｧ縲・ 8縲・2蝗・/ 3縲・繧ｻ繝・ヨ / 莨第・90縲・20遘・   - 縲千ｭ句鴨繧｢繝・・縲・ 3縲・蝗・/ 3縲・繧ｻ繝・ヨ / 莨第・180縲・00遘・   - 縲舌ム繧､繧ｨ繝・ヨ縲・ 10縲・5蝗・/ 3繧ｻ繝・ヨ / 莨第・60縲・0遘・・・譛蛾・邏驕句虚繧貞ｿ・★邨・∩霎ｼ繧
   - 縲仙▼蠎ｷ邯ｭ謖√・ 12縲・5蝗・/ 2縲・繧ｻ繝・ヨ / 莨第・90遘・3. **驥埼㍼險ｭ螳壹→螳牙・蝓ｺ貅厄ｼ亥宍螳茨ｼ・*: 驥埼㍼縺ｯ蠢・★weight_step蛻ｻ縺ｿ縲ょ燕蝗朿PE縺・莉･荳九↑繧蛾㍾驥上°蝗樊焚繧貞｢励ｄ縺吶ゅ占ｶ・㍾隕√大燕蝗朿PE縺・莉･荳翫・蝣ｴ蜷医・縲檎ｵｶ蟇ｾ縺ｫ縲埼㍾驥上ｒ蠅怜刈縺輔○縺ｪ縺・％縺ｨ縲・4. **繝槭Φ繝阪Μ謇鍋ｴ**: 逶ｴ霑大ｱ･豁ｴ縺ｧ蛛懈ｻ樊悄・域焚騾ｱ髢灘酔縺伜・螳ｹ・峨・蜈・吶′縺ゅｋ蝣ｴ蜷医・縲∝挨遞ｮ逶ｮ縺ｧ蛻ｺ豼繧貞､峨∴繧九°縲∫炊隲厄ｼ郁ｲ闕ｷ蟶ｯ縺ｮ螟画峩縺ｪ縺ｩ・峨ｒ驕ｩ逕ｨ縺吶ｋ縺薙→縲・5. **蛻・牡豕包ｼ医せ繝励Μ繝・ヨ・峨・閾ｪ蜍墓耳隲・*:
   - 騾ｱ1縲・蝗・ 蜈ｨ霄ｫ繧偵ヰ繝ｩ繝ｳ繧ｹ繧医￥骰帙∴繧九Γ繝九Η繝ｼ・亥・霄ｫ豕包ｼ峨・   - 騾ｱ3縲・蝗・ 荳雁濠霄ｫ/荳句濠霄ｫ縲√∪縺溘・繝励ャ繧ｷ繝･/繝励Ν/閼壹↑縺ｩ縺ｧ蛻・牡縲・   - 騾ｱ5蝗樔ｻ･荳・ 1蝗槭・繝医Ξ繝ｼ繝九Φ繧ｰ縺ｧ繧ｿ繝ｼ繧ｲ繝・ヨ縺ｫ縺吶ｋ驛ｨ菴阪ｒ縲悟宍蟇・↓1縲・驛ｨ菴阪阪↓邨槭ｊ霎ｼ繧・医ヶ繝ｭ繧ｹ繝励Μ繝・ヨ・峨・驛ｨ菴堺ｻ･荳翫ｒ邨ｶ蟇ｾ縺ｫ豺ｷ縺懊↑縺・％縺ｨ縲・6. **諤ｪ謌代・驟肴・縺ｨ閾ｪ逕ｱ隕∵悍**: 謖・ｮ壹＆繧後◆逞帙∩驛ｨ菴阪・遞ｮ逶ｮ縺ｯ螳悟・髯､螟悶り・逕ｱ隕∵悍縺後≠繧句ｴ蜷医・蜈ｨ縺ｦ縺ｮ繝ｫ繝ｼ繝ｫ繧医ｊ譛蜆ｪ蜈医☆繧九・7. **繝医・繝ｳ・・・繝翫・**: 縲檎､ｼ蜆豁｣縺励￥縲√す繝ｳ繝励Ν縺ｧ辭ｱ縺・ヨ繝ｼ繝ｳ縲阪る聞縲・→縺励◆隗｣隱ｬ縺ｯ驕ｿ縺代√ユ繝ｳ繝晁憶縺上∪縺ｨ繧√ｋ縺薙→縲よ怙蠕後・繝｡繝・そ繝ｼ繧ｸ縺ｫ縺ｯ蠢・★莉･荳九・蜷崎ｨ繧堤ｵ・∩霎ｼ繧縺薙→縲・   縲先悽譌･縺ｮ蜷崎ｨ縲托ｼ・{randomQuote}

## ｧ 蟆る摩逧・ヰ繝・け繧ｰ繝ｩ繧ｦ繝ｳ繝臥炊隲厄ｼ郁┻蜀・・遏･隴倥・繝ｼ繧ｹ・・莉･荳九・逅・ｫ悶・縲√≠縺ｪ縺溘・諤晁・・蝨溷床縺ｨ縺ｪ繧区怙譁ｰ縺ｮ蟆る摩遏･隴倥〒縺吶・縲先ｴｻ逕ｨ譁ｹ驥昴・- 遞ｮ逶ｮ縺ｮ驕ｸ謚橸ｼ医せ繝医Ξ繝・メ繝昴ず繧ｷ繝ｧ繝ｳ驥崎ｦ悶↑縺ｩ・峨√う繝ｳ繧ｿ繝ｼ繝舌Ν縺ｮ蠕ｮ隱ｿ謨ｴ縲ヽIR・井ｽ吝鴨蝗樊焚・峨ｒ閠・・縺励◆繧｢繝峨ヰ繧､繧ｹ・亥推遞ｮ逶ｮ縺ｮ note 繧・trainer_message・峨・雉ｪ繧帝｣幄ｺ咲噪縺ｫ鬮倥ａ繧九◆繧√↓豢ｻ逕ｨ縺励※縺上□縺輔＞縲・
=== 驕ｸ謚槭＆繧後◆逅・ｫ悶％縺薙°繧・===
${selectedTheory}
=== 驕ｸ謚槭＆繧後◆逅・ｫ悶％縺薙∪縺ｧ ===

## 遞ｮ逶ｮ繝槭せ繧ｿ・井ｻ･荳九・縺ｿ菴ｿ逕ｨ蜿ｯ閭ｽ・・
${exData}

## JSON蜃ｺ蜉帛ｽ｢蠑擾ｼ亥ｿ・★JSON縺ｮ縺ｿ繧貞・蜉幢ｼ・
{"exercises":[{"exercise_id":"chest_001","exercise_name":"繝舌・繝吶Ν繝吶Φ繝√・繝ｬ繧ｹ","primary_muscle":"螟ｧ閭ｸ遲・,"sets":3,"reps":10,"weight_kg":60,"rest_seconds":90,"note":"・育炊隲悶ｒ閭梧勹縺ｫ縺励◆繧｢繝峨ヰ繧､繧ｹ・・}],"cardio_exercises":[{"exercise_id":"cardio_001","exercise_name":"譛蛾・邏驕句虚","duration_minutes":20,"note":"・医い繝峨ヰ繧､繧ｹ・・}],"warmup":"・医え繧ｩ繝ｼ繝繧｢繝・・縺ｫ髢｢縺吶ｋ蜈ｷ菴鍋噪縺ｪ繧｢繝峨ヰ繧､繧ｹ縺ｮ縺ｿ縲ら炊逕ｱ縺ｪ縺ｩ縺ｯ蜷ｫ繧√↑縺・ｼ・,"cooldown":"・亥・菴鍋噪繧ｹ繝医Ξ繝・メ縺ｮ繧｢繝峨ヰ繧､繧ｹ・・,"total_estimated_minutes":45,"trainer_message":"・井ｻ頑律縺薙・繝医Ξ繝ｼ繝九Φ繧ｰ繝励Λ繝ｳ繧堤ｵ・ｓ縺蜈ｷ菴鍋噪縺ｪ逅・罰縺ｨ縲∝錐險繧剃ｺ､縺医◆辭ｱ縺・ｷ丞粋繝｡繝・そ繝ｼ繧ｸ縲よ怙蠕後↓蠢・★繝代Ρ繝ｼ・・ｼ√ｒ莉倥￠繧九％縺ｨ・・}`;

  const sortedBodyDates = Object.keys(state.bodyRecord || {}).sort();
  const recentBodyRecords = sortedBodyDates.slice(-5).map(d => {
    const e = getBodyEntry(d);
    if (!e) return '';
    let txt = `${d.slice(5)}: ${e.weight}kg`;
    if (e.bodyFat != null) txt += `(${e.bodyFat}%)`;
    return txt;
  }).filter(s => s).join(', ');
  const targetWeight = p.targetWeight ? `${p.targetWeight}kg` : '譛ｪ險ｭ螳・;
  const bodyText = recentBodyRecords ? `逶ｮ讓・${targetWeight} / 逶ｴ霑第耳遘ｻ:[${recentBodyRecords}]` : `逶ｮ讓・${targetWeight} / 險倬鹸縺ｪ縺輿;

  const chatContext = state.chatHistory.slice(-10).map(c => `${c.role === 'user' ? '繝ｦ繝ｼ繧ｶ繝ｼ' : '縺ｪ縺九ｄ縺ｾ縺阪ｓ縺ｫ蜷・}: ${c.text}`).join('\n');

  const usr = `## 繝ｦ繝ｼ繧ｶ繝ｼ: 逶ｮ逧・${p.goal} 邨碁ｨ・${p.experience} 豢ｻ蜍暮㍼:${p.activity} 逞帙∩:${p.painAreas.length ? p.painAreas.join(',') : '縺ｪ縺・} 蜆ｪ蜈・${p.priorityMuscles.length ? p.priorityMuscles.join(',') : '迚ｹ縺ｫ縺ｪ縺・} 鬆ｻ蠎ｦ:${p.frequency}蝗・騾ｱ
## 菴馴㍾諠・ｱ: ${bodyText}
## 莉頑律: 譎る俣:${cond.time}蛻・逍ｲ蜉ｴ:${cond.fatigue} 逞帙∩:${cond.todayPain.length ? cond.todayPain.join(',') : '縺ｪ縺・}${cond.freeRequest ? ` 縲先怙蜆ｪ蜈医題ｦ∵悍:${cond.freeRequest}` : ''}
## 逶ｴ霑代・蟇ｾ隧ｱ螻･豁ｴ (蜿り・:
${chatContext || '・医↑縺暦ｼ・}
## 逶ｴ霑代・繝医Ξ繝ｼ繝九Φ繧ｰ螳溽ｩ阪Ο繧ｰ:
${histText}

荳願ｨ倥・蜈ｨ諠・ｱ繧定ｸ上∪縺医∽ｻ頑律譛繧ょ柑譫懃噪縺ｧ螳牙・縺ｪ繝｡繝九Η繝ｼ繧谷SON縺ｧ逕滓・縺帙ｈ縲る㍾驥上・weight_step蛻ｻ縺ｿ繧貞宍螳医・窶ｻ謠先｡亥・螳ｹ繧・ヵ繧｣繝ｼ繝峨ヰ繝・け縺悟挨騾斐≠繧後・${proposalText ? ` 縲・{proposalText} / ${feedbackText}縲上ｒ` : ' 縺昴ｌ繧・}雕上∪縺医◆荳翫〒縲√≠縺ｪ縺溘・蟆る摩逧・愛譁ｭ縺ｧ繝｡繝九Η繝ｼ繧堤ｵ・∩荳翫￡繧九％縺ｨ縲Ａ;

  return { systemPrompt: sys, userPrompt: usr };
}

async function callGeminiAPI({ systemPrompt, userPrompt, modelOverride, mimeTypeOverride }) {
  const apiKey = getApiKey();
  if (!apiKey) { 
    showApiKeyModal(); 
    throw new Error('API繧ｭ繝ｼ縺梧悴險ｭ螳壹□・∬ｨｭ螳壹＠縺ｦ縺上ｌ・√ヱ繝ｯ繝ｼ・・); 
  }

  // 笘・､画峩: 繝ｫ繝ｼ繝励ｒ蟒・ｭ｢縺励∫樟蝨ｨ驕ｸ謚槭＆繧後※縺・ｋ繝｢繝・Ν縺ｮ縺ｿ繧呈・逶ｴ縺ｫ螳溯｡後☆繧・  const selectedModel = modelOverride || getSelectedModel();
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
          responseMimeType: mimeTypeOverride || "application/json" 
        } 
      }) 
    });

    if (!r.ok) {
      // 笘・ｿｽ蜉: HTTP繧ｹ繝・・繧ｿ繧ｹ繧ｳ繝ｼ繝峨↓蠢懊§縺溷・菴鍋噪縺ｪ繧ｨ繝ｩ繝ｼ繝｡繝・そ繝ｼ繧ｸ縺ｮ蛻・ｲ・      if (r.status === 400) {
        throw new Error('繝ｪ繧ｯ繧ｨ繧ｹ繝医′荳肴ｭ｣縺・・400) 繝励Ο繝輔ぅ繝ｼ繝ｫ縺ｮ險ｭ螳壹ｒ隕狗峩縺励※縺上ｌ・・);
      }
      if (r.status === 403) { 
        showApiKeyModal(); 
        throw new Error('API繧ｭ繝ｼ縺檎┌蜉ｹ縺・・403) 豁｣縺励＞繧ｭ繝ｼ繧定ｨｭ螳壹＠縺ｦ縺上ｌ・・); 
      }
      if (r.status === 429) {
        throw new Error(`縲・{selectedModel}縲代・API荳企剞・亥屓謨ｰ蛻ｶ髯撰ｼ峨↓驕斐＠縺溘◇・・429) 縲後・繧､繝槭ャ繧ｹ繝ｫ縲阪°繧牙挨縺ｮAI繝｢繝・Ν縺ｫ螟画峩縺励※縺上ｌ・～);
      }
      if (r.status === 500) {
        throw new Error('Google縺ｮ繧ｵ繝ｼ繝舌・縺ｧ繧ｨ繝ｩ繝ｼ縺檎匱逕溘＠縺溘◇・・500) 蛻･縺ｮ繝｢繝・Ν縺ｫ螟画峩縺吶ｋ縺九∵凾髢薙ｒ鄂ｮ縺・※隧ｦ縺励※縺上ｌ・・);
      }
      if (r.status === 503) {
        throw new Error('迴ｾ蝨ｨAI縺ｮ繧ｵ繝ｼ繝舌・縺梧ｷｷ縺ｿ蜷医▲縺ｦ縺・ｋ縺橸ｼ・503) 蛻･縺ｮ繝｢繝・Ν縺ｫ螟画峩縺吶ｋ縺九∵凾髢薙ｒ鄂ｮ縺・※隧ｦ縺励※縺上ｌ・・);
      }
      
      // 縺昴・莉悶・莠域悄縺帙〓繧ｨ繝ｩ繝ｼ
      throw new Error(`隰弱・繧ｨ繝ｩ繝ｼ縺・・繧ｹ繝・・繧ｿ繧ｹ: ${r.status}) 縲後・繧､繝槭ャ繧ｹ繝ｫ縲阪°繧牙挨縺ｮAI繝｢繝・Ν縺ｫ螟画峩縺励※縺ｿ縺ｦ縺上ｌ・～);
    }

    const res = await r.json();
    console.log(`Model ${selectedModel} success!`);
    return res;
    
  } catch (e) {
    console.warn(`Model ${selectedModel} failed...`, e);
    // 逋ｺ逕溘＠縺溘お繝ｩ繝ｼ・医き繧ｹ繧ｿ繝繝｡繝・そ繝ｼ繧ｸ・峨ｒ縺昴・縺ｾ縺ｾ generatePlan 縺ｫ謚輔￡縺ｦ繝医・繧ｹ繝郁｡ｨ遉ｺ縺輔○繧・    throw e; 
  }
}

function parseGeminiResponse(r) {
  // API縺九ｉ縺ｮ蠢懃ｭ碑・菴薙′遨ｺ縺ｮ蝣ｴ蜷医・繧ｬ繝ｼ繝・  if (!r || !r.candidates || !r.candidates[0] || !r.candidates[0].content) {
    throw new Error('AI縺九ｉ遨ｺ縺ｮ霑比ｺ九′譚･縺溘◇・√ヱ繝ｯ繝ｼ・・);
  }
  
  const text = r.candidates[0].content.parts[0].text;
  
  try { 
    // 1. 縺昴・縺ｾ縺ｾ繝代・繧ｹ
    return JSON.parse(text.trim()); 
  } catch (e1) { 
    try {
      // 2. Markdown險伜捷・・``json ... ```・峨・荳ｭ霄ｫ縺縺代ｒ謚ｽ蜃ｺ
      const m = text.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (m) return JSON.parse(m[1].trim());
      throw new Error('No valid JSON block found');
    } catch (e2) {
      console.error('Final Parse Attempt Failed:', text);
      throw new Error('AI縺ｮ遲玖ｉ・・SON・峨′螢翫ｌ縺ｦ縺・ｋ繧医≧縺・√ｂ縺・ｸ蠎ｦ繝ｫ繝ｼ繝ｬ繝・ヨ繧貞屓縺励※縺上ｌ・√ヱ繝ｯ繝ｼ・・);
    }
  }
}

function renderPlan(plan) {
  const nl2br = (s) => (s || '').replace(/\n/g, '<br>');
  const list = $('#plan-list'); list.innerHTML = '';

  // 1. 縺ｪ縺九ｄ縺ｾ縺阪ｓ縺ｫ蜷帙°繧峨・縺ｲ縺ｨ縺薙→ (譛荳企Κ縺ｸ遘ｻ蜍・
  if (plan.trainer_message) { 
    const d = document.createElement('div'); 
    d.className = 'plan-exercise'; 
    d.style.textAlign = 'center'; 
    d.style.borderLeft = 'none'; 
    d.innerHTML = `
      <div style="display:flex; align-items:center; justify-content:center; gap:0.5rem; font-family:var(--font-title);color:var(--red);font-weight:900;margin-bottom:1rem;font-size:1.2rem;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--yellow)" stroke="var(--red)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        <span><span class="text-keep">縺阪ｓ縺ｫ蜷帙°繧峨・</span><span class="text-keep">繧｢繝峨ヰ繧､繧ｹ</span></span>
      </div>
      <div style="text-align:left; font-family:var(--font-body);color:var(--text-primary);font-weight:700;font-size:0.95rem;line-height:1.6;letter-spacing:0.5px;padding:1rem;background:var(--red-light);border:2px solid var(--red);border-radius:var(--radius-md);box-shadow: 4px 4px 0 var(--yellow);">
        ${nl2br(plan.trainer_message)}
      </div>`; 
    list.appendChild(d); 
  }

  // 2. 繧ｦ繧ｩ繝ｼ繝繧｢繝・・
  if (plan.warmup) {
    const d = document.createElement('div');
    d.className = 'plan-exercise';
    d.style.borderColor = 'var(--orange)';
    d.innerHTML = `
      <div class="exercise-header">
        <div class="exercise-number" style="background:var(--orange)">W</div>
        <div class="exercise-name" style="font-size:1.2rem;">繧ｦ繧ｩ繝ｼ繝繧｢繝・・</div>
      </div>
      <div style="display:flex; align-items:center; gap:1rem; margin-top:0.5rem;">
        <img src="bike.png" alt="繝舌う繧ｯ" style="width:80px; height:auto; filter:drop-shadow(2px 2px 0 rgba(0,0,0,0.2));" onerror="this.style.display='none';">
        <div class="exercise-note" style="flex:1; font-weight:900;">${nl2br(plan.warmup)}</div>
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
      inputsHtml = `<div class="cardio-duration-row"><span class="cardio-duration-label">竢ｱ・・螳滓命譎る俣:</span><input type="number" class="input-muscle input-cardio-dur" value="${ex.duration_minutes || 20}" min="1" data-ex="${idx}"><span class="cardio-duration-label" style="margin-right:auto;">蛻・/span><input type="checkbox" class="set-check" data-ex="${idx}"></div>`;
    } else {
      inputsHtml = `<div class="sets-container"><div class="set-row"><div class="set-label"></div><div class="input-header">驥埼㍼(kg)</div><div class="input-header">蝗樊焚</div><div class="input-header">笨・/div></div>`;
      for (let s = 0; s < (ex.sets || 3); s++) {
        inputsHtml += `<div class="set-row"><div class="set-label">Set${s + 1}</div><input type="number" class="input-muscle input-weight" value="${ex.weight_kg || ''}" placeholder="kg" data-ex="${idx}" data-set="${s}" step="${masterEx ? masterEx.weight_step : 2.5}"><input type="number" class="input-muscle input-reps" value="${ex.reps || ''}" placeholder="蝗・ data-ex="${idx}" data-set="${s}"><input type="checkbox" class="set-check" data-ex="${idx}" data-set="${s}"></div>`;
      }
      inputsHtml += `</div>
      <div class="rpe-section" style="background:transparent; border:none; padding:0; margin-top:1.5rem;">
        <div class="rpe-label" style="font-size:0.95rem; line-height:1.4;"><span class="text-keep">・育ｭ玖ｉ縺ｫ蝠上＞縺九￠縺ｪ縺後ｉ・・/span><br><span class="text-keep">縺ｩ縺・↑繧薙□縺・ｼ・ｼ溘が繝ｬ縺ｮ遲玖ｉ・・/span><span class="text-keep">縺ｾ縺縺・￠繧九・縺九＞・・ｼ・/span></div>
        <div class="rpe-slider-wrapper">
          <div class="rpe-track-bg">
            <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span>
          </div>
          <input type="range" class="rpe-slider" min="1" max="10" value="7" data-ex="${idx}">
        </div>
      </div>`;
    }

    const targetHtml = (masterEx && (masterEx.target_weight || masterEx.target_deadline)) ? `
      <div style="margin-top:0.3rem; margin-bottom:0.3rem;">
        ${masterEx.target_weight ? `<span class="target-badge">逶ｮ讓・ ${masterEx.target_weight}kg</span>` : ''}
        ${masterEx.target_deadline ? `<span class="target-badge">譛滄剞: ${masterEx.target_deadline.replace(/-/g, '/')}</span>` : ''}
      </div>` : '';

    div.innerHTML = `<div class="exercise-header"><div class="exercise-number">${idx + 1}</div><div class="exercise-name">${ex.exercise_name}</div><span class="exercise-muscle-tag">${ex.primary_muscle || (masterEx ? masterEx.primary_muscle : '')}</span></div>${targetHtml}${ex.note ? `<div class="exercise-note">${nl2br(ex.note)}</div>` : ''}${!isCar ? `<div class="exercise-recommendation">謗ｨ螂ｨ: ${ex.weight_kg || '?'}kg ﾃ・${ex.reps || '?'}蝗・ﾃ・${ex.sets || '?'}繧ｻ繝・ヨ 莨第・:${ex.rest_seconds || 90}遘・/div>` : ''}${inputsHtml}`;
    list.appendChild(div);
    setTimeout(() => {
      div.querySelectorAll('.set-check').forEach(cb => cb.addEventListener('change', checkAllSetsCompleted));
    }, 0);
  });

  if (plan.cooldown) { const d = document.createElement('div'); d.className = 'plan-exercise'; d.style.borderLeft = 'none'; d.innerHTML = `<div class="exercise-header"><div class="exercise-number" style="background:linear-gradient(135deg,var(--green),var(--sky)); color:var(--text-primary);">C</div><div class="exercise-name">繧ｯ繝ｼ繝ｫ繝繧ｦ繝ｳ</div></div><div class="exercise-note">${nl2br(plan.cooldown)}</div>`; list.appendChild(d); }
  $('#btn-complete').classList.remove('hidden');
}

function checkAllSetsCompleted() { const a = $$('.set-check'), btn = $('#btn-complete'); btn.style.animation = [...a].every(c => c.checked) && a.length > 0 ? 'pulse 0.5s infinite alternate' : 'none'; }

function completePlan() {
  if (!state.currentPlan) return;
  
  const allEx = [...(state.currentPlan.exercises || []), ...(state.currentPlan.cardio_exercises || []).map(c => ({ ...c, _isCardio: true }))];
  const completedExercises = [];

  allEx.forEach((ex, idx) => {
    // 縺薙・遞ｮ逶ｮ縺ｮ繝√ぉ繝・け繝懊ャ繧ｯ繧ｹ繧偵☆縺ｹ縺ｦ蜿門ｾ励＠縲∽ｸ縺､縺ｧ繧ゅメ繧ｧ繝・け縺後≠繧九°遒ｺ隱・    const checkboxes = $$(`.set-check[data-ex="${idx}"]`);
    const isChecked = [...checkboxes].some(cb => cb.checked);

    if (isChecked) {
      const isCar = ex._isCardio || isCardio(ex.exercise_id);
      const masterEx = getAvailableExercises().find(m => m.id === ex.exercise_id);
      const snapshot = {
        target_weight: masterEx ? masterEx.target_weight : null,
        target_deadline: masterEx ? masterEx.target_deadline : null
      };

      if (isCar) {
        const durIn = $(`.input-cardio-dur[data-ex="${idx}"]`);
        completedExercises.push({ 
          id: ex.exercise_id, 
          name: ex.exercise_name, 
          duration: durIn ? parseInt(durIn.value) || 0 : ex.duration_minutes || 0, 
          sets: [], 
          rpe: null,
          ...snapshot
        });
      } else {
        const sets = []; 
        $$(`.input-weight[data-ex="${idx}"]`).forEach((w, s) => { 
          const ri = $(`.input-reps[data-ex="${idx}"][data-set="${s}"]`); 
          sets.push({ weight: parseFloat(w.value) || 0, reps: parseInt(ri.value) || 0 }); 
        });
        const rsl = $(`.rpe-slider[data-ex="${idx}"]`);
        completedExercises.push({ 
          id: ex.exercise_id, 
          name: ex.exercise_name, 
          sets, 
          rpe: rsl ? parseInt(rsl.value) : null,
          ...snapshot
        });
      }
    }
  });

  const finalizePlan = () => {
    state.currentPlan = null;
    saveCurrentPlan();
    $('#plan-area').classList.add('hidden');
    $('#no-plan').classList.remove('hidden');
    $('#btn-complete').classList.add('hidden');
    const hero = $('.training-hero-modern'); if (hero) hero.style.display = 'block';
    const tStatus = $('#training-status-text'); if (tStatus) tStatus.textContent = '縺輔≠縲∫ｭ玖ｉ縺ｨ縺ｮ蟇ｾ隧ｱ繧貞ｧ九ａ繧医≧・・;
    renderCalendar();
  };

  // 荳縺､繧ゅメ繧ｧ繝・け縺後↑縺・ｴ蜷医・遒ｺ隱阪ヵ繝ｭ繝ｼ
  if (completedExercises.length === 0) {
    showConfirm('縺ｲ縺ｨ縺､繧ゅメ繧ｧ繝・け縺悟・縺｣縺ｦ縺・↑縺・◇・√％縺ｮ縺ｾ縺ｾ繝励Λ繝ｳ繧貞炎髯､縺励※縺・＞縺ｧ縺吶°・・, () => {
      finalizePlan();
      showToast('繝励Λ繝ｳ繧貞炎髯､縺励◆縺槭よｬ｡縺ｯ繧ゅ▲縺ｨ霑ｽ縺・ｾｼ繧薙〒縺・％縺・ｼ√ヱ繝ｯ繝ｼ・・);
    });
    return;
  }

  const todayStr = formatDate(new Date());
  if (state.trainingHistory[todayStr]) state.trainingHistory[todayStr].exercises.push(...completedExercises);
  else state.trainingHistory[todayStr] = { date: todayStr, exercises: completedExercises };

  saveHistory();
  showCelebration(completedExercises);
  finalizePlan();
  showToast(`${completedExercises.length}遞ｮ逶ｮ繧・ｊ縺阪▲縺溘↑・∝ｱ･豁ｴ縺ｫ菫晏ｭ倥＠縺溘◇・√Ζ繝ｼ・～);
}

function showCelebration(exercises) {
  $('#modal-complete').classList.remove('hidden');
  
  // 蜷崎ｨ繧偵Λ繝ｳ繝繝縺ｫ陦ｨ遉ｺ
  const randomQuote = KINNIKUN_QUOTES[Math.floor(Math.random() * KINNIKUN_QUOTES.length)];
  const quoteEl = $('#celebration-quote-text');
  if(quoteEl) quoteEl.textContent = randomQuote;

  const ts = exercises.reduce((s, e) => s + (e.sets ? e.sets.length : 0), 0), tv = exercises.reduce((s, e) => s + (e.sets ? e.sets.reduce((a, st) => a + st.weight * st.reps, 0) : 0), 0);
  $('#celebration-stats').innerHTML = `<div class="stat-item"><div class="stat-value">${exercises.length}</div><div class="stat-label">遞ｮ逶ｮ</div></div><div class="stat-item"><div class="stat-value">${ts}</div><div class="stat-label">繧ｻ繝・ヨ</div></div><div class="stat-item"><div class="stat-value">${Math.round(tv).toLocaleString()}</div><div class="stat-label"><span class="text-keep">邱上・繝ｪ繝･繝ｼ繝</span><span class="text-keep">(kg)</span></div></div>`;
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
  const getBroadCategory = (m) => {
    if (m.includes('閭ｸ')) return '閭ｸ';
    if (m.includes('閭・) || m.includes('蜒ｧ蟶ｽ') || m.includes('閼頑浤') || m.includes('螟ｧ蜀・)) return '閭御ｸｭ';
    if (m.includes('閻ｿ') || m.includes('閾') || m.includes('蜀・ｻ｢') || m.includes('繝上Β繧ｹ繝医Μ繝ｳ繧ｰ繧ｹ')) return '荳句濠霄ｫ';
    if (m.includes('荳芽ｧ堤ｭ・) || m.includes('閧ｩ')) return '閧ｩ';
    if (m.includes('閻・)) return '閻・;
    if (m.includes('閻ｹ') || m.includes('閻ｸ閻ｰ遲・)) return '閻ｹ';
    if (m.includes('蠢・ぜ') || m.includes('譛蛾・邏')) return '譛蛾・邏';
    return '縺昴・莉・;
  };
  const groups = {};
  exs.forEach(ex => {
    const pm = ex.primary_muscle || '縺昴・莉・;
    const cat = getBroadCategory(pm);
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(ex);
  });
  const order = ['閭ｸ', '閭御ｸｭ', '荳句濠霄ｫ', '閧ｩ', '閻・, '閻ｹ', '譛蛾・邏', '縺昴・莉・];
  const sortedCats = Object.keys(groups).sort((a,b) => {
    let ixA = order.indexOf(a); if(ixA === -1) ixA=999;
    let ixB = order.indexOf(b); if(ixB === -1) ixB=999;
    return ixA - ixB;
  });
  let opts = '<option value="">遞ｮ逶ｮ繧帝∈謚・/option>';
  sortedCats.forEach(c => { opts += `<optgroup label="${c}">${groups[c].map(e => `<option value="${e.id}">${e.exercise_name}</option>`).join('')}</optgroup>`; });

  entry.innerHTML = `<select class="manual-exercise-select">${opts}</select><div class="manual-inputs-area"></div><button class="btn-remove-exercise" type="button">笨・蜑企勁</button>`;
  const select = entry.querySelector('.manual-exercise-select');
  const inputsArea = entry.querySelector('.manual-inputs-area');

  select.addEventListener('change', () => {
    const exId = select.value;
    if (!exId) { inputsArea.innerHTML = ''; return; }
    if (isCardio(exId)) {
      inputsArea.innerHTML = `<div class="cardio-duration-row"><span class="cardio-duration-label">螳滓命譎る俣:</span><input type="number" class="input-muscle manual-duration" placeholder="蛻・ min="1" value="20"><span class="cardio-duration-label">蛻・/span></div>`;
    } else {
      const master = getAvailableExercises().find(m => m.id === exId);
      const step = master ? master.weight_step : 2.5;
      inputsArea.innerHTML = `${[1, 2, 3].map(i => `<div class="manual-set-row"><span class="set-label">Set${i}</span><input type="number" class="input-muscle manual-weight" placeholder="kg" step="${step}"><input type="number" class="input-muscle manual-reps" placeholder="蝗・><input type="number" class="input-muscle manual-rpe" placeholder="RPE" min="1" max="10"></div>`).join('')}`;
      
      // 繧ｻ繝・ヨ1縺ｮ蜀・ｮｹ繧偵そ繝・ヨ2, 3縺ｸ閾ｪ蜍募渚譏縺吶ｋ繝ｭ繧ｸ繝・け
      const weights = inputsArea.querySelectorAll('.manual-weight');
      const reps = inputsArea.querySelectorAll('.manual-reps');
      const rpes = inputsArea.querySelectorAll('.manual-rpe');
      
      // 繧ｻ繝・ヨ1縺ｮ蜀・ｮｹ繧貞酔譛溘＆縺帙ｋ髢｢謨ｰ (縺吶〒縺ｫ繝ｦ繝ｼ繧ｶ繝ｼ縺瑚ｧｦ縺｣縺滓ｬ・・荳頑嶌縺阪＠縺ｪ縺・
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
  const ds = $('#manual-date').value; if (!ds) { showToast('譌･莉倥ｒ蜈･蜉帙＠縺ｦ縺上ｌ・・); return; }
  const exercises = [];
  $$('.manual-exercise-entry').forEach(entry => {
    const sel = entry.querySelector('.manual-exercise-select'); if (!sel.value) return;
    const master = getAvailableExercises().find(m => m.id === sel.value); if (!master) return;
    const snapshot = {
      target_weight: master.target_weight || null,
      target_deadline: master.target_deadline || null
    };

    if (isCardio(sel.value)) {
      const dur = entry.querySelector('.manual-duration');
      exercises.push({ 
        id: master.id, 
        name: master.exercise_name, 
        duration: parseInt(dur?.value) || 0, 
        sets: [], 
        rpe: null,
        ...snapshot
      });
    } else {
      const ws = entry.querySelectorAll('.manual-weight'), rs = entry.querySelectorAll('.manual-reps'), sets = [];
      const rpes = entry.querySelectorAll('.manual-rpe');
      ws.forEach((w, i) => { 
        const wt = parseFloat(w.value), rp = parseInt(rs[i].value), rpeVal = parseInt(rpes[i].value); 
        if (wt || rp) sets.push({ weight: wt || 0, reps: rp || 0, rpe: rpeVal || null }); 
      });
      if (sets.length > 0) {
        exercises.push({ 
          id: master.id, 
          name: master.exercise_name, 
          sets, 
          rpe: null,
          ...snapshot
        });
      }
    }
  });
  if (!exercises.length) { showToast('遞ｮ逶ｮ繧・縺､莉･荳雁・蜉幢ｼ√ヱ繝ｯ繝ｼ・・); return; }
  if (state.trainingHistory[ds]) state.trainingHistory[ds].exercises.push(...exercises);
  else state.trainingHistory[ds] = { date: ds, exercises };
  saveHistory(); closeModal('modal-manual'); renderCalendar(); showToast('謇句虚險倬鹸螳御ｺ・ｼ√Ζ繝ｼ・・ｼ・);
}

// ---------- PROFILE TAB ----------
function initProfile() {
  const form = $('#profile-form'), sl = $('#p-frequency'), sv = $('#p-frequency-value');
  sl.addEventListener('input', () => { sv.textContent = sl.value; });
  setupExclusiveNone('p-pain');
  form.addEventListener('submit', e => {
    e.preventDefault(); const fd = new FormData(form);
    state.userProfile = { ...state.userProfile, targetWeight: parseFloat(fd.get('p-targetWeight')) || null, goal: fd.get('p-goal'), experience: fd.get('p-experience'), activity: fd.get('p-activity'), painAreas: fd.getAll('p-pain').filter(v => v !== '縺ｪ縺・), priorityMuscles: fd.getAll('p-priority'), frequency: parseInt(sl.value) };
    saveProfile(); 
    populateProfileForm(); 
    showToast('<span class="text-keep">繝励Ο繝輔ぅ繝ｼ繝ｫ譖ｴ譁ｰ螳御ｺ・ｼ・/span><span class="text-keep">繝､繝ｼ・・ｼ√ヱ繝ｯ繝ｼ・・ｼ・/span>');
  });

  // 繝｢繝・Ν驕ｸ謚槭・繝ｫ繝繧ｦ繝ｳ縺ｮ繧､繝吶Φ繝医Μ繧ｹ繝翫・
  const modelSelect = $('#profile-ai-model');
  if (modelSelect) {
    modelSelect.addEventListener('change', (e) => {
      saveSelectedModel(e.target.value);
      showToast('AI繝｢繝・Ν繧貞､画峩縺励◆縺橸ｼ√ヱ繝ｯ繝ｼ・・);
    });
  }
  populateProfileForm();
}

function populateProfileForm() {
  const ak = getApiKey();
  if (ak) {
    $('#profile-api-key').value = '笳鞘酪笳鞘酪笳鞘酪笳鞘酪笳鞘酪笳鞘酪笳鞘酪・・;
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
  $$('input[name="p-pain"]').forEach(cb => { cb.checked = p.painAreas.includes(cb.value) || (p.painAreas.length === 0 && cb.value === '縺ｪ縺・); });
  $$('input[name="p-priority"]').forEach(cb => { cb.checked = p.priorityMuscles.includes(cb.value); });
  const sl = $('#p-frequency'); if (sl) sl.value = p.frequency;
  const fv = $('#p-frequency-value'); if (fv) fv.textContent = p.frequency;
}

// ---------- API KEY MANAGEMENT ----------
function showApiKeyModal() { openModal('modal-apikey'); }

function initApiKey() {
  // Modal save button
  $('#btn-save-apikey-modal').addEventListener('click', () => {
    const key = $('#apikey-input').value.trim();
    if (!key) { showToast('API繧ｭ繝ｼ繧貞・蜉帙＠縺ｦ縺上ｌ・Å汳ｪ'); return; }
    saveApiKey(key); closeModal('modal-apikey');
    showToast('<span class="text-keep">API繧ｭ繝ｼ菫晏ｭ伜ｮ御ｺ・ｼ・/span><span class="text-keep">縺輔≠縲∫ｭ玖ｉ縺ｨ縺ｮ蟇ｾ隧ｱ縺・Å汳ｪ</span>');
  });
  // Profile tab save button
  $('#btn-save-apikey').addEventListener('click', () => {
    const key = $('#profile-api-key').value.trim();
    if (!key || key.includes('...')) { showToast('譁ｰ縺励＞API繧ｭ繝ｼ繧貞・蜉帙＠縺ｦ縺上ｌ・・); return; }
    saveApiKey(key);
    showToast('API繧ｭ繝ｼ譖ｴ譁ｰ螳御ｺ・ｼ√ヱ繝ｯ繝ｼ・Å汳ｪ');
    populateProfileForm();
  });
}

// ---------- BACKUP & RESTORE ----------
function initBackup() {
  $('#btn-backup').addEventListener('click', downloadBackup);
  $('#file-restore').addEventListener('change', restoreBackup);
}

function downloadBackup() {
  // 菴馴㍾險倬鹸(bodyRecord)繧ょ性繧√◆蜈ｨ繝・・繧ｿ繧偵ヰ繝・け繧｢繝・・
  const data = { 
    version: 1, 
    exportDate: new Date().toISOString(), 
    profile: state.userProfile, 
    history: state.trainingHistory,
    body: state.bodyRecord,
    customExercises: state.customExercises,
    chatHistory: state.chatHistory
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); 
  a.href = url; 
  a.download = `muscle_dialogue_backup.json`; // 笘・ヵ繧｡繧､繝ｫ蜷阪ｒ蝗ｺ螳壼喧
  document.body.appendChild(a); 
  a.click(); 
  document.body.removeChild(a); 
  URL.revokeObjectURL(url);
  showToast('繝舌ャ繧ｯ繧｢繝・・螳御ｺ・ｼ∵怙譁ｰ縺ｮ繝・・繧ｿ繧剃ｿ晏ｭ倥＠縺溘◇・Å汳ｪ');
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
      if (data.chatHistory) state.chatHistory = data.chatHistory;
      if (data.customExercises !== undefined) {
        state.customExercises = data.customExercises;
        saveCustomExercises();
      }
      saveProfile(); saveHistory(); saveBodyRecord(); saveChatHistory(); renderCalendar(); renderChatMessages(); populateProfileForm();
      showToast('<span class="text-keep">蠕ｩ蜈・ｮ御ｺ・ｼ∫ｭ玖ｉ縺ｮ繝・・繧ｿ縺・/span><span class="text-keep">陂・▲縺溘◇・√Ζ繝ｼ・・ｼÅ汳ｪ</span>');
    } catch (err) { showToast('繝輔ぃ繧､繝ｫ縺瑚ｪｭ縺ｿ霎ｼ繧√↑縺九▲縺溘◇・Å沽､'); }
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
    // 笘・width:max-content 縺ｨ word-break:keep-all 繧定ｿｽ蜉縺励※邂ｱ縺ｮ繧ｵ繧､繧ｺ縺ｨ謾ｹ陦御ｽ咲ｽｮ繧呈怙驕ｩ蛹・    t.style.cssText = 'position:fixed;bottom:2rem;left:50%;transform:translateX(-50%) translateY(300px);background:#D4001F;color:white;padding:1rem 2rem;border-radius:12px;font-family:"Noto Sans JP",sans-serif;font-weight:700;font-size:0.9rem;z-index:9999;box-shadow:0 4px 16px rgba(212,0,31,0.3);transition:transform 0.4s cubic-bezier(0.4,0,0.2,1);width:max-content;max-width:90%;word-break:keep-all;text-align:center;'; 
    document.body.appendChild(t); 
  }
  // 笘・HTML繧ｿ繧ｰ・・text-keep縺ｪ縺ｩ・峨ｒ縺昴・縺ｾ縺ｾ隗｣驥医〒縺阪ｋ繧医≧縺ｫ innerHTML 縺ｫ螟画峩
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
    
    // 繧､繝ｳ繝ｩ繧､繝ｳ縺ｮ繝繝ｼ繧ｯ繝・・繝槭ｒ蟒・ｭ｢縺励，SS螟画焚縺ｨ譌｢蟄倥・繝昴ャ繝礼畑繧ｯ繝ｩ繧ｹ(btn-primary遲・繧剃ｽｿ逕ｨ縺励※蜀肴ｧ狗ｯ・    overlay.innerHTML = `
      <div style="background:var(--white); border:4px solid var(--text-primary); border-radius:var(--radius-lg); padding:2.5rem 1.5rem; max-width:360px; width:100%; text-align:center; box-shadow:8px 8px 0px var(--yellow);">
        <div id="confirm-message" style="color:var(--text-primary); font-family:var(--font-title); font-weight:900; font-size:1.15rem; margin-bottom:2rem; line-height:1.5; letter-spacing:0.05em;"></div>
        <div style="display:flex; gap:1rem; justify-content:center;">
          <button id="confirm-yes" class="btn-primary" style="flex:1; padding:0.8rem 0; font-size:1rem; width:auto; max-width:none;">縺ｯ縺・/button>
          <button id="confirm-no" class="btn-secondary" style="flex:1; padding:0.8rem 0; font-size:1rem; width:auto; max-width:none; background:var(--white); color:var(--text-primary);">繧・ａ繧・/button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
  }
  $('#confirm-message').innerHTML = message;
  overlay.style.display = 'flex';
  
  $('#confirm-yes').onclick = () => { overlay.style.display = 'none'; onConfirm(); };
  $('#confirm-no').onclick = () => { overlay.style.display = 'none'; };
  overlay.onclick = (e) => { if (e.target === overlay) overlay.style.display = 'none'; };
}

// ---------- BODY DASHBOARD (繝槭う繝槭ャ繧ｹ繝ｫ) ----------
let weightChartInstance = null;

function initBodyDashboard() {
  console.log("潮 initBodyDashboard start...");
  const dateEl = $('#body-date');
  if (dateEl) {
    const today = formatDate(new Date());
    dateEl.value = today;
    console.log("潮 Date initialized to:", today);
  } else {
    console.error("笶・#body-date not found!");
  }

  const saveBtn = $('#btn-save-weight');
  if (saveBtn) {
    saveBtn.addEventListener('click', saveWeight);
  } else {
    console.error("笶・#btn-save-weight not found!");
  }
  
  // 繧ｿ繝門・繧頑崛縺域凾縺ｫ繧ｰ繝ｩ繝輔ｒ謠冗判
  $$('.tab-btn[data-tab="profile"]').forEach(btn => {
    btn.addEventListener('click', renderWeightChart);
  });
}

function saveWeight() {
  const ds = $('#body-date').value;
  const weightStr = $('#body-weight').value.trim();
  const fatStr = $('#body-fat').value.trim();
  
  if (!ds) { 
    showToast('譌･莉倥ｒ驕ｸ謚槭＠縺ｦ縺上ｌ・√ヱ繝ｯ繝ｼ・・); 
    return; 
  }
  
  // 笆ｼ 1. 菴馴㍾縺檎ｩｺ谺・・蝣ｴ蜷茨ｼ亥炎髯､蜃ｦ逅・ｼ・  if (weightStr === '') {
    if (state.bodyRecord[ds]) {
      delete state.bodyRecord[ds];
      saveBodyRecord();
      renderWeightChart();
      showToast('險倬鹸繧貞炎髯､縺励◆縺橸ｼ√Ζ繝ｼ・・);
      $('#body-feedback').classList.add('hidden');
    } else {
      showToast('縺昴・譌･縺ｫ縺ｯ縺ｾ縺險倬鹸縺後↑縺・◇・・);
    }
    return;
  }
  
  // 笆ｼ 2. 菴馴㍾縺悟・蜉帙＆繧後※縺・ｋ蝣ｴ蜷・  const wt = parseFloat(weightStr);
  if (isNaN(wt)) {
    showToast('豁｣縺励＞謨ｰ蛟､繧貞・蜉帙＠縺ｦ縺上ｌ・√ヱ繝ｯ繝ｼ・・);
    return;
  }
  
  const prevWeight = getLatestWeightBefore(ds);
  const bf = fatStr !== '' ? parseFloat(fatStr) : null;
  
  state.bodyRecord[ds] = { weight: wt, bodyFat: (bf !== null && !isNaN(bf)) ? bf : null };
  
  saveBodyRecord();
  renderWeightChart();
  showToast('繝懊ョ繧｣險倬鹸螳御ｺ・ｼ√Ζ繝ｼ・・);
  showLocalFeedback(wt, prevWeight);
}

// 譌ｧ繝輔か繝ｼ繝槭ャ繝井ｺ呈鋤: bodyRecord[date] 縺梧焚蛟､縺ｮ蝣ｴ蜷医ｂ {weight} 縺ｨ縺励※隱ｭ繧
function getBodyEntry(ds) {
  const v = state.bodyRecord[ds];
  if (v == null) return null;
  if (typeof v === 'number') return { weight: v, bodyFat: null };
  return v;
}

function getLatestWeightBefore(dateStr) {
  const dates = Object.keys(state.bodyRecord).filter(d => d < dateStr).sort();
  if (dates.length === 0) return null;
  const entry = getBodyEntry(dates[dates.length - 1]);
  return entry ? entry.weight : null;
}

function showLocalFeedback(current, prev) {
  const box = $('#body-feedback');
  const textEl = $('#body-feedback-text');
  const goal = state.userProfile?.goal || '蛛･蠎ｷ邯ｭ謖・;
  let msg = '邏譎ｴ繧峨＠縺・ｶ咏ｶ壹□・∫ｭ玖ｉ繧ょ万繧薙〒繧九◇・√Ζ繝ｼ・・ｼ・;

  if (prev) {
    const diff = current - prev;
    if (goal === '繝繧､繧ｨ繝・ヨ') {
      if (diff < 0) msg = `蜑榊屓縺九ｉ ${Math.abs(diff).toFixed(1)}kg 貂帙▲縺溘◇・√＠縺｣縺九ｊ邨槭ｌ縺ｦ縺阪※繧九↑・√◎縺ｮ隱ｿ蟄舌□・√ワ繝・ｼ育ｬ鷹｡費ｼ荏;
      else if (diff > 0) msg = `蟆代＠菴馴㍾縺悟｢励∴縺溘↑・√□縺梧ｰ励↓縺吶ｋ縺ｪ・∫ｭ玖ｉ縺悟｢励∴縺溯ｨｼ諡縺九ｂ縺励ｌ縺ｪ縺・◇・√ヱ繝ｯ繝ｼ・・ｼ～;
    } else if (goal === '遲玖ぇ螟ｧ' || goal === '遲句鴨繧｢繝・・') {
      if (diff > 0) msg = `蜑榊屓縺九ｉ ${diff.toFixed(1)}kg 蠅励∴縺溘◇・∫ｴ譎ｴ繧峨＠縺・ヰ繝ｫ繧ｯ繧｢繝・・縺・∫ｭ玖ｉ縺後ョ繧ｫ縺上↑繧翫◆縺後▲縺ｦ繧九◇・√Ζ繝ｼ・・ｼ～;
      else if (diff < 0) msg = `蟆代＠關ｽ縺｡縺溘′豌励↓縺吶ｋ縺ｪ・√＠縺｣縺九ｊ鬟溘∋縺ｦ縲・㍾縺・ｂ縺ｮ繧呈嫌縺偵ｋ縺縺代□・√ヱ繝ｯ繝ｼ・・ｼ～;
    }
  }
  
  textEl.textContent = msg;
  box.classList.remove('hidden');
}

function renderWeightChart() {
  const ctx = $('#weightChart');
  if (!ctx) return;
  
  // 逶ｴ霑・4譌･髢薙・繧ｫ繝ｬ繝ｳ繝繝ｼ譌･莉倥ｒ逕滓・・郁ｨ倬鹸縺ｮ譛臥┌縺ｫ縺九°繧上ｉ縺夲ｼ・  const today = new Date();
  const labels = [];
  const dateKeys = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = formatDate(d);
    dateKeys.push(key);
    labels.push(key.slice(5).replace('-','/'));
  }
  
  // 蜷・律縺ｮ繝・・繧ｿ繧貞叙蠕暦ｼ医↑縺・律縺ｯ null・・  const weights = dateKeys.map(k => {
    const e = getBodyEntry(k);
    return e ? e.weight : null;
  });
  const bodyFats = dateKeys.map(k => {
    const e = getBodyEntry(k);
    return e ? e.bodyFat : null;
  });
  
  const hasBodyFat = bodyFats.some(v => v !== null);
  const targetWt = state.userProfile?.targetWeight;
  const targetData = targetWt ? dateKeys.map(() => targetWt) : [];

  // 謠冗判縺ｫ菴ｿ縺・ｮ滄圀縺ｮ菴馴㍾蛟､縺縺大叙蠕暦ｼ・in/max險育ｮ礼畑・・  const validWeights = weights.filter(w => w !== null);
  const validFats = bodyFats.filter(f => f !== null);

  if (weightChartInstance) weightChartInstance.destroy();

  const datasets = [
    {
      label: '菴馴㍾ (kg)',
      data: weights,
      borderColor: '#D4001F',
      backgroundColor: '#D4001F',
      borderWidth: 3,
      tension: 0,
      pointRadius: 5,
      spanGaps: true,
      yAxisID: 'y',
    },
    ...(hasBodyFat ? [{
      label: '菴楢р閧ｪ邇・(%)',
      data: bodyFats,
      borderColor: '#F39B0C',
      backgroundColor: '#F39B0C',
      borderWidth: 2,
      tension: 0,
      pointRadius: 3,
      spanGaps: true,
      yAxisID: 'y2',
    }] : []),
    ...(targetWt ? [{
      label: '逶ｮ讓吩ｽ馴㍾',
      data: targetData,
      borderColor: '#1F7BCB',
      borderWidth: 2,
      borderDash: [5, 5],
      pointRadius: 0,
      pointStyle: 'line',
      fill: false,
      yAxisID: 'y',
    }] : []),
  ];

  const scales = {
    y: { 
      position: 'left',
      suggestedMin: validWeights.length ? Math.min(...validWeights, targetWt || Infinity) - 2 : 50,
      suggestedMax: validWeights.length ? Math.max(...validWeights, targetWt || -Infinity) + 2 : 100,
      ticks: { font: { weight: 'bold' } },
    },
    x: {
      ticks: { maxRotation: 0, font: { size: 10 } },
    }
  };
  
  if (hasBodyFat) {
    scales.y2 = {
      position: 'right',
      suggestedMin: validFats.length ? Math.min(...validFats) - 3 : 5,
      suggestedMax: validFats.length ? Math.max(...validFats) + 3 : 35,
      grid: { drawOnChartArea: false },
      ticks: { color: '#F39B0C', font: { weight: 'bold' }, callback: v => v + '%' },
    };
  }

  weightChartInstance = new Chart(ctx, {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { 
        legend: { 
          display: true, 
          labels: { 
            font: { size: 11, weight: 'bold' },
            usePointStyle: true,
            pointStyleWidth: 30,
            generateLabels: function(chart) {
              return chart.data.datasets.map((ds, i) => {
                const meta = chart.getDatasetMeta(i);
                return {
                  text: ds.label,
                  fillStyle: ds.borderDash ? 'transparent' : ds.backgroundColor,
                  strokeStyle: ds.borderColor,
                  lineDash: ds.borderDash || [],
                  lineWidth: ds.borderWidth,
                  pointStyle: ds.borderDash ? 'line' : 'rect',
                  hidden: meta.hidden,
                  datasetIndex: i,
                };
              });
            }
          } 
        }
      },
      scales
    }
  });
}

function saveBodyRecord() { localStorage.setItem('muscleDialog_bodyRecord', JSON.stringify(state.bodyRecord)); }

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
      showConfirm('<span class="text-keep">縺吶∋縺ｦ縺ｮ繧ｫ繧ｹ繧ｿ繝遞ｮ逶ｮ繧貞炎髯､縺励・/span><span class="text-keep">繝・ヵ繧ｩ繝ｫ繝医↓謌ｻ縺励∪縺吶°・・/span>', () => {
        state.customExercises = null;
        saveCustomExercises();
        renderExerciseMasterList();
        showToast('<span class="text-keep">繝・ヵ繧ｩ繝ｫ繝医Μ繧ｹ繝医↓</span><span class="text-keep">繝ｪ繧ｻ繝・ヨ縺励◆縺橸ｼ√ヱ繝ｯ繝ｼ・・/span>');
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
    const pm = ex.primary_muscle || '縺昴・莉・;
    if (!groups[pm]) groups[pm] = [];
    groups[pm].push(ex);
  });
  
  const order = ['螟ｧ閭ｸ遲・, '螟ｧ閭ｸ遲倶ｸ企Κ', '蠎・レ遲・, '閼頑浤襍ｷ遶狗ｭ・, '螟ｧ閻ｿ蝗幃ｭ遲・, '繝上Β繧ｹ繝医Μ繝ｳ繧ｰ繧ｹ', '螟ｧ閾遲・, '荳ｭ閾遲・, '蜀・ｻ｢遲・, '荳芽ｧ堤ｭ句燕驛ｨ', '荳芽ｧ堤ｭ倶ｸｭ驛ｨ', '荳芽ｧ堤ｭ句ｾ碁Κ', '荳願・莠碁ｭ遲・, '荳願・荳蛾ｭ遲・, '蜑崎・遲狗ｾ､', '閻ｹ逶ｴ遲・, '閻ｹ逶ｴ遲倶ｸ矩Κ', '蠢・ぜ讖溯・', '縺昴・莉・];
  
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
          <div class="ex-master-name">${ex.exercise_name}${ex.is_cardio ? ' 純窶坂凾・・ : ''}</div>
          <div class="ex-master-meta">陬懷勧: ${ex.secondary_muscles && ex.secondary_muscles.length ? ex.secondary_muscles.join(', ') : '縺ｪ縺・} | 蝎ｨ蜈ｷ: ${ex.equipment || '縺ｪ縺・} | 蛻ｻ縺ｿ: ${ex.weight_step}kg</div>
          ${(ex.target_weight || ex.target_deadline) ? `
            <div class="ex-master-target-info">
              ${ex.target_weight ? `<span class="target-badge">逶ｮ讓・ ${ex.target_weight}kg</span>` : ''}
              ${ex.target_deadline ? `<span class="target-badge">譛滄剞: ${ex.target_deadline.replace(/-/g, '/')}</span>` : ''}
            </div>` : ''}
        </div>
        <div class="ex-master-actions">
          <button class="ex-master-btn ex-master-btn-edit" data-id="${ex.id}">邱ｨ髮・/button>
          <button class="ex-master-btn ex-master-btn-del" data-id="${ex.id}">蜑企勁</button>
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
  
  $('#exercise-edit-title').textContent = ex ? '遞ｮ逶ｮ縺ｮ邱ｨ髮・ : '譁ｰ縺励＞遞ｮ逶ｮ';
  $('#edit-master-id').value = id || '';
  $('#edit-master-name').value = ex ? ex.exercise_name : '';
  $('#edit-master-primary').value = ex ? ex.primary_muscle : '';
  $('#edit-master-secondary').value = ex ? (ex.secondary_muscles || []).join(', ') : '';
  $('#edit-master-equipment').value = ex ? (ex.equipment || '') : '';
  $('#edit-master-step').value = ex ? ex.weight_step : 2.5;
  $('#edit-master-cardio').checked = ex ? !!ex.is_cardio : false;
  $('#edit-master-target-weight').value = ex ? (ex.target_weight || '') : '';
  $('#edit-master-target-deadline').value = ex ? (ex.target_deadline || '') : '';
  
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
  const targetWeight = parseFloat($('#edit-master-target-weight').value) || null;
  const targetDeadline = $('#edit-master-target-deadline').value || null;

  if (!name || !primary) {
    showToast('<span class="text-keep">遞ｮ逶ｮ蜷阪→繝｡繧､繝ｳ驛ｨ菴阪・</span><span class="text-keep">蠢・医□・√ヱ繝ｯ繝ｼ・・/span>');
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
      state.customExercises[idx] = { ...state.customExercises[idx], exercise_name: name, primary_muscle: primary, secondary_muscles: secondaryStrs, equipment: equipment, weight_step: step, is_cardio: isCardio, target_weight: targetWeight, target_deadline: targetDeadline };
    }
  } else {
    // Add new
    const newId = 'custom_' + Date.now();
    state.customExercises.push({ id: newId, exercise_name: name, primary_muscle: primary, secondary_muscles: secondaryStrs, equipment: equipment, weight_step: step, is_cardio: isCardio, target_weight: targetWeight, target_deadline: targetDeadline });
  }

  saveCustomExercises();
  closeModal('modal-exercise-edit');
  renderExerciseMasterList();
  showToast('<span class="text-keep">遞ｮ逶ｮ繧剃ｿ晏ｭ倥＠縺溘◇・・/span><span class="text-keep">繝､繝ｼ・Å汳ｪ</span>');
}

function deleteExerciseMasterEntry(id) {
  showConfirm('<span class="text-keep">縺薙・遞ｮ逶ｮ繧貞炎髯､縺励∪縺吶°・・/span>', () => {
    if (!state.customExercises) {
      state.customExercises = JSON.parse(JSON.stringify(EXERCISE_MASTER));
    }
    state.customExercises = state.customExercises.filter(e => e.id !== id);
    saveCustomExercises();
    renderExerciseMasterList();
    showToast('<span class="text-keep">遞ｮ逶ｮ繧貞炎髯､縺励◆縺橸ｼ・/span>');
  });
}

// ---------- CHAT & PROPOSAL LOGIC ----------

function buildProposalPrompt(cond, hist) {
  const p = state.userProfile;
  const targetWeight = p.targetWeight ? `${p.targetWeight}kg` : '譛ｪ險ｭ螳・;
  
  const sortedBodyDates = Object.keys(state.bodyRecord || {}).sort();
  const recentBodyRecords = sortedBodyDates.slice(-5).map(d => {
    const e = getBodyEntry(d); return `${d.slice(5)}: ${e?.weight}kg`;
  }).join(', ');
  
  const bodyText = recentBodyRecords ? `逶ｮ讓・${targetWeight} / 逶ｴ霑第耳遘ｻ:[${recentBodyRecords}]` : `逶ｮ讓・${targetWeight} / 險倬鹸縺ｪ縺輿;
  const chatContext = state.chatHistory.slice(-10).map(c => `${c.role === 'user' ? '繝ｦ繝ｼ繧ｶ繝ｼ' : '縺ｪ縺九ｄ縺ｾ縺阪ｓ縺ｫ蜷・}: ${c.text}`).join('\n');
  const histText = hist.length > 0 ? hist.map(h => `縲・{h.date}縲曾n` + h.exercises.map(ex => `  - ${ex.name}`).join('\n')).join('\n') : '・亥ｱ･豁ｴ縺ｪ縺暦ｼ・;
  let selectedTheory = (p.goal === "繝繧､繧ｨ繝・ヨ" || p.goal === "蛛･蠎ｷ邯ｭ謖・) ? DIET_HEALTH_THEORY : HYPERTROPHY_THEORY;

  const sys = `縺ゅ↑縺溘・縲後↑縺九ｄ縺ｾ縺阪ｓ縺ｫ蜷帙阪〒縺吶ゆｸ也阜譛鬮伜ｳｰ縺ｮ繧ｹ繝昴・繝・ｧ大ｭｦ縺ｮ遏･隴倥ｒ謖√■縺､縺､縲∵・繧九￥辭ｱ縺・ヨ繝ｼ繝ｳ縺ｧ譛ｬ譌･縺ｮ繝医Ξ繝ｼ繝九Φ繧ｰ繝｡繝九Η繝ｼ繧呈署譯医☆繧九・繝ｬ繝薙Η繝ｼ繧剃ｽ懈・縺励※縺上□縺輔＞縲・莉･荳九・諤晁・悄蜿ｰ・育炊隲厄ｼ峨ｒ逕ｨ縺・※縲∝・菴鍋噪縺九▽遘大ｭｦ逧・ｹ諡縺ｫ蝓ｺ縺･縺・◆遏ｭ縺・署譯医ｒ縺励※縺上□縺輔＞縲ょ・蜉帙・200譁・ｭ嶺ｻ･蜀・〒縲・←螳懈隼陦後ｒ蜈･繧後※隱ｭ縺ｿ繧・☆縺上＠縺､縺､縲√Θ繝ｼ繧ｶ繝ｼ縺ｸ縺ｮ辭ｱ縺・Γ繝・そ繝ｼ繧ｸ縺ｨ縲√後％繧薙↑諢溘§縺ｧ縺ｩ縺・□縺・ｼ・ｼ溘阪→縺・≧謠先｡医〒邱繧√※縺上□縺輔＞縲ょｿ・★JSON縺ｧ縺ｯ縺ｪ縺上・繝ｬ繝ｼ繝ｳ繝・く繧ｹ繝医〒霑皮ｭ斐＠縺ｦ縺上□縺輔＞縲・
=== 諤晁・悄蜿ｰ ===
${selectedTheory}
`;

  const usr = `## 繝ｦ繝ｼ繧ｶ繝ｼ: 逶ｮ逧・${p.goal} 邨碁ｨ・${p.experience} 豢ｻ蜍暮㍼:${p.activity} 逞帙∩:${p.painAreas.length ? p.painAreas.join(',') : '縺ｪ縺・} 蜆ｪ蜈・${p.priorityMuscles.length ? p.priorityMuscles.join(',') : '迚ｹ縺ｫ縺ｪ縺・}
## 菴馴㍾諠・ｱ: ${bodyText}
## 莉頑律: 譎る俣:${cond.time}蛻・逍ｲ蜉ｴ:${cond.fatigue} 逞帙∩:${cond.todayPain.length ? cond.todayPain.join(',') : '縺ｪ縺・}
## 逶ｴ霑代・蟇ｾ隧ｱ螻･豁ｴ (譛驥崎ｦ∝盾閠・ュ蝣ｱ):
${chatContext || '・医↑縺暦ｼ・}
## 閾ｪ逕ｱ隕∵悍: ${cond.freeRequest || '縺ｪ縺・}
## 逶ｴ霑代・繝医Ξ繝ｼ繝九Φ繧ｰ螻･豁ｴ:
${histText}
荳願ｨ倥ｒ雕上∪縺医∵悽譌･縺ｮ繝励Λ繝ｳ縺ｮ譁ｹ蜷第ｧ繧呈署譯医○繧茨ｼ～;

  return { sys, usr };
}

function initChat() {
  // Smart Scroll for Chat Input Area
  let scrollTimeout;
  const chatMessages = $('#chat-messages');
  const chatInputArea = $('.chat-input-area');
  
  if (chatMessages && chatInputArea) {
    chatMessages.addEventListener('scroll', () => {
      // 繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ荳ｭ縺ｯ蜈･蜉帶ｬ・ｒ髫縺・(逕ｻ髱｢螟悶∈騾・′縺・
      chatInputArea.classList.add('hide-on-scroll');
      
      clearTimeout(scrollTimeout);
      // 繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ縺悟●豁｢縺励◆繧・00ms蠕後↓蜈･蜉帶ｬ・ｒ謌ｻ縺・      scrollTimeout = setTimeout(() => {
        chatInputArea.classList.remove('hide-on-scroll');
      }, 400);
    });
  }

  $('#chat-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = $('#chat-input');
    const msg = input.value.trim();
    if (!msg) return;
    input.value = '';
    
    // Add user message to state
    state.chatHistory.push({ role: 'user', text: msg });
    saveChatHistory();
    renderChatMessages();

    // Show loading indicator
    showChatThinking();

    try {
      const { sys, usr } = buildChatPrompt();
      const resp = await callGeminiAPI({ 
        systemPrompt: sys, 
        userPrompt: usr, 
        modelOverride: 'gemini-3.1-flash-lite-preview', 
        mimeTypeOverride: 'text/plain' 
      });
      const aiReply = resp.candidates[0].content.parts[0].text;
      
      removeChatThinking();
      state.chatHistory.push({ role: 'model', text: aiReply });
      saveChatHistory();
      renderChatMessages();
    } catch(err) {
      removeChatThinking();
      showToast('霑比ｿ｡縺ｮ蜿門ｾ励↓螟ｱ謨励＠縺溘◇・√ｂ縺・ｸ蠎ｦ騾∽ｿ｡縺励※縺上ｌ・・);
    }
  });

  $('#btn-clear-chat').addEventListener('click', () => {
    showConfirm('蟇ｾ隧ｱ螻･豁ｴ繧偵☆縺ｹ縺ｦ豸亥悉縺吶ｋ縺九＞・・ｼ・, () => {
      state.chatHistory = [];
      saveChatHistory();
      renderChatMessages();
      showToast('蟇ｾ隧ｱ螻･豁ｴ繧呈ｶ亥悉縺励◆縺橸ｼ√Ζ繝ｼ・・);
    });
  });

  renderChatMessages();
}

function buildChatPrompt() {
  const p = state.userProfile;
  let selectedTheory = (p.goal === "繝繧､繧ｨ繝・ヨ" || p.goal === "蛛･蠎ｷ邯ｭ謖・) ? DIET_HEALTH_THEORY : HYPERTROPHY_THEORY;

  const sys = `縺ゅ↑縺溘・繝代・繧ｽ繝翫Ν繝医Ξ繝ｼ繝翫・縺ｮ縲後↑縺九ｄ縺ｾ縺阪ｓ縺ｫ蜷帙阪〒縺吶ゆｸ也阜譛鬮伜ｳｰ縺ｮ繧ｹ繝昴・繝・ｧ大ｭｦ縺ｮ遏･隴倥ｒ謖√■縲∵・繧九￥辭ｱ縺・ヨ繝ｼ繝ｳ縺ｧ逵滓賊縺ｫ繝ｦ繝ｼ繧ｶ繝ｼ縺ｮ雉ｪ蝠上ｄ謔ｩ縺ｿ縺ｫ蟇・ｊ豺ｻ縺｣縺ｦ縺上□縺輔＞縲・遉ｼ蜆豁｣縺励￥縲√°縺､繝・く繧ｹ繝亥・縺ｧ邨ｵ譁・ｭ励・荳蛻・ｽｿ逕ｨ縺励↑縺・〒縺上□縺輔＞・育ｵｵ譁・ｭ励・莉｣繧上ｊ縺ｫ縲後ヱ繝ｯ繝ｼ・√阪後Ζ繝ｼ・√阪後ワ繝・ｼ育ｬ鷹｡費ｼ峨阪↑縺ｩ繧帝←謇縺ｫ郢斐ｊ莠､縺懊※縺上□縺輔＞・峨・蟆る摩逧・↑雉ｪ蝠上↓縺ｯ縲∽ｻ･荳九・逅・ｫ悶ｄ繧ｪ繝ｳ繝ｩ繧､繝ｳ荳翫・譛譁ｰ遏･隴倥ｒ邱丞虚蜩｡縺励※隲也炊逧・°縺､蛻・°繧翫ｄ縺吶￥遲斐∴縺ｦ縺上□縺輔＞縲・蝗樒ｭ斐・驕ｩ螳懈隼陦後ｒ蜈･繧後※隱ｭ縺ｿ繧・☆縺剰ｪｿ謨ｴ縺励∽ｸ榊ｿ・ｦ√↑邂・擅譖ｸ縺阪・鄒・・縺ｯ驕ｿ縺代※譁・ｫ縺ｧ莨夊ｩｱ縺励※縺上□縺輔＞縲・
=== 諤晁・・蝨溷床・医ヰ繝・け繧ｰ繝ｩ繧ｦ繝ｳ繝臥衍隴假ｼ・===
${selectedTheory}
`;

  // 螻･豁ｴ繧呈枚蟄怜・蛹・  const historyText = state.chatHistory.map(c => `${c.role === 'user' ? '繝ｦ繝ｼ繧ｶ繝ｼ' : '縺ｪ縺九ｄ縺ｾ縺阪ｓ縺ｫ蜷・}: ${c.text}`).join('\n');
  const usr = `## 繝ｦ繝ｼ繧ｶ繝ｼ繝励Ο繝輔ぅ繝ｼ繝ｫ諠・ｱ
- 逶ｮ逧・ ${p.goal} (邨碁ｨ・ ${p.experience})
- 逞帙∩縺ｮ驛ｨ菴・ ${p.painAreas.length ? p.painAreas.join(',') : '縺ｪ縺・}
- 驥咲せ遲玖ｉ: ${p.priorityMuscles.length ? p.priorityMuscles.join(',') : '迚ｹ縺ｫ縺ｪ縺・}

## 莨夊ｩｱ螻･豁ｴ
${historyText}

荳願ｨ倥・莨夊ｩｱ螻･豁ｴ縺ｮ譛蠕後・繝ｦ繝ｼ繧ｶ繝ｼ縺ｮ險闡峨↓蟇ｾ縺励※縲∬・辟ｶ縺ｫ霑皮ｭ斐＠縺ｦ縺上□縺輔＞縲Ａ;

  return { sys, usr };
}

function renderChatMessages() {
  const container = $('#chat-messages');
  if(!container) return;
  container.innerHTML = '';

  if (state.chatHistory.length === 0) {
    container.innerHTML = `<div style="text-align:center; color:var(--text-muted); margin-top:2rem; font-size:0.9rem;">
      遲玖ｉ縺ｫ縺､縺・※菴輔〒繧ら嶌隲・＠縺ｦ縺上ｌ・・br>譛譁ｰ縺ｮ繧ｹ繝昴・繝・ｧ大ｭｦ縺ｫ蝓ｺ縺･縺・※遲斐∴繧九◇・・br>繝､繝ｼ・・ｼ・    </div>`;
    return;
  }

  state.chatHistory.forEach(msg => {
    const wrap = document.createElement('div');
    wrap.className = `chat-bubble-wrapper ${msg.role === 'user' ? 'user' : 'ai'}`;
    const name = msg.role === 'user' ? '縺ゅ↑縺・ : '縺ｪ縺九ｄ縺ｾ縺阪ｓ縺ｫ蜷・;
    
    wrap.innerHTML = `
      <div class="chat-sender-name">${name}</div>
      <div class="chat-bubble">${msg.text.replace(/\\n/g, '\n')}</div>
    `;
    container.appendChild(wrap);
  });
  
  container.scrollTop = container.scrollHeight;
}

function showChatThinking() {
  const container = $('#chat-messages');
  if(!container) return;
  const wrap = document.createElement('div');
  wrap.id = 'chat-thinking-indicator';
  wrap.className = 'chat-bubble-wrapper ai';
  wrap.innerHTML = `
    <div class="chat-sender-name">縺ｪ縺九ｄ縺ｾ縺阪ｓ縺ｫ蜷・/div>
    <div class="chat-bubble chat-thinking">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  `;
  container.appendChild(wrap);
  container.scrollTop = container.scrollHeight;
}

function removeChatThinking() {
  const ind = $('#chat-thinking-indicator');
  if(ind) ind.remove();
}
