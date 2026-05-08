const EXT_ID = 'wh40k-character-builder';
const TARGET_CHARACTER_NAME = '';
const AUTO_OPEN_FOR_EMPTY_CHAT = true;
const AUTO_SEND_AFTER_FILL = true;

const PANEL_ORDER = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'N', 'P', 'Q', 'S', 'U', 'V', 'J'];
const PAGE_FIELDS = [
  [],
  ['B', 'C', 'F', 'G', 'I', 'Q'],
  ['A', 'H'],
  ['D', 'E'],
  ['K', 'L', 'N', 'P'],
  ['S', 'U', 'V'],
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
  P: 'P. 命运将至的人',
  Q: 'Q. 身体状态',
  S: 'S. 开场地点',
  U: 'U. 目标动机',
  V: 'V. 叙事节奏偏好',
};

const PAGE_TITLES = {
  0: '初始化',
  1: '基础信息',
  2: '出身来历',
  3: '身份立场',
  4: '初始情况',
  5: '角色驱动',
  6: '命运牵连',
  7: '最终提交',
};

const PAGE_DESCRIPTIONS = {
  0: '点击下方按钮接入终端，开始您的公民登记。您将依次完成 6 节登记表。',
  1: '// 第一节 — 您的姓名、血统、年龄、性别、外貌与身体状态。',
  2: '// 第二节 — 您的出生星界与身世背景。可在 H25 处自定义出身。',
  3: '// 第三节 — 您当前的阵营立场与职业。',
  4: '// 第四节 — 您当前持有的资源、秘密、羁绊，以及一位命运将至的人。',
  5: '// 第五节 — 您的开场地点、目标动机与叙事节奏偏好。',
  6: '// ??_???? / [NON_STANDARD_FIELD] — 来源未知的字段；另可在底部自由补充。',
  7: '// 复核全部档案，提交至大行政官案头。',
};

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
  J: '※ NON_STANDARD_FIELD — 来源未知，请谨慎填写。 ※',
  K: '声明您当前持有的资源与起始状态。',
  L: '坦白您的初始秘密或潜伏命运。',
  N: '登记您当前的核心羁绊。',
  P: '指定一位“命运将至的人”。此人不会在开局立刻登场，而是会在剧情发展中合理引入。',
  Q: '声明您当前的身体状况。包括隐性创伤、改造痕迹与未愈合的旧伤。',
  S: '指定您的开场地点。从具体场景中选择一个，或在 S23 处自行描述。',
  U: '声明您的核心动机。它将驱动您的中长期决策与剧情选择。',
  V: '声明您偏好的叙事节奏。本字段不影响世界规则，仅作风格调音。',
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
    ['A23', '瀛洲-21（卡利亚星区外围-翡翠龙战团母星·东亚隐修封建社会）'],
  ],
  B: [['B0', '默认（{{user}}）'], ['B1', '自定义名字']],
  C: [['C1', '正常人类'], ['C3', '虚空之子'], ['C4', '不可接触者'], ['C5', '领航者'], ['C6', '猫人'], ['C7', '机械神教培育人']],
  D: [
    ['D1', '人类帝国忠诚者'], ['D2', '边缘独立者 / 灰色地带'], ['D3', '潜在混沌信徒'], ['D4', '秘密的异形同情者'],
    ['D5', '审判庭-纯洁派'], ['D6', '审判庭-激进派'], ['D7', '审判庭-占视者派'], ['D8', '审判庭-妄尊异形派'],
    ['D9', '机械神教-火星正统派'], ['D10', '机械神教-探索者派'], ['D11', '机械神教-异形博学派'], ['D12', '机械神教-莫伊雷分裂派'], ['D13', '机械神教-考尔派'],
  ],
  E: [
    ['E1', '帝国卫队士兵'], ['E2', '帝国商船船长'], ['E3', '帝国海军军官'], ['E4', '法务部预备员'], ['E5', '医护员'], ['E6', '行政书吏'],
    ['E7', '铸造厂劳工'], ['E8', '星区学院学者'], ['E9', '帝国教会牧师'], ['E10', '修女会成员'], ['E11', '蔷薇修女会侍从'],
    ['E12', '帝国贵族'], ['E13', '贵族家族护卫'], ['E14', '行商浪人继承人'], ['E15', '虚空掮客'], ['E16', '虚空打捞者'],
    ['E17', '赏金猎人'], ['E18', '流浪骑士（侍从级机甲）'], ['E19', '无业流民'], ['E20', '性工作者'],
    ['E21', '死亡守望修士'], ['E22', '沉海誓约侦察兵'], ['E23', '翡翠龙战团修士'], ['E24', '初创子团修士'],
    ['E25', '审判庭侍从'], ['E26', '审判庭神秘学者'], ['E27', '审判庭调查员'], ['E28', '审判官助理'], ['E29', '审判庭刺客契约人'], ['E30', '受批准灵能者'], ['E31', '星语者'], ['E32', '未登记灵能者'],
    ['E33', '机械神教初级神甫'], ['E34', '机械神教探索队正式成员'], ['E35', '护教军游侠'], ['E36', '遗传学探索者'], ['E37', '高阶考古学僧'], ['E38', '技术监工'],
    ['E39', '巢都帮派成员'], ['E40', '锯齿小子初级成员'], ['E41', '黑市情报贩子'], ['E42', '走私者'], ['E43', '冷交易走私人'], ['E44', '黑工坊学徒'], ['E45', '变体收容者'],
  ],
  F: [['F1', '青年'], ['F2', '壮年'], ['F3', '中年'], ['F4', '年长']],
  G: [['G1', '男'], ['G2', '女'], ['G3', '模糊/不明']],
  H: [
    ['H1', '正常家庭'], ['H2', '军队世家'], ['H3', '修道院孤儿'], ['H4', '上层家族'], ['H5', '文官出身'], ['H6', '新移民'],
    ['H7', '巢都工人家庭'], ['H8', '农村家庭'], ['H9', '没落家族'], ['H10', '黑帮遗孤'], ['H11', '巢都贫民'],
    ['H12', '铸造圣堂学徒'], ['H13', '穿越者'], ['H14', '铸造世界工役奴仆'], ['H15', '教会附属孤儿院出身'], ['H16', '虚空船员家系'],
    ['H17', '边境殖民者家庭'], ['H18', '法务部家庭出身'], ['H19', '失势贵族旁支'], ['H20', '身世不明养子'], ['H21', '走私圈出身'],
    ['H22', '档案机构出身'], ['H23', '边缘废土聚落'], ['H24', '流亡者后裔'], ['H25', '自定义出身（手动输入）'],
  ],
  I: [['I1', '丑陋至极，难以形容'], ['I2', '高大健壮，相貌普通'], ['I3', '普通身材，普通外貌'], ['I4', '身材优美，人见人爱']],
  K: [
    ['K1', '身无长物'], ['K2', '基本温饱'], ['K3', '小有积蓄'], ['K4', '有稳定住处'], ['K5', '持有一件珍贵遗物'], ['K6', '背负债务'],
    ['K7', '拥有一处隐秘安全屋'], ['K8', '有一名可调用的低阶随从'], ['K9', '持有一条危险情报'], ['K10', '拥有一件受限装备'],
    ['K11', '自有小船（一艘属于你的小型船：贸易船、打捞船或走私船）'], ['K12', '借调舰船（暂时使用上级、家族或雇主的一艘船）'], ['K13', '在大舰服役（你常驻于一艘大型舰船，但船不属于你）'],
  ],
  L: [
    ['L0', '无'], ['L1', '你持有伪造身份'], ['L2', '你忘记了一段关键记忆'], ['L3', '某个组织正在暗中标记你'], ['L4', '你曾见过不该见之物'],
    ['L5', '你身上藏有来历不明的小圣物'], ['L6', '你欠下了一桩未了的血债或旧案'], ['L7', '你是某项预言、占卜或推演中的变量'], ['L8', '某位高位者曾秘密接触过你'],
    ['L9', '你体内潜伏着一种尚未显现的异常'], ['L10', '你的档案中存在一页被焚毁的记录'], ['L11', '你持有一枚无法读取的古老数据板'], ['L12', '你梦见过一艘不应存在的金色巨舰'],
    ['L13', '你有一件传承下来的古老武器'], ['L14', '你偶尔能感知到非人类的低语'], ['L15', '你发现了一个珍贵的异形遗物'], ['L16', '你曾被审判庭短暂拘押，经历了痛苦的审讯'],
    ['L17', '你曾参与过一次不该留下记录的清洗'], ['L18', '你曾被迫出卖自己肉体以换取生路'], ['L19', '你曾使用未授权标准建造模板片段'], ['L20', '你已被欧姆巴佩11号站秘密建档'],
    ['L21', '你加入过一个半异端学术协会'], ['L22', '你正在隐瞒一次未授权肉体改造'], ['L23', '你持有一份未提交火星的技术档案'], ['L24', '你被怀疑处于技术弊病第二阶'], ['L25', '你掌握一条通向第三阶路径的禁忌线索'],
  ],
  N: [
    ['N0', '无'], ['N1', '家人仍在'], ['N2', '有一位旧战友'], ['N3', '有一位神职引路人'], ['N4', '有一位债主 / 压迫者'], ['N5', '有一位黑市联系人'],
    ['N6', '有一位正在监视你的上级'], ['N7', '有一位失踪的重要之人'], ['N8', '有一位机械神教联系人'], ['N9', '有一位审判庭线人'], ['N10', '有一位曾救过你的人'],
    ['N11', '有一位行商浪人保护人'], ['N12', '有一位法务部旧识'], ['N13', '有一位行政部档案员朋友'], ['N14', '有一位海军军官联系人'], ['N15', '有一位异形或异端联系人'],
    ['N16', '有一位长期跟随你的男性机仆'], ['N17', '有一位长期跟随你的女性机仆'], ['N18', '有一位蔷薇修女会的旧识'], ['N19', '有一位普通修女会的庇护者'],
    ['N20', '有一位帝国骑士家族的熟人'], ['N21', '有一位商船上的可靠副手'], ['N22', '有一位底巢帮派中的内应'], ['N24', '有一位半异端协会导师庇护你'],
  ],
  Q: [
    ['Q1', '健康（身体无明显问题，行动自如）'], ['Q2', '旧伤（身上有未完全愈合的伤，剧烈动作时会牵动疼痛）'], ['Q3', '慢病（长期疾病缠身，靠药维持，体力低于常人）'],
    ['Q4', '战伤（神经迟钝、步态异常或部分听力视力丧失）'], ['Q5', '药瘾（长期依赖镇痛剂、战地激素或廉价兴奋剂）'], ['Q6', '轻改（义眼或义肢，已被机械教祝圣，外观可见）'],
    ['Q7', '中改（多部位机械替换，机械结构占身体三分之一）'], ['Q8', '重改（身体大部分已机械化，机械神教高阶常态）'], ['Q9', '心创（战争创伤后遗症，特定刺激下会失控或解离）'], ['Q10', '隐改（身上藏着不能被发现的非人改造或异常基因）'],
  ],
  S: [
    ['S1', '巢都街头（人挤人的下层街道，烟尘弥漫，叫卖声盖过祷词）'], ['S2', '廉价旅店（隔板薄、邻居不熟，随时有人敲门）'], ['S3', '圣堂内（香雾、圣像、低声诵念的祷词）'],
    ['S4', '工坊车间（机器轰鸣、油污遍地，机仆来回搬运）'], ['S5', '行政办公（长队、盖章、灰尘满架，办事员从不抬头）'], ['S6', '黑市（隐蔽摊位，异形零件与禁忌商品在桌底交易）'],
    ['S7', '军营（铺位、操练声、长官点名）'], ['S8', '舰内（引擎低吼，警报偶尔闪烁，金属壁回响）'], ['S9', '星港码头（起重机、检疫门、异乡口音、货柜封条）'],
    ['S10', '边境聚落（风沙、单一作物田、远处机器收割声）'], ['S11', '矿井（升降笼、粉尘肺，工伤不被记录）'], ['S12', '贵族宅邸（大理石、画像注视、低声谈判）'],
    ['S13', '修道院（走廊回声、祷告声，压抑的洁净）'], ['S14', '拘留所（铁栏、滴水声、隔壁牢房的咳嗽）'], ['S15', '焚毁现场（焦土、残骸，尚未冷透的金属）'],
    ['S16', '异形遗迹（不可能的几何、低频共鸣，风从不该的方向吹来）'], ['S17', '小酒馆（烟雾弥漫，劣质 amasec 与邻桌的密谋）'], ['S18', '医院（漂白水气味，修女低声诵经，走廊上的呻吟）'],
    ['S19', '朝圣路（长队风尘仆仆，有人哭有人唱）'], ['S20', '角斗场（血腥沙地，上千狂热者的呼喝）'], ['S21', '档案馆（纸尘、霉味，堆到天花板的禁书与卷宗）'],
    ['S22', '神甫居所（红蜡封条、机魂祷词、二进制爆鸣）'], ['S23', '自定义场景（手动输入）'],
  ],
  U: [
    ['U1', '复仇（某段旧账无法翻篇，你活着就是为了那笔账）'], ['U2', '寻亲（失散的至亲下落不明，你不停打听不停找）'], ['U3', '求知（你被禁忌知识吸引，明知有代价仍要触碰）'],
    ['U4', '财富（你想要更多信用点、更高地位、更厚的安全垫）'], ['U5', '使命（你为信仰、誓言或召唤而活，自身得失不重要）'], ['U6', '逃亡（有什么在追你，你只能不停跑）'],
    ['U7', '救赎（你曾犯下错事，余生都在试图弥补）'], ['U8', '身份（你的过去被剥夺或抹除了，你想找回真我）'], ['U9', '野心（你看到了向上爬的路，无论代价）'],
    ['U10', '守护（你为某个具体的人或物而活）'], ['U11', '解咒（某种宿命压在你身上，你想摆脱）'], ['U12', '漂泊（你没有目标，活着、走着、看看）'],
    ['U13', '安分（你不要大目标，只想过好每一天，不愿被卷入风暴）'], ['U14', '猎艳（你追逐征服与情欲，每段关系都是新挑战）'],
  ],
  V: [
    ['V1', '慢热（细致环境与心理铺垫，不急着推进剧情）'], ['V2', '平衡（剧情推进与日常细节并重）'], ['V3', '紧凑（事件密集，转折频繁，少铺垫）'],
    ['V4', '日常（享受帝国压抑感的琐碎与窒息细节）'], ['V5', '主线（专注推进主线剧情，少 filler）'], ['V6', '自主（AI 等你主动行动，不催进度）'],
  ],
  P: [
    ['P0', '无（没有特定的命运对象，剧情自由展开）'], ['P1', '赤红净化博学者'], ['P2', '赏金枪手'], ['P3', '流亡叛博学者'], ['P4', '骑士机甲驾驶员'], ['P5', '见习修女'],
    ['P6', '贵族怪盗'], ['P7', '星界军老兵'], ['P8', '黑暗灵族战巫'], ['P9', '导航学徒'], ['P10', '克鲁特猎手'], ['P11', '人类灵族混血海盗'],
    ['P12', '审判庭外勤助理'], ['P13', '机械神教技术神甫'], ['P14', '莱特林狙击手'], ['P15', '伪装贵族妓院主理'], ['P16', '北欧风走私头目'], ['P17', '待命女仆长'],
    ['P18', '流亡星图师'], ['P19', '黑暗灵族娼妓'], ['P20', '失明朝圣者'], ['P21', '雇佣枪手'], ['P22', '颓废女学者'], ['P23', '蔷薇修女'],
    ['P24', '失散的见习修女'], ['P25', 'Casu 女神分身'], ['P26', '钛族水氏族以太'], ['P27', '伊克沙尼亚贵族继承人'], ['P28', '马里格里斯之女'], ['P29', '翡翠龙散修'],
    ['P30', '叛逃海军军官'], ['P31', '异端机械神甫学徒'], ['P32', '自定义（玩家手动输入命运角色描述）'],
  ],
  J: [
    ['J1', '无主线（纯自由剧情）'], ['J2', '单主线·绯雾之下'], ['J3', '单主线·帝皇幻梦'], ['J4', '单主线·太平潮涌'], ['J5', '单主线·圣机之蚀'],
    ['J6', '双主线·绯雾之下 + 帝皇幻梦'], ['J7', '双主线·绯雾之下 + 太平潮涌'], ['J8', '双主线·绯雾之下 + 圣机之蚀'], ['J9', '双主线·帝皇幻梦 + 太平潮涌'],
    ['J10', '双主线·帝皇幻梦 + 圣机之蚀'], ['J11', '双主线·太平潮涌 + 圣机之蚀'], ['J12', '三主线·绯雾之下 + 帝皇幻梦 + 太平潮涌'],
    ['J13', '三主线·绯雾之下 + 帝皇幻梦 + 圣机之蚀'], ['J14', '三主线·绯雾之下 + 太平潮涌 + 圣机之蚀'], ['J15', '三主线·帝皇幻梦 + 太平潮涌 + 圣机之蚀'],
    ['J16', '四主线·绯雾之下 + 帝皇幻梦 + 太平潮涌 + 圣机之蚀'],
  ],
};

