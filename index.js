const EXT_ID = 'wh40k-character-builder';
const TARGET_CHARACTER_NAME = '';
const AUTO_OPEN_FOR_EMPTY_CHAT = true;
const AUTO_SEND_AFTER_FILL = true;

const PANEL_ORDER = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'N'];

// 7 页结构:
// 0 = splash 起始页
// 1 = 基础信息(B 名字 / C 血统 / F 年龄 / G 性别 / I 外貌)
// 2 = 出身来历(A 星球 / H 背景)
// 3 = 身份立场(D 立场 / E 职业)
// 4 = 初始情况(K 资源 / L 秘密 / N 羁绊)
// 5 = 命运牵连(J 主线卷入)
// 6 = 最终提交
const PAGE_FIELDS = [
  [],
  ['B', 'C', 'F', 'G', 'I'],
  ['A', 'H'],
  ['D', 'E'],
  ['K', 'L', 'N'],
  ['J'],
  [],
];

const TOTAL_PAGES = PAGE_FIELDS.length;
const FINAL_PAGE = TOTAL_PAGES - 1;

const FIELD_TITLES = {
  A: 'A. 所在星球',
  B: 'B. 名字',
  C: 'C. 人类血统 / 特殊分支',
  D: 'D. 阵营 / 当前立场',
  E: 'E. 职业',
  F: 'F. 年龄',
  G: 'G. 性别',
  H: 'H. 人物背景',
  I: 'I. 外貌',
  J: 'J. ??_????',
  K: 'K. 初始资源 / 开局条件',
  L: 'L. 初始秘密 / 隐藏命运',
  N: 'N. 初始羁绊',
};

