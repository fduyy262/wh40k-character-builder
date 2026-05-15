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
  P: 'P. 命运将至之人',
  Q: 'Q. 身体状态',
  S: 'S. 开场地点',
  U: 'U. 目标动机',
  V: 'V. 叙事节奏偏好',
  // ─── 灵能档案字段(条件性,仅 E30/E31/E32 或 C3 触发) ───
  M: 'M. 灵能等级 / Psy Rating',
  W: 'W. 主流派 / Primary Discipline',
  T: 'T. 副流派 / Secondary Discipline',
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
  4: '// 第四节 — 您当前持有的资源、秘密、羁绊，以及一位命运将至之人。',
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
  P: '指定一位“命运将至之人”。此人不会在开局立刻登场，而是会在剧情发展中合理引入。',
  Q: '声明您当前的身体状况。包括隐性创伤、改造痕迹与未愈合的旧伤。',
  S: '指定您的开场地点。从具体场景中选择一个，或在 S23 处自行描述。',
  U: '声明您的核心动机。它将驱动您的中长期决策与剧情选择。',
  V: '声明您偏好的叙事节奏。本字段不影响世界规则，仅作风格调音。',
  // ─── 灵能档案字段(条件性,仅 E30/E31/E32 或 C3 触发) ───
  M: '黑舰评定的灵能等级。等级决定您能调动的亚空间能量上限,也决定您在审判庭档案中的危险分级。',
  W: '您最熟练的灵能流派。流派决定您日常释放的能力风格,也决定您与亚空间何种实体最易共振。',
  T: '次要修习的灵能流派。仅在等级达到约塔级(M3)及以上时方可分心修习,且不可与主流派重复。',
};