const DEFAULT_STATE = {
  A: 'A1', B: 'B0', C: 'C1', D: 'D1', E: 'E1', F: 'F1', G: 'G1', H: 'H1', I: 'I3', K: 'K1', L: 'L0', N: 'N0', P: 'P0', Q: 'Q1', S: 'S1', U: 'U12', V: 'V2', J: 'J1',
  NAME: '', H_CUSTOM: '', S_CUSTOM: '', P_CUSTOM: '', EXTRA: '',
};

let state = { ...DEFAULT_STATE };
let currentPage = 0;
let overlay = null;
let launcher = null;
let initialized = false;

const ASTARTES = ['E21', 'E22', 'E23', 'E24'];
const IQ_PROFESSIONS = ['E25', 'E26', 'E27', 'E28', 'E29', 'E30', 'E31'];
const MECH_PROFESSIONS = ['E33', 'E34', 'E35', 'E36', 'E37', 'E38'];
const PSYKER_PROFESSIONS = ['E30', 'E31', 'E32'];
const SISTER_PROFESSIONS = ['E10', 'E11'];
const SISTER_RACES = ['C1', 'C3', 'C4', 'C6'];
const NAVIGATOR_OK_BG = ['H4', 'H16', 'H19', 'H20'];
const NOBLE_OK_BG = ['H2', 'H4', 'H5', 'H9', 'H18', 'H19', 'H22'];
const KNIGHT_OK_BG = ['H4', 'H9', 'H19', 'H20'];
const ASTARTES_FORBIDDEN_BG = ['H12', 'H14'];
const HEAVY_AUG = ['Q6', 'Q7', 'Q8'];
const MEDIUM_HEAVY_AUG = ['Q7', 'Q8'];
const SELF_OWNED_SHIP_OK = ['E2', 'E14', 'E16', 'E27', 'E28', 'E29', 'E42', 'E43'];
const NO_BORROWED_SHIP = ['E7', 'E19', 'E39', 'E40', 'E44'];
const ASSIGNED_TO_SHIP_OK = ['E3', 'E14', 'E21', 'E22', 'E23', 'E24', 'E25', 'E26', 'E27', 'E28', 'E31', 'E34', 'E35'];
const ORG_PROFESSIONS_FOR_U12 = ['E10', 'E11', 'E21', 'E22', 'E23', 'E24', 'E25', 'E26', 'E27', 'E28', 'E29', 'E30', 'E31', 'E33', 'E34', 'E35', 'E36', 'E37', 'E38'];