const OPTIONS = {
  A: [
    ['A1', '卡利亚（卡利亚星区-首府）'],
    ['A2', '普莱（卡利亚星区-军事世界）'],
    ['A3', '伊卡索斯（卡利亚星区-国教世界）'],
    ['A4', '马尔菲（卡利亚星区-封建世界）'],
    ['A5', '所罗门（卡利亚星区-锻造世界）'],
    ['A6', '珍珠月（卡利亚星区-海洋农业世界）'],
    ['A7', '梅尔泰斯主环（梅尔泰斯次级星区-首府）'],
    ['A8', '伊克沙尼亚普瑞姆（伊克沙尼亚星区-首府）'],
    ['A9', '三重星冠（伊克沙尼亚星区-锻造世界）'],
    ['A10', '塔斯拉尔（伊克沙尼亚星区-边缘殖民世界）'],
    ['A11', '圣伊诺克（伊克沙尼亚星区-农业世界）'],
    ['A12', '维吉尔要塞（伊克沙尼亚星区-军事要塞）'],
    ['A13', '暗沙（伊克沙尼亚星区-走私港）'],
    ['A14', '埃隆尼克（莫斯塔克扩区-首府）'],
    ['A15', '塔弗拉恩（莫斯塔克扩区-殖民世界）'],
    ['A16', '波特兰星（莫斯塔克扩区-农业世界）'],
    ['A17', '奥尔图拉（莫斯塔克扩区-独特世界）'],
    ['A18', '圣阿克利亚（莫斯塔克扩区-国教世界）'],
    ['A19', '欧姆巴佩11号太空站（卡利亚星区-火星秘密空间站）'],
    ['A20', '奥利赛V太空站（卡利亚星区-导航者空间站）'],
    ['A21', '哥利亚太空要塞（卡利亚星区-死亡守望要塞）'],
  ],

  B: [
    ['B0', '默认（{{user}}）'],
    ['B1', '自定义名字'],
  ],

  C: [
    ['C1', '正常人类'],
    ['C3', '虚空之子'],
    ['C4', '不可接触者'],
    ['C5', '领航者'],
    ['C6', '猫人'],
    ['C7', '机械神教培育人'],
  ],

  D: [
    ['D1', '人类帝国忠诚者'],
    ['D2', '边缘独立者 / 灰色地带'],
    ['D3', '潜在混沌信徒'],
    ['D4', '秘密的异形同情者'],
    ['D5', '审判庭-纯洁派'],
    ['D6', '审判庭-激进派'],
    ['D7', '审判庭-占视者派'],
    ['D8', '审判庭-妄尊异形派'],
    ['D9', '机械神教-探索者'],
    ['D10', '机械神教-异形博学派'],
    ['D11', '机械神教-火星正统派'],
  ],

  E: [
    // 帝国正规与普通社会
    ['E1', '帝国卫队士兵'],
    ['E2', '帝国商船船长'],
    ['E3', '帝国海军军官'],
    ['E4', '法务部预备员'],
    ['E5', '医护员'],
    ['E6', '行政书吏'],
    ['E7', '铸造厂劳工'],
    ['E8', '星区学院学者'],
    ['E9', '帝国教会牧师'],
    ['E10', '修女会成员'],
    ['E11', '蔷薇修女会侍从'],
    ['E12', '帝国贵族'],
    ['E13', '贵族家族护卫'],
    ['E14', '行商浪人继承人'],
    ['E15', '虚空掮客'],
    ['E16', '虚空打捞者'],
    ['E17', '赏金猎人'],
    ['E18', '流浪骑士（侍从级机甲）'],
    ['E19', '无业流民'],
    ['E20', '性工作者'],

    // 阿斯塔特路线
    ['E21', '死亡守望修士'],
    ['E22', '深渊律子侦察兵'],
    ['E23', '翡翠龙战团修士'],
    ['E24', '初创子团修士'],

    // 审判庭与灵能路线
    ['E25', '审判庭侍从'],
    ['E26', '审判庭神秘学者'],
    ['E27', '受批准灵能者'],
    ['E28', '星语者'],
    ['E29', '拜死教刺客'],
    ['E30', '未登记灵能者'],

    // 机械神教路线
    ['E31', '机械神教初级神甫'],
    ['E32', '机械神教探索队正式成员'],
    ['E33', '护教军游侠'],
    ['E34', '遗传学探索者'],
    ['E35', '高阶考古学僧'],
    ['E36', '机仆监管员'],

    // 黑暗边缘与法外路线
    ['E37', '巢都帮派成员'],
    ['E38', '锯齿小子初级成员'],
    ['E39', '黑市情报贩子'],
    ['E40', '走私者'],
    ['E41', '海盗'],
    ['E42', '叛逃海军军官'],
    ['E43', '角斗奴'],
    ['E44', '异形走私中间人'],
    ['E45', '混沌教团外围信徒'],
  ],

  F: [
    ['F1', '青年'],
    ['F2', '壮年'],
    ['F3', '中年'],
    ['F4', '年长'],
  ],

  G: [
    ['G1', '男'],
    ['G2', '女'],
    ['G3', '模糊 / 不明'],
  ],

  H: [
    ['H1', '正常家庭'],
    ['H2', '军队世家'],
    ['H3', '修道院孤儿'],
    ['H4', '上层家族'],
    ['H5', '文官出身'],
    ['H6', '新移民'],
    ['H7', '巢都工人家庭'],
    ['H8', '农村家庭'],
    ['H9', '没落家族'],
    ['H10', '黑帮遗孤'],
    ['H11', '巢都贫民'],
    ['H12', '铸造圣堂学徒'],
    ['H13', '穿越者'],
    ['H14', '铸造世界工役奴仆'],
    ['H15', '教会附属孤儿院出身'],
    ['H16', '虚空船员家系'],
    ['H17', '边境殖民者家庭'],
    ['H18', '法务部家庭出身'],
    ['H19', '失势贵族旁支'],
    ['H20', '身世不明养子'],
    ['H21', '走私圈出身'],
    ['H22', '档案机构出身'],
    ['H23', '边缘废土聚落'],
    ['H24', '流亡者后裔'],
  ],

  I: [
    ['I1', '丑陋至极，难以形容'],
    ['I2', '高大健壮，相貌普通'],
    ['I3', '普通身材，普通外貌'],
    ['I4', '身材优美，人见人爱'],
  ],

  J: [
    ['J1', '无主线（纯自由剧情）'],
    ['J2', '单主线·永恒欢愉'],
    ['J3', '单主线·帝皇幻梦号'],
    ['J4', '单主线·异形主线·太平潮起'],
    ['J5', '双主线·永恒欢愉 + 帝皇幻梦号'],
    ['J6', '双主线·永恒欢愉 + 太平潮起'],
    ['J7', '双主线·帝皇幻梦号 + 太平潮起'],
    ['J8', '三主线全开（高负荷 / 长跑模式）'],
  ],

  K: [
    ['K1', '身无长物'],
    ['K2', '基本温饱'],
    ['K3', '小有积蓄'],
    ['K4', '有稳定住处'],
    ['K5', '持有一件珍贵遗物'],
    ['K6', '背负债务'],
    ['K7', '拥有一处隐秘安全屋'],
    ['K8', '有一名可调用的低阶随从'],
    ['K9', '持有一条危险情报'],
    ['K10', '拥有一件受限装备'],
  ],

  L: [
    ['L0', '无'],
    ['L1', '你持有伪造身份'],
    ['L2', '你忘记了一段关键记忆'],
    ['L3', '某个组织正在暗中标记你'],
    ['L4', '你曾见过不该见之物'],
    ['L5', '你身上藏有来历不明的样本 / 圣物 / 数据片段'],
    ['L6', '你欠下了一桩未了的血债或旧案'],
    ['L7', '你是某项预言、占卜或推演中的变量'],
    ['L8', '某位高位者曾秘密接触过你'],
    ['L9', '你体内潜伏着一种尚未显现的异常'],
    ['L10', '你的档案中存在一页被焚毁的记录'],
    ['L11', '你持有一枚无法读取的古老数据钥'],
    ['L12', '你梦见过一艘不应存在的金色巨舰'],
    ['L13', '你曾收到一封没有署名的密令'],
    ['L14', '你偶尔能感知到非人类的低语'],
    ['L15', '你曾在星语噪音中听见自己的名字'],
    ['L16', '你曾被审判庭短暂拘押，但记录已经消失'],
    ['L17', '你曾参与过一次不该留下记录的清洗'],
    ['L18', '你曾被迫出卖自己以换取生路'],
  ],

  N: [
    ['N0', '无'],
    ['N1', '家人仍在'],
    ['N2', '有一位旧战友'],
    ['N3', '有一位神职引路人'],
    ['N4', '有一位债主 / 压迫者'],
    ['N5', '有一位黑市联系人'],
    ['N6', '有一位正在监视你的上级'],
    ['N7', '有一位失踪的重要之人'],
    ['N8', '有一位机械神教联系人'],
    ['N9', '有一位审判庭线人'],
    ['N10', '有一位曾救过你的人'],
    ['N11', '有一位行商浪人保护人'],
    ['N12', '有一位法务部旧识'],
    ['N13', '有一位行政部档案员朋友'],
    ['N14', '有一位海军军官联系人'],
    ['N15', '有一位异形或异端联系人'],
    ['N16', '有一位长期跟随你的男性机仆'],
    ['N17', '有一位长期跟随你的女性机仆'],
    ['N18', '有一位蔷薇修女会的旧识'],
    ['N19', '有一位普通修女会的庇护者'],
    ['N20', '有一位帝国骑士家族的熟人'],
    ['N21', '有一位商船上的可靠副手'],
    ['N22', '有一位底巢帮派中的内应'],
  ],
};

const DEFAULT_STATE = {
  A: 'A1',
  B: 'B0',
  C: 'C1',
  D: 'D1',
  E: 'E1',
  F: 'F1',
  G: 'G1',
  H: 'H1',
  I: 'I3',
  J: 'J1',
  K: 'K1',
  L: 'L0',
  N: 'N0',
  NAME: '',
};

function buildPageTitles() {
  return {
    0: '初始化',
    1: '基础信息',
    2: '出身来历',
    3: '身份立场',
    4: '初始情况',
    5: '命运牵连',
    6: '最终提交',
  };
}