const OPTIONS = {
  A: [
    ['A1', '卡西亚（卡利亚星区-首府）'],
    ['A2', '普莱（卡利亚星区-要塞世界）'],
    ['A3', '伊卡索斯（卡利亚星区-国教世界）'],
    ['A4', '马尔菲（卡利亚星区-封建世界）'],
    ['A5', '所罗门（卡利亚星区-锻造世界）'],
    ['A6', '锡诺菲亚（卡利亚星区-衰败巢都世界）'],
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
  C: [['C1', '正常人类'], ['C2', '不可接触者'], ['C3', '领航者'], ['C4', '猫人'], ['C5', '机械神教培育人']],
  D: [
    ['D1', '人类帝国忠诚者'], ['D2', '边缘独立者 / 灰色地带'], ['D3', '潜在混沌信徒'], ['D4', '秘密的异形同情者'],
    ['D5', '审判庭-纯洁派'], ['D6', '审判庭-激进派'], ['D7', '审判庭-占视者派'], ['D8', '审判庭-妄尊异形派'],
    ['D9', '机械神教-火星正统派'], ['D10', '机械神教-探索者派'], ['D11', '机械神教-异形博学派'], ['D12', '机械神教-莫伊雷分裂派'], ['D13', '机械神教-考尔派'],
  ],
  E: [
    ['E1', '帝国卫队士兵'], ['E2', '帝国商船船长'], ['E3', '帝国海军军官'], ['E4', '法务部预备员'], ['E5', '医护员'], ['E6', '行政书吏'],
    ['E7', '铸造厂劳工'], ['E8', '星区学院学者'], ['E9', '帝国教会牧师'], ['E10', '修女会成员'], ['E11', '蔷薇修女会侍从'],
    ['E12', '帝国贵族'], ['E13', '贵族家族护卫'], ['E14', '行商浪人家族继承人'], ['E15', '虚空掮客'], ['E16', '虚空打捞者'],
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
    ['H7', '巢都工人家庭'], ['H8', '农村家庭'], ['H9', '没落的古老家族'], ['H10', '黑帮遗孤'], ['H11', '巢都贫民'],
    ['H12', '铸造圣堂学徒'], ['H13', '穿越者'], ['H14', '铸造世界工役奴仆'], ['H15', '教会附属孤儿院出身'], ['H16', '虚空船员家系'],
    ['H17', '边境殖民者家庭'], ['H18', '法务部家庭出身'], ['H19', '失势贵族旁支'], ['H20', '身世不明养子'], ['H21', '走私圈出身'],
    ['H22', '档案机构出身'], ['H23', '边缘废土聚落'], ['H24', '流亡者后裔'], ['H25', '自定义出身（手动输入）'],
  ],
  I: [
    ['I1', '东亚面孔（黄皮肤，黑发，单/双眼皮）'],
    ['I2', '欧洲面孔（白皮肤，浅色或棕色发）'],
    ['I3', '非洲面孔（深色皮肤，深棕至黑色发）'],
    ['I4', '中东/南亚面孔（橄榄色至深棕皮肤，黑色发）'],
  ],
  K: [
    // 财务（互斥，可不选）
    ['K1', '身无长物'],
    ['K2', '基本温饱'],
    ['K3', '小有积蓄'],
    ['K4', '殷实（资金宽裕，能买体面装备）'],
    ['K5', '富有（有相当数量的信用点和资产）'],
    // 居所（互斥，可不选）
    ['K6', '寄居 / 无固定居所'],
    ['K7', '有稳定住处'],
    ['K8', '拥有一处隐秘安全屋'],
    ['K9', '拥有家族房产（家族所有，但你能使用）'],
    // 随从（互斥，可不选）
    ['K10', '有一名可调用的低阶随从'],
    ['K11', '有一名忠诚老仆'],
    // 装备（互斥，可不选）
    ['K12', '持有一件合法武器'],
    ['K13', '拥有一件受限装备（需许可证）'],
    ['K14', '持有一件家传古物（武器/盔甲/圣器，有故事）'],
    ['K15', '持有一件异形 / 异端嫌疑物'],
    // 飞船（互斥，可不选）
    ['K16', '自有小船（贸易船 / 打捞船 / 走私船）'],
    ['K17', '借调舰船（暂时使用上级、家族或雇主的一艘船）'],
    ['K18', '在大舰服役（你常驻于一艘大型舰船，但船不属于你）'],
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
    ['N0', '无'], ['N1', '家人仍在'],['N2', '有三位从小玩到大的玩伴'],['N3', '有一个志趣相投的旧友圈子'], ['N4', '有一位旧战友'], ['N5', '有一位国教引路人'], ['N6', '有一位债主 / 压迫者'], ['N7', '有一位黑市联系人'],
    ['N8', '有一位正在监视你的上级'], ['N9', '有一位失踪的重要之人'], ['N10', '有一位机械神教联系人'], ['N11', '有一位审判庭线人'], ['N12', '有一位曾救过你的人'],
    ['N13', '有一位行商浪人保护人'], ['N14', '有一位法务部旧识'], ['N15', '有一位行政部档案员朋友'], ['N16', '有一位海军军官联系人'], ['N17', '有一位异形或异端联系人'],
    ['N18', '有一位长期跟随你的男性机仆'], ['N19', '有一位长期跟随你的女性机仆'], ['N20', '有一位蔷薇修女会的旧识'], ['N21', '有一位研究亚空间的朋友'],
    ['N22', '有一位帝国骑士家族的熟人'], ['N23', '有一位底巢帮派中的内应'], ['N24', '有一位机械神教半异端导师庇护你'],['N25', '有一位帝国商船联系人'],
    // ─── 亲密关系（关系开放，可被剧情发展） ───
    ['N26', '你拥有一名契约性伴'],
    ['N27', '你曾雇佣过一名贴身侍仆,但她已离开,不知去向'],
    ['N28', '你包养着一名巢都艺人'],
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
    ['P0', '无（没有特定的命运对象，剧情自由展开）'],
    ['P1', '赤红净化博学者'],
    ['P2', '赏金枪手'],
    ['P3', '流亡叛博学者'],
    ['P4', '骑士机甲驾驶员'],
    ['P5', '见习修女'],
    ['P6', '贵族怪盗'],
    ['P7', '星界军老兵'],
    ['P8', '黑暗灵族战巫'],
    ['P9', '导航学徒'],
    ['P10', '克鲁特猎手'],
    ['P11', '人类灵族混血海盗'],
    ['P12', '审判庭外勤助理'],
    ['P13', '机械神教技术神甫'],
    ['P14', '莱特林狙击手'],
    ['P15', '伪装贵族妓院主理'],
    ['P16', '北欧风走私头目'],
    ['P17', '灵族先知'],
    ['P18', '流亡星图师'],
    ['P19', '黑暗灵族娼妓'],
    ['P20', '失明朝圣者'],
    ['P21', '迷茫的知更鸟'],
    ['P22', '颓废女学者'],
    ['P23', '蔷薇修女'],
    ['P24', '失散的见习修女'],
    ['P25', '隐退战斗修女'],
    ['P26', '钛族水氏族以太'],
    ['P27', '伊克沙尼亚贵族继承人'],
    ['P28', '马里格里斯之女'],
    ['P29', '翡翠龙散修'],
    ['P30', '叛逃海军军官'],
    ['P31', '异端机械神甫学徒'],
  ],
  J: [
    ['J1', '无主线（纯自由剧情）'], ['J2', '单主线·绯雾之下'], ['J3', '单主线·帝皇幻梦'], ['J4', '单主线·太平潮涌'], ['J5', '单主线·圣机之蚀'],
    ['J6', '双主线·绯雾之下 + 帝皇幻梦'], ['J7', '双主线·绯雾之下 + 太平潮涌'], ['J8', '双主线·绯雾之下 + 圣机之蚀'], ['J9', '双主线·帝皇幻梦 + 太平潮涌'],
    ['J10', '双主线·帝皇幻梦 + 圣机之蚀'], ['J11', '双主线·太平潮涌 + 圣机之蚀'], 
  ],
  // ─── 灵能档案字段(条件性显示) ───
  // M: 灵能等级 / Psy Rating
  M: [
    ['M0', 'Mu / 缪级（零级 - 几乎无显化,仅作为测试记录）'],
    ['M1', 'Pi / 派级（微弱 - 偶现现象,多数终生不显化）'],
    ['M2', 'Rho / 柔级（初级 - 学徒水平,星语者下限）'],
    ['M3', 'Iota / 约塔级（中级 - 受批准灵能者主流）'],
    ['M4', 'Kappa / 卡帕级（高级 - 资深星语者 / 战团图书管理员）'],
    ['M5', 'Beta / 贝塔级（大师 - 审判官级别,极度罕见）'],
    ['M6', 'Alpha / 阿尔法级（传奇 - 被审判庭追踪建档,接近不可控）'],
  ],
  // W: 主流派 / Primary Discipline
  W: [
    ['W1', '感应术（心灵阅读 / 心电传讯 / 精神攻击）'],
    ['W2', '念力术（移物 / 力盾 / 抛射）'],
    ['W3', '火术（火焰显形 / 自焚化）'],
    ['W4', '生体术（治疗 / 肉体改写 / 血腥变形）'],
    ['W5', '占视术（预见 / 凝视 / 命运片段）'],
    ['W6', '帝皇灵能（驱逐恶魔, ⚠️限定授权）'],
    ['W7', '恶魔学（召唤恶魔, ⚠️异端）'],
    ['W8', '导航术（仅限 C3 领航者血统）'],
  ],
  // T: 副流派 / Secondary Discipline(M3 起开放)
  T: [
    ['T0', '无'],
    ['T1', '感应术（副）'],
    ['T2', '念力术（副）'],
    ['T3', '火术（副）'],
    ['T4', '生体术（副）'],
    ['T5', '占视术（副）'],
    ['T6', '帝皇灵能（副, ⚠️限定授权）'],
    ['T7', '恶魔学（副, ⚠️异端）'],
  ],
};

const DEFAULT_STATE = {
  A: 'A1', B: 'B0', C: 'C1', D: 'D1', E: 'E1', F: 'F1', G: 'G1', H: 'H1', I: 'I1', P: 'P0', Q: 'Q1', S: 'S1', U: 'U12', V: 'V2', J: 'J1',
  K: [],  // 多选,空数组表示未选
  L: [],  // 多选,空数组表示未选
  N: [],  // 多选,空数组表示未选
  // 灵能档案(条件性,默认空。仅 E30/E31/E32 灵能职业或 C3 领航者血统触发面板)
  M: '',  // 灵能等级 M0-M6
  W: '',  // 主流派 W1-W8
  T: 'T0',  // 副流派 T0(无)~T7,M3 起开放
  NAME: '', H_CUSTOM: '', S_CUSTOM: '', EXTRA: '',
  E21_CHAPTER: '',  // 死亡守望母战团代码（仅 E21 时有意义）
};

// K 字段分类映射(同分类内互斥)
const K_CATEGORIES = {
  K1:'finance', K2:'finance', K3:'finance', K4:'finance', K5:'finance',
  K6:'housing', K7:'housing', K8:'housing', K9:'housing',
  K10:'follower', K11:'follower',
  K12:'gear', K13:'gear', K14:'gear', K15:'gear',
  K16:'ship', K17:'ship', K18:'ship',
};
const K_MAX_PICKS = 2;
const N_MAX_PICKS = 2;
const L_MAX_PICKS = 2;
const INTIMATE_BONDS = ['N26', 'N27', 'N28'];
const INTIMATE_MAX_PICKS = 1;
// K9 家族房产允许的出身
const FAMILY_ESTATE_OK_BG = ['H1', 'H2', 'H4', 'H5', 'H9', 'H18', 'H19'];

let state = { ...DEFAULT_STATE };
let currentPage = 0;
let overlay = null;
let launcher = null;
let initialized = false;

const ASTARTES = ['E21', 'E22', 'E23', 'E24'];
const IQ_PROFESSIONS = ['E25', 'E26', 'E27', 'E28', 'E29', 'E30', 'E31'];
const MECH_PROFESSIONS = ['E33', 'E34', 'E35', 'E36', 'E37', 'E38'];
const PSYKER_PROFESSIONS = ['E26', 'E30', 'E31', 'E32'];
const SISTER_PROFESSIONS = ['E10', 'E11'];
const SISTER_RACES = ['C1', 'C2', 'C4'];  // 正常人类(战斗修女) + 不可接触者(沉默姐妹会) + 猫人(部分世界书允许)
const NAVIGATOR_OK_BG = ['H4', 'H16', 'H19', 'H20'];
const NOBLE_OK_BG = ['H2', 'H4', 'H5', 'H9', 'H18', 'H19', 'H22'];
const KNIGHT_OK_BG = ['H4', 'H9', 'H19', 'H20'];
const ASTARTES_FORBIDDEN_BG = ['H12', 'H14'];
// 死亡守望 / 初创子团母战团（E21 借调来源 + E24 基因种子来源）
const DEATHWATCH_CHAPTERS = [
  ['DW1',  '太空野狼（猛烈、传统、萨迦风格）'],
  ['DW2',  '深红之拳（坚毅、围城战专家、孤立感）'],
  ['DW3',  '暗鸦守卫（隐秘、突袭、夜战）'],
  ['DW4',  '翡翠龙（瀛洲-21、东亚风格）'],
  ['DW5',  '极限战士（教条、典范、纪律严明）'],
  ['DW6',  '圣血天使（高贵、艺术化、压抑红渴）'],
  ['DW7',  '黑暗天使（沉默、内含秘密、骑士传统）'],
  ['DW8',  '帝国之拳（坚守、绝对忠诚、围困战教条）'],
  ['DW9',  '火蜥蜴（重装火力、保护平民、锻造文化）'],
  ['DW10', '黑色圣堂武士（狂热、不留女性档案、十字军教条）'],
  ['DW11', '钢铁之手（机械改造极致、对血肉怀疑）'],
  ['DW12', '白疤（机动、闪电战、草原氏族文化）'],
  ['DW13', '未指明 / 自定义战团'],
];
// 已经是某一战团的子团（successor chapter）。E24(初创子团)不能以这些为基因种子来源,只能选首批战团。
const SUB_CHAPTERS = ['DW2', 'DW10'];  // 深红之拳/黑色圣堂武士都是帝国之拳后裔
const HEAVY_AUG = ['Q6', 'Q7', 'Q8'];
const MEDIUM_HEAVY_AUG = ['Q7', 'Q8'];
const SELF_OWNED_SHIP_OK = ['E2', 'E14', 'E16', 'E27', 'E28', 'E29', 'E42', 'E43'];
const NO_BORROWED_SHIP = ['E7', 'E19', 'E39', 'E40', 'E44'];
const ASSIGNED_TO_SHIP_OK = ['E3', 'E14', 'E21', 'E22', 'E23', 'E24', 'E25', 'E26', 'E27', 'E28', 'E31', 'E34', 'E35'];
const ORG_PROFESSIONS_FOR_U12 = ['E10', 'E11', 'E21', 'E22', 'E23', 'E24', 'E25', 'E26', 'E27', 'E28', 'E29', 'E30', 'E31', 'E33', 'E34', 'E35', 'E36', 'E37', 'E38'];

const XENOS_FATE_PERSONS = ['P8', 'P10', 'P11', 'P17', 'P19', 'P26'];
const XENOS_CONTACT_STANCES = ['D2', 'D4', 'D6', 'D8', 'D11'];
const XENOS_CONTACT_PROFESSIONS = ['E14', 'E15', 'E16', 'E17', 'E25', 'E26', 'E27', 'E28', 'E29', 'E34', 'E36', 'E41', 'E42', 'E43'];
const XENOS_CONTACT_ORIGINS = ['A13'];
// 异形资源现在是 K16(自有船)/K17(借调)/K18(在大舰); K15(异形物)也算
const XENOS_CONTACT_RESOURCES = ['K15', 'K16', 'K17', 'K18'];
const XENOS_CONTACT_SECRETS = ['L14', 'L15'];
const XENOS_CONTACT_BONDS = ['N15'];
const XENOS_HARD_BAN_STANCES = ['D5', 'D9'];
const XENOS_HARD_BAN_PROFESSIONS = ['E10', 'E11', 'E21', 'E22', 'E23', 'E24'];

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

// 多选辅助: 始终返回数组(兼容旧 string 格式)
function asArray(v) {
  if (Array.isArray(v)) return v;
  if (v == null || v === '') return [];
  return [v];
}

function isOptionAllowed(field, code, s = state) {
  if (isRandomCode(code)) return { ok: true };
  const pick = (f) => { const v = s[f]; return v && !isRandomCode(v) ? v : null; };
  const c = pick('C'), d = pick('D'), e = pick('E'), h = pick('H'), g = pick('G'), a = pick('A'), p = pick('P'), u = pick('U'), q = pick('Q');
  // K、L、N 现在是数组
  const kArr = asArray(s.K);
  const lArr = asArray(s.L);
  const nArr = asArray(s.N);
  const eTag = professionTag(field === 'E' ? code : e);
  const dTag = stanceTag(field === 'D' ? code : d);

  if (field === 'C') return { ok: true };

  if (field === 'A') {
    if (code === 'A19' && e && !['E25','E26',...MECH_PROFESSIONS].includes(e)) return { ok:false, reason:'欧姆巴佩11号仅对机械神教与审判庭高层开放' };
    if (code === 'A21' && e !== 'E21') return { ok:false, reason:'哥利亚要塞仅对死亡守望开放' };
  }

  if (field === 'D') {
    if (dTag === 'mech' && c !== 'C5') return { ok:false, reason:'神教立场需机械神教培育人(C5)' };
    if (dTag !== 'mech' && c === 'C5') return { ok:false, reason:'机械神教培育人(C5)需神教立场' };
    if (e === 'E32' && dTag === 'iq') return { ok:false, reason:'审判庭立场会处决未登记灵能者' };
    if (e === 'E44' && dTag === 'mech') return { ok:false, reason:'黑工坊学徒与正统机械神教立场不可兼容' };
  }

  if (field === 'E') {
    if (eTag === 'mech' && c !== 'C5') return { ok:false, reason:'神教职业需机械神教培育人(C5)' };
    if (eTag !== 'mech' && c === 'C5') return { ok:false, reason:'机械神教培育人(C5)需神教职业' };
    if (eTag === 'iq' && d && stanceTag(d) !== 'iq') return { ok:false, reason:'仅限审判庭立场' };
    if (dTag === 'iq' && eTag !== 'iq') return { ok:false, reason:'当前为审判庭立场，仅可选择审判庭体系职业' };
    if (dTag === 'mech' && eTag !== 'mech') return { ok:false, reason:'神教立场仅限神教职业' };
    if (code === 'E32' && dTag === 'iq') return { ok:false, reason:'审判庭立场会处决未登记灵能者' };
    if (code === 'E44' && dTag === 'mech') return { ok:false, reason:'黑工坊学徒与正统机械神教立场不可兼容' };
    if (ASTARTES.includes(code)) {
      // 不可接触者灵魂缺位,基因种子改造无法生效
      if (c === 'C2') return { ok:false, reason:'不可接触者灵魂缺位,无法接受基因种子的祝圣与改造' };
      if (g !== 'G1') return { ok:false, reason:'阿斯塔特仅限男性' };
      if (c !== 'C1') return { ok:false, reason:'阿斯塔特仅限正常人类' };
      if (h === 'H13' || ASTARTES_FORBIDDEN_BG.includes(h)) return { ok:false, reason:'阿斯塔特出身不合法' };
    }
    if (code === 'E10') { if (g !== 'G2') return { ok:false, reason:'修女会仅限女性' }; if (!SISTER_RACES.includes(c)) return { ok:false, reason:'当前血统不可成为修女' }; }
    if (code === 'E12' && h !== 'H25' && !NOBLE_OK_BG.includes(h)) return { ok:false, reason:'贵族通常不出身底层' };
    if (code === 'E18' && (c === 'C4' || (h !== 'H25' && !KNIGHT_OK_BG.includes(h)))) return { ok:false, reason:'流浪骑士需贵族传承背景' };
    if (c === 'C4' && ['E18',...ASTARTES,...MECH_PROFESSIONS].includes(code)) return { ok:false, reason:'猫人不可担任此职业' };
    if (c === 'C2' && [...ASTARTES,...MECH_PROFESSIONS,...PSYKER_PROFESSIONS].includes(code)) return { ok:false, reason:'不可接触者不适合此职业' };
    if (c === 'C3' && ['E1','E4','E7','E9','E10','E11',...ASTARTES,...IQ_PROFESSIONS,'E32',...MECH_PROFESSIONS,'E39','E40','E44'].includes(code)) return { ok:false, reason:'领航者不适合此职业' };
  }

  if (field === 'G') { if (ASTARTES.includes(e) && code !== 'G1') return { ok:false, reason:'阿斯塔特仅限男性' }; if (e === 'E10' && code !== 'G2') return { ok:false, reason:'修女会仅限女性' }; }
  if (field === 'H') {
    if (c === 'C5' && !isMechBackground(code)) return { ok:false, reason:'机械神教培育人(C5)需神教背景' };
    if (c && c !== 'C5' && isMechBackground(code)) return { ok:false, reason:'神教背景需机械神教培育人(C5)' };
    if (code === 'H13' && ASTARTES.includes(e)) return { ok:false, reason:'阿斯塔特无法是穿越者' };
    if (c === 'C3' && code !== 'H25' && !NAVIGATOR_OK_BG.includes(code)) return { ok:false, reason:'领航者必须出身领航者世系或贵族家族' };
    if (e === 'E12' && code !== 'H25' && !NOBLE_OK_BG.includes(code)) return { ok:false, reason:'贵族通常不出身底层' };
    if (e === 'E18' && code !== 'H25' && !KNIGHT_OK_BG.includes(code)) return { ok:false, reason:'流浪骑士需贵族传承背景' };
    if (code === 'H25' && (c === 'C3' || c === 'C5' || ASTARTES.includes(e))) return { ok:false, reason:'当前路线不允许自定义出身' };
  }

  // ─── K 字段(多选): 分类内互斥 + 财务联动 + 职业联动 ───
  if (field === 'K') {
    const cat = K_CATEGORIES[code];
    // 分类内已有其他选项
    const conflictInCat = kArr.find(k => k !== code && K_CATEGORIES[k] === cat);
    if (conflictInCat) return { ok:false, reason:`同分类已选 ${conflictInCat},同类只能选一个` };

    // 财务 vs 居所/装备/飞船 互斥
    if (code === 'K1') {
      const conflict = kArr.find(k => ['K8','K9','K13','K15','K16'].includes(k));
      if (conflict) return { ok:false, reason:`身无长物与已选 ${conflict} 矛盾` };
    }
    if (['K8','K9','K13','K15','K16'].includes(code) && kArr.includes('K1')) {
      return { ok:false, reason:'已选身无长物,无法持有此项' };
    }
    if (code === 'K6' && kArr.includes('K5')) return { ok:false, reason:'富有者不会寄居' };
    if (code === 'K5' && kArr.includes('K6')) return { ok:false, reason:'寄居者不算富有' };

    // K9 家族房产 vs 出身
    if (code === 'K9' && h && !FAMILY_ESTATE_OK_BG.includes(h)) return { ok:false, reason:'当前出身没有可用家族房产' };

    // 职业 vs 飞船
    if (code === 'K16' && e && !SELF_OWNED_SHIP_OK.includes(e)) return { ok:false, reason:'该职业通常不会自有舰船' };
    if (code === 'K17' && e && NO_BORROWED_SHIP.includes(e)) return { ok:false, reason:'该职业不太可能借调舰船' };
    if (code === 'K18' && e && !ASSIGNED_TO_SHIP_OK.includes(e)) return { ok:false, reason:'该职业通常不在大型舰船上服役' };

    // 阿斯塔特强制 K18,禁止其他飞船
    if (ASTARTES.includes(e) && ['K16','K17'].includes(code)) return { ok:false, reason:'阿斯塔特只能在大舰服役(K18)' };

    // 领航者特殊
    if (c === 'C3' && ['K1','K6','K16'].includes(code)) return { ok:false, reason:'领航者身份不允许此项' };

    // [10] 修女会纯洁血肉:不容异端嫌疑物
    if (code === 'K15' && SISTER_PROFESSIONS.includes(e)) {
      return { ok:false, reason:'修女会教条不容此类异端嫌疑物' };
    }
    // [11] 异端嫌疑物 K15:纯洁派与火星正统派 ban,激进派 D6-D8 允许
    if (code === 'K15') {
      if (d === 'D5') return { ok:false, reason:'审判庭-纯洁派不容异端嫌疑物' };
      if (d === 'D9') return { ok:false, reason:'机械神教-火星正统派与异端嫌疑物势不两立' };
    }

    // 上限校验(非取消的添加才算)
    if (!kArr.includes(code) && kArr.length >= K_MAX_PICKS) {
      return { ok:false, reason:`资源最多选 ${K_MAX_PICKS} 项,请先取消已选项` };
    }
  }

  // ─── L 字段(多选): L0互斥 + 立场/血统/职业联动 + 上限 ───
  if (field === 'L') {
    // L0 = 无秘密。永远允许点击,因为点击它会清空其他秘密
    if (code === 'L0') return { ok:true };

    // 如果已经选择 L0,则禁止再选其他秘密
    if (lArr.includes('L0')) {
      return { ok:false, reason:'已选择"无",不能再选择其他秘密' };
    }

    // [3] 无知者(C2)反灵能闭环:无法接触亚空间/预言/异象
    if (c === 'C2' && ['L9','L12','L14'].includes(code)) {
      return { ok:false, reason:'无知者是灵能死区,不会被亚空间异常感染或感知' };
    }

    // [10] 修女会纯洁血肉:不容异端嫌疑(混沌嫌疑 + 异形遗物)
    if (SISTER_PROFESSIONS.includes(e) && ['L9','L14','L15'].includes(code)) {
      return { ok:false, reason:'修女会教条不容此类异端嫌疑' };
    }

    // [11] 异端线索(L14 非人低语 / L15 异形遗物):纯洁派与火星正统派 ban,激进派 D6/D7/D8 允许
    if (['L14','L15'].includes(code)) {
      if (d === 'D5') return { ok:false, reason:'审判庭-纯洁派不容异端线索' };
      if (d === 'D9') return { ok:false, reason:'机械神教-火星正统派与异端线索势不两立' };
    }

    // [13] Phase Tech-Plague 硬封禁:L24/L25 + 审判庭立场 = 已被通缉
    if (['L24','L25'].includes(code) && ['D5','D6','D7','D8'].includes(d)) {
      return { ok:false, reason:'技术弊病进阶状态已被审判庭通缉,无法同时持审判庭身份' };
    }

    // 神教秘密需机械神教培育人(C5)
    if (isMechSecret(code) && c !== 'C5') {
      return { ok:false, reason:'神教秘密需机械神教培育人(C5)' };
    }

    // 上限校验(非取消的添加才算)
    if (!lArr.includes(code) && lArr.length >= L_MAX_PICKS) {
      return { ok:false, reason:`秘密最多选 ${L_MAX_PICKS} 项,请先取消已选项` };
    }
  }

  if (field === 'Q') {
    if (c === 'C3' && MEDIUM_HEAVY_AUG.includes(code)) return { ok:false, reason:'领航者身体脆弱,无法叠加重度改造' };
    if (c === 'C2' && HEAVY_AUG.includes(code)) return { ok:false, reason:'不可接触者无法被祝圣,机械教不会为其改造' };
    if (SISTER_PROFESSIONS.includes(e) && HEAVY_AUG.includes(code)) return { ok:false, reason:'修女会强调纯洁血肉,不接受义体' };
    if (ASTARTES.includes(e) && ['Q3','Q5'].includes(code)) return { ok:false, reason:'阿斯塔特不应存在慢病或药瘾' };
    if (['E1','E7','E19','E39','E44'].includes(e) && code === 'Q8') return { ok:false, reason:'该职业不可能身体大部分机械化' };
    if (code === 'Q10' && d === 'D5') return { ok:false, reason:'纯洁派不容隐性改造' };
  }

  // ─── M 字段:灵能等级(条件性) ───
  if (field === 'M') {
    // 无知者根本不能有 M
    if (c === 'C2') return { ok:false, reason:'无知者灵魂缺位,无灵能等级' };
    // 职业锁定等级区间
    if (e === 'E30' && !['M2','M3','M4'].includes(code)) {
      return { ok:false, reason:'受批准灵能者等级区间:柔(M2)/约塔(M3)/卡帕(M4)' };
    }
    if (e === 'E31' && !['M3','M4','M5'].includes(code)) {
      return { ok:false, reason:'星语者必须够强以跨星通讯:约塔(M3)/卡帕(M4)/贝塔(M5)' };
    }
    if (e === 'E32' && !['M1','M2','M3'].includes(code)) {
      return { ok:false, reason:'未登记灵能者:高等级早已被察觉,仅限派(M1)/柔(M2)/约塔(M3)' };
    }
    if (e === 'E26' && !['M0','M1','M2','M3'].includes(code)) {
      return { ok:false, reason:'神秘学者可选灵能等级:缪(M0)/派(M1)/柔(M2)/约塔(M3),更高会被监正局重点监控' };
    }
    if (c === 'C3' && !['M2','M3','M4','M5'].includes(code)) {
      return { ok:false, reason:'领航者等级区间:柔(M2)/约塔(M3)/卡帕(M4)/贝塔(M5)' };
    }
    // M6 阿尔法:极度罕见,只允许 E32(未登记的隐藏 alpha)或 E26(神秘学者研究目标)/激进派立场
    if (code === 'M6') {
      const allowed = e === 'E32' || e === 'E26' || ['D6','D7','D8'].includes(d);
      if (!allowed) return { ok:false, reason:'阿尔法级灵能者需未登记身份(E32)、神秘学者(E26)或激进派立场支撑' };
    }
  }

  // ─── W 字段:主流派(条件性) ───
  if (field === 'W') {
    if (c === 'C2') return { ok:false, reason:'无知者灵魂缺位,无灵能流派' };
    // C3 领航者强制 W8 导航术
    if (c === 'C3' && code !== 'W8') {
      return { ok:false, reason:'领航者主流派固定为导航术(W8)' };
    }
    // 非领航者不能选导航术
    if (c !== 'C3' && code === 'W8') {
      return { ok:false, reason:'导航术仅限领航者血统(C3)' };
    }
    // E31 星语者强制 W1 感应术
    if (e === 'E31' && c !== 'C3' && code !== 'W1') {
      return { ok:false, reason:'星语者主流派固定为感应术(W1)' };
    }
    // W6 神圣恶魔学:Q2=B,需 D5 纯洁派立场 或 E23 翡翠龙战团修士 或 E26 神秘学者
    if (code === 'W6') {
      const allowed = d === 'D5' || ['E23','E26'].includes(e);
      if (!allowed) return { ok:false, reason:'神圣恶魔学需 D5 纯洁派授权,或 E23 翡翠龙修士 / E26 神秘学者身份' };
    }
    // W7 邪恶恶魔学:硬封禁规则
    if (code === 'W7') {
      if (d === 'D5') return { ok:false, reason:'纯洁派绝不容邪恶恶魔学' };
      if (d === 'D9') return { ok:false, reason:'火星正统派与恶魔学势不两立' };
      if (SISTER_PROFESSIONS.includes(e)) return { ok:false, reason:'修女会教条不容恶魔学' };
      if (ASTARTES.includes(e)) return { ok:false, reason:'忠诚战团不会教授邪恶恶魔学' };
    }
  }

  // ─── T 字段:副流派(M3 起开放,条件性) ───
  if (field === 'T') {
    if (c === 'C2') return { ok:false, reason:'无知者灵魂缺位,无副流派' };
    // T0 = 不选副流派,任何时候可点
    if (code === 'T0') return { ok:true };
    // M < M3 时禁选
    const mIdx = parseInt((state.M || 'M0').replace('M','')) || 0;
    if (mIdx < 3) {
      return { ok:false, reason:'副流派需 M3 约塔级(Iota)及以上等级解锁' };
    }
    // T 不能与 W 重复(T1-T7 对应 W1-W7)
    const tToW = { T1:'W1', T2:'W2', T3:'W3', T4:'W4', T5:'W5', T6:'W6', T7:'W7' };
    if (tToW[code] && tToW[code] === state.W) {
      return { ok:false, reason:'副流派不能与主流派相同' };
    }
    // T6 神圣恶魔学(副):同 W6 限制
    if (code === 'T6') {
      const allowed = d === 'D5' || ['E23','E26'].includes(e);
      if (!allowed) return { ok:false, reason:'神圣恶魔学(副)需 D5 纯洁派授权,或 E23 / E26 职业' };
    }
    // T7 邪恶恶魔学(副):同 W7 限制
    if (code === 'T7') {
      if (d === 'D5') return { ok:false, reason:'纯洁派绝不容邪恶恶魔学' };
      if (d === 'D9') return { ok:false, reason:'火星正统派与恶魔学势不两立' };
      if (SISTER_PROFESSIONS.includes(e)) return { ok:false, reason:'修女会教条不容恶魔学' };
      if (ASTARTES.includes(e)) return { ok:false, reason:'忠诚战团不会教授邪恶恶魔学' };
    }
  }

  if (field === 'S') {
    if (code === 'S23') return { ok:true };
    if (a === 'A19' && !['S8','S22','S23'].includes(code)) return { ok:false, reason:'欧姆巴佩11号只允许舰内或神甫居所开场' };
    if (a === 'A21' && !['S3','S8','S22','S23'].includes(code)) return { ok:false, reason:'哥利亚要塞只允许圣堂/舰内/神甫居所开场' };
    if (e && ALLOWED_S_BY_PROFESSION[e] && !ALLOWED_S_BY_PROFESSION[e].includes(code)) return { ok:false, reason:'该开场地点与当前职业不合' };
  }

  if (field === 'U') {
    if (code === 'U2' && nArr.includes('N1')) return { ok:false, reason:'"寻亲"与"家人仍在"逻辑矛盾' };
    if (code === 'U10' && nArr.length === 0) return { ok:false, reason:'"守护"必须有具体守护对象,请先选择羁绊' };
    if (code === 'U6' && (d === 'D1' || stanceTag(d) === 'iq' || stanceTag(d) === 'mech')) return { ok:false, reason:'"逃亡"与当前组织立场矛盾' };
    if (code === 'U12' && (ORG_PROFESSIONS_FOR_U12.includes(e) || c === 'C3' || c === 'C5')) return { ok:false, reason:'组织化身份不适合"漂泊"动机' };
    if (code === 'U14' && (e === 'E10' || ASTARTES.includes(e))) return { ok:false, reason:'当前职业不适合"猎艳"动机' };
    // [3] 无知者(C2)反灵能闭环:没有"灵性诅咒"可解
    if (code === 'U11' && c === 'C2') return { ok:false, reason:'无知者灵魂缺位,没有"灵性诅咒"可解' };
    // 阿斯塔特额外动机限制
    if (ASTARTES.includes(e)) {
      const astartesReasons = {
        U2: '阿斯塔特入会即抹除原生家庭记忆,不会"寻亲"',
        U4: '阿斯塔特无个人财产,"财富"动机不适用',
        U9: '阿斯塔特靠战功晋升,"野心"动机不适用',
        U12: '阿斯塔特受战团誓约约束,"漂泊"等同叛教',
        U13: '阿斯塔特无常人作息,"安分"动机不适用'
      };
      if (astartesReasons[code]) return { ok:false, reason: astartesReasons[code] };
    }
  }

// ─── N 字段(多选): N0互斥 + 亲密项与宗教誓言互斥 + 上限 ───
if (field === 'N') {
  // N0 = 无羁绊。永远允许点击，因为点击它会清空其他羁绊
  if (code === 'N0') {
    return { ok:true };
  }

  // 如果已经选择 N0，则禁止再选其他羁绊
  if (nArr.includes('N0')) {
    return { ok:false, reason:'已选择“无羁绊”，不能再选择其他羁绊' };
  }

  if (code === 'N1' && u === 'U2') {
    return { ok:false, reason:'"家人仍在"与"寻亲"矛盾' };
  }

  // [3] 无知者(C2)反灵能闭环:帝国教徒本能厌恶无知者,不会成为引路人
  if (code === 'N5' && c === 'C2') {
    return { ok:false, reason:'帝国教徒本能厌恶无知者,不会成为其引路人' };
  }

  // 亲密项 vs 阿斯塔特/修女会
  if (INTIMATE_BONDS.includes(code)) {
    if (ASTARTES.includes(e)) return { ok:false, reason:'阿斯塔特誓言禁欲,不可有亲密关系' };
    if (SISTER_PROFESSIONS.includes(e)) return { ok:false, reason:'修女会誓言禁欲,不可有亲密关系' };
    // 亲密关系子限制:最多 1 项
    const currentIntimate = nArr.filter(x => INTIMATE_BONDS.includes(x));
    if (!nArr.includes(code) && currentIntimate.length >= INTIMATE_MAX_PICKS) {
      return { ok:false, reason:`亲密关系最多选 ${INTIMATE_MAX_PICKS} 项,请先取消已选的亲密关系` };
    }
  }

  // 上限校验
  if (!nArr.includes(code) && nArr.length >= N_MAX_PICKS) {
    return { ok:false, reason:`羁绊最多选 ${N_MAX_PICKS} 项,请先取消已选项` };
  }
}

  // ─── P 字段(异形命运) ───
  const selectedP = field === 'P' ? code : p;
  if (selectedP && XENOS_FATE_PERSONS.includes(selectedP)) {
    const selectedD = field === 'D' ? code : d;
    const selectedE = field === 'E' ? code : e;
    const selectedA = field === 'A' ? code : a;
    const selectedK = field === 'K' ? [...kArr, code].filter((v,i,arr)=>arr.indexOf(v)===i) : kArr;
    const selectedL = field === 'L' ? [...lArr, code].filter((v,i,arr)=>arr.indexOf(v)===i) : lArr;
    const selectedN = field === 'N' ? [...nArr, code].filter((v,i,arr)=>arr.indexOf(v)===i) : nArr;

    if (XENOS_HARD_BAN_STANCES.includes(selectedD)) {
      return { ok:false, reason:'当前立场不会容忍异形命运之人' };
    }
    if (XENOS_HARD_BAN_PROFESSIONS.includes(selectedE)) {
      return { ok:false, reason:'当前职业会将其视为猎杀或审讯目标' };
    }

    const hasXenosAccess =
      XENOS_CONTACT_STANCES.includes(selectedD) ||
      XENOS_CONTACT_PROFESSIONS.includes(selectedE) ||
      XENOS_CONTACT_ORIGINS.includes(selectedA) ||
      selectedK.some(k => XENOS_CONTACT_RESOURCES.includes(k)) ||
      selectedL.some(l => XENOS_CONTACT_SECRETS.includes(l)) ||
      selectedN.some(n => XENOS_CONTACT_BONDS.includes(n));

    if (!hasXenosAccess) {
      return { ok:false, reason:'缺少接触异形命运之人的合理入口' };
    }
  }

  return { ok:true };
}

function getWarnings() {
  const warnings = [];
  for (const f of PANEL_ORDER) {
    if (f === 'K' || f === 'N' || f === 'L') {
      // 多选字段: 检查每个已选项
      const arr = asArray(state[f]);
      for (const code of arr) {
        const check = isOptionAllowed(f, code);
        if (!check.ok) warnings.push(`${code}: ${check.reason}`);
      }
    } else {
      const check = isOptionAllowed(f, state[f]);
      if (!check.ok) warnings.push(`${f}${state[f]?.replace(/^[A-Z]/,'')}: ${check.reason}`);
    }
  }
  // 灵能档案字段(条件性):M / W / T 需在面板触发时校验
  const isPsykerProf = ['E30','E31','E32'].includes(state.E);
  const isNavigator = state.C === 'C3';
  if (isPsykerProf || isNavigator) {
    if (state.M) {
      const mCheck = isOptionAllowed('M', state.M);
      if (!mCheck.ok) warnings.push(`${state.M}: ${mCheck.reason}`);
    } else {
      warnings.push('灵能档案未声明等级(M)。');
    }
    if (state.W) {
      const wCheck = isOptionAllowed('W', state.W);
      if (!wCheck.ok) warnings.push(`${state.W}: ${wCheck.reason}`);
    } else {
      warnings.push('灵能档案未声明主流派(W)。');
    }
    if (state.T && state.T !== 'T0') {
      const tCheck = isOptionAllowed('T', state.T);
      if (!tCheck.ok) warnings.push(`${state.T}: ${tCheck.reason}`);
    }
  }
  if (state.B === 'B1' && !state.NAME.trim()) warnings.unshift('你选择了自定义名字,但还没有填写名字。');
  if (state.H === 'H25' && !state.H_CUSTOM.trim()) warnings.unshift('你选择了自定义出身,但还没有填写内容。');
  if (state.S === 'S23' && !state.S_CUSTOM.trim()) warnings.unshift('你选择了自定义场景,但还没有填写内容。');
  if ((state.E === 'E21' || state.E === 'E24') && !state.E21_CHAPTER) warnings.unshift('阿斯塔特修士需指定母战团/基因种子来源。');
  return warnings;
}

// [17] 分级警告:hard(硬冲突,阻止流程) / soft(lore 摩擦,允许但警告) / flavor(风味提示)
function getLoreWarnings() {
  const list = [];
  // 硬冲突复用 getWarnings
  getWarnings().forEach(msg => list.push({ level:'hard', message: msg }));

  const lArr = asArray(state.L);
  const kArr = asArray(state.K);

  // [12] K15 持有本身即为定罪证据
  if (kArr.includes('K15')) {
    list.push({ level:'soft', message:'K15 异端嫌疑物 · 持有本身即可被审判庭定罪,请谨慎暴露。' });
  }
  // 高风险 L 项的隐性提示
  if (lArr.includes('L9')) {
    list.push({ level:'soft', message:'L9 潜伏异常 · 随剧情推进可能显化,后果不可控。' });
  }
  if (lArr.includes('L14')) {
    list.push({ level:'soft', message:'L14 非人低语 · 长期接触可能滑向灵能腐化。' });
  }
  if (lArr.includes('L15')) {
    list.push({ level:'soft', message:'L15 异形遗物 · 持有非审判庭认证的异形物即为重罪。' });
  }
  if (lArr.includes('L24')) {
    list.push({ level:'soft', message:'L24 技术弊病第二阶 · 若被察觉,与正式异端无异。' });
  }
  if (lArr.includes('L25')) {
    list.push({ level:'soft', message:'L25 第三阶禁忌线索 · 极度危险,任何泄露都可能引来焚化处决。' });
  }

  // 风味提示(flavor):仅在路线高度凝聚时触发,用于鼓励
  if (state.C === 'C5' && state.E === 'E33') {
    list.push({ level:'flavor', message:'机械神教培育人 + 初级神甫 · 火星教条路线纯度极高。' });
  }
  if ((state.E === 'E21' || state.E === 'E24') && state.E21_CHAPTER) {
    const label = DEATHWATCH_CHAPTERS.find(([c]) => c === state.E21_CHAPTER)?.[1] || state.E21_CHAPTER;
    const tag = state.E === 'E21' ? '死亡守望母战团' : '初创子团基因种子来源';
    list.push({ level:'flavor', message:`${tag}已锁定:${label}。剧情会沿该战团文化展开。` });
  }

  // 灵能档案相关警告
  if (state.W === 'W7') {
    list.push({ level:'soft', message:'W7 邪恶恶魔学 · 持有此流派本身即为可处决的异端罪证,任何泄露都将引来焚化。' });
  }
  if (state.T === 'T7') {
    list.push({ level:'soft', message:'T7 邪恶恶魔学(副) · 副修恶魔学不会减轻处罚,审判庭一视同仁。' });
  }
  if (state.M === 'M6') {
    list.push({ level:'soft', message:'M6 阿尔法级 · 此等级灵能者会被审判庭终生追踪,亚空间反弹与恶魔注视风险极高。' });
  }
  if (state.E === 'E32' && state.W === 'W7') {
    list.push({ level:'soft', message:'未登记灵能者 + 邪恶恶魔学 · 双重通缉,任何接触审判庭体系都将立即定罪。' });
  }
  if (asArray(state.L).includes('L14') && (state.W === 'W7' || state.T === 'T7')) {
    list.push({ level:'soft', message:'L14 非人低语 + 恶魔学路线 · 腐化轨迹高度凝聚,玩家应预判堕落剧情。' });
  }

  // 风味提示
  if (state.C === 'C3' && state.W === 'W8') {
    list.push({ level:'flavor', message:'领航者血统 + 导航术 · 标准世系路线,可在亚空间航行中扮演核心角色。' });
  }
  if (state.E === 'E31' && state.W === 'W1' && state.M) {
    list.push({ level:'flavor', message:`星语者 + 感应术 + ${state.M} · 跨星通讯专长,适合作为剧情信息节点。` });
  }
  if ((state.E === 'E23' || state.E === 'E26') && state.W === 'W6') {
    list.push({ level:'flavor', message:'神圣恶魔学持有者 · 罕见的合法驱魔者,审判庭/灰骑士体系核心战力。' });
  }

  return list;
}

function buildPayload() {
  // K/L/N 是数组,其他单值
  const codes = PANEL_ORDER.map((field) => {
    if (field === 'K' || field === 'N' || field === 'L') {
      const arr = asArray(state[field]);
      return arr.length ? arr.join(' ') : `${field}0`;  // 空数组用 K0/L0/N0 代表"无"
    }
    return state[field];
  }).join(' ');
  const extra = [];
  if (state.B === 'B1' && state.NAME.trim()) extra.push(`名字:${state.NAME.trim()}`);
  if (state.H === 'H25' && state.H_CUSTOM.trim()) extra.push(`自定义出身:${state.H_CUSTOM.trim()}`);
  if (state.S === 'S23' && state.S_CUSTOM.trim()) extra.push(`自定义开场地点:${state.S_CUSTOM.trim()}`);
  if ((state.E === 'E21' || state.E === 'E24') && state.E21_CHAPTER) {
    const chapterLabel = DEATHWATCH_CHAPTERS.find(([c]) => c === state.E21_CHAPTER)?.[1] || state.E21_CHAPTER;
    const tag = state.E === 'E21' ? '母战团' : '基因种子来源';
    extra.push(`${tag}:${state.E21_CHAPTER} · ${chapterLabel}`);
  }
  // 灵能档案:只在 M 已声明时输出
  if (state.M) {
    const mLabel = getOptionLabel('M', state.M);
    const wLabel = state.W ? getOptionLabel('W', state.W) : '(未声明主流派)';
    const tLabel = (state.T && state.T !== 'T0') ? getOptionLabel('T', state.T) : '(无副流派)';
    extra.push(`灵能档案:${state.M}·${mLabel.split(' / ')[0]} · ${state.W || 'W-'}·${wLabel.split(' / ')[0]} · ${state.T || 'T0'}·${tLabel.split('（')[0].trim()}`);
  }
  if (state.EXTRA.trim()) extra.push(`额外补充:${state.EXTRA.trim()}`);
  return extra.length ? `${codes}\n${extra.join('\n')}` : codes;
}

function summaryValue(field) {
  if (field === 'K' || field === 'N' || field === 'L') {
    const arr = asArray(state[field]);
    if (!arr.length) {
      if (field === 'K') return '(未选择资源)';
      if (field === 'L') return '(无秘密)';
      return '(无羁绊)';
    }
    return arr.map(code => `${code} · ${getOptionLabel(field, code)}`).join('  /  ');
  }
  const label = getOptionLabel(field, state[field]);
  if (field === 'B') return state.B === 'B1' ? `B1 · ${state.NAME.trim() || '(未填写)'}` : 'B0 · 默认({{user}})';
  if (field === 'H' && state.H === 'H25') return `H25 · ${state.H_CUSTOM.trim() || '(未填写)'}`;
  if (field === 'S' && state.S === 'S23') return `S23 · ${state.S_CUSTOM.trim() || '(未填写)'}`;
  if (field === 'E' && (state.E === 'E21' || state.E === 'E24')) {
    const chapterCode = state.E21_CHAPTER;
    const tag = state.E === 'E21' ? '母战团' : '基因种子';
    const chapterLabel = chapterCode ? (DEATHWATCH_CHAPTERS.find(([c]) => c === chapterCode)?.[1] || chapterCode) : `(未指定${tag})`;
    return `${state.E} · ${label} / ${tag}:${chapterLabel}`;
  }
  return `${state[field]} · ${label}`;
}
function buildSummaryRows() {
  const rows = [['名字', summaryValue('B')], ['血统', summaryValue('C')], ['年龄', summaryValue('F')], ['性别', summaryValue('G')], ['外貌', summaryValue('I')], ['身体', summaryValue('Q')], ['星界', summaryValue('A')], ['背景', summaryValue('H')], ['立场', summaryValue('D')], ['职业', summaryValue('E')], ['资源', summaryValue('K')], ['秘密', summaryValue('L')], ['羁绊', summaryValue('N')], ['命运将至之人', summaryValue('P')], ['开场', summaryValue('S')], ['动机', summaryValue('U')], ['节奏', summaryValue('V')], ['主线', summaryValue('J')]];
  // 灵能档案行(仅触发时)
  if (state.M) {
    const mLabel = getOptionLabel('M', state.M);
    const wLabel = state.W ? getOptionLabel('W', state.W) : '(未声明)';
    const tLabel = (state.T && state.T !== 'T0') ? getOptionLabel('T', state.T) : '(无副流派)';
    rows.push(['灵能等级', `${state.M} · ${mLabel.split('（')[0].trim()}`]);
    rows.push(['主流派',   state.W ? `${state.W} · ${wLabel.split('（')[0].trim()}` : '(未声明)']);
    rows.push(['副流派',   (state.T && state.T !== 'T0') ? `${state.T} · ${tLabel.split('（')[0].trim()}` : '(无 / 未解锁)']);
  }
  return rows;
}

function getRouteHintRows() {
  if (state.C === 'C5') {
    const mechSecret = asArray(state.L).find(isMechSecret);
    return [['路线','机械神教路线'], ['神学立场', getOptionLabel('D', state.D)], ['职务序列', getOptionLabel('E', state.E)], ['技术风险', mechSecret ? getOptionLabel('L', mechSecret) : '未显性建档']];
  }
  // 灵能者路线(优先级高于审判庭相关,因为 E30/E31/E32 即使在审判庭体系下也是灵能者本位)
  if (PSYKER_PROFESSIONS.includes(state.E) || state.C === 'C3') {
    const rows = [['路线', state.C === 'C3' ? '领航者(灵能)' : '灵能者风险']];
    rows.push(['身份', state.C === 'C3' ? '领航者血统 / C3' : getOptionLabel('E', state.E)]);
    if (state.M) {
      const mLabel = getOptionLabel('M', state.M);
      rows.push(['等级', `${state.M} · ${mLabel.split('（')[0].trim()}`]);
    }
    if (state.W) {
      const wLabel = getOptionLabel('W', state.W);
      rows.push(['主流派', `${state.W} · ${wLabel.split(' / ')[0]}`]);
    }
    if (state.T && state.T !== 'T0') {
      rows.push(['副流派', `${state.T} · ${getOptionLabel('T', state.T).split('（')[0].trim()}`]);
    }
    rows.push(['监察', state.E === 'E32' ? '未登记,极高风险' : (state.C === 'C3' ? '领航者世系自治' : '受帝国黑舰祝圣')]);
    return rows;
  }
  if (stanceTag(state.D) === 'iq' || IQ_PROFESSIONS.includes(state.E)) return [['路线','审判庭相关'], ['立场', getOptionLabel('D', state.D)], ['职务', getOptionLabel('E', state.E)], ['风险','需服从审判庭档案与保密层级']];
  if (ASTARTES.includes(state.E)) return [['路线','阿斯塔特'], ['战团/编制', getOptionLabel('E', state.E)], ['限制','正常人类 / 男性 / 非穿越者']];
  return [['路线','帝国公民 / 灰色边缘'], ['立场', getOptionLabel('D', state.D)], ['职业', getOptionLabel('E', state.E)], ['开场', getOptionLabel('S', state.S)], ['节奏', getOptionLabel('V', state.V)]];
}

function canProceedFromPage(page) {
  const fields = PAGE_FIELDS[page] || [];
  if (fields.includes('B') && state.B === 'B1' && !state.NAME.trim()) return { ok:false, message:'请先填写自定义名字,或改回默认名字。' };
  if (fields.includes('H') && state.H === 'H25' && !state.H_CUSTOM.trim()) return { ok:false, message:'请填写自定义出身,或选择固定出身。' };
  if (fields.includes('S') && state.S === 'S23' && !state.S_CUSTOM.trim()) return { ok:false, message:'请填写自定义开场地点,或选择固定开场地点。' };
  if (fields.includes('E') && (state.E === 'E21' || state.E === 'E24') && !state.E21_CHAPTER) return { ok:false, message:'请为阿斯塔特修士选择母战团/基因种子来源,或改选其他职业。' };
  // 灵能档案必填(Page 3 触发):E30/E31/E32 灵能职业,或 C3 领航者
  if (fields.includes('E')) {
    const needsPsyker = ['E30','E31','E32'].includes(state.E) || state.C === 'C3';
// 注意:E26神秘学者**可选**填灵能,不强制
    if (needsPsyker) {
      if (!state.M) return { ok:false, message:'灵能档案未声明等级(M),请在加密档案面板中选择。' };
      if (!state.W) return { ok:false, message:'灵能档案未声明主流派(W),请在加密档案面板中选择。' };
    }
  }
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
function loadDraftState() {
  try {
    const ctx = getCtx();
    const saved = ctx.chatMetadata?.[getMetaKey('draft')];
    const page = ctx.chatMetadata?.[getMetaKey('page')];
    state = saved && typeof saved === 'object' ? { ...DEFAULT_STATE, ...saved } : { ...DEFAULT_STATE };
    // 兼容旧版本: K/N 之前是 string,自动转成 array
    if (typeof state.K === 'string') {
      state.K = state.K && state.K !== 'K0' ? [state.K] : [];
    } else if (!Array.isArray(state.K)) {
      state.K = [];
    }
    if (typeof state.N === 'string') {
      state.N = state.N && state.N !== 'N0' ? [state.N] : [];
    } else if (!Array.isArray(state.N)) {
      state.N = [];
    }
    // 兼容旧的 I3 默认值(改成 I1)
    if (state.I === 'I3' && saved && !saved.I) state.I = 'I1';
    // 旧的 P32 自定义如果残留,降级为 P0
    if (state.P === 'P32') state.P = 'P0';
    currentPage = typeof page === 'number' ? page : 0;
  } catch (_) {
    state = { ...DEFAULT_STATE };
    currentPage = 0;
  }
}
async function clearDraftState() { const ctx = getCtx(); delete ctx.chatMetadata[getMetaKey('draft')]; delete ctx.chatMetadata[getMetaKey('page')]; await ctx.saveMetadata?.(); }
async function markBuilderShown() { const ctx = getCtx(); ctx.chatMetadata[getMetaKey('shown')] = true; await ctx.saveMetadata?.(); }

function resetState() { state = { ...DEFAULT_STATE }; currentPage = 0; saveDraftState(); render(); scrollPanelsToTop(); }
function closeBuilder() {
  overlay?.classList.remove('open');
  if (overlay) {
    overlay.style.setProperty('display', 'none', 'important');
  }
  if (launcher) {
    launcher.textContent = '[⚔ 角色创建器]';
    forceShowLauncher();
  }
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
}

// 暴力把 overlay 和 modal 的关键样式全用内联+!important 写死
function forceShowOverlay() {
  if (!overlay) return;

  const vh = window.innerHeight;
  const vw = window.innerWidth;
  const isMobile = vw <= 768;

  const o = overlay.style;
  o.setProperty('display', 'flex', 'important');
  o.setProperty('position', 'fixed', 'important');
  o.setProperty('top', '0', 'important');
  o.setProperty('left', '0', 'important');
  o.setProperty('width', '100vw', 'important');
  o.setProperty('height', `${vh}px`, 'important');
  o.setProperty('z-index', '2147483646', 'important');
  o.setProperty('background', 'rgba(0,0,0,0.82)', 'important');
  o.setProperty('visibility', 'visible', 'important');
  o.setProperty('opacity', '1', 'important');
  o.setProperty('pointer-events', 'auto', 'important');

  // 关键：PC端不再全屏，而是居中小窗口；手机端仍然全屏，避免太挤
  o.setProperty('align-items', 'center', 'important');
  o.setProperty('justify-content', 'center', 'important');
  o.setProperty('padding', isMobile ? '0' : '16px', 'important');
  o.setProperty('box-sizing', 'border-box', 'important');

  const modal = overlay.querySelector('.wh40k-builder-modal');
  if (modal) {
    const m = modal.style;

    if (isMobile) {
      m.setProperty('width', '100vw', 'important');
      m.setProperty('height', `${vh}px`, 'important');
      m.setProperty('max-width', '100vw', 'important');
      m.setProperty('max-height', `${vh}px`, 'important');
      m.setProperty('border-radius', '0', 'important');
    } else {
      // 想再小一点，就把 88vw / 86vh 改成 82vw / 80vh
      m.setProperty('width', 'min(1680px, 94vw)', 'important');
      m.setProperty('height', 'min(920px, 90vh)', 'important');
      m.setProperty('max-width', '1680px', 'important');
      m.setProperty('max-height', '920px', 'important');
    }

    m.setProperty('margin', '0', 'important');
    m.setProperty('display', 'flex', 'important');
    m.setProperty('flex-direction', 'column', 'important');
    m.setProperty('overflow', 'hidden', 'important');
    m.setProperty('box-sizing', 'border-box', 'important');
  }

  const main = overlay.querySelector('.wh40k-builder-main');
  if (main) {
    main.style.setProperty('flex', '1 1 0', 'important');
    main.style.setProperty('min-height', '0', 'important');
    main.style.setProperty('overflow-y', 'auto', 'important');
  }

  ['.wh40k-builder-header', '.wh40k-builder-progress', '.wh40k-builder-footer'].forEach(sel => {
    const el = overlay.querySelector(sel);
    if (el) el.style.setProperty('flex-shrink', '0', 'important');
  });
}

// 视口变化时重新调整高度(地址栏出现/消失、横竖屏切换都会触发)
let __wh40kResizeBound = false;
function bindResizeOnce() {
  if (__wh40kResizeBound) return;
  __wh40kResizeBound = true;
  const handler = () => {
    if (overlay && overlay.classList.contains('open')) {
      forceShowOverlay();
    }
  };
  window.addEventListener('resize', handler);
  window.addEventListener('orientationchange', handler);
}

// 自检: 仅在 overlay 真的渲染异常时打印到 console (不再弹 alert 打扰用户)
function diagnoseOverlay() {
  if (!overlay) {
    console.warn('[wh40k] overlay element missing');
    return;
  }
  const rect = overlay.getBoundingClientRect();
  const cs = window.getComputedStyle(overlay);
  if (cs.display === 'none' || rect.width < 50 || rect.height < 50) {
    console.warn('[wh40k] overlay render issue', {
      display: cs.display,
      width: rect.width,
      height: rect.height,
      zIndex: cs.zIndex
    });
  }
}

function openBuilder(forcePage = null) {
  if (!overlay) createOverlay();
  loadDraftState();
  if (typeof forcePage === 'number') currentPage = forcePage;
  render();
  overlay.classList.add('open');

  // 暴力强制可见
  forceShowOverlay();
  // 绑定一次性的视口变化监听(地址栏出现消失会触发,自动重算高度)
  bindResizeOnce();

  if (launcher) {
    launcher.textContent = '[✕ 关闭终端]';
    forceShowLauncher();
  }
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';

  // 100ms 后自检
  setTimeout(diagnoseOverlay, 150);
}

function injectChatStyles() { return; }
function injectBuilderEnhancementStyles() {
  // 样式已分离到 style.css。
  // 这里保持空函数，避免 JS 注入大段 CSS 与移动端/PC端布局互相污染。
  return;
}

function triggerTerminalFlash(type = 'normal') {
  // 已关闭点击闪屏效果。保留空函数，避免点击逻辑报错。
  return;
}

function forceShowLauncher() {
  if (!launcher) return;
  // 如果用户已经选择隐藏,则不强制显示
  if (localStorage.getItem('wh40k-launcher-hidden') === '1') {
    launcher.style.setProperty('display', 'none', 'important');
    return;
  }
  launcher.style.setProperty('position', 'fixed', 'important');
  launcher.style.setProperty('top', '64px', 'important');
  launcher.style.setProperty('right', '12px', 'important');
  launcher.style.setProperty('z-index', '1000000', 'important');
  launcher.style.setProperty('display', 'block', 'important');
  launcher.style.setProperty('visibility', 'visible', 'important');
  launcher.style.setProperty('opacity', '1', 'important');
  launcher.style.setProperty('pointer-events', 'auto', 'important');
}

function hideLauncher() {
  if (!launcher) return;
  localStorage.setItem('wh40k-launcher-hidden', '1');
  launcher.style.setProperty('display', 'none', 'important');
}

function showLauncher() {
  localStorage.removeItem('wh40k-launcher-hidden');
  if (launcher) forceShowLauncher();
}

// 暴露恢复入口到全局,PC玩家可在浏览器控制台输入 wh40kShowLauncher() 恢复
window.wh40kShowLauncher = showLauncher;
window.wh40kHideLauncher = hideLauncher;

// URL Hash 触发恢复——手机端用户可在地址栏添加 #wh40k-show 刷新页面恢复
function checkHashTrigger() {
  if (location.hash === '#wh40k-show') {
    showLauncher();
    // 清除 hash,避免反复触发
    history.replaceState(null, '', location.pathname + location.search);
    setTimeout(() => alert('角色创建器入口已恢复。'), 100);
  }
}
checkHashTrigger();
window.addEventListener('hashchange', checkHashTrigger);

function makeLauncher() {
  if (launcher) launcher.remove();
  launcher = document.createElement('button');
  launcher.id = 'wh40k-builder-launcher';
  launcher.type = 'button';
  launcher.textContent = '[⚔ 角色创建器]';
  launcher.title = '左键/点击 打开 · 右键/长按 隐藏';
  forceShowLauncher();

  // 左键/点击:打开/关闭
  launcher.addEventListener('click', (e) => {
    // 如果是长按触发的"伪 click",忽略
    if (launcher._longPressTriggered) {
      launcher._longPressTriggered = false;
      e.preventDefault();
      return;
    }
    overlay?.classList.contains('open') ? closeBuilder() : openBuilder();
  });

  // PC端:右键隐藏
  launcher.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    promptHideLauncher();
  });

  // 移动端:长按 600ms 隐藏
  let longPressTimer = null;
  launcher.addEventListener('touchstart', (e) => {
    longPressTimer = setTimeout(() => {
      launcher._longPressTriggered = true;
      promptHideLauncher();
    }, 600);
  }, { passive: true });

  launcher.addEventListener('touchend', () => {
    if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null; }
  });

  launcher.addEventListener('touchmove', () => {
    if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null; }
  });

  launcher.addEventListener('touchcancel', () => {
    if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null; }
  });

  document.body.appendChild(launcher);
  forceShowLauncher();
}