const ALLOWED_S_BY_PROFESSION = {
  E1:['S1','S2','S7','S15','S17','S18'], E2:['S5','S8','S9','S17'], E3:['S7','S8','S9'], E4:['S5','S14','S17'], E5:['S15','S18'], E6:['S5','S21'], E7:['S2','S4','S11'], E8:['S5','S21'], E9:['S3','S13','S19'], E10:['S3','S13','S18','S19'], E11:['S3','S12','S13','S18'], E12:['S5','S9','S12','S17'], E13:['S7','S9','S12'], E14:['S5','S8','S9','S12','S17'], E15:['S2','S6','S9','S17'], E16:['S5','S8','S9','S15'], E17:['S1','S2','S6','S14','S17'], E18:['S10','S12','S15'], E19:['S1','S2','S14','S15','S19'], E20:['S2','S12','S17'],
  E21:['S3','S7','S8','S9','S15','S16','S22'], E22:['S6','S7','S8','S9','S15','S16','S22'], E23:['S7','S8','S9','S10','S13','S15','S16'], E24:['S7','S8','S9','S15','S16'], E25:['S5','S8','S14','S21'], E26:['S5','S8','S16','S21'], E27:['S2','S5','S6','S8','S14','S17'], E28:['S5','S8','S14','S16','S21'], E29:['S1','S2','S8','S14','S17'], E30:['S3','S8','S13'], E31:['S5','S8','S13'], E32:['S1','S2','S6','S14','S19'], E33:['S4','S22'], E34:['S4','S8','S15','S16','S22'], E35:['S4','S15','S22'], E36:['S4','S18','S22'], E37:['S4','S16','S21','S22'], E38:['S4','S22'], E39:['S1','S2','S6','S14','S17'], E40:['S1','S2','S6','S17'], E41:['S1','S6','S9','S17'], E42:['S5','S6','S8','S9'], E43:['S6','S8','S9','S16'], E44:['S2','S4','S6','S11','S17'], E45:['S1','S2','S6','S15','S19'],
};

function isRandomCode(code) { return /^[A-Z]0$/.test(code); }
function isMechBackground(code) { return ['H12', 'H14'].includes(code); }
function isMechSecret(code) { const m = /^L(\d+)$/.exec(code || ''); return !!m && Number(m[1]) >= 19; }
function professionTag(code) { if (IQ_PROFESSIONS.includes(code)) return 'iq'; if (MECH_PROFESSIONS.includes(code)) return 'mech'; return 'common'; }
function stanceTag(code) { if (['D5','D6','D7','D8'].includes(code)) return 'iq'; if (['D9','D10','D11','D12','D13'].includes(code)) return 'mech'; return 'common'; }
function getOptionLabel(field, code) { return OPTIONS[field]?.find(([k]) => k === code)?.[1] || code || ''; }
function escapeHtml(text = '') { return String(text).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }

function getCtx() {
  if (typeof SillyTavern === 'undefined' || typeof SillyTavern.getContext !== 'function') throw new Error('SillyTavern global not ready');
  return SillyTavern.getContext();
}
function isCtxReady() { try { getCtx(); return true; } catch (_) { return false; } }
function getCharacterName() { const ctx = getCtx(); return ctx.characters?.[ctx.characterId]?.name || ''; }
function shouldEnableForCurrentChat() { if (!isCtxReady()) return false; const ctx = getCtx(); if (ctx.groupId || ctx.characterId == null) return false; return !TARGET_CHARACTER_NAME || getCharacterName().includes(TARGET_CHARACTER_NAME); }
function getMetaKey(key) { return `${EXT_ID}_${key}`; }