function buildPageDescriptions() {
  return {
    0: '点击下方按钮接入终端,开始您的公民登记。您将依次完成 5 节登记表。',
    1: '// 第一节 — 您的姓名、血统、年龄、性别与外貌。',
    2: '// 第二节 — 您的出生星球与身世背景。',
    3: '// 第三节 — 您当前的阵营立场与职业。',
    4: '// 第四节 — 您当前持有的资源、秘密与羁绊。',
    5: '// ??_???? / [NON_STANDARD_FIELD] — 来源未知的字段',
    6: '// 复核全部档案,提交至大行政官案头。',
  };
}

const FIELD_DESCRIPTIONS = {
  A: '声明您的出生星界。不同星界的居民承担不同的命运基底。',
  B: '为您的灵魂指定一个识别符。',
  C: '提交您的人类血统与特殊分支校准。非标准血统将受到额外关注。',
  D: '宣誓您当前的阵营立场。审判庭与机械神教编制将锁定后续职业。',
  E: '提交您的职业配给。本字段受立场、血统与特殊路线限制。',
  F: '声明您的出生年份。',
  G: '声明您的性别。某些职业仅限特定性别。',
  H: '提交您的身世档案。背景将影响您的出场剧情，但不等同于血统路线。',
  I: '描述您的生理特征与外貌。',
  J: '※ NON_STANDARD_FIELD — 来源未知,请谨慎填写。 ※',
  K: '声明您当前持有的资源与起始状态。',
  L: '坦白您的初始秘密或潜伏命运。',
  N: '登记您当前的核心羁绊。',
};

const PAGE_TITLES = {};
const PAGE_DESCRIPTIONS = {};

let state = { ...DEFAULT_STATE };
let currentPage = 0;
let overlay = null;
let launcher = null;

Object.assign(PAGE_TITLES, buildPageTitles());
Object.assign(PAGE_DESCRIPTIONS, buildPageDescriptions());

function getCtx() {
  if (typeof SillyTavern === 'undefined' || typeof SillyTavern.getContext !== 'function') {
    throw new Error('SillyTavern global not ready');
  }
  return SillyTavern.getContext();
}

function isCtxReady() {
  try {
    getCtx();
    return true;
  } catch (_) {
    return false;
  }
}

function getCharacterName() {
  const ctx = getCtx();
  const char = ctx.characters?.[ctx.characterId];
  return char?.name || '';
}

function shouldEnableForCurrentChat() {
  if (!isCtxReady()) return false;
  const ctx = getCtx();
  if (ctx.groupId) return false;
  if (ctx.characterId == null) return false;

  if (!TARGET_CHARACTER_NAME) return true;
  const charName = getCharacterName();
  return charName.includes(TARGET_CHARACTER_NAME);
}

function getMetaKey(key) {
  return `${EXT_ID}_${key}`;
}

function getOptionLabel(field, code) {
  return OPTIONS[field]?.find(([k]) => k === code)?.[1] || code;
}

function queryInputBox() {
  const byId = document.getElementById('send_textarea');
  if (byId) return byId;

  const inForm = document.querySelector('#form_sheld textarea');
  if (inForm) return inForm;

  return document.querySelector('textarea[placeholder*="消息"]')
      || document.querySelector('textarea[placeholder*="message" i]');
}

function querySendButton() {
  return document.querySelector('#send_but')
    || document.querySelector('button[title="Send"]')
    || document.querySelector('button[title="发送"]')
    || document.querySelector('.fa-paper-plane')?.closest('button');
}

function setInputValue(text) {
  const input = queryInputBox();
  if (!input) {
    console.error(`[${EXT_ID}] 找不到 SillyTavern 输入框(#send_textarea)`);
    return false;
  }

  console.log(`[${EXT_ID}] 找到输入框:`, input.id || input.tagName);

  try { input.focus(); } catch (_) {}

  try {
    const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set;
    if (setter) setter.call(input, text);
  } catch (e) {
    console.warn(`[${EXT_ID}] native setter 失败:`, e);
  }

  try { input.value = text; } catch (_) {}

  if (typeof jQuery === 'function') {
    try {
      jQuery(input).val(text).trigger('input').trigger('change').trigger('keyup');
    } catch (e) {
      console.warn(`[${EXT_ID}] jQuery 写入/触发失败:`, e);
    }
  }

  try {
    input.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
    input.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
    input.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true }));
  } catch (_) {}

  const ok = input.value === text;
  console.log(`[${EXT_ID}] 写入${ok ? '成功' : '失败'}: 期望${text.length}字符,实际${input.value.length}字符`);
  return ok;
}

async function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_) {}
  }

  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0;';
  document.body.appendChild(ta);
  ta.select();

  let ok = false;
  try { ok = document.execCommand('copy'); } catch (_) {}

  document.body.removeChild(ta);
  return ok;
}

function trySendMessage(text) {
  const filled = setInputValue(text);
  if (!filled) return false;

  if (!AUTO_SEND_AFTER_FILL) return true;

  const sendBtn = querySendButton();
  if (sendBtn) {
    sendBtn.click();
    return true;
  }

  return false;
}

function isRandomCode(code) {
  return /^[A-Z]0$/.test(code);
}

const PROFESSION_TAG = {
  // 审判庭专属
  E25: 'iq',
  E26: 'iq',
  E27: 'iq',
  E28: 'iq',
  E29: 'iq',

  // 机械神教专属
  E31: 'mech',
  E32: 'mech',
  E33: 'mech',
  E34: 'mech',
  E35: 'mech',
  E36: 'mech',
};

function professionTag(code) {
  return PROFESSION_TAG[code] || 'common';
}

function stanceTag(code) {
  if (['D5', 'D6', 'D7', 'D8'].includes(code)) return 'iq';
  if (['D9', 'D10', 'D11'].includes(code)) return 'mech';
  return 'common';
}