function promptHideLauncher() {
  const isMobile = window.innerWidth <= 768;
  const recoverHint = isMobile
    ? '隐藏后如需恢复,请在浏览器地址栏当前网址末尾添加:\n#wh40k-show\n然后刷新页面即可恢复。'
    : '隐藏后如需恢复,请在浏览器控制台(F12)输入:\nwh40kShowLauncher()\n然后回车。\n\n或在地址栏当前网址末尾添加 #wh40k-show 后刷新页面。';
  if (confirm('确认隐藏角色创建器入口?\n\n' + recoverHint)) {
    hideLauncher();
  }
}
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
  for (let i=1;i<=total;i++) { const dot=document.createElement('button'); dot.type='button'; dot.className='wh40k-dot'; if(i===currentPage)dot.classList.add('active'); else if(i<currentPage)dot.classList.add('done'); if(i===6)dot.classList.add('anomaly'); dot.textContent=i===6?'?':String(i); dot.addEventListener('click',()=>{ if(i>currentPage){ for(let p=currentPage;p<i;p++){ const r=canProceedFromPage(p); if(!r.ok){ alert(r.message); return; } } } currentPage=i; saveDraftState(); render(); scrollPanelsToTop(); }); dots.appendChild(dot); }
}

function makeOptionButton(field, code, label) {
  const isMulti = (field === 'K' || field === 'N' || field === 'L');
  const arr = isMulti ? asArray(state[field]) : null;
  const active = isMulti ? arr.includes(code) : (state[field] === code);
  const check = isOptionAllowed(field, code);

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'wh40k-option';
  if (field === 'J') btn.classList.add('anomaly');
  if (active) btn.classList.add('active');
  // 多选场景下: 已选中的项始终可点击(用于取消),未选且不允许的禁用
  if (!check.ok && !active) {
    btn.classList.add('disabled');
    btn.title = check.reason;
  }

  btn.innerHTML = `<span class="wh40k-option-code">${escapeHtml(code)}</span><span class="wh40k-option-label">${escapeHtml(label)}</span>${(!check.ok && !active) ? `<span class="wh40k-option-badge">⊘ ${escapeHtml(check.reason)}</span>` : ''}`;

btn.addEventListener('click', () => {
  if (isMulti) {
    const cur = asArray(state[field]);

    // N0 = 无羁绊：点击后清空其他 N，只保留 N0；再次点击则取消 N0
    if (field === 'N' && code === 'N0') {
      state.N = cur.includes('N0') ? [] : ['N0'];
      saveDraftState();
      render();
      return;
    }

    // N 字段：选择其他羁绊时，自动移除 N0
    if (field === 'N') {
      const cleaned = cur.filter(v => v !== 'N0');

      if (cleaned.includes(code)) {
        state.N = cleaned.filter(v => v !== code);
      } else {
        if (!check.ok) {
          triggerTerminalFlash('red');
          return;
        }
        state.N = [...cleaned, code];
      }

      saveDraftState();
      render();
      return;
    }

    // L0 = 无秘密：点击后清空其他 L，只保留 L0；再次点击则取消 L0
    if (field === 'L' && code === 'L0') {
      state.L = cur.includes('L0') ? [] : ['L0'];
      saveDraftState();
      render();
      return;
    }

    // L 字段：选择其他秘密时，自动移除 L0
    if (field === 'L') {
      const cleaned = cur.filter(v => v !== 'L0');

      if (cleaned.includes(code)) {
        state.L = cleaned.filter(v => v !== code);
      } else {
        if (!check.ok) {
          triggerTerminalFlash('red');
          return;
        }
        state.L = [...cleaned, code];
      }

      saveDraftState();
      render();
      return;
    }

    // 其他多选字段，例如 K，保持原逻辑
    if (cur.includes(code)) {
      state[field] = cur.filter(v => v !== code);
    } else {
      if (!check.ok) {
        triggerTerminalFlash('red');
        return;
      }
      state[field] = [...cur, code];
    }

    saveDraftState();
    render();
  } else {
    // 单选项逻辑
    if (!check.ok && !active) {
      triggerTerminalFlash('red');
      return;
    }

    triggerTerminalFlash(field === 'J' ? 'red' : 'normal');
    state[field] = code;
    saveDraftState();
    render();
  }
});
  return btn;
}
function makeCustomBox(field) {
  const map = { H:['H25','H_CUSTOM','自定义出身'], S:['S23','S_CUSTOM','自定义开场地点'] };
  const cfg = map[field]; if(!cfg) return null; const [code,key,title]=cfg;
  const box = document.createElement('div'); box.className = `wh40k-custom-box ${state[field]===code?'show':''}`; box.innerHTML = `<textarea rows="4" placeholder="${title}" >${escapeHtml(state[key]||'')}</textarea>`;
  box.querySelector('textarea').addEventListener('input', e => { state[key]=e.target.value; saveDraftState(); renderFooterWarnings(); }); return box;
}
function makeFieldSection(field) {
  const wrap = document.createElement('section'); wrap.className='wh40k-section'; if(field==='J')wrap.classList.add('anomaly');
  // 多选字段加额外提示
  let multiHint = '';
  if (field === 'K') {
    const picked = asArray(state.K).length;
    multiHint = `<div style="font-size:11px;color:#ffb84d;margin-bottom:6px;">[ 多选 · 已选 ${picked} / ${K_MAX_PICKS} 项 · 同分类内互斥 ]</div>`;
  } else if (field === 'N') {
    const picked = asArray(state.N).length;
    multiHint = `<div style="font-size:11px;color:#ffb84d;margin-bottom:6px;">[ 多选 · 已选 ${picked} / ${N_MAX_PICKS} 项 · 再次点击可取消 ]</div>`;
  } else if (field === 'L') {
    const picked = asArray(state.L).length;
    multiHint = `<div style="font-size:11px;color:#ffb84d;margin-bottom:6px;">[ 多选 · 已选 ${picked} / ${L_MAX_PICKS} 项 · 再次点击可取消 ]</div>`;
  }
  wrap.innerHTML = `<h3>&gt; ${escapeHtml(FIELD_TITLES[field])}</h3><div style="font-size:12px;color:#a89072;line-height:1.6;margin-bottom:10px;">${escapeHtml(FIELD_DESCRIPTIONS[field]||'')}</div>${multiHint}`;
  const options = document.createElement('div'); options.className='wh40k-options'; OPTIONS[field].forEach(([c,l])=>options.appendChild(makeOptionButton(field,c,l))); wrap.appendChild(options);
  if(field==='B'){ const box=document.createElement('div'); box.className=`wh40k-name-box ${state.B==='B1'?'show':''}`; box.innerHTML=`<input type="text" placeholder="输入角色名字" value="${escapeHtml(state.NAME)}">`; box.querySelector('input').addEventListener('input',e=>{ state.NAME=e.target.value; saveDraftState(); renderFooterWarnings(); }); wrap.appendChild(box); }

  // [2] E21 死亡守望 + E24 初创子团:必须选择母战团/基因种子来源
  if (field === 'E') {
    const showChapter = state.E === 'E21' || state.E === 'E24';

    // 自动清理:E24 下若已选了子团,自动清空(防止脏状态)
    if (state.E === 'E24' && state.E21_CHAPTER && SUB_CHAPTERS.includes(state.E21_CHAPTER)) {
      state.E21_CHAPTER = '';
      saveDraftState();
    }

    const chapterBox = document.createElement('div');
    chapterBox.className = `wh40k-chapter-box ${showChapter ? 'show' : ''}`;
    chapterBox.style.cssText = `margin-top:14px;padding:10px;border:1px dashed #6a4a2a;background:rgba(60,40,20,0.2);display:${showChapter ? 'block' : 'none'};`;
    if (showChapter) {
      const hint = document.createElement('div');
      hint.style.cssText = 'font-size:11px;color:#ffb84d;margin-bottom:8px;';
      const sel = state.E21_CHAPTER ? `已选:${state.E21_CHAPTER}` : '请选择';
      const hintText = state.E === 'E21'
        ? `※ 死亡守望由各战团借调修士,请指定来源 [${sel}]`
        : `※ 初创子团修士的基因种子来自某一母战团,只能选首批战团(已隐藏子团) [${sel}]`;
      hint.textContent = hintText;
      chapterBox.appendChild(hint);

      // E24 下过滤掉子团
      const availableChapters = state.E === 'E24'
        ? DEATHWATCH_CHAPTERS.filter(([code]) => !SUB_CHAPTERS.includes(code))
        : DEATHWATCH_CHAPTERS;

      const grid = document.createElement('div');
      grid.className = 'wh40k-options';
      availableChapters.forEach(([code, label]) => {
        const cbtn = document.createElement('button');
        cbtn.type = 'button';
        cbtn.className = 'wh40k-option';
        if (state.E21_CHAPTER === code) cbtn.classList.add('active');
        cbtn.innerHTML = `<span class="wh40k-option-code">${escapeHtml(code)}</span><span class="wh40k-option-label">${escapeHtml(label)}</span>`;
        cbtn.addEventListener('click', () => {
          state.E21_CHAPTER = state.E21_CHAPTER === code ? '' : code;
          saveDraftState();
          render();
        });
        grid.appendChild(cbtn);
      });
      chapterBox.appendChild(grid);
    }
    wrap.appendChild(chapterBox);
  }

  const custom = makeCustomBox(field); if(custom) wrap.appendChild(custom);
  return wrap;
}