function isOptionAllowed(field, code, s = state) {
  if (isRandomCode(code)) return { ok: true };
  const pick = (f) => { const v = s[f]; return v && !isRandomCode(v) ? v : null; };
  const c = pick('C'), d = pick('D'), e = pick('E'), h = pick('H'), g = pick('G'), a = pick('A'), k = pick('K'), n = pick('N'), u = pick('U'), q = pick('Q');
  const eTag = professionTag(field === 'E' ? code : e);
  const dTag = stanceTag(field === 'D' ? code : d);

  if (field === 'C') return { ok: true };

  if (field === 'A') {
    if (code === 'A19' && e && !['E25','E26',...MECH_PROFESSIONS].includes(e)) return { ok:false, reason:'欧姆巴佩11号仅对机械神教与审判庭高层开放' };
    if (code === 'A21' && e !== 'E21') return { ok:false, reason:'哥利亚要塞仅对死亡守望开放' };
  }

  if (field === 'D') {
    if (dTag === 'mech' && c !== 'C7') return { ok:false, reason:'神教立场需 C7' };
    if (dTag !== 'mech' && c === 'C7') return { ok:false, reason:'C7 需机械神教立场' };
    if (dTag === 'iq' && e && professionTag(e) !== 'iq') return { ok:false, reason:'审判庭立场仅可由审判庭体系职业担任' };
    if (dTag !== 'iq' && e && professionTag(e) === 'iq') return { ok:false, reason:'审判庭职业仅配审判庭立场' };
    if (dTag === 'mech' && e && professionTag(e) !== 'mech') return { ok:false, reason:'机械神教立场仅限神教职业' };
    if (dTag !== 'mech' && e && professionTag(e) === 'mech') return { ok:false, reason:'神教职业仅配神教立场' };
    if (e === 'E32' && dTag === 'iq') return { ok:false, reason:'审判庭立场会处决未登记灵能者' };
    if (e === 'E44' && dTag === 'mech') return { ok:false, reason:'黑工坊学徒与正统机械神教立场不可兼容' };
  }

  if (field === 'E') {
    if (eTag === 'mech' && c !== 'C7') return { ok:false, reason:'神教职业需 C7' };
    if (eTag !== 'mech' && c === 'C7') return { ok:false, reason:'C7 需神教职业' };
    if (eTag === 'iq' && d && stanceTag(d) !== 'iq') return { ok:false, reason:'仅限审判庭立场' };
    if (dTag === 'iq' && eTag !== 'iq') return { ok:false, reason:'当前为审判庭立场，仅可选择审判庭体系职业' };
    if (dTag === 'mech' && eTag !== 'mech') return { ok:false, reason:'神教立场仅限神教职业' };
    if (code === 'E32' && dTag === 'iq') return { ok:false, reason:'审判庭立场会处决未登记灵能者' };
    if (code === 'E44' && dTag === 'mech') return { ok:false, reason:'黑工坊学徒与正统机械神教立场不可兼容' };
    if (ASTARTES.includes(code)) { if (g !== 'G1') return { ok:false, reason:'阿斯塔特仅限男性' }; if (c !== 'C1') return { ok:false, reason:'阿斯塔特仅限正常人类' }; if (h === 'H13' || ASTARTES_FORBIDDEN_BG.includes(h)) return { ok:false, reason:'阿斯塔特出身不合法' }; }
    if (code === 'E10') { if (g !== 'G2') return { ok:false, reason:'修女会仅限女性' }; if (!SISTER_RACES.includes(c)) return { ok:false, reason:'当前血统不可成为修女' }; }
    if (code === 'E12' && h !== 'H25' && !NOBLE_OK_BG.includes(h)) return { ok:false, reason:'贵族通常不出身底层' };
    if (code === 'E18' && (c === 'C6' || (h !== 'H25' && !KNIGHT_OK_BG.includes(h)))) return { ok:false, reason:'流浪骑士需贵族传承背景' };
    if (c === 'C6' && ['E18',...ASTARTES,...MECH_PROFESSIONS].includes(code)) return { ok:false, reason:'猫人不可担任' };
    if (c === 'C4' && [...ASTARTES,...MECH_PROFESSIONS,...PSYKER_PROFESSIONS].includes(code)) return { ok:false, reason:'不可接触者不适合' };
    if (c === 'C5' && ['E1','E4','E7','E9','E10','E11',...ASTARTES,...IQ_PROFESSIONS,'E32',...MECH_PROFESSIONS,'E39','E40','E44'].includes(code)) return { ok:false, reason:'领航者不适合' };
  }

  if (field === 'G') { if (ASTARTES.includes(e) && code !== 'G1') return { ok:false, reason:'阿斯塔特仅限男性' }; if (e === 'E10' && code !== 'G2') return { ok:false, reason:'修女会仅限女性' }; }
  if (field === 'H') {
    if (c === 'C7' && !isMechBackground(code)) return { ok:false, reason:'C7 需神教背景' };
    if (c && c !== 'C7' && isMechBackground(code)) return { ok:false, reason:'神教背景需 C7' };
    if (code === 'H13' && ASTARTES.includes(e)) return { ok:false, reason:'阿斯塔特无法是穿越者' };
    if (c === 'C5' && code !== 'H25' && !NAVIGATOR_OK_BG.includes(code)) return { ok:false, reason:'领航者必须出身领航者世系或贵族家族' };
    if (e === 'E12' && code !== 'H25' && !NOBLE_OK_BG.includes(code)) return { ok:false, reason:'贵族通常不出身底层' };
    if (e === 'E18' && code !== 'H25' && !KNIGHT_OK_BG.includes(code)) return { ok:false, reason:'流浪骑士需贵族传承背景' };
    if (code === 'H25' && (c === 'C5' || c === 'C7' || ASTARTES.includes(e))) return { ok:false, reason:'当前路线不允许自定义出身' };
  }
  if (field === 'K') {
    if (code === 'K11' && !SELF_OWNED_SHIP_OK.includes(e)) return { ok:false, reason:'该职业通常不会自有舰船' };
    if (code === 'K12' && NO_BORROWED_SHIP.includes(e)) return { ok:false, reason:'该职业不太可能借调舰船' };
    if (code === 'K13' && !ASSIGNED_TO_SHIP_OK.includes(e)) return { ok:false, reason:'该职业通常不在大型舰船上服役' };
    if (c === 'C5' && ['K1','K6','K11'].includes(code)) return { ok:false, reason:'领航者不可能身无长物/背债/自有小船' };
  }
  if (field === 'L' && isMechSecret(code) && c !== 'C7') return { ok:false, reason:'神教秘密需 C7' };
  if (field === 'Q') {
    if (c === 'C5' && MEDIUM_HEAVY_AUG.includes(code)) return { ok:false, reason:'领航者身体脆弱，无法叠加重度改造' };
    if (c === 'C4' && HEAVY_AUG.includes(code)) return { ok:false, reason:'不可接触者无法被祝圣，机械教不会为其改造' };
    if (SISTER_PROFESSIONS.includes(e) && HEAVY_AUG.includes(code)) return { ok:false, reason:'修女会强调纯洁血肉，不接受义体' };
    if (ASTARTES.includes(e) && ['Q3','Q5'].includes(code)) return { ok:false, reason:'阿斯塔特不应存在慢病或药瘾' };
    if (['E1','E7','E19','E39','E44'].includes(e) && code === 'Q8') return { ok:false, reason:'该职业不可能身体大部分机械化' };
    if (code === 'Q10' && d === 'D5') return { ok:false, reason:'纯洁派不容隐性改造' };
  }
  if (field === 'S') {
    if (code === 'S23') return { ok:true };
    if (a === 'A19' && !['S8','S22','S23'].includes(code)) return { ok:false, reason:'欧姆巴佩11号只允许舰内或神甫居所开场' };
    if (a === 'A21' && !['S3','S8','S22','S23'].includes(code)) return { ok:false, reason:'哥利亚要塞只允许圣堂/舰内/神甫居所开场' };
    if (e && ALLOWED_S_BY_PROFESSION[e] && !ALLOWED_S_BY_PROFESSION[e].includes(code)) return { ok:false, reason:'该开场地点与当前职业不合' };
  }
  if (field === 'U') {
    if (code === 'U2' && n === 'N1') return { ok:false, reason:'“寻亲”与“家人仍在”逻辑矛盾' };
    if (code === 'U10' && n === 'N0') return { ok:false, reason:'“守护”必须有具体守护对象' };
    if (code === 'U6' && (d === 'D1' || stanceTag(d) === 'iq' || stanceTag(d) === 'mech')) return { ok:false, reason:'“逃亡”与当前组织立场矛盾' };
    if (code === 'U12' && (ORG_PROFESSIONS_FOR_U12.includes(e) || c === 'C5' || c === 'C7')) return { ok:false, reason:'组织化身份不适合“漂泊”动机' };
    if (code === 'U14' && (e === 'E10' || ASTARTES.includes(e))) return { ok:false, reason:'当前职业不适合“猎艳”动机' };
  }
  if (field === 'N') { if (code === 'N1' && u === 'U2') return { ok:false, reason:'“家人仍在”与“寻亲”矛盾' }; if (code === 'N0' && u === 'U10') return { ok:false, reason:'“守护”必须有对象' }; }
  return { ok:true };
}