function isOptionAllowed(field, code, s = state) {
  // 旧版存档兼容：X0 仍允许被AI校正，但新版界面不再提供多数随机选项。
  if (isRandomCode(code)) return { ok: true };

  const pick = (f) => {
    const v = s[f];
    return v && !isRandomCode(v) ? v : null;
  };

  const g = pick('G');
  const c = pick('C');
  const e = pick('E');
  const d = pick('D');
  const h = pick('H');

  const ASTARTES = ['E21', 'E22', 'E23', 'E24'];
  const IQ_PROFESSIONS = ['E25', 'E26', 'E27', 'E28', 'E29'];
  const MECH_PROFESSIONS = ['E31', 'E32', 'E33', 'E34', 'E35', 'E36'];
  const MECH_BACKGROUNDS = ['H12', 'H14'];
  const PSYKER_PROFESSIONS = ['E27', 'E28', 'E30'];
  const SISTER_RACES = ['C1', 'C3', 'C4', 'C6'];

  const CAT_BAN = ['E18', ...ASTARTES, ...MECH_PROFESSIONS];

  const UNTOUCHABLE_BAN = [
    ...ASTARTES,
    ...MECH_PROFESSIONS,
    ...PSYKER_PROFESSIONS,
  ];

  const NAVIGATOR_BAN = [
    'E1', 'E4', 'E7', 'E9', 'E10', 'E11',
    ...ASTARTES,
    ...IQ_PROFESSIONS,
    'E30',
    ...MECH_PROFESSIONS,
    'E37', 'E38', 'E43', 'E45',
  ];

  const codeTag = field === 'E' ? professionTag(code) : (e ? professionTag(e) : null);
  const codeStanceTag = field === 'D' ? stanceTag(code) : (d ? stanceTag(d) : null);
  const codeRace = field === 'C' ? code : c;
  const codeBackground = field === 'H' ? code : h;

  // === C7 机械神教培育人硬锁 ===
  // C7 ↔ D9-D11 ↔ E31-E36 ↔ H12/H14
  if (field === 'C') {
    if (code === 'C7') {
      if (d && stanceTag(d) !== 'mech') return { ok: false, reason: 'C7 需机械神教立场' };
      if (e && professionTag(e) !== 'mech') return { ok: false, reason: 'C7 需机械神教职业' };
      if (h && !MECH_BACKGROUNDS.includes(h)) return { ok: false, reason: 'C7 需神教背景' };
    } else {
      if (d && stanceTag(d) === 'mech') return { ok: false, reason: '神教立场需 C7' };
      if (e && professionTag(e) === 'mech') return { ok: false, reason: '神教职业需 C7' };
      if (h && MECH_BACKGROUNDS.includes(h)) return { ok: false, reason: '神教背景需 C7' };
    }
  }

  if (field === 'D') {
    const dTag = stanceTag(code);
    const eTag = e ? professionTag(e) : null;

    if (dTag === 'mech') {
      if (c && c !== 'C7') return { ok: false, reason: '神教立场需 C7' };
      if (eTag && eTag !== 'mech') return { ok: false, reason: '神教立场仅限神教职业' };
      if (h && !MECH_BACKGROUNDS.includes(h)) return { ok: false, reason: '神教立场需神教背景' };
    } else {
      if (c === 'C7') return { ok: false, reason: 'C7 需机械神教立场' };
      if (eTag === 'mech') return { ok: false, reason: '神教职业仅配神教立场' };
      if (h && MECH_BACKGROUNDS.includes(h)) return { ok: false, reason: '神教背景需神教立场' };
    }

    if (eTag === 'iq' && dTag !== 'iq') {
      return { ok: false, reason: '审判庭职业仅配审判庭立场' };
    }
  }

  if (field === 'E') {
    const eTag = professionTag(code);
    const dTag = d ? stanceTag(d) : null;

    if (eTag === 'mech') {
      if (c && c !== 'C7') return { ok: false, reason: '神教职业需 C7' };
      if (dTag && dTag !== 'mech') return { ok: false, reason: '神教职业仅配神教立场' };
      if (h && !MECH_BACKGROUNDS.includes(h)) return { ok: false, reason: '神教职业需神教背景' };
    } else {
      if (c === 'C7') return { ok: false, reason: 'C7 需神教职业' };
      if (dTag === 'mech') return { ok: false, reason: '神教立场仅限神教职业' };
      if (h && MECH_BACKGROUNDS.includes(h)) return { ok: false, reason: '神教背景需神教职业' };
    }

    if (eTag === 'iq') {
      if (dTag && dTag !== 'iq') return { ok: false, reason: '仅限审判庭立场' };
    }

    if (ASTARTES.includes(code)) {
      if (g && g !== 'G1') return { ok: false, reason: '仅限男性' };
      if (c && c !== 'C1') return { ok: false, reason: '仅限正常人类' };
      if (h === 'H13') return { ok: false, reason: '穿越者无法成为阿斯塔特' };
    }

    if (code === 'E10') {
      if (g && g !== 'G2') return { ok: false, reason: '仅限女性' };
      if (c && !SISTER_RACES.includes(c)) return { ok: false, reason: '当前血统不可' };
    }

    if (code === 'E18' && c === 'C6') return { ok: false, reason: '猫人不可担任' };

    if (c === 'C6' && CAT_BAN.includes(code)) return { ok: false, reason: '猫人不可担任' };
    if (c === 'C4' && UNTOUCHABLE_BAN.includes(code)) return { ok: false, reason: '不可接触者不适合' };
    if (c === 'C5' && NAVIGATOR_BAN.includes(code)) return { ok: false, reason: '领航者不适合' };
  }

  if (field === 'H') {
    if (MECH_BACKGROUNDS.includes(code)) {
      if (c && c !== 'C7') return { ok: false, reason: '神教背景需 C7' };
      if (d && stanceTag(d) !== 'mech') return { ok: false, reason: '神教背景需神教立场' };
      if (e && professionTag(e) !== 'mech') return { ok: false, reason: '神教背景需神教职业' };
    } else {
      if (c === 'C7') return { ok: false, reason: 'C7 需 H12/H14' };
      if (d && stanceTag(d) === 'mech') return { ok: false, reason: '神教立场需 H12/H14' };
      if (e && professionTag(e) === 'mech') return { ok: false, reason: '神教职业需 H12/H14' };
    }

    if (code === 'H13' && ASTARTES.includes(e)) {
      return { ok: false, reason: '阿斯塔特无法是穿越者' };
    }
  }

  if (field === 'G') {
    if (ASTARTES.includes(e) && code !== 'G1') return { ok: false, reason: '阿斯塔特仅限男性' };
    if (e === 'E10' && code !== 'G2') return { ok: false, reason: '修女会仅限女性' };
  }

  return { ok: true };
}

