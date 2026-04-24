const EXT_ID = 'wh40k-character-builder';
const TARGET_CHARACTER_NAME = '';
const AUTO_OPEN_FOR_EMPTY_CHAT = true;
const AUTO_SEND_AFTER_FILL = true;

const PANEL_ORDER = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'N'];
const PAGE_FIELDS = [
  [],
  ['B', 'C', 'F', 'G', 'I'],
  ['A', 'D', 'E', 'H'],
  ['K', 'L', 'N'],
  ['J'],
];

const FIELD_TITLES = {
  A: 'A. 所在星球',
  B: 'B. 名字',
  C: 'C. 人类种族',
  D: 'D. 阵营 / 当前立场',
  E: 'E. 职业',
  F: 'F. 年龄',
  G: 'G. 性别',
  H: 'H. 人物背景',
  I: 'I. 外貌',
  J: 'J. 命运牵引 / 主线卷入',
  K: 'K. 初始资源 / 开局条件',
  L: 'L. 初始秘密 / 隐藏命运',
  N: 'N. 初始羁绊',
};

const OPTIONS = {
  A: [
    ['A0', '随机 / 自定义'],
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
  ],
  B: [
    ['B0', '默认（{{user}}）'],
    ['B1', '自定义名字'],
  ],
  C: [
    ['C0', '随机'],
    ['C1', '正常人类'],
    ['C2', '莱特林'],
    ['C3', '虚空之子'],
    ['C4', '不可接触者'],
    ['C5', '领航者'],
    ['C6', '猫人'],
  ],
  D: [
    ['D0', '随机 / 自定义'],
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
    ['E0', '随机 / 自定义'],
    ['E1', '帝国卫队士兵'],
    ['E2', '审判庭侍从'],
    ['E3', '修女会成员'],
    ['E4', '蔷薇修女会侍从'],
    ['E5', '帝国海军水手'],
    ['E6', '赏金猎人'],
    ['E7', '机械神教初级神甫'],
    ['E8', '帝国教会牧师'],
    ['E9', '没落行商浪人家族的指定继承人'],
    ['E10', '流浪骑士（只有一台侍从级骑士）'],
    ['E11', '帝国普通公民'],
    ['E12', '帝国贵族侍从'],
    ['E13', '性工作者'],
    ['E14', '重体力劳动者'],
    ['E15', '大学学者'],
    ['E16', '无业者'],
    ['E17', '阿斯塔特修士（仅限正常男性，死亡守望成员）'],
    ['E18', '阿斯塔特修士（仅限正常男性，深渊律子的侦察兵）'],
    ['E19', '阿斯塔特修士（仅限正常男性，翡翠龙战团的成员）'],
    ['E20', '阿斯塔特修士（仅限正常男性，随机初创战团子团的特遣队成员）'],
    ['E21', '法务部执法辅助人员 / 仲裁庭预备员'],
    ['E22', '巢都帮派成员 / 地下打手'],
    ['E23', '行商浪人随员 / 贸易顾问 / 虚空掮客'],
    ['E24', '民用虚空船员 / 商船杂役 / 打捞者'],
    ['E25', '医护员 / 战地救护人员'],
    ['E26', '档案员 / 抄写员 / 行政书吏'],
    ['E27', '机械神教探索队随员'],
    ['E28', '黑市情报贩子 / 走私中间人'],
  ],
  F: [
    ['F0', '随机 / 自定义'],
    ['F1', '青年'],
    ['F2', '壮年'],
    ['F3', '中年'],
    ['F4', '年长'],
  ],
  G: [
    ['G0', '随机 / 自定义'],
    ['G1', '男'],
    ['G2', '女'],
    ['G3', '模糊 / 不明'],
  ],
  H: [
    ['H0', '随机 / 自定义'],
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
    ['H12', '机械神教培育人'],
    ['H13', '穿越者'],
    ['H14', '你是阿尔法特工，但你不知道自己是忠诚还是叛变'],
    ['H15', '教会附属孤儿院出身'],
    ['H16', '舰船家系 / 虚空船员后代'],
    ['H17', '边境殖民者家庭'],
    ['H18', '法务部 / 地方治安家庭'],
    ['H19', '贵族旁支 / 失势支脉'],
    ['H20', '被收养者 / 身世不明'],
    ['H21', '黑市 / 走私圈出身'],
    ['H22', '行政机构 / 档案机构出身'],
    ['H23', '废土聚落 / 边缘定居点出身'],
    ['H24', '流亡者 / 难民后裔'],
  ],
  I: [
    ['I0', '随机 / 自定义'],
    ['I1', '丑陋至极，难以形容'],
    ['I2', '高大健壮，相貌普通'],
    ['I3', '普通身材，普通外貌'],
    ['I4', '身材优美，人见人爱'],
  ],
  J: [
    ['J0', '随机 / 由AI决定'],
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
    ['K0', '随机 / 由AI决定'],
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
    ['L0', '无 / 随机'],
    ['L1', '你持有伪造身份'],
    ['L2', '你忘记了一段关键记忆'],
    ['L3', '某个组织正在暗中标记你'],
    ['L4', '你曾见过不该见之物'],
    ['L5', '你身上藏有来历不明的样本 / 圣物 / 数据片段'],
    ['L6', '你欠下了一桩未了的血债或旧案'],
    ['L7', '你是某项预言、占卜或推演中的变量'],
    ['L8', '某位高位者曾秘密接触过你'],
    ['L9', '你体内潜伏着一种尚未显现的异常'],
  ],
  N: [
    ['N0', '无 / 随机'],
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
  ],
};