function getWarnings() {
  const warnings = [];
  for (const f of PANEL_ORDER) {
    const check = isOptionAllowed(f, state[f]);
    if (!check.ok) warnings.push(`${f}${state[f]?.replace(/^[A-Z]/,'')}：${check.reason}`);
  }
  if (state.B === 'B1' && !state.NAME.trim()) warnings.unshift('你选择了自定义名字，但还没有填写名字。');
  if (state.H === 'H25' && !state.H_CUSTOM.trim()) warnings.unshift('你选择了自定义出身，但还没有填写内容。');
  if (state.S === 'S23' && !state.S_CUSTOM.trim()) warnings.unshift('你选择了自定义场景，但还没有填写内容。');
  if (state.P === 'P32' && !state.P_CUSTOM.trim()) warnings.unshift('你选择了自定义命运角色，但还没有填写内容。');
  return warnings;
}

function buildPayload() {
  const codes = PANEL_ORDER.map((field) => state[field]).join(' ');
  const extra = [];
  if (state.B === 'B1' && state.NAME.trim()) extra.push(`名字：${state.NAME.trim()}`);
  if (state.H === 'H25' && state.H_CUSTOM.trim()) extra.push(`自定义出身：${state.H_CUSTOM.trim()}`);
  if (state.S === 'S23' && state.S_CUSTOM.trim()) extra.push(`自定义开场地点：${state.S_CUSTOM.trim()}`);
  if (state.P === 'P32' && state.P_CUSTOM.trim()) extra.push(`自定义命运角色：${state.P_CUSTOM.trim()}`);
  if (state.EXTRA.trim()) extra.push(`额外补充：${state.EXTRA.trim()}`);
  return extra.length ? `${codes}\n${extra.join('\n')}` : codes;
}

function summaryValue(field) {
  const label = getOptionLabel(field, state[field]);
  if (field === 'B') return state.B === 'B1' ? `B1 · ${state.NAME.trim() || '（未填写）'}` : 'B0 · 默认（{{user}}）';
  if (field === 'H' && state.H === 'H25') return `H25 · ${state.H_CUSTOM.trim() || '（未填写）'}`;
  if (field === 'S' && state.S === 'S23') return `S23 · ${state.S_CUSTOM.trim() || '（未填写）'}`;
  if (field === 'P' && state.P === 'P32') return `P32 · ${state.P_CUSTOM.trim() || '（未填写）'}`;
  return `${state[field]} · ${label}`;
}
function buildSummaryRows() {
  return [['名字', summaryValue('B')], ['血统', summaryValue('C')], ['年龄', summaryValue('F')], ['性别', summaryValue('G')], ['外貌', summaryValue('I')], ['身体', summaryValue('Q')], ['星界', summaryValue('A')], ['背景', summaryValue('H')], ['立场', summaryValue('D')], ['职业', summaryValue('E')], ['资源', summaryValue('K')], ['秘密', summaryValue('L')], ['羁绊', summaryValue('N')], ['命运对象', summaryValue('P')], ['开场', summaryValue('S')], ['动机', summaryValue('U')], ['节奏', summaryValue('V')], ['主线', summaryValue('J')]];
}

function getRouteHintRows() {
  if (state.C === 'C7') return [['路线','机械神教路线'], ['神学立场', getOptionLabel('D', state.D)], ['职务序列', getOptionLabel('E', state.E)], ['技术风险', isMechSecret(state.L) ? getOptionLabel('L', state.L) : '未显性建档']];
  if (stanceTag(state.D) === 'iq' || IQ_PROFESSIONS.includes(state.E)) return [['路线','审判庭相关'], ['立场', getOptionLabel('D', state.D)], ['职务', getOptionLabel('E', state.E)], ['风险','需服从审判庭档案与保密层级']];
  if (ASTARTES.includes(state.E)) return [['路线','阿斯塔特'], ['战团/编制', getOptionLabel('E', state.E)], ['限制','正常人类 / 男性 / 非穿越者']];
  if (PSYKER_PROFESSIONS.includes(state.E)) return [['路线','灵能者风险'], ['身份', getOptionLabel('E', state.E)], ['监察', state.E === 'E32' ? '未登记，极高风险' : '受帝国系统控制']];
  return [['路线','帝国公民 / 灰色边缘'], ['立场', getOptionLabel('D', state.D)], ['职业', getOptionLabel('E', state.E)], ['开场', getOptionLabel('S', state.S)], ['节奏', getOptionLabel('V', state.V)]];
}

function canProceedFromPage(page) {
  const fields = PAGE_FIELDS[page] || [];
  if (fields.includes('B') && state.B === 'B1' && !state.NAME.trim()) return { ok:false, message:'请先填写自定义名字，或改回默认名字。' };
  if (fields.includes('H') && state.H === 'H25' && !state.H_CUSTOM.trim()) return { ok:false, message:'请填写自定义出身，或选择固定出身。' };
  if (fields.includes('S') && state.S === 'S23' && !state.S_CUSTOM.trim()) return { ok:false, message:'请填写自定义开场地点，或选择固定开场地点。' };
  if (fields.includes('P') && state.P === 'P32' && !state.P_CUSTOM.trim()) return { ok:false, message:'请填写自定义命运角色，或选择固定对象。' };
  return { ok:true, message:'' };
}