function buildPayload() {
  const codes = PANEL_ORDER.map((field) => state[field]).join(' ');
  if (state.B === 'B1' && state.NAME.trim()) {
    return `${codes}\n名字：${state.NAME.trim()}`;
  }
  return codes;
}

function buildSummaryRows() {
  return [
    ['名字', state.B === 'B1' ? `B1 · ${state.NAME.trim() || '（未填写）'}` : 'B0 · 默认（{{user}}）'],
    ['种族', `${state.C} · ${getOptionLabel('C', state.C)}`],
    ['年龄', `${state.F} · ${getOptionLabel('F', state.F)}`],
    ['性别', `${state.G} · ${getOptionLabel('G', state.G)}`],
    ['长相', `${state.I} · ${getOptionLabel('I', state.I)}`],
    ['星球', `${state.A} · ${getOptionLabel('A', state.A)}`],
    ['阵营', `${state.D} · ${getOptionLabel('D', state.D)}`],
    ['职业', `${state.E} · ${getOptionLabel('E', state.E)}`],
    ['背景', `${state.H} · ${getOptionLabel('H', state.H)}`],
    ['资源', `${state.K} · ${getOptionLabel('K', state.K)}`],
    ['秘密', `${state.L} · ${getOptionLabel('L', state.L)}`],
    ['羁绊', `${state.N} · ${getOptionLabel('N', state.N)}`],
    ['主线', `${state.J} · ${getOptionLabel('J', state.J)}`],
  ];
}

function getWarnings() {
  const warnings = [];
  const ASTARTES = ['E21', 'E22', 'E23', 'E24'];
  const MECH_PROFESSIONS = ['E31', 'E32', 'E33', 'E34', 'E35', 'E36'];
  const IQ_PROFESSIONS = ['E25', 'E26', 'E27', 'E28', 'E29'];
  const MECH_BACKGROUNDS = ['H12', 'H14'];

  const isAstartes = ASTARTES.includes(state.E);
  const isSister = state.E === 'E10';
  const isRose = state.E === 'E11';
  const isMechProfession = MECH_PROFESSIONS.includes(state.E);
  const isMechStance = ['D9', 'D10', 'D11'].includes(state.D);
  const isMechBackground = MECH_BACKGROUNDS.includes(state.H);
  const isIqProfession = IQ_PROFESSIONS.includes(state.E);

  if (state.B === 'B1' && !state.NAME.trim()) {
    warnings.push('你选择了自定义名字，但还没有填写名字。');
  }

  if (isAstartes) {
    if (state.G !== 'G1') warnings.push('阿斯塔特最终会被校正为男性。');
    if (state.C !== 'C1') warnings.push('阿斯塔特最终会被校正为正常人类或改职。');
    if (state.H === 'H13') warnings.push('穿越者无法成为阿斯塔特，AI会自动改写职业或背景。');
  }

  if (isSister) {
    if (state.G !== 'G2') warnings.push('修女会成员最终会被校正为女性或改职。');
    if (!['C1', 'C3', 'C4', 'C6'].includes(state.C)) warnings.push('当前血统通常不能成为修女会正式成员，系统会自动改职或改写身份。');
  }

  if (isRose && ['C5', 'C7'].includes(state.C)) {
    warnings.push('当前血统通常不适合蔷薇修女会侍从路径，系统可能会改写身份。');
  }

  if (state.C === 'C7' && (!isMechProfession || !isMechStance || !isMechBackground)) {
    warnings.push('C7 机械神教培育人必须绑定机械神教立场、职业与背景。');
  }

  if ((isMechProfession || isMechStance || isMechBackground) && state.C !== 'C7') {
    warnings.push('机械神教路线必须选择 C7 机械神教培育人。');
  }

  if (isIqProfession && !['D5', 'D6', 'D7', 'D8'].includes(state.D)) {
    warnings.push('审判庭职业通常需要审判庭立场，系统会自动校正。');
  }

  if (state.C === 'C6' && ['E18', ...ASTARTES, ...MECH_PROFESSIONS].includes(state.E)) {
    warnings.push('猫人与当前职业组合不合法，AI会自动校正。');
  }

  if (state.C === 'C5' && ['E1', 'E4', 'E7', 'E9', 'E10', 'E11', ...ASTARTES, ...IQ_PROFESSIONS, 'E30', ...MECH_PROFESSIONS, 'E37', 'E38', 'E43', 'E45'].includes(state.E)) {
    warnings.push('领航者与当前职业组合通常不合法，AI会自动校正。');
  }

  if (state.C === 'C4' && [...ASTARTES, ...MECH_PROFESSIONS, 'E27', 'E28', 'E30'].includes(state.E)) {
    warnings.push('不可接触者与当前职业组合通常不合法，AI会自动校正。');
  }

  if (state.E === 'E18' && !['H4', 'H9', 'H19'].includes(state.H)) {
    warnings.push('流浪骑士出身不够典型，AI会用打捞、继承或偷获等方式补足来历。');
  }

  return warnings;
}

function canProceedFromPage(page) {
  const fields = PAGE_FIELDS[page] || [];
  if (fields.includes('B') && state.B === 'B1' && !state.NAME.trim()) {
    return { ok: false, message: '请先填写自定义名字,或改回默认名字。' };
  }
  return { ok: true, message: '' };
}

function saveDraftState() {
  try {
    const ctx = getCtx();
    ctx.chatMetadata[getMetaKey('draft')] = JSON.parse(JSON.stringify(state));
    ctx.chatMetadata[getMetaKey('page')] = currentPage;
    ctx.saveMetadata?.();
  } catch (err) {
    console.warn(`${EXT_ID}: failed to save metadata`, err);
  }
}