// ─── 灵能档案面板(条件性渲染) ───
// 触发条件:E ∈ {E30,E31,E32} 或 C === 'C3'(领航者)
// 硬封锁:C === 'C2'(无知者,面板永不显示)
function makePsykerPanel() {
  const isPsykerProf = ['E30','E31','E32'].includes(state.E);
  const isMystic = state.E === 'E26';  // 神秘学者可选触发
  const isNavigator = state.C === 'C3';
  const shouldShow = isPsykerProf || isMystic || isNavigator;
  const hardBlock = state.C === 'C2';

  // 自动清理:不该有灵能数据时,清空 M/W/T
  if (!shouldShow || hardBlock) {
    if (state.M || state.W || (state.T && state.T !== 'T0')) {
      state.M = ''; state.W = ''; state.T = 'T0';
      saveDraftState();
    }
    return null;
  }

  // 自动修正:E31 星语者强制 W1,C3 领航者强制 W8(以 C3 优先)
  if (isNavigator && state.W && state.W !== 'W8') { state.W = 'W8'; saveDraftState(); }
  if (state.E === 'E31' && !isNavigator && state.W && state.W !== 'W1') { state.W = 'W1'; saveDraftState(); }

  // 自动修正:T 重复了 W 或 M 不够,清空 T
  const mIdx = parseInt((state.M || 'M0').replace('M','')) || 0;
  if (mIdx < 3 && state.T !== 'T0') { state.T = 'T0'; saveDraftState(); }
  const tToW = { T1:'W1', T2:'W2', T3:'W3', T4:'W4', T5:'W5', T6:'W6', T7:'W7' };
  if (state.T && tToW[state.T] && tToW[state.T] === state.W) { state.T = 'T0'; saveDraftState(); }

  // 容器:双线红边框 + 加密档案标题
  const section = document.createElement('section');
  section.className = 'wh40k-section wh40k-psyker-section';
  section.style.cssText = `
    border: 2px double #c92030;
    background: rgba(80, 20, 30, 0.12);
    padding: 14px;
    margin-top: 16px;
    position: relative;
  `;

  const trigger = isNavigator ? '领航者血统(C3)' : `灵能职业(${state.E})`;
  section.innerHTML = `
    <h3 style="color:#ff8a7a;margin-top:0;">[ ※ ENCRYPTED · PSY-VAULT ACCESS · 审判庭灵能档案部 ※ ]</h3>
    <div style="font-size:11px;color:#a89072;line-height:1.6;margin-bottom:12px;">
      &gt; 触发原因:${escapeHtml(trigger)}<br>
      &gt; 此档案不出现在常规公民登记中。请如实声明等级与流派,黑舰将据此排查。
    </div>
  `;

  // ── 子字段:M 灵能等级 ──
  const mWrap = document.createElement('div');
  mWrap.style.cssText = 'margin-bottom:14px;';
  const mPicked = state.M ? `已选 ${state.M}` : '未声明';
  mWrap.innerHTML = `<div style="font-size:12px;color:#ff8a7a;margin-bottom:6px;font-weight:700;">▸ M 灵能等级 / Psy Rating [${escapeHtml(mPicked)}]</div>`;
  const mGrid = document.createElement('div'); mGrid.className = 'wh40k-options';
  OPTIONS.M.forEach(([code, label]) => {
    const btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'wh40k-option';
    const check = isOptionAllowed('M', code);
    const active = state.M === code;
    if (active) btn.classList.add('active');
    if (!check.ok && !active) { btn.classList.add('disabled'); btn.title = check.reason; }
    btn.innerHTML = `<span class="wh40k-option-code">${escapeHtml(code)}</span><span class="wh40k-option-label">${escapeHtml(label)}</span>${(!check.ok && !active) ? `<span class="wh40k-option-badge">⊘ ${escapeHtml(check.reason)}</span>` : ''}`;
    btn.addEventListener('click', () => {
      if (!check.ok && !active) { triggerTerminalFlash('red'); return; }
      state.M = active ? '' : code;
      saveDraftState();
      render();
    });
    mGrid.appendChild(btn);
  });
  mWrap.appendChild(mGrid);
  section.appendChild(mWrap);

  // ── 子字段:W 主流派 ──
  const wWrap = document.createElement('div');
  wWrap.style.cssText = 'margin-bottom:14px;';
  const wPicked = state.W ? `已选 ${state.W}` : '未声明';
  let wHint = '';
  if (isNavigator) wHint = ' · 领航者血统强制 W8 导航术';
  else if (state.E === 'E31') wHint = ' · 星语者强制 W1 感应术';
  wWrap.innerHTML = `<div style="font-size:12px;color:#ff8a7a;margin-bottom:6px;font-weight:700;">▸ W 主流派 / Primary Discipline [${escapeHtml(wPicked)}]${escapeHtml(wHint)}</div>`;
  const wGrid = document.createElement('div'); wGrid.className = 'wh40k-options';
  OPTIONS.W.forEach(([code, label]) => {
    const btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'wh40k-option';
    const check = isOptionAllowed('W', code);
    const active = state.W === code;
    if (active) btn.classList.add('active');
    if (!check.ok && !active) { btn.classList.add('disabled'); btn.title = check.reason; }
    btn.innerHTML = `<span class="wh40k-option-code">${escapeHtml(code)}</span><span class="wh40k-option-label">${escapeHtml(label)}</span>${(!check.ok && !active) ? `<span class="wh40k-option-badge">⊘ ${escapeHtml(check.reason)}</span>` : ''}`;
    btn.addEventListener('click', () => {
      if (!check.ok && !active) { triggerTerminalFlash('red'); return; }
      state.W = active ? '' : code;
      saveDraftState();
      render();
    });
    wGrid.appendChild(btn);
  });
  wWrap.appendChild(wGrid);
  section.appendChild(wWrap);

  // ── 子字段:T 副流派(M3 起开放) ──
  const tWrap = document.createElement('div');
  const tUnlocked = mIdx >= 3;
  const tPicked = state.T && state.T !== 'T0' ? `已选 ${state.T}` : '未选副流派';
  tWrap.innerHTML = `<div style="font-size:12px;color:#ff8a7a;margin-bottom:6px;font-weight:700;">▸ T 副流派 / Secondary Discipline [${escapeHtml(tPicked)}]${tUnlocked ? '' : ' · 🔒 需 M3 约塔级解锁'}</div>`;
  const tGrid = document.createElement('div'); tGrid.className = 'wh40k-options';
  OPTIONS.T.forEach(([code, label]) => {
    const btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'wh40k-option';
    const check = isOptionAllowed('T', code);
    const active = state.T === code;
    if (active) btn.classList.add('active');
    if (!check.ok && !active) { btn.classList.add('disabled'); btn.title = check.reason; }
    btn.innerHTML = `<span class="wh40k-option-code">${escapeHtml(code)}</span><span class="wh40k-option-label">${escapeHtml(label)}</span>${(!check.ok && !active) ? `<span class="wh40k-option-badge">⊘ ${escapeHtml(check.reason)}</span>` : ''}`;
    btn.addEventListener('click', () => {
      if (!check.ok && !active) { triggerTerminalFlash('red'); return; }
      state.T = active ? 'T0' : code;
      saveDraftState();
      render();
    });
    tGrid.appendChild(btn);
  });
  tWrap.appendChild(tGrid);
  section.appendChild(tWrap);

  return section;
}

