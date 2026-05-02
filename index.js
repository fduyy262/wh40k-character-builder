const EXT_ID = 'wh40k-character-builder';
const TARGET_CHARACTER_NAME = '';
const AUTO_OPEN_FOR_EMPTY_CHAT = true;
const AUTO_SEND_AFTER_FILL = true;

const PANEL_ORDER = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'N', 'Q', 'S', 'U', 'V', 'J'];
// 8 页结构:
// 0 = splash 起始页
// 1 = 基础信息(B 名字 / C 血统 / F 年龄 / G 性别 / I 外貌 / Q 身体状态)
// 2 = 出身来历(A 星球 / H 背景, 含 H25 自定义出身输入)
// 3 = 身份立场(D 立场 / E 职业)
// 4 = 初始情况(K 资源 / L 秘密 / N 羁绊)
// 5 = 角色驱动(S 开场地点 / U 目标动机 / V 叙事节奏, 含 S23 自定义场景输入)
// 6 = 命运牵连(J 主线卷入, 特殊样式; 末尾含全局额外补充输入)
// 7 = 最终提交
const PAGE_FIELDS = [
  [],                                       // 0 splash
  ['B', 'C', 'F', 'G', 'I', 'Q'],          // 1 基础信息
  ['A', 'H'],                               // 2 出身来历
  ['D', 'E'],                               // 3 身份立场
  ['K', 'L', 'N'],                          // 4 初始情况
  ['S', 'U', 'V'],                          // 5 角色驱动
  ['J'],                                    // 6 命运牵连(+额外补充)
  [],                                       // 7 最终提交
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
  Q: 'Q. 身体状态',
  S: 'S. 开场地点',
  U: 'U. 目标动机',
  V: 'V. 叙事节奏偏好',
};