function loadDraftState() {
  try {
    const ctx = getCtx();
    const savedState = ctx.chatMetadata?.[getMetaKey('draft')];
    const savedPage = ctx.chatMetadata?.[getMetaKey('page')];

    if (savedState && typeof savedState === 'object') {
      state = { ...DEFAULT_STATE, ...savedState };

      // 旧版本兼容：已弃用随机或旧字段时自动回退
      if (state.A === 'A0') state.A = DEFAULT_STATE.A;
      if (state.C === 'C0' || state.C === 'C2') state.C = DEFAULT_STATE.C;
      if (state.D === 'D0') state.D = DEFAULT_STATE.D;
      if (state.E === 'E0') state.E = DEFAULT_STATE.E;
      if (state.F === 'F0') state.F = DEFAULT_STATE.F;
      if (state.G === 'G0') state.G = DEFAULT_STATE.G;
      if (state.H === 'H0') state.H = DEFAULT_STATE.H;
      if (state.I === 'I0') state.I = DEFAULT_STATE.I;
      if (state.J === 'J0') state.J = DEFAULT_STATE.J;
      if (state.K === 'K0') state.K = DEFAULT_STATE.K;
    } else {
      state = { ...DEFAULT_STATE };
    }

    currentPage = typeof savedPage === 'number' ? savedPage : 0;
  } catch (err) {
    state = { ...DEFAULT_STATE };
    currentPage = 0;
  }
}

async function clearDraftState() {
  const ctx = getCtx();
  delete ctx.chatMetadata[getMetaKey('draft')];
  delete ctx.chatMetadata[getMetaKey('page')];
  await ctx.saveMetadata?.();
}

async function markBuilderShown() {
  const ctx = getCtx();
  ctx.chatMetadata[getMetaKey('shown')] = true;
  await ctx.saveMetadata?.();
}

function resetState() {
  state = { ...DEFAULT_STATE };
  currentPage = 0;
  saveDraftState();
  render();
}

function closeBuilder() {
  overlay?.classList.remove('open');
  if (launcher) launcher.textContent = '[⚔ 角色创建器]';
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
}

function openBuilder(forcePage = null) {
  if (!overlay) createOverlay();
  loadDraftState();
  if (typeof forcePage === 'number') currentPage = forcePage;
  render();
  overlay.classList.add('open');
  if (launcher) launcher.textContent = '[✕ 关闭终端]';
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
}

function injectChatStyles() {
  return;
}

function makeLauncher() {
  if (launcher) launcher.remove();

  launcher = document.createElement('button');
  launcher.id = 'wh40k-builder-launcher';
  launcher.type = 'button';
  launcher.textContent = '[⚔ 角色创建器]';
  launcher.style.cssText = 'position:fixed;top:64px;right:12px;z-index:10000';

  launcher.addEventListener('click', () => {
    if (overlay && overlay.classList.contains('open')) {
      closeBuilder();
    } else {
      openBuilder();
    }
  });

  document.body.appendChild(launcher);
  console.log(`[${EXT_ID}] launcher appended to body`);
}

function createOverlay() {
  overlay = document.createElement('div');
  overlay.id = 'wh40k-builder-overlay';
  overlay.innerHTML = `
    <div class="wh40k-builder-modal">
      <div class="wh40k-builder-header">
        <div>
          <div class="wh40k-builder-title">帝国公民登记终端 · #40K-PLUS</div>
          <div class="wh40k-builder-subtitle">帝国内务部 / 公民登记-v5.1.0</div>
        </div>
        <button type="button" class="wh40k-icon-btn" data-action="close" aria-label="关闭">[×]</button>
      </div>
      <div class="wh40k-builder-progress"></div>
      <div class="wh40k-builder-main">
        <section class="wh40k-builder-content"></section>
      </div>
      <div class="wh40k-builder-footer">
        <div class="wh40k-warning-box"></div>
        <div class="wh40k-actions">
          <button type="button" class="wh40k-btn" data-action="reset">[ 重置 ]</button>
          <button type="button" class="wh40k-btn" data-action="back">&lt; 上一步</button>
          <button type="button" class="wh40k-btn primary" data-action="next">下一步 &gt;</button>
        </div>
      </div>
    </div>
  `;

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeBuilder();
  });

  overlay.querySelector('[data-action="close"]').addEventListener('click', closeBuilder);
  overlay.querySelector('[data-action="reset"]').addEventListener('click', resetState);
  overlay.querySelector('[data-action="back"]').addEventListener('click', goBack);
  overlay.querySelector('[data-action="next"]').addEventListener('click', goNext);

  document.body.appendChild(overlay);
}

function renderProgress() {
  const el = overlay.querySelector('.wh40k-builder-progress');
  el.innerHTML = '';

  if (currentPage === 0) {
    el.innerHTML = `<div class="wh40k-progress-label">// 等 候 输 入 //</div>`;
    return;
  }

  if (currentPage === FINAL_PAGE) {
    el.innerHTML = `<div class="wh40k-progress-label" style="color:#7ae07a;">// 档 案 就 绪 / 待 提 交 //</div>`;
    return;
  }

  const sectionIndex = currentPage;
  const total = TOTAL_PAGES - 2;
  const isJSection = currentPage === 5;
  const labelColor = isJSection ? '#c92030' : '#ffb84d';

  const left = document.createElement('div');
  left.className = 'wh40k-progress-label';
  left.innerHTML = `第 <span style="color:${labelColor};font-weight:700;">${sectionIndex}</span> / ${total} 节 · <span style="${isJSection ? 'color:#c92030;font-family:ui-monospace,Menlo,Consolas,monospace;letter-spacing:0.05em;' : ''}">${PAGE_TITLES[currentPage]}</span>`;
  el.appendChild(left);

  const dots = document.createElement('div');
  dots.className = 'wh40k-progress-dots';

  for (let i = 1; i <= total; i++) {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'wh40k-dot';
    dot.dataset.page = String(i);

    if (i === currentPage) dot.classList.add('active');
    else if (i < currentPage) dot.classList.add('done');

    if (i === 5) dot.classList.add('anomaly');

    dot.title = PAGE_TITLES[i];

    dot.addEventListener('click', () => {
      if (i === currentPage) return;

      if (i > currentPage) {
        for (let p = currentPage; p < i; p++) {
          const result = canProceedFromPage(p);
          if (!result.ok) {
            alert(result.message);
            return;
          }
        }
      }

      currentPage = i;
      saveDraftState();
      render();
    });

    dots.appendChild(dot);
  }

  el.appendChild(dots);
}