function makeSidePanel() {
  // [17] 分级警告显示
  const loreW = getLoreWarnings();
  const hardW = loreW.filter(w => w.level === 'hard');
  const softW = loreW.filter(w => w.level === 'soft');
  const flavorW = loreW.filter(w => w.level === 'flavor');

  let warningHTML = '';
  if (hardW.length === 0 && softW.length === 0 && flavorW.length === 0) {
    warningHTML = `<div class="wh40k-side-warning">未发现冲突,档案准予临时备案。</div>`;
  } else {
    const rows = [];
    hardW.forEach(w => rows.push(`<div class="wh40k-side-warning wh40k-side-danger" style="margin-bottom:4px;">🔴 ${escapeHtml(w.message)}</div>`));
    softW.forEach(w => rows.push(`<div class="wh40k-side-warning" style="background:rgba(180,120,30,0.15);border-left:3px solid #ffb84d;color:#ffb84d;margin-bottom:4px;padding-left:6px;">🟡 ${escapeHtml(w.message)}</div>`));
    flavorW.forEach(w => rows.push(`<div class="wh40k-side-warning" style="background:rgba(60,140,60,0.10);border-left:3px solid #7ae07a;color:#7ae07a;margin-bottom:4px;padding-left:6px;">🟢 ${escapeHtml(w.message)}</div>`));
    warningHTML = rows.join('');
  }

  const side = document.createElement('aside'); side.className='wh40k-right-pane';
  side.innerHTML = `<div class="wh40k-side-title">档 案 预 览 终 端</div><div class="wh40k-side-subtitle">DATA-SLATE / LIVE REGISTRY / M41</div><div class="wh40k-side-block"><div class="wh40k-side-block-title">&gt; 当前编码</div><div class="wh40k-side-code">${escapeHtml(buildPayload())}</div></div><div class="wh40k-side-block"><div class="wh40k-side-block-title">&gt; 档案摘要</div>${buildSummaryRows().map(([k,v])=>`<div class="wh40k-side-row"><div class="wh40k-side-key">${escapeHtml(k)}</div><div class="wh40k-side-value">${escapeHtml(v)}</div></div>`).join('')}</div><div class="wh40k-side-block"><div class="wh40k-side-block-title">&gt; 路线判定</div>${getRouteHintRows().map(([k,v])=>`<div class="wh40k-side-row"><div class="wh40k-side-key">${escapeHtml(k)}</div><div class="wh40k-side-value">${escapeHtml(v)}</div></div>`).join('')}</div><div class="wh40k-side-block"><div class="wh40k-side-block-title">&gt; 系统提示 [🔴${hardW.length} 🟡${softW.length} 🟢${flavorW.length}]</div>${warningHTML}</div>`;
  return side;
}