const DEFAULT_STATE = {
  A: 'A0',
  B: 'B0',
  C: 'C0',
  D: 'D0',
  E: 'E0',
  F: 'F0',
  G: 'G0',
  H: 'H0',
  I: 'I0',
  J: 'J0',
  K: 'K0',
  L: 'L0',
  N: 'N0',
  NAME: '',
};

const PAGE_TITLES = {
  0: '开始游戏',
  1: '基础信息',
  2: '身份与立场',
  3: '剧情燃料',
  4: '命运牵引',
};

const PAGE_DESCRIPTIONS = {
  0: '点击进入角色创建。你将依次完成基础信息、社会身份、剧情燃料与命运牵引。',
  1: '填写名字、种族、年龄、性别与外貌。',
  2: '选择星球、阵营、职业与人物背景。',
  3: '选择初始资源、初始秘密与初始羁绊。',
  4: '最后选择主线卷入等级，并确认发送角色模板。',
};

let state = { ...DEFAULT_STATE };
let currentPage = 0;
let overlay = null;
let launcher = null;

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
  // SillyTavern 聊天输入框的稳定 ID
  const byId = document.getElementById('send_textarea');
  if (byId) return byId;
  // 兜底 1:form_sheld 容器里的 textarea
  const inForm = document.querySelector('#form_sheld textarea');
  if (inForm) return inForm;
  // 兜底 2:placeholder 含"消息"/"message"的 textarea(避免误选角色卡编辑器)
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

  // 方法 1:原生 value setter(兼容 React 受控)
  try {
    const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set;
    if (setter) setter.call(input, text);
  } catch (e) {
    console.warn(`[${EXT_ID}] native setter 失败:`, e);
  }

  // 方法 2:直接赋值(兜底)
  try { input.value = text; } catch (_) {}

  // 方法 3:jQuery 赋值 + 触发(SillyTavern 的监听器依赖这个!)
  if (typeof jQuery === 'function') {
    try {
      jQuery(input).val(text).trigger('input').trigger('change').trigger('keyup');
    } catch (e) {
      console.warn(`[${EXT_ID}] jQuery 写入/触发失败:`, e);
    }
  }

  // 方法 4:派发原生事件(某些监听器用的)
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
    } catch (_) { /* fall through */ }
  }
  // Legacy fallback
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
  const isAstartes = ['E17', 'E18', 'E19', 'E20'].includes(state.E);
  const isSister = state.E === 'E3';
  const isRose = state.E === 'E4';

  if (state.B === 'B1' && !state.NAME.trim()) {
    warnings.push('你选择了自定义名字，但还没有填写名字。');
  }

  if (isAstartes) {
    if (state.G !== 'G1') warnings.push('阿斯塔特最终会被校正为男性。');
    if (state.C !== 'C1') warnings.push('阿斯塔特最终会被校正为正常人类或改职。');
  }

  if (isSister) {
    if (state.G !== 'G2') warnings.push('修女会成员最终会被校正为女性或改职。');
    if (!['C1', 'C3', 'C4', 'C6'].includes(state.C)) warnings.push('当前种族通常不能成为修女会正式成员，系统会自动改职或改写身份。');
  }

  if (isRose && state.C === 'C5') {
    warnings.push('领航者通常不适合修会附属路径，系统可能会改写为更贴近虚空贵族的身份。');
  }

  if (state.C === 'C2' && ['E3', 'E10', 'E17', 'E18', 'E19', 'E20'].includes(state.E)) {
    warnings.push('莱特林与当前职业组合不合法，AI会自动校正。');
  }

  if (state.C === 'C6' && ['E10', 'E17', 'E18', 'E19', 'E20'].includes(state.E)) {
    warnings.push('猫人与当前职业组合不合法，AI会自动校正。');
  }

  if (state.C === 'C5' && ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E17', 'E18', 'E19', 'E20', 'E21', 'E22', 'E25'].includes(state.E)) {
    warnings.push('领航者与当前职业组合通常不合法，AI会自动校正。');
  }

  if (state.C === 'C4' && ['E7', 'E17', 'E18', 'E19', 'E20'].includes(state.E)) {
    warnings.push('不可接触者与当前职业组合通常不合法，AI会自动校正。');
  }

  if (state.E === 'E10' && !['H4', 'H9', 'H19'].includes(state.H)) {
    warnings.push('流浪骑士出身不够典型，AI会用打捞、继承或偷获等方式补足来历。');
  }

  return warnings;
}