function makeOptionButton(field, code, label) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'wh40k-option';

  if (field === 'J') btn.classList.add('anomaly');

  btn.dataset.field = field;
  btn.dataset.code = code;

  const check = isOptionAllowed(field, code);
  const isActive = state[field] === code;
  const badge = !check.ok ? `<span class="wh40k-option-badge">⊘ ${check.reason}</span>` : '';

  btn.innerHTML = `<span class="wh40k-option-code">${code}</span><span class="wh40k-option-label">${label}</span>${badge}`;

  if (isActive) btn.classList.add('active');

  if (!check.ok) {
    btn.classList.add('disabled');
    btn.title = check.reason;
    if (isActive) btn.classList.add('conflict');
  }

  btn.addEventListener('click', () => {
    if (!check.ok && !isActive) {
      return;
    }

    state[field] = code;
    saveDraftState();
    render();
  });

  return btn;
}

function makeFieldSection(field) {
  const wrap = document.createElement('section');
  wrap.className = 'wh40k-section';

  if (field === 'J') wrap.classList.add('anomaly');

  const h = document.createElement('h3');
  h.textContent = FIELD_TITLES[field];
  wrap.appendChild(h);

  const optionsWrap = document.createElement('div');
  optionsWrap.className = 'wh40k-options';

  OPTIONS[field].forEach(([code, label]) => {
    optionsWrap.appendChild(makeOptionButton(field, code, label));
  });

  wrap.appendChild(optionsWrap);

  if (field === 'B') {
    const nameBox = document.createElement('div');
    nameBox.className = `wh40k-name-box${state.B === 'B1' ? ' show' : ''}`;
    nameBox.innerHTML = `
      <label>
        <span>自定义名字</span>
        <input type="text" placeholder="输入角色名字" value="${escapeHtml(state.NAME)}" />
      </label>
    `;

    const input = nameBox.querySelector('input');
    input.addEventListener('input', (e) => {
      state.NAME = e.target.value;
      saveDraftState();
      renderFooterWarnings();
    });

    wrap.appendChild(nameBox);
  }

  return wrap;
}

function renderPageContent() {
  const content = overlay.querySelector('.wh40k-builder-content');
  content.innerHTML = '';

  const hero = document.createElement('div');
  hero.className = 'wh40k-page-hero';
  hero.innerHTML = `
    <div class="wh40k-page-title">${PAGE_TITLES[currentPage]}</div>
    <div class="wh40k-page-desc">${PAGE_DESCRIPTIONS[currentPage]}</div>
  `;
  content.appendChild(hero);

  if (currentPage === 0) {
    const splash = document.createElement('div');
    splash.className = 'wh40k-splash';
    splash.innerHTML = `
      <div class="wh40k-splash-quote">等 候 输 入</div>
      <div class="wh40k-splash-line">请公民接入终端 · 开始登记</div>
      <div class="wh40k-splash-text">此终端不会即时提交。您将依次完成 5 节登记表,每节包含若干字段;填写期间,字段可随时修改或重置。全部完成后,在最终页一次性提交档案。</div>
      <button type="button" class="wh40k-btn primary wh40k-start-btn">[ 进入登记 ]</button>
    `;

    splash.querySelector('.wh40k-start-btn').addEventListener('click', () => {
      currentPage = 1;
      saveDraftState();
      render();
    });

    content.appendChild(splash);
    return;
  }

  const grid = document.createElement('div');
  grid.className = 'wh40k-page-grid';

  PAGE_FIELDS[currentPage].forEach((field) => {
    grid.appendChild(makeFieldSection(field));
  });

  content.appendChild(grid);

  if (currentPage === FINAL_PAGE) {
    const finalCard = document.createElement('section');
    finalCard.className = 'wh40k-final-card';
    finalCard.innerHTML = `
      <div class="wh40k-final-title">最终提交</div>
      <div class="wh40k-final-text">&gt; 以下为即将上传至大行政官案头的档案数据流。若自动传输失败,将改写至剪贴板供您手动粘贴。</div>
      <pre class="wh40k-payload-preview wh40k-final-preview"></pre>
      <div class="wh40k-final-actions">
        <button type="button" class="wh40k-btn" data-action="fill-only">[ 仅写入 ]</button>
        <button type="button" class="wh40k-btn" data-action="copy-payload">[ 复制 ]</button>
        <button type="button" class="wh40k-btn primary" data-action="confirm-send">★ 提交档案 ★</button>
      </div>
    `;

    finalCard.querySelector('.wh40k-final-preview').textContent = buildPayload();
    finalCard.querySelector('[data-action="fill-only"]').addEventListener('click', fillOnly);
    finalCard.querySelector('[data-action="copy-payload"]').addEventListener('click', copyPayloadOnly);
    finalCard.querySelector('[data-action="confirm-send"]').addEventListener('click', confirmAndSend);

    content.appendChild(finalCard);
  }
}

function renderFooterWarnings() {
  const box = overlay.querySelector('.wh40k-warning-box');
  const warnings = getWarnings();

  if (warnings.length === 0) {
    box.textContent = '提示：AI会根据你的世界书规则自动纠正非法组合，并在开场叙事中给出简短解释。';
  } else {
    box.textContent = `注意：${warnings[0]}`;
  }
}

function renderFooterButtons() {
  const back = overlay.querySelector('[data-action="back"]');
  const next = overlay.querySelector('[data-action="next"]');

  back.disabled = currentPage === 0;

  if (currentPage === FINAL_PAGE) {
    next.style.display = 'none';
  } else {
    next.style.display = '';
    next.textContent = currentPage === 0 ? '进入登记' : '下一步 >';
  }
}

function render() {
  renderProgress();
  renderPageContent();
  renderFooterWarnings();
  renderFooterButtons();
}

function goBack() {
  if (currentPage === 0) return;
  currentPage -= 1;
  saveDraftState();
  render();
}