function renderPageContent() {
  const content = overlay.querySelector('.wh40k-builder-content'); content.innerHTML='';
  const hero = document.createElement('div'); hero.className='wh40k-page-hero'; hero.innerHTML=`<div class="wh40k-page-title">▸ ${escapeHtml(PAGE_TITLES[currentPage])}</div><div class="wh40k-page-desc">${escapeHtml(PAGE_DESCRIPTIONS[currentPage])}</div>`; content.appendChild(hero);
if(currentPage===0){ const splash=document.createElement('div'); splash.className='wh40k-splash'; splash.innerHTML=`<div class="wh40k-splash-quote">等 候 输 入</div><div class="wh40k-splash-line">&gt;&gt;&gt; 请公民接入终端 · 开始登记 &lt;&lt;&lt;</div><div class="wh40k-splash-text">此终端不会即时提交。您将依次完成 6 节登记表，每节包含若干字段；全部完成后，在最终页一次性提交档案。</div><button type="button" class="wh40k-btn primary wh40k-start-btn">[ 进入登记 ]</button>`; splash.querySelector('button').addEventListener('click',()=>{currentPage=1;saveDraftState();render();scrollPanelsToTop();}); content.appendChild(splash); return; }
  if(currentPage===FINAL_PAGE){ const card=document.createElement('section'); card.className='wh40k-final-card'; card.innerHTML=`<div class="wh40k-final-title">最终提交</div><div class="wh40k-final-text">&gt; 以下为即将上传至大行政官案头的档案数据流。</div><pre class="wh40k-final-preview">${escapeHtml(buildPayload())}</pre><div class="wh40k-final-actions"><button type="button" class="wh40k-btn" data-action="fill-only">[ 仅写入 ]</button><button type="button" class="wh40k-btn" data-action="copy-payload">[ 复制 ]</button><button type="button" class="wh40k-btn primary" data-action="confirm-send">★ 提交档案 ★</button></div>`; card.querySelector('[data-action="fill-only"]').addEventListener('click', fillOnly); card.querySelector('[data-action="copy-payload"]').addEventListener('click', copyPayloadOnly); card.querySelector('[data-action="confirm-send"]').addEventListener('click', confirmAndSend); content.appendChild(card); return; }
  const layout=document.createElement('div'); layout.className='wh40k-content-layout'; const left=document.createElement('div'); left.className='wh40k-left-pane'; const grid=document.createElement('div'); grid.className='wh40k-page-grid'; PAGE_FIELDS[currentPage].forEach(f=>grid.appendChild(makeFieldSection(f))); left.appendChild(grid);
  // 灵能档案:仅在 Page 3(身份立场)之后挂载,条件性显示
  if (currentPage === 3) {
    const psykerPanel = makePsykerPanel();
    if (psykerPanel) left.appendChild(psykerPanel);
  }
  if(currentPage===6){ const box=document.createElement('section'); box.className='wh40k-section'; box.innerHTML=`<h3>※ 额外补充（可选）</h3><textarea rows="5" placeholder="可写人物癖好、特殊背景、关键剧情提示、想锚定的 NPC 关系、想跳过的开场内容……">${escapeHtml(state.EXTRA||'')}</textarea>`; box.querySelector('textarea').addEventListener('input',e=>{state.EXTRA=e.target.value;saveDraftState();}); left.appendChild(box); }
  layout.appendChild(left); layout.appendChild(makeSidePanel()); content.appendChild(layout);
}