function canProceedFromPage(page) {
  if (page !== 1) return { ok: true, message: '' };
  if (state.B === 'B1' && !state.NAME.trim()) {
    return { ok: false, message: '请先填写自定义名字，或改回默认名字。' };
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
  if (launcher) launcher.textContent = '⚔ 角色创建器';
  // Restore body scroll
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
}

function openBuilder(forcePage = null) {
  if (!overlay) createOverlay();
  loadDraftState();
  if (typeof forcePage === 'number') currentPage = forcePage;
  render();
  overlay.classList.add('open');
  if (launcher) launcher.textContent = '✕ 关闭创建器';
  // Lock body scroll so the modal truly feels full-screen
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
}

function makeLauncher() {
  if (launcher) launcher.remove();
  launcher = document.createElement('button');
  launcher.id = 'wh40k-builder-launcher';
  launcher.type = 'button';
  launcher.textContent = '⚔ 角色创建器';
  // Appearance handled by style.css; only position is forced here to guarantee visibility.
  launcher.style.cssText = 'position:fixed;top:64px;right:12px;z-index:10000';
  launcher.addEventListener('click', () => {
    // Toggle: if modal is open, close it; otherwise open it.
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
          <div class="wh40k-builder-title">战锤40K · 第0轮角色创建器</div>
          <div class="wh40k-builder-subtitle">五页式角色创建流程：基础信息 → 身份与立场 → 剧情燃料 → 命运牵引。</div>
        </div>
        <button type="button" class="wh40k-icon-btn" data-action="close" aria-label="关闭">×</button>
      </div>
      <div class="wh40k-builder-progress"></div>
      <div class="wh40k-builder-main">
        <aside class="wh40k-builder-sidebar"></aside>
        <section class="wh40k-builder-content"></section>
      </div>
      <div class="wh40k-builder-footer">
        <div class="wh40k-warning-box"></div>
        <div class="wh40k-actions">
          <button type="button" class="wh40k-btn" data-action="reset">重置</button>
          <button type="button" class="wh40k-btn" data-action="back">上一步</button>
          <button type="button" class="wh40k-btn primary" data-action="next">下一步</button>
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

  for (let i = 0; i < 5; i++) {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'wh40k-step';
    item.dataset.page = String(i);
    if (i === currentPage) item.classList.add('active');
    if (i < currentPage) item.classList.add('done');
    item.innerHTML = `<span>${i + 1}</span><small>${PAGE_TITLES[i]}</small>`;
    item.addEventListener('click', () => {
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
    el.appendChild(item);
  }
}

function renderSidebar() {
  const side = overlay.querySelector('.wh40k-builder-sidebar');
  const warnings = getWarnings();
  const summary = buildSummaryRows();

  side.innerHTML = `
    <div class="wh40k-side-card">
      <div class="wh40k-side-title">当前页面</div>
      <div class="wh40k-side-page">${PAGE_TITLES[currentPage]}</div>
      <div class="wh40k-side-desc">${PAGE_DESCRIPTIONS[currentPage]}</div>
    </div>
    <div class="wh40k-side-card">
      <div class="wh40k-side-title">角色摘要</div>
      <div class="wh40k-summary-list"></div>
    </div>
    <div class="wh40k-side-card">
      <div class="wh40k-side-title">模板预览</div>
      <pre class="wh40k-payload-preview"></pre>
    </div>
    <div class="wh40k-side-card">
      <div class="wh40k-side-title">兼容性提示</div>
      <ul class="wh40k-warning-list"></ul>
    </div>
  `;

  const summaryList = side.querySelector('.wh40k-summary-list');
  summary.forEach(([label, value]) => {
    const row = document.createElement('div');
    row.className = 'wh40k-summary-row';
    row.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
    summaryList.appendChild(row);
  });

  side.querySelector('.wh40k-payload-preview').textContent = buildPayload();

  const warningList = side.querySelector('.wh40k-warning-list');
  if (warnings.length === 0) {
    const li = document.createElement('li');
    li.textContent = '当前组合无强制拦截。若有世界观冲突，AI会在开场自动修正。';
    warningList.appendChild(li);
  } else {
    warnings.forEach((w) => {
      const li = document.createElement('li');
      li.textContent = w;
      warningList.appendChild(li);
    });
  }
}

function makeOptionButton(field, code, label) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'wh40k-option';
  btn.dataset.field = field;
  btn.dataset.code = code;
  btn.innerHTML = `<span class="wh40k-option-code">${code}</span><span class="wh40k-option-label">${label}</span>`;

  if (state[field] === code) btn.classList.add('active');

  btn.addEventListener('click', () => {
    state[field] = code;
    saveDraftState();
    render();
  });

  return btn;
}

function makeFieldSection(field) {
  const wrap = document.createElement('section');
  wrap.className = 'wh40k-section';

  const h = document.createElement('h3');
  h.textContent = FIELD_TITLES[field];
  wrap.appendChild(h);

  const optionsWrap = document.createElement('div');
  optionsWrap.className = 'wh40k-options';
  OPTIONS[field].forEach(([code, label]) => optionsWrap.appendChild(makeOptionButton(field, code, label)));
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
      renderSidebar();
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
      <div class="wh40k-splash-quote">祂注视着你……</div>
      <div class="wh40k-splash-line">「做出你的选择。」</div>
      <div class="wh40k-splash-text">这一界面不会立刻发言。你将在最后一页确认后，才会一次性发送角色模板。</div>
      <button type="button" class="wh40k-btn primary wh40k-start-btn">开始创建角色</button>
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
  PAGE_FIELDS[currentPage].forEach((field) => grid.appendChild(makeFieldSection(field)));
  content.appendChild(grid);

  if (currentPage === 4) {
    const finalCard = document.createElement('section');
    finalCard.className = 'wh40k-final-card';
    finalCard.innerHTML = `
      <div class="wh40k-final-title">最终确认</div>
      <div class="wh40k-final-text">将发送以下模板。若自动写入失败,会复制到剪贴板供你粘贴。</div>
      <pre class="wh40k-payload-preview wh40k-final-preview"></pre>
      <div class="wh40k-final-actions">
        <button type="button" class="wh40k-btn" data-action="fill-only">只写入输入框</button>
        <button type="button" class="wh40k-btn" data-action="copy-payload">复制模板</button>
        <button type="button" class="wh40k-btn primary" data-action="confirm-send">确认并发送</button>
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

  if (currentPage === 4) {
    next.style.display = 'none';
  } else {
    next.style.display = '';
    next.textContent = currentPage === 0 ? '进入下一页' : '下一步';
  }
}

function render() {
  renderProgress();
  renderSidebar();
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

  if (currentPage >= 4) return;
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
  closeBuilder();  // 先关 modal,让输入框完全暴露给 focus
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
  closeBuilder();  // 先关 modal
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

  // 尝试点发送按钮
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
  // Extra retries in case characterId / chat data isn't populated yet on first pass.
  setTimeout(() => { try { maybeAutoOpen(); } catch (e) { console.error(`[${EXT_ID}] delayed maybeAutoOpen error`, e); } }, 600);
  setTimeout(() => { try { maybeAutoOpen(); } catch (e) { console.error(`[${EXT_ID}] delayed maybeAutoOpen error`, e); } }, 2000);

  console.log(`[${EXT_ID}] init complete`);
}

function boot() {
  console.log(`[${EXT_ID}] boot() called, ctxReady=${isCtxReady()}`);

  // Try to bind APP_READY if the SillyTavern global is already up.
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

  // Multiple timed fallbacks so we don't depend on APP_READY firing at the right moment.
  setTimeout(init, 300);
  setTimeout(init, 1500);
  setTimeout(init, 4000);
}

// Wait for DOM + jQuery (SillyTavern ships jQuery globally). Fall back to plain DOMContentLoaded.
if (typeof jQuery === 'function') {
  jQuery(function () { boot(); });
} else if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