function queryInputBox() { return document.getElementById('send_textarea') || document.querySelector('#form_sheld textarea') || document.querySelector('textarea[placeholder*="消息"]') || document.querySelector('textarea[placeholder*="message" i]'); }
function querySendButton() { return document.querySelector('#send_but') || document.querySelector('button[title="Send"]') || document.querySelector('button[title="发送"]') || document.querySelector('.fa-paper-plane')?.closest('button'); }
function setInputValue(text) {
  const input = queryInputBox();
  if (!input) return false;
  try { input.focus(); } catch (_) {}
  try { const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set; if (setter) setter.call(input, text); } catch (_) {}
  try { input.value = text; } catch (_) {}
  if (typeof jQuery === 'function') { try { jQuery(input).val(text).trigger('input').trigger('change').trigger('keyup'); } catch (_) {} }
  try { input.dispatchEvent(new Event('input', { bubbles:true, cancelable:true })); input.dispatchEvent(new Event('change', { bubbles:true, cancelable:true })); input.dispatchEvent(new KeyboardEvent('keyup', { bubbles:true })); } catch (_) {}
  return input.value === text;
}
async function copyToClipboard(text) { try { await navigator.clipboard.writeText(text); return true; } catch (_) { const ta = document.createElement('textarea'); ta.value = text; ta.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0;'; document.body.appendChild(ta); ta.select(); let ok=false; try { ok=document.execCommand('copy'); } catch (_) {} document.body.removeChild(ta); return ok; } }

function saveDraftState() { try { const ctx = getCtx(); ctx.chatMetadata[getMetaKey('draft')] = JSON.parse(JSON.stringify(state)); ctx.chatMetadata[getMetaKey('page')] = currentPage; ctx.saveMetadata?.(); } catch (_) {} }
function loadDraftState() { try { const ctx = getCtx(); const saved = ctx.chatMetadata?.[getMetaKey('draft')]; const page = ctx.chatMetadata?.[getMetaKey('page')]; state = saved && typeof saved === 'object' ? { ...DEFAULT_STATE, ...saved } : { ...DEFAULT_STATE }; currentPage = typeof page === 'number' ? page : 0; } catch (_) { state = { ...DEFAULT_STATE }; currentPage = 0; } }
async function clearDraftState() { const ctx = getCtx(); delete ctx.chatMetadata[getMetaKey('draft')]; delete ctx.chatMetadata[getMetaKey('page')]; await ctx.saveMetadata?.(); }
async function markBuilderShown() { const ctx = getCtx(); ctx.chatMetadata[getMetaKey('shown')] = true; await ctx.saveMetadata?.(); }

function resetState() { state = { ...DEFAULT_STATE }; currentPage = 0; saveDraftState(); render(); }
function closeBuilder() { overlay?.classList.remove('open'); if (launcher) launcher.textContent = '[⚔ 角色创建器]'; document.documentElement.style.overflow = ''; document.body.style.overflow = ''; }
function openBuilder(forcePage = null) { if (!overlay) createOverlay(); loadDraftState(); if (typeof forcePage === 'number') currentPage = forcePage; render(); overlay.classList.add('open'); if (launcher) launcher.textContent = '[✕ 关闭终端]'; document.documentElement.style.overflow = 'hidden'; document.body.style.overflow = 'hidden'; }

function injectChatStyles() { return; }
function injectBuilderEnhancementStyles() {
  if (document.getElementById(`${EXT_ID}-style-v54`)) return;
  const style = document.createElement('style');
  style.id = `${EXT_ID}-style-v54`;
  style.textContent = `
#wh40k-builder-launcher{position:fixed;top:64px;right:12px;z-index:10000;background:#140b04;color:#ffb84d;border:1px solid #c9a24b;padding:8px 12px;font-weight:700;box-shadow:0 0 12px rgba(0,0,0,.65)}
#wh40k-builder-overlay{position:fixed;inset:0;z-index:9999;display:none;background:rgba(0,0,0,.72);color:#e0cf9a;font-family:ui-monospace,Menlo,Consolas,monospace}#wh40k-builder-overlay.open{display:block}
#wh40k-builder-overlay .wh40k-builder-modal{position:relative;width:min(1280px,calc(100vw - 32px));height:calc(100vh - 32px);margin:16px auto;background:linear-gradient(180deg,#1a0f05,#090502);border:1px solid #5e4a28;box-shadow:0 0 0 1px #2a1f10,0 0 30px rgba(0,0,0,.8);display:flex;flex-direction:column;overflow:hidden}
#wh40k-builder-overlay .wh40k-builder-header{display:flex;justify-content:space-between;align-items:flex-start;padding:18px 22px 14px;border-bottom:1px dashed #5e4a28}.wh40k-builder-title{color:#ffb84d;font-size:20px;font-weight:900;letter-spacing:.12em}.wh40k-builder-subtitle{color:#cc7a1a;font-size:11px;margin-top:6px}.wh40k-icon-btn{background:#110904;color:#ffb84d;border:1px solid #c9a24b;padding:6px 12px;font-weight:700}
.wh40k-builder-progress{display:flex;justify-content:space-between;align-items:center;padding:10px 18px;border-bottom:1px solid #5e4a28}.wh40k-progress-label{color:#e0cf9a}.wh40k-progress-dots{display:flex;gap:8px}.wh40k-dot{background:#100804;color:#ffb84d;border:1px solid #5e4a28;padding:6px 10px}.wh40k-dot.active{border-color:#ffb84d;box-shadow:0 0 8px rgba(255,184,77,.45)}.wh40k-dot.done{border-color:#7ae07a;color:#7ae07a}.wh40k-dot.anomaly{border-color:#c92030;color:#c92030}
.wh40k-builder-main{flex:1;overflow:auto;padding:20px}.wh40k-page-title{color:#ffb84d;font-size:24px;font-weight:900;margin-bottom:8px}.wh40k-page-desc{color:#e0cf9a;line-height:1.7;margin-bottom:18px;border-bottom:1px dashed #5e4a28;padding-bottom:14px}
.wh40k-splash{border:1px solid #5e4a28;width:min(360px,100%);padding:36px 24px;text-align:center}.wh40k-splash-quote{font-size:28px;color:#ffb84d;letter-spacing:.18em}.wh40k-splash-line{color:#cc7a1a;margin:20px 0}.wh40k-splash-text{line-height:1.8}
.wh40k-content-layout{display:grid;grid-template-columns:minmax(330px,430px) minmax(460px,1fr);gap:22px;align-items:start}.wh40k-left-pane{min-width:0}.wh40k-page-grid{display:flex;flex-direction:column;gap:22px}.wh40k-section{border:1px solid #5e4a28;padding:14px;background:rgba(0,0,0,.14)}.wh40k-section h3{color:#cc7a1a;font-size:14px;margin:0 0 12px;border-bottom:1px dashed #5e4a28;padding-bottom:8px}.wh40k-options{display:grid;grid-template-columns:1fr;gap:10px}.wh40k-option{width:100%;min-height:56px;background:#100804;color:#e0cf9a;border:1px solid #5e4a28;text-align:left;padding:10px 12px;white-space:normal}.wh40k-option.active{background:#102012;border-color:#7ae07a;color:#d6ffd6;box-shadow:0 0 0 1px #7ae07a inset}.wh40k-option.disabled{opacity:.42}.wh40k-option.anomaly{border-color:#7a2530}.wh40k-option-code{color:#ffb84d;font-weight:800;margin-right:10px}.wh40k-option-label{line-height:1.5}.wh40k-option-badge{display:block;color:#c92030;margin-top:5px;font-size:11px}
.wh40k-name-box,.wh40k-custom-box{display:none;margin-top:12px}.wh40k-name-box.show,.wh40k-custom-box.show{display:block}input,textarea{background:#090502!important;color:#e0cf9a!important;border:1px solid #5e4a28!important;padding:9px!important;box-sizing:border-box!important;width:100%!important}
.wh40k-right-pane{min-height:560px;max-height:calc(100vh - 220px);overflow:auto;border:1px solid rgba(201,162,75,.45);background:radial-gradient(circle at 50% 0%,rgba(255,184,77,.08),transparent 38%),linear-gradient(180deg,rgba(20,11,4,.96),rgba(8,5,2,.96));padding:18px;box-sizing:border-box;position:sticky;top:12px}.wh40k-side-title{color:#ffb84d;font-size:15px;font-weight:800;letter-spacing:.12em;margin-bottom:10px}.wh40k-side-subtitle{color:#8a6a38;font-size:11px;letter-spacing:.16em;margin-bottom:14px;border-bottom:1px dashed rgba(138,106,56,.55);padding-bottom:10px}.wh40k-side-block{border:1px solid rgba(94,74,40,.72);background:rgba(0,0,0,.18);padding:12px;margin-bottom:12px}.wh40k-side-block-title{color:#cc7a1a;font-size:12px;letter-spacing:.12em;margin-bottom:8px}.wh40k-side-row{display:grid;grid-template-columns:90px 1fr;gap:8px;font-size:12px;line-height:1.65;border-bottom:1px dotted rgba(94,74,40,.38);padding:3px 0}.wh40k-side-key{color:#8a6a38}.wh40k-side-value{color:#e0cf9a}.wh40k-side-code{color:#7ae07a;font-size:11px;line-height:1.55;word-break:break-word;white-space:pre-wrap}.wh40k-side-warning{color:#ffcf66;line-height:1.65;font-size:12px}.wh40k-side-danger{color:#c92030;text-shadow:0 0 6px rgba(200,35,35,.45)}
.wh40k-builder-footer{display:flex;justify-content:space-between;align-items:center;gap:14px;padding:12px 20px;border-top:1px dashed #5e4a28}.wh40k-warning-box{color:#ffcf66;font-weight:700}.wh40k-actions{display:flex;gap:10px}.wh40k-btn{background:#100804;color:#ffb84d;border:1px solid #c9a24b;padding:9px 18px;font-weight:800}.wh40k-btn.primary{border-color:#7ae07a;color:#7ae07a}.wh40k-btn:disabled{opacity:.35}.wh40k-final-card{border:1px solid #5e4a28;padding:18px}.wh40k-final-title{color:#ffb84d;font-size:20px;font-weight:900}.wh40k-final-preview{white-space:pre-wrap;background:#080402;border:1px solid #5e4a28;color:#7ae07a;padding:12px;line-height:1.6;max-height:45vh;overflow:auto}
.wh40k-builder-modal.wh40k-flash::after,.wh40k-builder-modal.wh40k-flash-red::after{content:"";position:absolute;inset:0;pointer-events:none;z-index:999;animation:wh40k-terminal-flash 420ms ease-out}.wh40k-builder-modal.wh40k-flash::after{background:linear-gradient(180deg,transparent 0%,rgba(122,224,122,.16) 48%,transparent 100%),radial-gradient(circle at 50% 50%,rgba(255,184,77,.16),transparent 42%)}.wh40k-builder-modal.wh40k-flash-red::after{background:linear-gradient(180deg,transparent 0%,rgba(201,32,48,.18) 48%,transparent 100%),radial-gradient(circle at 50% 50%,rgba(201,32,48,.14),transparent 42%)}@keyframes wh40k-terminal-flash{0%{opacity:0;transform:scaleY(.96)}18%{opacity:1}100%{opacity:0;transform:scaleY(1.02)}}
@media(max-width:899px){#wh40k-builder-overlay .wh40k-builder-modal{width:100vw;height:100vh;margin:0}.wh40k-content-layout{display:block}.wh40k-right-pane{display:none}.wh40k-builder-footer{flex-direction:column;align-items:stretch}.wh40k-actions{justify-content:space-between}.wh40k-btn{flex:1}.wh40k-builder-title{font-size:16px}.wh40k-page-title{font-size:20px}}
`;
  document.head.appendChild(style);
}

function triggerTerminalFlash(type = 'normal') { const modal = overlay?.querySelector('.wh40k-builder-modal'); if (!modal) return; const cls = type === 'red' ? 'wh40k-flash-red' : 'wh40k-flash'; modal.classList.remove('wh40k-flash','wh40k-flash-red'); void modal.offsetWidth; modal.classList.add(cls); setTimeout(()=>modal.classList.remove(cls),460); }

function makeLauncher() { if (launcher) launcher.remove(); launcher = document.createElement('button'); launcher.id = 'wh40k-builder-launcher'; launcher.type = 'button'; launcher.textContent = '[⚔ 角色创建器]'; launcher.addEventListener('click', () => overlay?.classList.contains('open') ? closeBuilder() : openBuilder()); document.body.appendChild(launcher); }
function createOverlay() {
  overlay = document.createElement('div'); overlay.id = 'wh40k-builder-overlay';
  overlay.innerHTML = `<div class="wh40k-builder-modal"><div class="wh40k-builder-header"><div><div class="wh40k-builder-title">帝国公民登记终端 · #40K-PLUS</div><div class="wh40k-builder-subtitle">帝国内务部 / 公民登记-v5.4-fixed</div></div><button type="button" class="wh40k-icon-btn" data-action="close">[×]</button></div><div class="wh40k-builder-progress"></div><div class="wh40k-builder-main"><section class="wh40k-builder-content"></section></div><div class="wh40k-builder-footer"><div class="wh40k-warning-box"></div><div class="wh40k-actions"><button type="button" class="wh40k-btn" data-action="reset">[ 重置 ]</button><button type="button" class="wh40k-btn" data-action="back">&lt; 上一步</button><button type="button" class="wh40k-btn primary" data-action="next">下一步 &gt;</button></div></div></div>`;
  overlay.addEventListener('click', e => { if (e.target === overlay) closeBuilder(); });
  overlay.querySelector('[data-action="close"]').addEventListener('click', closeBuilder);
  overlay.querySelector('[data-action="reset"]').addEventListener('click', resetState);
  overlay.querySelector('[data-action="back"]').addEventListener('click', goBack);
  overlay.querySelector('[data-action="next"]').addEventListener('click', goNext);
  document.body.appendChild(overlay);
}

function renderProgress() {
  const el = overlay.querySelector('.wh40k-builder-progress'); el.innerHTML = '';
  if (currentPage === 0) { el.innerHTML = `<div class="wh40k-progress-label">// 等 候 输 入 //</div>`; return; }
  if (currentPage === FINAL_PAGE) { el.innerHTML = `<div class="wh40k-progress-label" style="color:#7ae07a;">// 档 案 就 绪 / 待 提 交 //</div>`; return; }
  const total = TOTAL_PAGES - 2; const isJ = currentPage === 6;
  el.innerHTML = `<div class="wh40k-progress-label">第 <span style="color:${isJ?'#c92030':'#ffb84d'};font-weight:700;">${currentPage}</span> / ${total} 节 · ${PAGE_TITLES[currentPage]}</div><div class="wh40k-progress-dots"></div>`;
  const dots = el.querySelector('.wh40k-progress-dots');
  for (let i=1;i<=total;i++) { const dot=document.createElement('button'); dot.type='button'; dot.className='wh40k-dot'; if(i===currentPage)dot.classList.add('active'); else if(i<currentPage)dot.classList.add('done'); if(i===6)dot.classList.add('anomaly'); dot.textContent=i===6?'?':String(i); dot.addEventListener('click',()=>{ if(i>currentPage){ for(let p=currentPage;p<i;p++){ const r=canProceedFromPage(p); if(!r.ok){ alert(r.message); return; } } } currentPage=i; saveDraftState(); render(); }); dots.appendChild(dot); }
}

function makeOptionButton(field, code, label) {
  const check = isOptionAllowed(field, code); const active = state[field] === code;
  const btn = document.createElement('button'); btn.type='button'; btn.className='wh40k-option'; if(field==='J')btn.classList.add('anomaly'); if(active)btn.classList.add('active'); if(!check.ok){ btn.classList.add('disabled'); btn.title=check.reason; }
  btn.innerHTML = `<span class="wh40k-option-code">${escapeHtml(code)}</span><span class="wh40k-option-label">${escapeHtml(label)}</span>${!check.ok?`<span class="wh40k-option-badge">⊘ ${escapeHtml(check.reason)}</span>`:''}`;
  btn.addEventListener('click', () => { if(!check.ok && !active){ triggerTerminalFlash('red'); return; } triggerTerminalFlash(field==='J'?'red':'normal'); state[field]=code; saveDraftState(); render(); });
  return btn;
}
function makeCustomBox(field) {
  const map = { H:['H25','H_CUSTOM','自定义出身'], S:['S23','S_CUSTOM','自定义开场地点'], P:['P32','P_CUSTOM','自定义命运角色'] };
  const cfg = map[field]; if(!cfg) return null; const [code,key,title]=cfg;
  const box = document.createElement('div'); box.className = `wh40k-custom-box ${state[field]===code?'show':''}`; box.innerHTML = `<textarea rows="4" placeholder="${title}" >${escapeHtml(state[key]||'')}</textarea>`;
  box.querySelector('textarea').addEventListener('input', e => { state[key]=e.target.value; saveDraftState(); renderFooterWarnings(); }); return box;
}
function makeFieldSection(field) {
  const wrap = document.createElement('section'); wrap.className='wh40k-section'; if(field==='J')wrap.classList.add('anomaly');
  wrap.innerHTML = `<h3>&gt; ${escapeHtml(FIELD_TITLES[field])}</h3><div style="font-size:12px;color:#a89072;line-height:1.6;margin-bottom:10px;">${escapeHtml(FIELD_DESCRIPTIONS[field]||'')}</div>`;
  const options = document.createElement('div'); options.className='wh40k-options'; OPTIONS[field].forEach(([c,l])=>options.appendChild(makeOptionButton(field,c,l))); wrap.appendChild(options);
  if(field==='B'){ const box=document.createElement('div'); box.className=`wh40k-name-box ${state.B==='B1'?'show':''}`; box.innerHTML=`<input type="text" placeholder="输入角色名字" value="${escapeHtml(state.NAME)}">`; box.querySelector('input').addEventListener('input',e=>{ state.NAME=e.target.value; saveDraftState(); renderFooterWarnings(); }); wrap.appendChild(box); }
  const custom = makeCustomBox(field); if(custom) wrap.appendChild(custom);
  return wrap;
}

function makeSidePanel() {
  const warnings = getWarnings(); const side=document.createElement('aside'); side.className='wh40k-right-pane';
  side.innerHTML = `<div class="wh40k-side-title">档 案 预 览 终 端</div><div class="wh40k-side-subtitle">DATA-SLATE / LIVE REGISTRY / M41</div><div class="wh40k-side-block"><div class="wh40k-side-block-title">&gt; 当前编码</div><div class="wh40k-side-code">${escapeHtml(buildPayload())}</div></div><div class="wh40k-side-block"><div class="wh40k-side-block-title">&gt; 档案摘要</div>${buildSummaryRows().map(([k,v])=>`<div class="wh40k-side-row"><div class="wh40k-side-key">${escapeHtml(k)}</div><div class="wh40k-side-value">${escapeHtml(v)}</div></div>`).join('')}</div><div class="wh40k-side-block"><div class="wh40k-side-block-title">&gt; 路线判定</div>${getRouteHintRows().map(([k,v])=>`<div class="wh40k-side-row"><div class="wh40k-side-key">${escapeHtml(k)}</div><div class="wh40k-side-value">${escapeHtml(v)}</div></div>`).join('')}</div><div class="wh40k-side-block"><div class="wh40k-side-block-title">&gt; 系统提示</div><div class="${warnings.length?'wh40k-side-warning wh40k-side-danger':'wh40k-side-warning'}">${escapeHtml(warnings[0] || '未发现严重冲突，档案准予临时备案。')}</div></div>`;
  return side;
}

function renderPageContent() {
  const content = overlay.querySelector('.wh40k-builder-content'); content.innerHTML='';
  const hero = document.createElement('div'); hero.className='wh40k-page-hero'; hero.innerHTML=`<div class="wh40k-page-title">▸ ${escapeHtml(PAGE_TITLES[currentPage])}</div><div class="wh40k-page-desc">${escapeHtml(PAGE_DESCRIPTIONS[currentPage])}</div>`; content.appendChild(hero);
  if(currentPage===0){ const splash=document.createElement('div'); splash.className='wh40k-splash'; splash.innerHTML=`<div class="wh40k-splash-quote">等 候 输 入</div><div class="wh40k-splash-line">&gt;&gt;&gt; 请公民接入终端 · 开始登记 &lt;&lt;&lt;</div><div class="wh40k-splash-text">此终端不会即时提交。您将依次完成 6 节登记表，每节包含若干字段；全部完成后，在最终页一次性提交档案。</div><button type="button" class="wh40k-btn primary wh40k-start-btn">[ 进入登记 ]</button>`; splash.querySelector('button').addEventListener('click',()=>{currentPage=1;saveDraftState();render();}); content.appendChild(splash); return; }
  if(currentPage===FINAL_PAGE){ const card=document.createElement('section'); card.className='wh40k-final-card'; card.innerHTML=`<div class="wh40k-final-title">最终提交</div><div class="wh40k-final-text">&gt; 以下为即将上传至大行政官案头的档案数据流。</div><pre class="wh40k-final-preview">${escapeHtml(buildPayload())}</pre><div class="wh40k-final-actions"><button type="button" class="wh40k-btn" data-action="fill-only">[ 仅写入 ]</button><button type="button" class="wh40k-btn" data-action="copy-payload">[ 复制 ]</button><button type="button" class="wh40k-btn primary" data-action="confirm-send">★ 提交档案 ★</button></div>`; card.querySelector('[data-action="fill-only"]').addEventListener('click', fillOnly); card.querySelector('[data-action="copy-payload"]').addEventListener('click', copyPayloadOnly); card.querySelector('[data-action="confirm-send"]').addEventListener('click', confirmAndSend); content.appendChild(card); return; }
  const layout=document.createElement('div'); layout.className='wh40k-content-layout'; const left=document.createElement('div'); left.className='wh40k-left-pane'; const grid=document.createElement('div'); grid.className='wh40k-page-grid'; PAGE_FIELDS[currentPage].forEach(f=>grid.appendChild(makeFieldSection(f))); left.appendChild(grid);
  if(currentPage===6){ const box=document.createElement('section'); box.className='wh40k-section'; box.innerHTML=`<h3>※ 额外补充（可选）</h3><textarea rows="5" placeholder="可写人物癖好、特殊背景、关键剧情提示、想锚定的 NPC 关系、想跳过的开场内容……">${escapeHtml(state.EXTRA||'')}</textarea>`; box.querySelector('textarea').addEventListener('input',e=>{state.EXTRA=e.target.value;saveDraftState();}); left.appendChild(box); }
  layout.appendChild(left); layout.appendChild(makeSidePanel()); content.appendChild(layout);
}

function renderFooterWarnings(){ const box=overlay.querySelector('.wh40k-warning-box'); const w=getWarnings(); box.textContent = w.length ? `注意：${w[0]}` : '提示：AI会根据你的世界书规则自动纠正非法组合，并在开场叙事中给出简短解释。'; }
function renderFooterButtons(){ const back=overlay.querySelector('[data-action="back"]'); const next=overlay.querySelector('[data-action="next"]'); back.disabled=currentPage===0; if(currentPage===FINAL_PAGE){ next.style.display='none'; } else { next.style.display=''; next.textContent=currentPage===0?'进入登记':'下一步 >'; } }
function render(){ renderProgress(); renderPageContent(); renderFooterWarnings(); renderFooterButtons(); }
function goBack(){ if(currentPage===0) return; currentPage--; saveDraftState(); render(); }
function goNext(){ const r=canProceedFromPage(currentPage); if(!r.ok){ alert(r.message); return; } if(currentPage>=FINAL_PAGE) return; currentPage++; saveDraftState(); render(); }

async function fillOnly(){ const payload=buildPayload(); closeBuilder(); await new Promise(r=>setTimeout(r,80)); if(!setInputValue(payload)){ const ok=await copyToClipboard(payload); alert(ok?'未能自动写入输入框。模板已复制到剪贴板。':'未能写入输入框，且剪贴板不可用。请手动复制：\n\n'+payload); } }
async function copyPayloadOnly(){ const ok=await copyToClipboard(buildPayload()); alert(ok?'模板已复制到剪贴板。':'剪贴板不可用。'); }
async function confirmAndSend(){ const payload=buildPayload(); closeBuilder(); await new Promise(r=>setTimeout(r,80)); if(!setInputValue(payload)){ const ok=await copyToClipboard(payload); alert(ok?'未能自动写入输入框。模板已复制到剪贴板，请手动发送。':'未能写入输入框。请手动复制：\n\n'+payload); return; } if(!AUTO_SEND_AFTER_FILL){ await markBuilderShown(); await clearDraftState(); return; } const btn=querySendButton(); if(btn){ btn.click(); await markBuilderShown(); await clearDraftState(); } else alert('模板已写入输入框，但未找到发送按钮。请手动点击发送。'); }

async function maybeAutoOpen(){ if(!isCtxReady()) return; const ctx=getCtx(); if(!shouldEnableForCurrentChat()){ if(launcher) launcher.style.display='none'; return; } if(launcher) launcher.style.display=''; const chat=Array.isArray(ctx.chat)?ctx.chat:[]; const hasUser=chat.some(m=>m?.is_user===true); const shown=!!ctx.chatMetadata?.[getMetaKey('shown')]; if(AUTO_OPEN_FOR_EMPTY_CHAT && !hasUser && !shown) openBuilder(0); }

function init(){ if(initialized){ maybeAutoOpen().catch?.(()=>{}); return; } if(!isCtxReady()){ setTimeout(init,400); return; } initialized=true; try{ injectBuilderEnhancementStyles(); makeLauncher(); createOverlay(); injectChatStyles(); }catch(e){ console.error(`[${EXT_ID}] failed to build DOM`, e); return; } try{ const {eventSource,event_types}=getCtx(); eventSource.on(event_types.CHAT_CHANGED,()=>maybeAutoOpen()); eventSource.on(event_types.CHAT_CREATED,()=>{ state={...DEFAULT_STATE}; currentPage=0; maybeAutoOpen(); }); }catch(e){ console.error(`[${EXT_ID}] event binding failed`, e); } maybeAutoOpen(); setTimeout(()=>maybeAutoOpen(),600); setTimeout(()=>maybeAutoOpen(),2000); }
function boot(){ if(isCtxReady()){ try{ const {eventSource,event_types}=getCtx(); eventSource.on(event_types.APP_READY,()=>setTimeout(init,0)); }catch(_){} } setTimeout(init,300); setTimeout(init,1500); setTimeout(init,4000); }

if(typeof jQuery==='function') jQuery(()=>boot()); else if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', boot); else boot();