function renderFooterWarnings(){
  const box = overlay.querySelector('.wh40k-warning-box');
  const loreW = getLoreWarnings();
  const hardW = loreW.filter(w => w.level === 'hard');
  const softW = loreW.filter(w => w.level === 'soft');
  // 重置样式
  box.style.color = '';
  if (hardW.length > 0) {
    box.style.color = '';  // 沿用默认(红/警示色)
    const suffix = hardW.length > 1 ? ` (还有 ${hardW.length - 1} 条硬冲突)` : '';
    box.textContent = `🔴 ${hardW[0].message}${suffix}`;
  } else if (softW.length > 0) {
    box.style.color = '#ffb84d';
    const suffix = softW.length > 1 ? ` (还有 ${softW.length - 1} 条提示)` : '';
    box.textContent = `🟡 ${softW[0].message}${suffix}`;
  } else {
    box.textContent = '提示：AI会根据你的世界书规则自动纠正非法组合，并在开场叙事中给出简短解释。';
  }
}
function renderFooterButtons(){ const back=overlay.querySelector('[data-action="back"]'); const next=overlay.querySelector('[data-action="next"]'); back.disabled=currentPage===0; if(currentPage===FINAL_PAGE){ next.style.display='none'; } else { next.style.display=''; next.textContent=currentPage===0?'进入登记':'下一步 >'; } }
function render(){ renderProgress(); renderPageContent(); renderFooterWarnings(); renderFooterButtons(); }