function goNext() {
  const result = canProceedFromPage(currentPage);

  if (!result.ok) {
    alert(result.message);
    return;
  }

  if (currentPage >= FINAL_PAGE) return;

  currentPage += 1;
  saveDraftState();
  render();
}

async function fillOnly() {
  const result = canProceedFromPage(1);

  if (!result.ok) {
    alert(result.message);
    return;
  }

  const payload = buildPayload();
  closeBuilder();
  await new Promise((r) => setTimeout(r, 80));

  const ok = setInputValue(payload);

  if (!ok) {
    const copied = await copyToClipboard(payload);

    if (copied) {
      alert('未能自动写入输入框。模板已复制到剪贴板,请手动粘贴到聊天输入框。');
    } else {
      alert('未能写入输入框,且剪贴板不可用。请手动复制以下内容:\n\n' + payload);
    }
  }
}

async function copyPayloadOnly() {
  const result = canProceedFromPage(1);

  if (!result.ok) {
    alert(result.message);
    return;
  }

  const payload = buildPayload();
  const ok = await copyToClipboard(payload);

  if (ok) {
    alert('模板已复制到剪贴板!关闭此窗口,长按聊天输入框粘贴即可。');
  } else {
    alert('剪贴板不可用,请手动复制以下内容:\n\n' + payload);
  }
}

async function confirmAndSend() {
  const result = canProceedFromPage(1);

  if (!result.ok) {
    alert(result.message);
    return;
  }

  const payload = buildPayload();
  closeBuilder();
  await new Promise((r) => setTimeout(r, 80));

  const filled = setInputValue(payload);

  if (!filled) {
    const copied = await copyToClipboard(payload);

    if (copied) {
      alert('未能自动写入输入框。模板已复制到剪贴板,请手动粘贴并发送。');
    } else {
      alert('未能写入输入框。请手动复制以下内容:\n\n' + payload);
    }

    return;
  }

  if (!AUTO_SEND_AFTER_FILL) {
    await markBuilderShown();
    await clearDraftState();
    return;
  }

  const sendBtn = querySendButton();

  if (sendBtn) {
    sendBtn.click();
    await markBuilderShown();
    await clearDraftState();
  } else {
    alert('模板已写入输入框,但未找到发送按钮。请手动点击发送。');
  }
}

async function maybeAutoOpen() {
  if (!isCtxReady()) {
    console.warn(`[${EXT_ID}] maybeAutoOpen: ctx not ready`);
    return;
  }

  const ctx = getCtx();

  console.log(`[${EXT_ID}] maybeAutoOpen: groupId=${ctx.groupId} charId=${ctx.characterId} chatLen=${ctx.chat?.length}`);

  if (!shouldEnableForCurrentChat()) {
    if (launcher) launcher.style.display = 'none';
    console.log(`[${EXT_ID}] not enabled for current chat (group or no character selected)`);
    return;
  }

  if (launcher) launcher.style.display = '';

  const chat = Array.isArray(ctx.chat) ? ctx.chat : [];
  const hasAnyUserMessage = chat.some((message) => message?.is_user === true);
  const shown = !!ctx.chatMetadata?.[getMetaKey('shown')];

  if (AUTO_OPEN_FOR_EMPTY_CHAT && !hasAnyUserMessage && !shown) {
    console.log(`[${EXT_ID}] auto-opening builder`);
    openBuilder(0);
  } else {
    console.log(`[${EXT_ID}] not auto-opening (hasUserMsg=${hasAnyUserMessage} shown=${shown})`);
  }
}

function escapeHtml(text = '') {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

let initialized = false;

function init() {
  if (initialized) {
    console.log(`[${EXT_ID}] init re-entered, running maybeAutoOpen`);
    try { maybeAutoOpen(); } catch (e) { console.error(`[${EXT_ID}] maybeAutoOpen error`, e); }
    return;
  }

  if (!isCtxReady()) {
    console.warn(`[${EXT_ID}] SillyTavern global not ready, will retry init in 400ms`);
    setTimeout(init, 400);
    return;
  }

  initialized = true;
  console.log(`[${EXT_ID}] init running`);

  try {
    makeLauncher();
    createOverlay();
    injectChatStyles();
    console.log(`[${EXT_ID}] launcher + overlay DOM inserted`);
  } catch (e) {
    console.error(`[${EXT_ID}] failed to build DOM`, e);
    return;
  }

  try {
    const { eventSource, event_types } = getCtx();

    eventSource.on(event_types.CHAT_CHANGED, () => {
      try { maybeAutoOpen(); } catch (e) { console.error(`[${EXT_ID}] CHAT_CHANGED handler error`, e); }
    });

    eventSource.on(event_types.CHAT_CREATED, () => {
      state = { ...DEFAULT_STATE };
      currentPage = 0;
      try { maybeAutoOpen(); } catch (e) { console.error(`[${EXT_ID}] CHAT_CREATED handler error`, e); }
    });
  } catch (e) {
    console.error(`[${EXT_ID}] event binding failed`, e);
  }

  try { maybeAutoOpen(); } catch (e) { console.error(`[${EXT_ID}] initial maybeAutoOpen error`, e); }

  setTimeout(() => {
    try { maybeAutoOpen(); } catch (e) { console.error(`[${EXT_ID}] delayed maybeAutoOpen error`, e); }
  }, 600);

  setTimeout(() => {
    try { maybeAutoOpen(); } catch (e) { console.error(`[${EXT_ID}] delayed maybeAutoOpen error`, e); }
  }, 2000);

  console.log(`[${EXT_ID}] init complete`);
}

function boot() {
  console.log(`[${EXT_ID}] boot() called, ctxReady=${isCtxReady()}`);

  if (isCtxReady()) {
    try {
      const { eventSource, event_types } = getCtx();

      eventSource.on(event_types.APP_READY, () => {
        console.log(`[${EXT_ID}] APP_READY fired`);
        setTimeout(init, 0);
      });
    } catch (e) {
      console.warn(`[${EXT_ID}] couldn't bind APP_READY`, e);
    }
  }

  setTimeout(init, 300);
  setTimeout(init, 1500);
  setTimeout(init, 4000);
}

if (typeof jQuery === 'function') {
  jQuery(function () { boot(); });
} else if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}