const OPTIONS = {
  A: [
    ['A1', '卡西亚（卡利亚星区-首府）'],
    ['A2', '普莱（卡利亚星区-要塞世界）'],
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
    ['A19', '欧姆巴佩11号太空站（卡利亚星区-火星正统派秘密空间站）'],
    ['A20', '奥利赛V太空站（卡利亚星区-导航者空间站）'],
    ['A21', '哥利亚太空要塞（卡利亚星区-死亡守望要塞）'],
    ['A22', '新福吉斯（莫斯塔克扩区-锻造世界）'],
    ['A23', '瀛洲-21（卡利亚星区外围-翡翠龙战团母星·折叠空间）'],
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
    ['D9', '机械神教-火星正统派'],
    ['D10', '机械神教-探索者派'],
    ['D11', '机械神教-异形博学派'],
    ['D12', '机械神教-莫伊雷分裂派'],
    ['D13', '机械神教-考尔派'],
  ],
  E: [
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
    ['E21', '死亡守望修士'],
    ['E22', '沉海誓约侦察兵'],
    ['E23', '翡翠龙战团修士'],
    ['E24', '初创子团修士'],
    ['E25', '审判庭侍从'],
    ['E26', '审判庭神秘学者'],
    ['E27', '受批准灵能者'],
    ['E28', '星语者'],
    ['E29', '拜死教刺客'],
    ['E30', '未登记灵能者'],
    ['E31', '机械神教初级神甫'],
    ['E32', '机械神教探索队正式成员'],
    ['E33', '护教军游侠'],
    ['E34', '遗传学探索者'],
    ['E35', '高阶考古学僧'],
    ['E36', '技术监工'],
    ['E37', '巢都帮派成员'],
    ['E38', '锯齿小子初级成员'],
    ['E39', '黑市情报贩子'],
    ['E40', '走私者'],
    ['E41', '海盗'],
    ['E42', '叛逃海军军官'],
    ['E43', '角斗奴'],
    ['E44', '异形走私中间人'],
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
    ['G3', '模糊/不明'],
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
    ['H25', '自定义出身（手动输入）'],
  ],
  I: [
    ['I1', '丑陋至极，难以形容'],
    ['I2', '高大健壮，相貌普通'],
    ['I3', '普通身材，普通外貌'],
    ['I4', '身材优美，人见人爱'],
  ],
  J: [
    ['J1', '无主线（纯自由剧情）'],
    ['J2', '单主线·绯雾之下'],
    ['J3', '单主线·帝皇幻梦'],
    ['J4', '单主线·太平潮涌'],
    ['J5', '单主线·圣机之蚀'],
    ['J6', '双主线·绯雾之下 + 帝皇幻梦'],
    ['J7', '双主线·绯雾之下 + 太平潮涌'],
    ['J8', '双主线·绯雾之下 + 圣机之蚀'],
    ['J9', '双主线·帝皇幻梦 + 太平潮涌'],
    ['J10', '双主线·帝皇幻梦 + 圣机之蚀'],
    ['J11', '双主线·太平潮涌 + 圣机之蚀'],
    ['J12', '三主线·绯雾之下 + 帝皇幻梦 + 太平潮涌'],
    ['J13', '三主线·绯雾之下 + 帝皇幻梦 + 圣机之蚀'],
    ['J14', '三主线·绯雾之下 + 太平潮涌 + 圣机之蚀'],
    ['J15', '三主线·帝皇幻梦 + 太平潮涌 + 圣机之蚀'],
    ['J16', '四主线·绯雾之下 + 帝皇幻梦 + 太平潮涌 + 圣机之蚀'],
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
    ['K11', '自有小船（一艘属于你的小型船：贸易船、打捞船或走私船）'],
    ['K12', '借调舰船（暂时使用上级、家族或雇主的一艘船）'],
    ['K13', '在大舰服役（你常驻于一艘大型舰船，但船不属于你）'],
  ],
  L: [
    ['L0', '无'],
    ['L1', '你持有伪造身份'],
    ['L2', '你忘记了一段关键记忆'],
    ['L3', '某个组织正在暗中标记你'],
    ['L4', '你曾见过不该见之物'],
    ['L5', '你身上藏有来历不明的小圣物'],
    ['L6', '你欠下了一桩未了的血债或旧案'],
    ['L7', '你是某项预言、占卜或推演中的变量'],
    ['L8', '某位高位者曾秘密接触过你'],
    ['L9', '你体内潜伏着一种尚未显现的异常'],
    ['L10', '你的档案中存在一页被焚毁的记录'],
    ['L11', '你持有一枚无法读取的古老数据板'],
    ['L12', '你梦见过一艘不应存在的金色巨舰'],
    ['L13', '你有一件传承下来的古老武器'],
    ['L14', '你偶尔能感知到非人类的低语'],
    ['L15', '你发现了一个珍贵的异形遗物'],
    ['L16', '你曾被审判庭短暂拘押，经历了痛苦的审讯'],
    ['L17', '你曾参与过一次不该留下记录的清洗'],
    ['L18', '你曾被迫出卖自己肉体以换取生路'],
    ['L19', '你曾使用未授权标准建造模板片段'],
    ['L20', '你已被欧姆巴佩11号站秘密建档'],
    ['L21', '你加入过一个半异端学术协会'],
    ['L22', '你正在隐瞒一次未授权肉体改造'],
    ['L23', '你持有一份未提交火星的技术档案'],
    ['L24', '你被怀疑处于技术弊病第二阶'],
    ['L25', '你掌握一条通向第三阶路径的禁忌线索'],
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
    ['N24', '有一位半异端协会导师庇护你'],
  ],
  Q: [
    ['Q1', '健康（身体无明显问题，行动自如）'],
    ['Q2', '旧伤（身上有未完全愈合的伤，剧烈动作时会牵动疼痛）'],
    ['Q3', '慢病（长期疾病缠身，靠药维持，体力低于常人）'],
    ['Q4', '战伤（神经迟钝、步态异常或部分听力视力丧失）'],
    ['Q5', '药瘾（长期依赖镇痛剂、战地激素或廉价兴奋剂）'],
    ['Q6', '轻改（义眼或义肢，已被机械教祝圣，外观可见）'],
    ['Q7', '中改（多部位机械替换，机械结构占身体三分之一）'],
    ['Q8', '重改（身体大部分已机械化，机械神教高阶常态）'],
    ['Q9', '心创（战争创伤后遗症，特定刺激下会失控或解离）'],
    ['Q10', '隐改（身上藏着不能被发现的非人改造或异常基因）'],
  ],
  S: [
    ['S1', '巢都街头（人挤人的下层街道，烟尘弥漫，叫卖声盖过祷词）'],
    ['S2', '廉价旅店（隔板薄、邻居不熟，随时有人敲门）'],
    ['S3', '圣堂内（香雾、圣像、低声诵念的祷词）'],
    ['S4', '工坊车间（机器轰鸣、油污遍地，机仆来回搬运）'],
    ['S5', '行政办公（长队、盖章、灰尘满架，办事员从不抬头）'],
    ['S6', '黑市（隐蔽摊位，异形零件与禁忌商品在桌底交易）'],
    ['S7', '军营（铺位、操练声、长官点名）'],
    ['S8', '舰内（引擎低吼，警报偶尔闪烁，金属壁回响）'],
    ['S9', '星港码头（起重机、检疫门、异乡口音、货柜封条）'],
    ['S10', '边境聚落（风沙、单一作物田、远处机器收割声）'],
    ['S11', '矿井（升降笼、粉尘肺，工伤不被记录）'],
    ['S12', '贵族宅邸（大理石、画像注视、低声谈判）'],
    ['S13', '修道院（走廊回声、祷告声，压抑的洁净）'],
    ['S14', '拘留所（铁栏、滴水声、隔壁牢房的咳嗽）'],
    ['S15', '焚毁现场（焦土、残骸，尚未冷透的金属）'],
    ['S16', '异形遗迹（不可能的几何、低频共鸣，风从不该的方向吹来）'],
    ['S17', '小酒馆（烟雾弥漫，劣质 amasec 与邻桌的密谋）'],
    ['S18', '医院（漂白水气味，修女低声诵经，走廊上的呻吟）'],
    ['S19', '朝圣路（长队风尘仆仆，有人哭有人唱）'],
    ['S20', '角斗场（血腥沙地，上千狂热者的呼喝）'],
    ['S21', '档案馆（纸尘、霉味，堆到天花板的禁书与卷宗）'],
    ['S22', '神甫居所（红蜡封条、机魂祷词、二进制爆鸣）'],
    ['S23', '自定义场景（手动输入）'],
  ],
  U: [
    ['U1', '复仇（某段旧账无法翻篇，你活着就是为了那笔账）'],
    ['U2', '寻亲（失散的至亲下落不明，你不停打听不停找）'],
    ['U3', '求知（你被禁忌知识吸引，明知有代价仍要触碰）'],
    ['U4', '财富（你想要更多信用点、更高地位、更厚的安全垫）'],
    ['U5', '使命（你为信仰、誓言或召唤而活，自身得失不重要）'],
    ['U6', '逃亡（有什么在追你，你只能不停跑）'],
    ['U7', '救赎（你曾犯下错事，余生都在试图弥补）'],
    ['U8', '身份（你的过去被剥夺或抹除了，你想找回真我）'],
    ['U9', '野心（你看到了向上爬的路，无论代价）'],
    ['U10', '守护（你为某个具体的人或物而活）'],
    ['U11', '解咒（某种宿命压在你身上，你想摆脱）'],
    ['U12', '漂泊（你没有目标，活着、走着、看看）'],
    ['U13', '安分（你不要大目标，只想过好每一天，不愿被卷入风暴）'],
    ['U14', '猎艳（你追逐征服与情欲，每段关系都是新挑战）'],
  ],
  V: [
    ['V1', '慢热（细致环境与心理铺垫，不急着推进剧情）'],
    ['V2', '平衡（剧情推进与日常细节并重）'],
    ['V3', '紧凑（事件密集，转折频繁，少铺垫）'],
    ['V4', '日常（享受帝国压抑感的琐碎与窒息细节）'],
    ['V5', '主线（专注推进主线剧情，少 filler）'],
    ['V6', '自主（AI 等你主动行动，不催进度）'],
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
  Q: 'Q1',
  S: 'S1',
  U: 'U12',         // 默认漂泊(最中性)
  V: 'V2',          // 默认平衡节奏
  NAME: '',         // B1 自定义名字
  H_CUSTOM: '',     // H25 自定义出身
  S_CUSTOM: '',     // S23 自定义开场地点
  EXTRA: '',        // J 后的额外补充
};

// 8 页结构的标题与描述。索引 6 是 J 字段(命运牵连),特殊样式。
function buildPageTitles() {
  return {
    0: '初始化',
    1: '基础信息',
    2: '出身来历',
    3: '身份立场',
    4: '初始情况',
    5: '角色驱动',
    6: '命运牵连',  // J 栏 - 特殊
    7: '最终提交',
  };
}

function buildPageDescriptions() {
  return {
    0: '点击下方按钮接入终端,开始您的公民登记。您将依次完成 6 节登记表。',
    1: '// 第一节 — 您的姓名、血统、年龄、性别、外貌与身体状态。',
    2: '// 第二节 — 您的出生星界与身世背景。可在 H25 处自定义出身。',
    3: '// 第三节 — 您当前的阵营立场与职业。',
    4: '// 第四节 — 您当前持有的资源、秘密与羁绊。',
    5: '// 第五节 — 您的开场地点、目标动机与叙事节奏偏好。',
    6: '// ??_???? / [NON_STANDARD_FIELD] — 来源未知的字段;另可在底部自由补充。',
    7: '// 复核全部档案,提交至大行政官案头。',
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
  Q: '声明您当前的身体状况。包括隐性创伤、改造痕迹与未愈合的旧伤。',
  S: '指定您的开场地点。从 22 个具体场景中选择一个，或在 S23 处自行描述。',
  U: '声明您的核心动机。它将驱动您的中长期决策与剧情选择。',
  V: '声明您偏好的叙事节奏。本字段不影响世界规则，仅作风格调音。',
};

const PAGE_TITLES = {};
const PAGE_DESCRIPTIONS = {};

let state = { ...DEFAULT_STATE };
let currentPage = 0;
let overlay = null;
let launcher = null;

// 在加载时填充派生数据
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

// ================= 硬约束:选项兼容性判断 =================
// 注释与实际编号一致, 修改时请同步更新
//
// 【血统约束】
// - C4 不可接触者 禁: 阿斯塔特/神教职业/灵能职业(E27/E28/E30) | 任何义体(Q6/Q7/Q8)
// - C5 领航者 禁: E1/E4/E7/E9/E10/E11/阿斯塔特/审判庭/E30/神教/E37/E38/E43
//                | 出身限 H4/H16/H19/H20 | 资源禁 K1/K6/K11 | 重改禁 Q7/Q8 | H25禁
// - C6 猫人 禁: E18/阿斯塔特/神教职业
// - C7 培育人 必须: D9-D13 + E31-E36 + H12/H14 + L19+秘密 | H25禁
// - H13 穿越者 禁: 阿斯塔特(基因改造无法溯源)
//
// 【职业约束】
// - E10 修女会成员: G2女 + 种族 ∈ {C1,C3,C4,C6} | 禁义体 Q6/Q7/Q8 | 禁 U14 猎艳
// - E11 蔷薇修女会侍从: G2女 | 禁义体 Q6/Q7/Q8 | 禁 U14 猎艳
// - E12 帝国贵族: 出身限 H2/H4/H5/H9/H18/H19/H22
// - E14 行商浪人继承人: 不限定出身(可任意)
// - E18 流浪骑士: 非C6 | 出身限 H4/H9/H19/H20
// - E21-E24 阿斯塔特: G1男 + C1正常人类 + 非H13 | 禁神教背景 H12/H14
//                    | 禁 Q3慢病/Q5药瘾 | 禁 U14 猎艳 | H25禁
// - E25-E29 审判庭专属: 必配 D5-D8 立场
// - E30 未登记灵能者: 禁审判庭立场 D5-D8
// - E31-E36 机械神教专属: 必配 D9-D13 立场 + C7 + H12/H14
//
// 【立场约束】
// - D5 纯洁派: 禁 Q10 隐改
//
// 【出生星界约束】
// - A19 欧姆巴佩11号: 限神教职业(E31-E36)或审判庭(E25-E26)
// - A20 奥利赛V: 不硬禁(允许领航者及被雇佣者)
// - A21 哥利亚要塞: 限 E21 死亡守望
// - A23 瀛洲-21: 限 E23 翡翠龙战团修士
//
// 【动机约束】
// - U2 寻亲 ←→ N1 家人仍在: 双向硬禁(逻辑矛盾)
// - U6 逃亡: 禁 D1帝国忠诚者/D5-D8审判庭/D9-D13神教
// - U10 守护 ←→ N0 无: 双向硬禁(逻辑矛盾)
// - U12 漂泊: 禁组织化职业(修女/阿斯塔特/审判庭/神教) + 禁 C5/C7
// - U14 猎艳: 禁修女会(E10/E11) + 禁阿斯塔特(E21-E24)
//
// 【资源约束】
// - K11 自有小船: 限 E2/E14/E16/E40/E41/E42 | 禁 C5
// - K12 借调舰船: 禁底层职业 E7/E19/E37/E38/E43
// - K13 在大舰服役: 限 E3/E14/E21-E24/E25/E26/E28/E32/E33
//
// 【开场地点 S】
// - S 字段对每个职业有允许集合(详见 ALLOWED_S 表), 不在集合中即硬禁
// - S23 自定义永远允许
// - 出生星界 A19/A21/A23 各自有允许的 S 子集

function isRandomCode(code) {
  return /^[A-Z]0$/.test(code);  // A0, B0, ... E0 (非 E10/E20 等)
}

// ========== 立场 ⇄ 职业 体系绑定 ==========
// iq  = 审判庭编制(D5-D8 专属)
// mech = 机械神教编制(D9-D13 专属)
// common = 通用职业(任意普通立场可选,也可做审判庭 retinue)
const PROFESSION_TAG = {
  // 审判庭专属
  E25: 'iq',  // 审判庭侍从
  E26: 'iq',  // 审判庭神秘学者
  E27: 'iq',  // 受批准灵能者
  E28: 'iq',  // 星语者
  E29: 'iq',  // 拜死教刺客
  // 机械神教专属
  E31: 'mech', // 机械神教初级神甫
  E32: 'mech', // 机械神教探索队正式成员
  E33: 'mech', // 护教军游侠
  E34: 'mech', // 遗传学探索者
  E35: 'mech', // 高阶考古学僧
  E36: 'mech', // 技术监工
};

function professionTag(code) {
  return PROFESSION_TAG[code] || 'common';
}

function stanceTag(code) {
  if (['D5', 'D6', 'D7', 'D8'].includes(code)) return 'iq';
  if (['D9', 'D10', 'D11', 'D12', 'D13'].includes(code)) return 'mech';
  return 'common';
}

function isMechBackground(code) {
  return ['H12', 'H14'].includes(code);
}

function isMechSecret(code) {
  const match = /^L(\d+)$/.exec(code || '');
  return !!match && Number(match[1]) >= 19;
}

// ============ 规则常量(模块级) ============

// S 开场地点 ←→ E 职业 矩阵: 每职业的允许 S 集合
// (S23 自定义场景永远允许,不在此表中)
const ALLOWED_S_BY_PROFESSION = {
  E1: ['S1','S2','S7','S15','S17','S18'],
  E2: ['S5','S8','S9','S17'],
  E3: ['S7','S8','S9'],
  E4: ['S5','S14','S17'],
  E5: ['S15','S18'],
  E6: ['S5','S21'],
  E7: ['S2','S4','S11'],
  E8: ['S5','S21'],
  E9: ['S3','S13','S19'],
  E10: ['S3','S13','S18','S19'],
  E11: ['S3','S12','S13','S18'],
  E12: ['S5','S9','S12','S17'],
  E13: ['S7','S9','S12'],
  E14: ['S5','S8','S9','S12','S17'],
  E15: ['S2','S6','S9','S17'],
  E16: ['S5','S8','S9','S15'],
  E17: ['S1','S2','S6','S14','S17'],
  E18: ['S10','S12','S15'],
  E19: ['S1','S2','S14','S15','S19'],
  E20: ['S2','S12','S17'],
  E21: ['S3','S7','S8','S9','S15','S16','S22'],   // 死亡守望(扩展)
  E22: ['S6','S7','S8','S9','S15','S16','S22'],   // 沉海誓约(扩展)
  E23: ['S7','S8','S9','S10','S13','S15','S16'],  // 翡翠龙(扩展)
  E24: ['S7','S8','S9','S15','S16'],              // 初创子团(扩展)
  E25: ['S5','S8','S14','S21'],
  E26: ['S5','S8','S16','S21'],
  E27: ['S3','S8','S13'],
  E28: ['S5','S8','S13'],
  E29: ['S1','S2','S8','S17'],
  E30: ['S1','S2','S6','S14','S19'],
  E31: ['S4','S22'],
  E32: ['S4','S8','S15','S16','S22'],
  E33: ['S4','S15','S22'],
  E34: ['S4','S18','S22'],
  E35: ['S4','S16','S21','S22'],
  E36: ['S4','S22'],
  E37: ['S1','S2','S6','S14','S17'],
  E38: ['S1','S2','S6','S17'],
  E39: ['S1','S6','S9','S17'],
  E40: ['S5','S6','S8','S9'],
  E41: ['S6','S8','S9'],
  E42: ['S2','S6','S8'],
  E43: ['S14','S20'],
  E44: ['S6','S8','S9','S16'],
};

// 出生星界 ←→ 职业 限定
const A19_OK_E = ['E25','E26','E31','E32','E33','E34','E35','E36'];  // 欧姆巴佩11号(神教+审判庭)
const A21_OK_E = ['E21'];  // 哥利亚要塞(死亡守望)
const A23_OK_E = ['E23'];  // 瀛洲-21(翡翠龙)

// 出生星界 ←→ 开场地点 限定
const A19_OK_S = ['S8','S22','S23'];          // 欧姆巴佩11号: 舰内/神甫居所
const A21_OK_S = ['S3','S8','S22','S23'];     // 哥利亚要塞: 圣堂/舰内/神甫居所
const A23_OK_S = ['S8','S10','S13','S15','S23']; // 瀛洲-21: 舰内/边境/修道院/废墟

// 背景白名单
const NAVIGATOR_OK_BG = ['H4','H16','H19','H20'];                    // C5 领航者
const NOBLE_OK_BG = ['H2','H4','H5','H9','H18','H19','H22'];         // E12 帝国贵族
const KNIGHT_OK_BG = ['H4','H9','H19','H20'];                        // E18 流浪骑士
const ASTARTES_FORBIDDEN_BG = ['H12','H14'];                         // 阿斯塔特禁神教背景

// 资源约束
const SELF_OWNED_SHIP_OK = ['E2','E14','E16','E40','E41','E42'];
const NO_BORROWED_SHIP = ['E7','E19','E37','E38','E43'];
const ASSIGNED_TO_SHIP_OK = ['E3','E14','E21','E22','E23','E24','E25','E26','E28','E32','E33'];
const NAVIGATOR_FORBIDDEN_K = ['K1','K6','K11'];                     // C5 领航者禁

// 身体状态约束
const HEAVY_AUG = ['Q6','Q7','Q8'];                                  // 任何义体改造
const MEDIUM_HEAVY_AUG = ['Q7','Q8'];                                // 中重度改造

// 普通(非组织)职业: 无法身体大部分机械化
const STREET_PROFESSIONS = ['E1','E7','E19','E37','E43'];

// 组织化职业: 不允许 U12 漂泊
const ORG_PROFESSIONS_FOR_U12 = ['E10','E11','E21','E22','E23','E24','E25','E26','E27','E28','E29','E31','E32','E33','E34','E35','E36'];

function isOptionAllowed(field, code, s = state) {
  // 旧存档中的 X0 仍允许作为兜底，但新版界面不再提供随机选项。
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
  const a = pick('A');
  const u = pick('U');
  const n = pick('N');

  const ASTARTES = ['E21', 'E22', 'E23', 'E24'];
  const IQ_PROFESSIONS = ['E25', 'E26', 'E27', 'E28', 'E29'];
  const MECH_PROFESSIONS = ['E31', 'E32', 'E33', 'E34', 'E35', 'E36'];
  const PSYKER_PROFESSIONS = ['E27', 'E28', 'E30'];
  const SISTER_RACES = ['C1', 'C3', 'C4', 'C6'];
  const SISTER_PROFESSIONS = ['E10', 'E11'];

  const CAT_BAN = ['E18', ...ASTARTES, ...MECH_PROFESSIONS];
  const UNTOUCHABLE_BAN = [...ASTARTES, ...MECH_PROFESSIONS, ...PSYKER_PROFESSIONS];
  const NAVIGATOR_BAN = [
    'E1', 'E4', 'E7', 'E9', 'E10', 'E11',
    ...ASTARTES, ...IQ_PROFESSIONS, 'E30', ...MECH_PROFESSIONS,
    'E37', 'E38', 'E43'
  ];

  // ============ C 字段 ============
  if (field === 'C') {
    // C 字段允许作为路线切换入口，不因后续默认字段阻塞选择。
    return { ok: true };
  }

  // ============ D 立场 ============
  if (field === 'D') {
    const dTag = stanceTag(code);
    const eTag = e ? professionTag(e) : null;

    if (dTag === 'mech') {
      if (c && c !== 'C7') return { ok: false, reason: '神教立场需 C7' };
    } else {
      if (c === 'C7') return { ok: false, reason: 'C7 需机械神教立场' };
      if (eTag === 'mech') return { ok: false, reason: '神教职业仅配神教立场' };
    }

    if (eTag === 'iq' && dTag !== 'iq') {
      return { ok: false, reason: '审判庭职业仅配审判庭立场' };
    }

    // 新增: E30 未登记灵能者 + D5-D8 审判庭立场 矛盾
    if (e === 'E30' && dTag === 'iq') {
      return { ok: false, reason: '审判庭立场会处决未登记灵能者' };
    }
  }

  // ============ E 职业 ============
  if (field === 'E') {
    const eTag = professionTag(code);
    const dTag = d ? stanceTag(d) : null;

    if (eTag === 'mech') {
      if (c && c !== 'C7') return { ok: false, reason: '神教职业需 C7' };
    } else {
      if (c === 'C7') return { ok: false, reason: 'C7 需神教职业' };
      if (dTag === 'mech') return { ok: false, reason: '神教立场仅限神教职业' };
    }

    if (eTag === 'iq') {
      if (dTag && dTag !== 'iq') return { ok: false, reason: '仅限审判庭立场' };
    }

    if (ASTARTES.includes(code)) {
      if (g && g !== 'G1') return { ok: false, reason: '阿斯塔特仅限男性' };
      if (c && c !== 'C1') return { ok: false, reason: '阿斯塔特仅限正常人类' };
      if (h === 'H13') return { ok: false, reason: '穿越者无法成为阿斯塔特' };
      // 新增: 阿斯塔特禁神教背景
      if (h && ASTARTES_FORBIDDEN_BG.includes(h)) {
        return { ok: false, reason: '阿斯塔特无法出身机械神教背景' };
      }
    }

    if (code === 'E10') {
      if (g && g !== 'G2') return { ok: false, reason: '修女会仅限女性' };
      if (c && !SISTER_RACES.includes(c)) return { ok: false, reason: '当前血统不可成为修女' };
    }

    // 新增: E11 蔷薇修女会侍从仅限女性
    if (code === 'E11' && g && g !== 'G2') {
      return { ok: false, reason: '蔷薇修女会侍从仅限女性' };
    }

    // 新增: E12 帝国贵族 出身限定
    if (code === 'E12' && h && !NOBLE_OK_BG.includes(h)) {
      return { ok: false, reason: '贵族通常不出身底层' };
    }

    // 新增: E18 流浪骑士 出身限定(从软警告升级硬禁)
    if (code === 'E18') {
      if (c === 'C6') return { ok: false, reason: '猫人不可担任' };
      if (h && !KNIGHT_OK_BG.includes(h)) {
        return { ok: false, reason: '流浪骑士需贵族传承背景' };
      }
    }

    if (c === 'C6' && CAT_BAN.includes(code)) return { ok: false, reason: '猫人不可担任' };
    if (c === 'C4' && UNTOUCHABLE_BAN.includes(code)) return { ok: false, reason: '不可接触者不适合' };
    if (c === 'C5' && NAVIGATOR_BAN.includes(code)) return { ok: false, reason: '领航者不适合' };
  }

  // ============ G 性别 ============
  if (field === 'G') {
    if (ASTARTES.includes(e) && code !== 'G1') return { ok: false, reason: '阿斯塔特仅限男性' };
    if (e === 'E10' && code !== 'G2') return { ok: false, reason: '修女会仅限女性' };
    // 新增: E11 蔷薇修女会侍从仅限女性
    if (e === 'E11' && code !== 'G2') return { ok: false, reason: '蔷薇修女会侍从仅限女性' };
  }

  // ============ A 出生星界 ============
  if (field === 'A') {
    // A19 欧姆巴佩11号: 限神教/审判庭
    if (code === 'A19' && e && !A19_OK_E.includes(e)) {
      return { ok: false, reason: '欧姆巴佩11号是机密设施，仅对机械神教与审判庭高层开放' };
    }
    // A21 哥利亚要塞: 限死亡守望
    if (code === 'A21' && e && !A21_OK_E.includes(e)) {
      return { ok: false, reason: '哥利亚要塞仅对死亡守望开放' };
    }
    // A23 瀛洲-21: 限翡翠龙
    if (code === 'A23' && e && !A23_OK_E.includes(e)) {
      return { ok: false, reason: '瀛洲-21 是隐藏母星，仅翡翠龙战团修士可在此开场' };
    }
    // A20 奥利赛V: 不硬禁(允许领航者及被雇佣者)
  }

  // ============ H 背景 ============
  if (field === 'H') {
    if (c === 'C7' && !isMechBackground(code)) {
      return { ok: false, reason: 'C7 需神教背景' };
    }

    if (c && c !== 'C7' && isMechBackground(code)) {
      return { ok: false, reason: '神教背景需 C7' };
    }

    if (code === 'H13' && ASTARTES.includes(e)) {
      return { ok: false, reason: '阿斯塔特无法是穿越者' };
    }

    // 新增: 阿斯塔特禁神教背景
    if (ASTARTES.includes(e) && ASTARTES_FORBIDDEN_BG.includes(code)) {
      return { ok: false, reason: '阿斯塔特无法出身机械神教背景' };
    }

    // 新增: C5 领航者背景限定
    if (c === 'C5' && code !== 'H25' && !NAVIGATOR_OK_BG.includes(code)) {
      return { ok: false, reason: '领航者必须出身领航者世系或贵族家族' };
    }

    // 新增: E12 帝国贵族 出身限定(反向)
    if (e === 'E12' && code !== 'H25' && !NOBLE_OK_BG.includes(code)) {
      return { ok: false, reason: '贵族通常不出身底层' };
    }

    // 新增: E18 流浪骑士 出身限定(反向)
    if (e === 'E18' && code !== 'H25' && !KNIGHT_OK_BG.includes(code)) {
      return { ok: false, reason: '流浪骑士需贵族传承背景' };
    }

    // 新增: H25 自定义出身的限制
    if (code === 'H25') {
      if (c === 'C5') return { ok: false, reason: '领航者必须有明确世系出身' };
      if (c === 'C7') return { ok: false, reason: 'C7 培育人必须 H12/H14' };
      if (ASTARTES.includes(e)) return { ok: false, reason: '阿斯塔特出身有特定流程' };
    }
  }

  // ============ K 资源 ============
  if (field === 'K') {
    if (code === 'K11' && e && !SELF_OWNED_SHIP_OK.includes(e)) {
      return { ok: false, reason: '该职业通常不会自有舰船' };
    }
    if (code === 'K12' && e && NO_BORROWED_SHIP.includes(e)) {
      return { ok: false, reason: '该职业不太可能借调舰船' };
    }
    if (code === 'K13' && e && !ASSIGNED_TO_SHIP_OK.includes(e)) {
      return { ok: false, reason: '该职业通常不在大型舰船上服役' };
    }

    // 新增: C5 领航者资源限定
    if (c === 'C5' && NAVIGATOR_FORBIDDEN_K.includes(code)) {
      return { ok: false, reason: '领航者不可能身无长物/背债/自有小船' };
    }
  }

  // ============ L 秘密 ============
  if (field === 'L') {
    if (isMechSecret(code) && c !== 'C7') {
      return { ok: false, reason: '神教秘密需 C7' };
    }
  }

  // ============ Q 身体状态 ============
  if (field === 'Q') {
    // C5 领航者禁中重度改造
    if (c === 'C5' && MEDIUM_HEAVY_AUG.includes(code)) {
      return { ok: false, reason: '领航者身体脆弱，无法叠加重度改造' };
    }
    // C4 不可接触者禁任何义体
    if (c === 'C4' && HEAVY_AUG.includes(code)) {
      return { ok: false, reason: '不可接触者无法被祝圣，机械教不会为其改造' };
    }
    // 修女会禁义体
    if (SISTER_PROFESSIONS.includes(e) && HEAVY_AUG.includes(code)) {
      return { ok: false, reason: '修女会强调纯洁血肉，不接受义体' };
    }
    // 阿斯塔特禁慢病/药瘾
    if (ASTARTES.includes(e) && (code === 'Q3' || code === 'Q5')) {
      return { ok: false, reason: '阿斯塔特免疫普通疾病与药物依赖' };
    }
    // 普通职业禁 Q8 重改
    if (code === 'Q8' && STREET_PROFESSIONS.includes(e)) {
      return { ok: false, reason: '该职业不可能身体大部分机械化' };
    }
    // D5 纯洁派禁 Q10 隐改
    if (code === 'Q10' && d === 'D5') {
      return { ok: false, reason: '纯洁派不容隐性改造' };
    }
  }

  // ============ S 开场地点 ============
  if (field === 'S') {
    // S23 自定义永远允许
    if (code === 'S23') return { ok: true };

    // 出生星界限定
    if (a === 'A19' && !A19_OK_S.includes(code)) {
      return { ok: false, reason: '欧姆巴佩11号只允许舰内或神甫居所开场' };
    }
    if (a === 'A21' && !A21_OK_S.includes(code)) {
      return { ok: false, reason: '哥利亚要塞只允许圣堂/舰内/神甫居所开场' };
    }
    if (a === 'A23' && !A23_OK_S.includes(code)) {
      return { ok: false, reason: '瀛洲-21 只允许舰内/边境/修道院/废墟开场' };
    }

    // 职业 ←→ S 矩阵
    if (e && ALLOWED_S_BY_PROFESSION[e] && !ALLOWED_S_BY_PROFESSION[e].includes(code)) {
      return { ok: false, reason: '该开场地点与当前职业不合' };
    }
  }

  // ============ U 目标动机 ============
  if (field === 'U') {
    // U2 寻亲 + N1 家人仍在 矛盾
    if (code === 'U2' && n === 'N1') {
      return { ok: false, reason: '"寻亲"与"家人仍在"逻辑矛盾' };
    }
    // U10 守护 + N0 无 矛盾
    if (code === 'U10' && n === 'N0') {
      return { ok: false, reason: '"守护"必须有具体守护对象' };
    }
    // U6 逃亡 + 强组织立场矛盾
    if (code === 'U6') {
      if (d === 'D1') return { ok: false, reason: '"逃亡"与"帝国忠诚者"立场矛盾' };
      if (d && stanceTag(d) === 'iq') return { ok: false, reason: '"逃亡"与审判庭立场矛盾' };
      if (d && stanceTag(d) === 'mech') return { ok: false, reason: '"逃亡"与机械神教立场矛盾' };
    }
    // U12 漂泊禁组织化职业 + C5/C7
    if (code === 'U12') {
      if (ORG_PROFESSIONS_FOR_U12.includes(e)) return { ok: false, reason: '组织化职业不可能漂泊' };
      if (c === 'C5') return { ok: false, reason: '领航者公会束缚不允许漂泊' };
      if (c === 'C7') return { ok: false, reason: 'C7 培育人是火星财产' };
    }
    // U14 猎艳禁修女会/阿斯塔特
    if (code === 'U14') {
      if (SISTER_PROFESSIONS.includes(e)) return { ok: false, reason: '修女会公开纯洁誓言' };
      if (ASTARTES.includes(e)) return { ok: false, reason: '阿斯塔特生理改造禁绝情欲' };
    }
  }

  // ============ N 羁绊(反向逻辑矛盾检查) ============
  if (field === 'N') {
    if (u === 'U2' && code === 'N1') {
      return { ok: false, reason: '"寻亲"与"家人仍在"逻辑矛盾' };
    }
    if (u === 'U10' && code === 'N0') {
      return { ok: false, reason: '"守护"必须有具体守护对象' };
    }
  }

  return { ok: true };
}

function buildPayload() {
  const codes = PANEL_ORDER.map((field) => state[field]).join(' ');
  const lines = [codes];

  if (state.B === 'B1' && state.NAME.trim()) {
    lines.push(`名字：${state.NAME.trim()}`);
  }
  if (state.H === 'H25' && (state.H_CUSTOM || '').trim()) {
    lines.push(`自定义出身：${state.H_CUSTOM.trim()}`);
  }
  if (state.S === 'S23' && (state.S_CUSTOM || '').trim()) {
    lines.push(`自定义开场地点：${state.S_CUSTOM.trim()}`);
  }
  if ((state.EXTRA || '').trim()) {
    lines.push('');
    lines.push('============================');
    lines.push('[玩家额外补充]');
    lines.push(state.EXTRA.trim());
  }

  return lines.join('\n');
}

function buildSummaryRows() {
  return [
    ['名字', state.B === 'B1' ? `B1 · ${state.NAME.trim() || '（未填写）'}` : 'B0 · 默认（{{user}}）'],
    ['血统', `${state.C} · ${getOptionLabel('C', state.C)}`],
    ['年龄', `${state.F} · ${getOptionLabel('F', state.F)}`],
    ['性别', `${state.G} · ${getOptionLabel('G', state.G)}`],
    ['长相', `${state.I} · ${getOptionLabel('I', state.I)}`],
    ['身体状态', `${state.Q} · ${getOptionLabel('Q', state.Q)}`],
    ['星界', `${state.A} · ${getOptionLabel('A', state.A)}`],
    ['背景', state.H === 'H25'
      ? `H25 · ${(state.H_CUSTOM || '').trim() || '（自定义未填写）'}`
      : `${state.H} · ${getOptionLabel('H', state.H)}`],
    ['开场地点', state.S === 'S23'
      ? `S23 · ${(state.S_CUSTOM || '').trim() || '（自定义未填写）'}`
      : `${state.S} · ${getOptionLabel('S', state.S)}`],
    ['阵营', `${state.D} · ${getOptionLabel('D', state.D)}`],
    ['职业', `${state.E} · ${getOptionLabel('E', state.E)}`],
    ['目标', `${state.U} · ${getOptionLabel('U', state.U)}`],
    ['资源', `${state.K} · ${getOptionLabel('K', state.K)}`],
    ['秘密', `${state.L} · ${getOptionLabel('L', state.L)}`],
    ['羁绊', `${state.N} · ${getOptionLabel('N', state.N)}`],
    ['主线', `${state.J} · ${getOptionLabel('J', state.J)}`],
    ['节奏', `${state.V} · ${getOptionLabel('V', state.V)}`],
  ];
}

function getWarnings() {
  const warnings = [];
  const ASTARTES = ['E21', 'E22', 'E23', 'E24'];

  // ============ 自定义文本字段必填提示 ============
  if (state.B === 'B1' && !state.NAME.trim()) {
    warnings.push('你选择了自定义名字，但还没有填写名字。');
  }
  if (state.H === 'H25' && !(state.H_CUSTOM || '').trim()) {
    warnings.push('已选自定义出身，但未填写描述；建议填写一两句具体出身。');
  }
  if (state.S === 'S23' && !(state.S_CUSTOM || '').trim()) {
    warnings.push('已选自定义开场地点，但未填写描述；建议填写一两句具体场景。');
  }

  // ============ A20 奥利赛V 软警告 ============
  // A20 不硬禁(允许领航者及被雇佣者),但提示非领航者血脉的身份
  if (state.A === 'A20' && state.C !== 'C5') {
    warnings.push('A20 奥利赛V 是导航者空间站；非领航者血脉者通常以雇员或访客身份在此。');
  }

  // ============ 阿斯塔特软警告 ============
  if (ASTARTES.includes(state.E)) {
    if (state.F === 'F1') {
      warnings.push('阿斯塔特至少需数十年训练，"青年"暗示刚晋升或被破格。');
    }
    if (state.F === 'F4') {
      warnings.push('"年长"阿斯塔特通常是百年老兵，威望与负担都极重。');
    }
    if (['H4', 'H5'].includes(state.H)) {
      warnings.push('阿斯塔特来自孤儿/底层选拔，贵族或文官子弟极罕见。');
    }
    if (HEAVY_AUG.includes(state.Q)) {
      warnings.push('阿斯塔特用基因改造而非义体，重度义体通常仅限战伤后补救。');
    }
    if (state.Q === 'Q4') {
      warnings.push('阿斯塔特再生力强，长期"战伤"通常是无法再生的损伤。');
    }
  }

  // ============ E13 贵族家族护卫 软警告 ============
  if (state.E === 'E13' && ['H7','H10','H11','H17','H21','H23'].includes(state.H)) {
    warnings.push('贵族家族护卫一般出身军队世家或上层附庸，底层提拔较罕见。');
  }

  // ============ E14 行商浪人继承人 软警告(不过严,只提示) ============
  if (state.E === 'E14' && ['H1','H6','H7','H10','H11','H14','H22','H23'].includes(state.H)) {
    warnings.push('行商浪人继承人通常出身行商家族或虚空船员家系，AI 会做相应改写。');
  }

  // ============ E20 性工作者 软警告 ============
  if (state.E === 'E20' && ['H4','H12','H14','H18'].includes(state.H)) {
    warnings.push('当前出身与性工作者职业反差大，AI 会以堕落或被迫为剧情切入。');
  }

  // ============ E30 未登记灵能者 软警告 ============
  if (state.E === 'E30' && state.D === 'D1') {
    warnings.push('未登记灵能者从帝国法律意义上是逃犯，与"忠诚者"立场存在张力。');
  }

  // ============ U 动机软警告 ============
  if (state.U === 'U9' && ['E19', 'E43'].includes(state.E)) {
    warnings.push('"野心"对底层职业门槛高，但不是不可能(陈胜吴广式)。');
  }
  if (state.U === 'U13' && ASTARTES.includes(state.E)) {
    warnings.push('阿斯塔特属于战团组织，"安分过日子"与战团使命冲突。');
  }

  // ============ Q10 隐改 软警告 ============
  if (state.Q === 'Q10' && state.D === 'D1') {
    warnings.push('真正的"帝国忠诚者"不会有非授权改造；可能是不知情或被植入。');
  }

  // ============ 舰船相关软警告(已被 isOptionAllowed 硬禁,但兼容旧草稿) ============
  if (state.K === 'K11' && !['E2', 'E14', 'E16', 'E40', 'E41', 'E42'].includes(state.E)) {
    warnings.push('当前职业通常不会自有舰船，AI 会改写为打捞、缴获或暂借。');
  }
  if (state.K === 'K12' && ['E7', 'E19', 'E37', 'E38', 'E43'].includes(state.E)) {
    warnings.push('当前职业不太可能借调舰船，AI 会改写为搭乘、偷渡或被押运。');
  }
  if (state.K === 'K13' && !['E3', 'E14', 'E21', 'E22', 'E23', 'E24', 'E25', 'E26', 'E28', 'E32', 'E33'].includes(state.E)) {
    warnings.push('当前职业通常不在大型舰船上服役，AI 会改写为乘客或临时雇员。');
  }

  return warnings;
}

function canProceedFromPage(page) {
  const fields = PAGE_FIELDS[page] || [];
  if (fields.includes('B') && state.B === 'B1' && !state.NAME.trim()) {
    return { ok: false, message: '请先填写自定义名字,或改回默认名字。' };
  }
  if (fields.includes('H') && state.H === 'H25' && !(state.H_CUSTOM || '').trim()) {
    return { ok: false, message: '请填写自定义出身的具体描述,或改选标准出身。' };
  }
  if (fields.includes('S') && state.S === 'S23' && !(state.S_CUSTOM || '').trim()) {
    return { ok: false, message: '请填写自定义开场地点,或改选标准地点。' };
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
      // 旧版本兼容: 移除弃用随机项与弃用编号
      if (state.A === 'A0') state.A = 'A1';
      if (state.C === 'C0' || state.C === 'C2') state.C = 'C1';
      if (state.D === 'D0') state.D = 'D1';
      if (state.E === 'E0') state.E = 'E1';
      if (state.F === 'F0') state.F = 'F1';
      if (state.G === 'G0') state.G = 'G1';
      if (state.H === 'H0') state.H = 'H1';
      if (state.I === 'I0') state.I = 'I3';
      if (state.J === 'J0') state.J = 'J1';
      if (state.K === 'K0') state.K = 'K1';
      // 新字段兜底(旧草稿不含 Q/S/U/V 时的初始值)
      if (!state.Q) state.Q = 'Q1';
      if (!state.S || state.S === 'S0') state.S = 'S1';   // S0 已弃用
      if (!state.U) state.U = 'U12';                       // 默认漂泊
      if (!state.V) state.V = 'V2';
      // 旧 S17 自定义编号迁移到 S23
      if (state.S === 'S17' && state.S_CUSTOM) state.S = 'S23';
      if (typeof state.H_CUSTOM !== 'string') state.H_CUSTOM = '';
      if (typeof state.S_CUSTOM !== 'string') state.S_CUSTOM = '';
      if (typeof state.EXTRA !== 'string') state.EXTRA = '';
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
  if (launcher) launcher.textContent = '[✕ 关闭终端]';
  // Lock body scroll so the modal truly feels full-screen
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
}

// === injectChatStyles 已移除 ===
// 之前注入了 #send_textarea 的全局绿色样式以及 .mes[is_user] 的用户消息样式
// 现在改为通过 SillyTavern 世界书或 Author's Note 注入对话框样式,扩展不再污染全局
function injectChatStyles() {
  // no-op: 保留函数以避免调用方崩溃,但什么都不注入
  return;
}

function makeLauncher() {
  if (launcher) launcher.remove();
  launcher = document.createElement('button');
  launcher.id = 'wh40k-builder-launcher';
  launcher.type = 'button';
  launcher.textContent = '[⚔ 角色创建器]';
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
          <div class="wh40k-builder-title">帝国公民登记终端 · #40K-PLUS</div>
          <div class="wh40k-builder-subtitle">帝国内务部 / 公民登记-v5.3.0</div>
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

  // 起始页:仅显示 "等候输入" 文字,不显示进度
  if (currentPage === 0) {
    el.innerHTML = `<div class="wh40k-progress-label">// 等 候 输 入 //</div>`;
    return;
  }

  // 最终页:显示 "档案就绪 / 提交"
  if (currentPage === FINAL_PAGE) {
    el.innerHTML = `<div class="wh40k-progress-label" style="color:#7ae07a;">// 档 案 就 绪 / 待 提 交 //</div>`;
    return;
  }

  // 字段节(1-6):左侧"第 X / 6 节 · 标题",右侧 6 个圆点
  const sectionIndex = currentPage; // 1..6
  const total = TOTAL_PAGES - 2; // 6 节(去掉 splash + final)

  const left = document.createElement('div');
  left.className = 'wh40k-progress-label';
  // J 栏(命运牵连)用血红色提示;新结构下 J 在第 6 页
  const isJSection = currentPage === 6;
  const labelColor = isJSection ? '#c92030' : '#ffb84d';
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
    if (i === 6) dot.classList.add('anomaly'); // J 栏特殊圆点(第 6 页)
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
  if (field === 'J') btn.classList.add('anomaly'); // J 栏特殊血红样式
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
    // 禁用且未选中 → 拒绝选,告知原因
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
  if (field === 'J') wrap.classList.add('anomaly'); // J 栏整体异常样式

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
      renderFooterWarnings();
    });
    wrap.appendChild(nameBox);
  }

  if (field === 'H') {
    const customBox = document.createElement('div');
    customBox.className = `wh40k-name-box${state.H === 'H25' ? ' show' : ''}`;
    customBox.innerHTML = `
      <label>
        <span>自定义出身（请描述背景细节）</span>
        <textarea placeholder="例如：出生于某次大叛乱后的难民营,父母在亚空间风暴中失踪,被一名退役星界军老兵收养..." rows="3" style="width:100%;background:#0a0a0a;color:#e8e8ea;border:1px solid #5e4a28;padding:8px;font-family:inherit;font-size:13px;line-height:1.5;resize:vertical;box-sizing:border-box;">${escapeHtml(state.H_CUSTOM || '')}</textarea>
      </label>
    `;
    const textarea = customBox.querySelector('textarea');
    textarea.addEventListener('input', (e) => {
      state.H_CUSTOM = e.target.value;
      saveDraftState();
      renderFooterWarnings();
    });
    wrap.appendChild(customBox);
  }

  if (field === 'S') {
    const customBox = document.createElement('div');
    customBox.className = `wh40k-name-box${state.S === 'S23' ? ' show' : ''}`;
    customBox.innerHTML = `
      <label>
        <span>自定义开场地点</span>
        <input type="text" placeholder="例如：奥菲利亚七号·万花宫地下医院 B3 区" value="${escapeHtml(state.S_CUSTOM || '')}" />
      </label>
    `;
    const input = customBox.querySelector('input');
    input.addEventListener('input', (e) => {
      state.S_CUSTOM = e.target.value;
      saveDraftState();
      renderFooterWarnings();
    });
    wrap.appendChild(customBox);
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
      <div class="wh40k-splash-text">此终端不会即时提交。您将依次完成 6 节登记表,每节包含若干字段;填写期间,字段可随时修改或重置。全部完成后,在最终页一次性提交档案。</div>
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
  PAGE_FIELDS[currentPage].forEach((field) => grid.appendChild(makeFieldSection(field)));
  content.appendChild(grid);

  // 第 6 页(命运牵连/J 栏)在 J 字段之后追加全局"额外补充"文本框
  if (currentPage === 6) {
    const extraBox = document.createElement('section');
    extraBox.className = 'wh40k-section';
    extraBox.innerHTML = `
      <h3>※ 额外补充（可选）</h3>
      <div style="color:#a8a89e;font-size:13px;line-height:1.6;margin-bottom:8px;">
        想加任何自由发挥的设定都可以写在这里——人物癖好、特殊背景、关键剧情提示、想锚定的 NPC 关系、想跳过的开场内容…… AI 会读取并整合到开场叙事中。
      </div>
      <textarea placeholder="例如:&#10;- 我有畏高症,在高处会发抖&#10;- 我过去三个月一直梦见同一个金色巨人&#10;- 我希望开场已经认识卡桑德拉博学者,她是我的旧导师&#10;- 我会下意识用某种我不认识的语言说梦话" rows="5" style="width:100%;background:#0a0a0a;color:#e8e8ea;border:1px solid #5e4a28;padding:10px;font-family:inherit;font-size:13px;line-height:1.6;resize:vertical;box-sizing:border-box;">${escapeHtml(state.EXTRA || '')}</textarea>
    `;
    const textarea = extraBox.querySelector('textarea');
    textarea.addEventListener('input', (e) => {
      state.EXTRA = e.target.value;
      saveDraftState();
    });
    content.appendChild(extraBox);
  }

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