// 切换页面时,把所有可滚动面板复位到顶部,防止玩家漏看新页面顶部的选项
// 只在"切换页面"时调用,不在"选项更改"时调用
function scrollPanelsToTop() {
  if (!overlay) return;
  // 用 rAF 确保 DOM 已经完成布局
  requestAnimationFrame(() => {
    const selectors = [
      '.wh40k-builder-content',
      '.wh40k-builder-main',
      '.wh40k-left-pane',
      '.wh40k-right-pane'
    ];
    selectors.forEach(sel => {
      const el = overlay.querySelector(sel);
      if (el && typeof el.scrollTop === 'number') {
        el.scrollTop = 0;
      }
    });
    // 兜底:overlay自身如果也滚动了,一并复位
    if (typeof overlay.scrollTop === 'number') overlay.scrollTop = 0;
  });
}
function goBack(){ if(currentPage===0) return; currentPage--; saveDraftState(); render(); scrollPanelsToTop(); }
function goNext(){ const r=canProceedFromPage(currentPage); if(!r.ok){ alert(r.message); return; } if(currentPage>=FINAL_PAGE) return; currentPage++; saveDraftState(); render(); scrollPanelsToTop(); }

async function fillOnly(){ const payload=buildPayload(); closeBuilder(); await new Promise(r=>setTimeout(r,80)); if(!setInputValue(payload)){ const ok=await copyToClipboard(payload); alert(ok?'未能自动写入输入框。模板已复制到剪贴板。':'未能写入输入框，且剪贴板不可用。请手动复制：\n\n'+payload); } }
async function copyPayloadOnly(){ const ok=await copyToClipboard(buildPayload()); alert(ok?'模板已复制到剪贴板。':'剪贴板不可用。'); }
async function confirmAndSend(){ const payload=buildPayload(); closeBuilder(); await new Promise(r=>setTimeout(r,80)); if(!setInputValue(payload)){ const ok=await copyToClipboard(payload); alert(ok?'未能自动写入输入框。模板已复制到剪贴板，请手动发送。':'未能写入输入框。请手动复制：\n\n'+payload); return; } if(!AUTO_SEND_AFTER_FILL){ await markBuilderShown(); await clearDraftState(); return; } const btn=querySendButton(); if(btn){ btn.click(); await markBuilderShown(); await clearDraftState(); } else alert('模板已写入输入框，但未找到发送按钮。请手动点击发送。'); }

async function maybeAutoOpen(){ if(!isCtxReady()) return; const ctx=getCtx(); if(launcher) forceShowLauncher(); if(!shouldEnableForCurrentChat()){ return; } const chat=Array.isArray(ctx.chat)?ctx.chat:[]; const hasUser=chat.some(m=>m?.is_user===true); const shown=!!ctx.chatMetadata?.[getMetaKey('shown')]; if(AUTO_OPEN_FOR_EMPTY_CHAT && !hasUser && !shown) openBuilder(0); }

function init(){ if(initialized){ maybeAutoOpen().catch?.(()=>{}); return; } if(!isCtxReady()){ setTimeout(init,400); return; } initialized=true; try{ injectBuilderEnhancementStyles(); makeLauncher(); createOverlay(); injectChatStyles(); }catch(e){ console.error(`[${EXT_ID}] failed to build DOM`, e); return; } try{ const {eventSource,event_types}=getCtx(); eventSource.on(event_types.CHAT_CHANGED,()=>maybeAutoOpen()); eventSource.on(event_types.CHAT_CREATED,()=>{ state={...DEFAULT_STATE}; currentPage=0; maybeAutoOpen(); }); }catch(e){ console.error(`[${EXT_ID}] event binding failed`, e); } maybeAutoOpen(); setTimeout(()=>maybeAutoOpen(),600); setTimeout(()=>maybeAutoOpen(),2000); }
function boot(){ if(isCtxReady()){ try{ const {eventSource,event_types}=getCtx(); eventSource.on(event_types.APP_READY,()=>setTimeout(init,0)); }catch(_){} } setTimeout(init,300); setTimeout(init,1500); setTimeout(init,4000); }

if(typeof jQuery==='function') jQuery(()=>boot()); else if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', boot); else boot();
