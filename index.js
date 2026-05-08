const EXT_ID = 'wh40k-character-builder';
const TARGET_CHARACTER_NAME = '';
const AUTO_OPEN_FOR_EMPTY_CHAT = true;
const AUTO_SEND_AFTER_FILL = true;

const PANEL_ORDER = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'N', 'P', 'Q', 'S', 'U', 'V', 'J'];
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
  ['K', 'L', 'N', 'P'],                     // 4 初始情况(含命运将至的人 P)
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
  P: 'P. 命运将至的人',
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
    ['A23', '瀛洲-21（卡利亚星区外围-翡翠龙战团母星·东亚隐修封建社会）'],
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
    ['E27', '审判庭调查员'],
    ['E28', '审判官助理'],
    ['E29', '审判庭刺客契约人'],
    ['E30', '受批准灵能者'],
    ['E31', '星语者'],
    ['E32', '未登记灵能者'],
    ['E33', '机械神教初级神甫'],
    ['E34', '机械神教探索队正式成员'],
    ['E35', '护教军游侠'],
    ['E36', '遗传学探索者'],
    ['E37', '高阶考古学僧'],
    ['E38', '技术监工'],
    ['E39', '巢都帮派成员'],
    ['E40', '锯齿小子初级成员'],
    ['E41', '黑市情报贩子'],
    ['E42', '走私者'],
    ['E43', '冷交易走私人'],
    ['E44', '黑工坊学徒'],
    ['E45', '变体收容者'],
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
  P: [
    ['P0', '无（没有特定的命运对象，剧情自由展开）'],
    ['P1', '赤红净化博学者（红袍下藏满工具，曾是儿童变异稳定专员，外表年轻）'],
    ['P2', '赏金枪手（前帝国卫队的拉丁裔女性，独立赏金猎人，专精中距离）'],
    ['P3', '流亡叛博学者（百岁高龄但外表年轻的女性，三方通缉的火星叛徒）'],
    ['P4', '骑士机甲驾驶员（家族继承人之一，22 岁，独角兽机甲驾驶员）'],
    ['P5', '见习修女（年轻女见习修女，温柔但严格，会唱圣歌也会拔枪）'],
    ['P6', '贵族怪盗（19 岁莫斯塔克旁系，受 Casu 微改，娴熟于潜入与社交）'],
    ['P7', '星界军老兵（中年男性，持爆弹枪，话不多但靠得住）'],
    ['P8', '黑暗灵族战巫（487 岁，黑骨竞技场战巫，外表如人类 25 岁）'],
    ['P9', '导航学徒（25 岁导航者家族成员，已订婚，仍在学习星图）'],
    ['P10', '克鲁特猎手（外形怪异的克鲁特异形，对契约绝对忠诚，擅长追踪）'],
    ['P11', '人类灵族混血海盗（32 岁女舰队队长，黑市常客，舰只小但快）'],
    ['P12', '审判庭外勤助理（32 岁拉丁裔女性，前异形产品走私贩，已"洗白"）'],
    ['P13', '机械神教技术神甫（26 岁考尔派，多领域跨界的培育人女性）'],
    ['P14', '莱特林狙击手（半身人异形狙击手，敏捷，话不多但弹道精准）'],
    ['P15', '伪装贵族妓院主理（36 岁女性，永恒欢愉教团想要的"完美容器"）'],
    ['P16', '北欧风走私头目（35 岁日耳曼血统女首领，"风暴鸦"集团掌门）'],
    ['P17', '待命女仆长（25 岁女性，身份为家政管家，等待新主人）'],
    ['P18', '流亡星图师（中年男性，被火星通缉，擅长亚空间路线计算，沉默寡言但精于推算）'],
    ['P19', '黑暗灵族娼妓（542 岁魅魔，黑骨高级娼妓，外表如人类 30 岁）'],
    ['P20', '失明朝圣者（年长男性神父，背着圣物匣，瞎眼但能"看见"，狂热程度待观察）'],
    ['P21', '雇佣枪手（男性枪手，背景模糊，前同事都死了，对钱忠诚）'],
    ['P22', '颓废女学者（31 岁苍白的法兰西血统女学者，浏海遮住右脸，私下研究禁忌的亚空间符号，明知会消耗自己仍不停笔）'],
    ['P23', '蔷薇修女（33 岁女性医疗修女，圣母级丰腴身材，雷萨主教的情人，温顺乖巧背后有惊人秘密）'],
    ['P24', '失散的见习修女（15 岁女见习修女，金蓝双色长发，尖耳精灵血统，已故贵族之女）'],
    ['P25', 'Casu 女神分身（约 1700 岁 Casu 女统领，白色倒月头冠遮目，可变形态完美渗透者）'],
    ['P26', '钛族水氏族以太（22 岁钛瓦女神现世化身，深蓝肌肤金色光斑，被流放至卡利亚的精神领袖）'],
    ['P27', '伊克沙尼亚贵族继承人（24 岁古铜肌肤的奥利安家族继承人，黑金双色头发，业余虚空网球冠军兼艺术收藏家）'],
    ['P28', '马里格里斯之女（约 200 岁银金色长发的复合生物造物，1.85 米高，紫罗兰瞳孔，可在停滞舱中无限复活）'],
    ['P29', '翡翠龙散修（高大男性阿斯塔特，无甲，东方武士气质，奉浪人戒律独行猎魔，腰挂一刀一枪）'],
    ['P30', '叛逃海军军官（40 余岁男性前帝国海军中级军官，独眼，因拒绝执行某条命令而被通缉，仍保有海军礼仪）'],    // C5 领航者不允许 H25 自定义出身
    if (c === 'C5' && code === 'H25') {
      return { ok: false, reason: '领航者出身不可自定义，需明确家族世系' };
    }

    // E12 帝国贵族 出身限定
    if (e === 'E12' && code !== 'H25' && !NOBLE_OK_BG.includes(code)) {
      return { ok: false, reason: '帝国贵族需要贵族或上层背景' };
    }

    // E18 流浪骑士 出身限定
    if (e === 'E18' && code !== 'H25' && !KNIGHT_OK_BG.includes(code)) {
      return { ok: false, reason: '流浪骑士需要骑士/贵族传承背景' };
    }

    // E21-E24 阿斯塔特不允许 H25 自定义出身
    if (ASTARTES.includes(e) && code === 'H25') {
      return { ok: false, reason: '阿斯塔特出身不可自定义' };
    }
  }

  // ============ K 初始资源 ============
  if (field === 'K') {
    if (code === 'K11') {
      if (c === 'C5') return { ok: false, reason: '领航者不能拥有个人小船作为起始资源' };
      if (e && !SELF_OWNED_SHIP_OK.includes(e)) return { ok: false, reason: '当前职业不适合自有小船' };
    }

    if (code === 'K12') {
      if (e && NO_BORROWED_SHIP.includes(e)) return { ok: false, reason: '当前职业通常无法借调舰船' };
    }

    if (code === 'K13') {
      if (e && !ASSIGNED_TO_SHIP_OK.includes(e)) return { ok: false, reason: '当前职业不适合在大舰服役' };
    }

    if (c === 'C5' && NAVIGATOR_FORBIDDEN_K.includes(code)) {
      return { ok: false, reason: '领航者不适合此起始资源' };
    }
  }

  // ============ L 初始秘密 ============
  if (field === 'L') {
    if (isMechSecret(code) && c !== 'C7') {
      return { ok: false, reason: '神教秘密需 C7' };
    }

    // L18 肉体出卖：对阿斯塔特/机械神教培育人/未成年人暗示不适配
    // 年龄字段只有段位，青年不必禁；由 first_mes 规则约束不露骨即可
  }

  // ============ Q 身体状态 ============
  if (field === 'Q') {
    // C4 不可接触者不能义体改造
    if (c === 'C4' && HEAVY_AUG.includes(code)) {
      return { ok: false, reason: '不可接触者不适合义体改造' };
    }

    // C5 领航者不能中/重度机械改造
    if (c === 'C5' && MEDIUM_HEAVY_AUG.includes(code)) {
      return { ok: false, reason: '领航者不适合中重度机械改造' };
    }

    // E10/E11 修女会禁义体
    if (['E10','E11'].includes(e) && HEAVY_AUG.includes(code)) {
      return { ok: false, reason: '修会身份不适合明显义体改造' };
    }

    // 阿斯塔特禁慢病与药瘾
    if (ASTARTES.includes(e) && ['Q3','Q5'].includes(code)) {
      return { ok: false, reason: '阿斯塔特不应有慢病或药瘾' };
    }

    // 普通底层职业不能重改
    if (STREET_PROFESSIONS.includes(e) && code === 'Q8') {
      return { ok: false, reason: '当前职业无法负担重度机械化改造' };
    }

    // E1 帝国卫队士兵不能重改，战伤/轻改可
    if (e === 'E1' && code === 'Q8') {
      return { ok: false, reason: '帝国卫队士兵通常不能重度机械化' };
    }
  }

  // ============ U 动机 ============
  if (field === 'U') {
    // U2 寻亲 与 N1 家人仍在 矛盾
    if (code === 'U2' && n === 'N1') {
      return { ok: false, reason: '寻亲与家人仍在矛盾' };
    }

    // U6 逃亡 与组织强绑定立场矛盾
    if (code === 'U6') {
      if (['D1','D5','D6','D7','D8','D9','D10','D11','D12','D13'].includes(d)) {
        return { ok: false, reason: '逃亡者不适合强组织忠诚立场' };
      }
    }

    // U10 守护 与 N0 无 矛盾
    if (code === 'U10' && n === 'N0') {
      return { ok: false, reason: '守护需要一个羁绊对象' };
    }

    // U12 漂泊 禁组织化职业 + C5/C7
    if (code === 'U12') {
      if (ORG_PROFESSIONS_FOR_U12.includes(e)) return { ok: false, reason: '组织化职业不适合漂泊动机' };
      if (['C5','C7'].includes(c)) return { ok: false, reason: '该血统不适合漂泊动机' };
    }

    // U14 猎艳 禁修女会正式成员与阿斯塔特; 蔷薇侍从允许
    if (code === 'U14') {
      if (e === 'E10') return { ok: false, reason: '修女会成员不适合猎艳动机' };
      if (ASTARTES.includes(e)) return { ok: false, reason: '阿斯塔特不适合猎艳动机' };
    }
  }

  // ============ N 羁绊 ============
  if (field === 'N') {
    // N1 家人仍在 与 U2 寻亲矛盾
    if (code === 'N1' && u === 'U2') {
      return { ok: false, reason: '家人仍在与寻亲动机矛盾' };
    }

    // N0 无 与 U10 守护矛盾
    if (code === 'N0' && u === 'U10') {
      return { ok: false, reason: '守护动机需要一个羁绊对象' };
    }
  }

  // ============ S 开场地点 ============
  if (field === 'S') {
    // S23 自定义场景永远允许
    if (code === 'S23') return { ok: true };

    // 职业地点矩阵
    const allowed = ALLOWED_S_BY_PROFESSION[e];
    if (allowed && !allowed.includes(code)) {
      return { ok: false, reason: '当前职业不适合此开场地点' };
    }

    // 出生星界地点限定
    if (a === 'A19' && !A19_OK_S.includes(code)) {
      return { ok: false, reason: '欧姆巴佩11号开场地点受限' };
    }
    if (a === 'A21' && !A21_OK_S.includes(code)) {
      return { ok: false, reason: '哥利亚要塞开场地点受限' };
    }
  }

  // ============ P 命运将至的人 ============
  if (field === 'P') {
    // P32 自定义永远允许
    if (code === 'P32' || code === 'P0') return { ok: true };

    // D5 纯洁派极度排斥异形/神性异端/全谱异端造物
    if (d === 'D5' && (XENOS_PARTNERS.includes(code) || CASU_PARTNERS.includes(code) || IUVENESCE_PARTNERS.includes(code))) {
      return { ok: false, reason: '纯洁派审判庭不会容忍该命运对象' };
    }

    // 火星正统派排斥 Casu、钛族、全谱异端造物、黑暗灵族
    if (d === 'D9' && (CASU_PARTNERS.includes(code) || TAU_PARTNERS.includes(code) || IUVENESCE_PARTNERS.includes(code) || DARK_ELDAR_PARTNERS.includes(code))) {
      return { ok: false, reason: '火星正统派不会容忍该命运对象' };
    }

    // C7 机械神教路线优先兼容机械神教同伴，其他不是硬禁，只做后续警告
    // 修女会职业与黑暗灵族/Casu等强冲突
    if (SISTER_JOBS.includes(e) && (DARK_ELDAR_PARTNERS.includes(code) || CASU_PARTNERS.includes(code))) {
      return { ok: false, reason: '修会身份与该命运对象强冲突' };
    }

    // 阿斯塔特与猎艳/黑暗灵族娼妓等不匹配，硬禁最强冲突
    if (ASTARTES.includes(e) && DARK_ELDAR_PARTNERS.includes(code)) {
      return { ok: false, reason: '阿斯塔特与该命运对象强冲突' };
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

  if (state.H === 'H25' && state.H_CUSTOM.trim()) {
    lines.push(`自定义出身：${state.H_CUSTOM.trim()}`);
  }

  if (state.S === 'S23' && state.S_CUSTOM.trim()) {
    lines.push(`自定义开场地点：${state.S_CUSTOM.trim()}`);
  }

  if (state.P === 'P32' && state.P_CUSTOM.trim()) {
    lines.push(`自定义命运角色：${state.P_CUSTOM.trim()}`);
  }

  if (state.EXTRA.trim()) {
    lines.push(`玩家额外补充：${state.EXTRA.trim()}`);
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
    ['阵营', `${state.D} · ${getOptionLabel('D', state.D)}`],
    ['职业', `${state.E} · ${getOptionLabel('E', state.E)}`],
    ['背景', state.H === 'H25' ? `H25 · 自定义出身：${state.H_CUSTOM.trim() || '（未填写）'}` : `${state.H} · ${getOptionLabel('H', state.H)}`],
    ['资源', `${state.K} · ${getOptionLabel('K', state.K)}`],
    ['秘密', `${state.L} · ${getOptionLabel('L', state.L)}`],
    ['羁绊', `${state.N} · ${getOptionLabel('N', state.N)}`],
    ['命运将至的人', state.P === 'P32' ? `P32 · 自定义：${state.P_CUSTOM.trim() || '（未填写）'}` : `${state.P} · ${getOptionLabel('P', state.P)}`],
    ['开场地点', state.S === 'S23' ? `S23 · 自定义场景：${state.S_CUSTOM.trim() || '（未填写）'}` : `${state.S} · ${getOptionLabel('S', state.S)}`],
    ['目标动机', `${state.U} · ${getOptionLabel('U', state.U)}`],
    ['叙事节奏', `${state.V} · ${getOptionLabel('V', state.V)}`],
    ['主线', `${state.J} · ${getOptionLabel('J', state.J)}`],
    ['额外补充', state.EXTRA.trim() || '（无）'],
  ];
}

function getSoftWarnings() {
  const warnings = [];

  // ===== P 命运对象软警告 =====
  const p = state.P;
  const d = state.D;
  const e = state.E;
  const c = state.C;

  // C7 神教路线 + 非机械神教同伴提示(非硬禁)
  if (c === 'C7' && p !== 'P0' && !MECH_PARTNERS.includes(p) && p !== 'P32') {
    warnings.push('C7 机械神教路线与当前命运对象并非天然同盟，剧情中可能需要借助交易、监视或研究关系引入。');
  }

  // 修女会 + 男性命运对象提示(蔷薇侍从不硬禁)
  if (SISTER_JOBS.includes(e) && MALE_PARTNERS.includes(p)) {
    warnings.push('修会身份与男性命运对象可成立，但建议以庇护、护送、告解、调查或禁忌牵连开局。');
  }

  // D11 异形博学派 + 异形对象加分提示
  if (d === 'D11' && XENOS_PARTNERS.includes(p)) {
    warnings.push('异形博学派与该命运对象高度适配，但会增加审判庭与火星正统派风险。');
  }

  // D13 考尔派 + P13 机械神教技术神甫提示
  if (d === 'D13' && p === 'P13') {
    warnings.push('考尔派与该命运对象高度适配，可作为合法异端研究线索慢热展开。');
  }

  // P25 Casu 女神分身强风险
  if (p === 'P25') {
    warnings.push('Casu 女神分身属于极高风险命运对象，建议慢热登场，避免开局直接揭露其神性。');
  }

  // P28 全谱异端造物强风险
  if (p === 'P28') {
    warnings.push('马里格里斯之女属于极高风险造物，建议作为停滞舱、档案缺页或远期目标引入。');
  }

  return warnings;
}

function getWarnings() {
  const warnings = [];
  const ASTARTES = ['E21', 'E22', 'E23', 'E24'];
  const MECH_PROFESSIONS = ['E33', 'E34', 'E35', 'E36', 'E37', 'E38'];
  const IQ_PROFESSIONS = ['E25', 'E26', 'E27', 'E28', 'E29', 'E30', 'E31'];

  const isAstartes = ASTARTES.includes(state.E);
  const isSister = state.E === 'E10';
  const isRose = state.E === 'E11';
  const isMechProfession = MECH_PROFESSIONS.includes(state.E);
  const isMechStance = ['D9', 'D10', 'D11', 'D12', 'D13'].includes(state.D);
  const isIqProfession = IQ_PROFESSIONS.includes(state.E);
  const isIqStance = ['D5', 'D6', 'D7', 'D8'].includes(state.D);
  const isMechBg = isMechBackground(state.H);
  const hasMechSecret = isMechSecret(state.L);

  if (state.B === 'B1' && !state.NAME.trim()) {
    warnings.push('你选择了自定义名字，但还没有填写名字。');
  }

  if (state.H === 'H25' && !state.H_CUSTOM.trim()) {
    warnings.push('你选择了自定义出身，但还没有填写出身描述。');
  }

  if (state.S === 'S23' && !state.S_CUSTOM.trim()) {
    warnings.push('你选择了自定义开场地点，但还没有填写场景描述。');
  }

  if (state.P === 'P32' && !state.P_CUSTOM.trim()) {
    warnings.push('你选择了自定义命运角色，但还没有填写角色描述。');
  }

  if (isAstartes) {
    if (state.G !== 'G1') warnings.push('阿斯塔特最终会被校正为男性。');
    if (state.C !== 'C1') warnings.push('阿斯塔特最终会被校正为正常人类或改职。');
    if (state.H === 'H13') warnings.push('穿越者无法成为阿斯塔特，AI会自动改写职业或背景。');
    if (ASTARTES_FORBIDDEN_BG.includes(state.H)) warnings.push('阿斯塔特无法出身机械神教背景。');
    if (['Q3','Q5'].includes(state.Q)) warnings.push('阿斯塔特不应带有慢病或药瘾设定。');
  }

  if (isSister) {
    if (state.G !== 'G2') warnings.push('修女会成员最终会被校正为女性或改职。');
    if (!['C1', 'C3', 'C4', 'C6'].includes(state.C)) warnings.push('当前血统通常不能成为修女会正式成员，系统会自动改职或改写身份。');
    if (HEAVY_AUG.includes(state.Q)) warnings.push('修女会成员通常不适合明显义体改造。');
    if (state.U === 'U14') warnings.push('修女会成员不适合猎艳动机。');
  }

  if (isRose && ['C5', 'C7'].includes(state.C)) {
    warnings.push('当前血统通常不适合蔷薇修女会侍从路径，系统可能会改写身份。');
  }

  if (isRose && HEAVY_AUG.includes(state.Q)) {
    warnings.push('蔷薇修女会侍从通常不适合明显义体改造。');
  }

  if (state.C === 'C7' && (!isMechProfession || !isMechStance || !isMechBg)) {
    warnings.push('C7 机械神教培育人必须绑定机械神教立场、机械神教职业与神教背景。');
  }

  if ((isMechProfession || isMechStance || isMechBg || hasMechSecret) && state.C !== 'C7') {
    warnings.push('机械神教路线与神教专属秘密必须选择 C7 机械神教培育人。');
  }

  // 审判庭双向警告
  if (isIqProfession && !isIqStance) {
    warnings.push('审判庭职业通常需要审判庭立场，系统会自动校正。');
  }
  if (isIqStance && !isIqProfession) {
    warnings.push('审判庭立场应由审判庭体系职业承载。');
  }

  // 未登记灵能者与审判庭
  if (state.E === 'E32' && isIqStance) {
    warnings.push('未登记灵能者与审判庭立场强冲突。');
  }

  if (state.E === 'E44' && isMechStance) {
    warnings.push('黑工坊学徒与正统机械神教立场不可兼容。');
  }

  if (state.C === 'C6' && ['E18', ...ASTARTES, ...MECH_PROFESSIONS].includes(state.E)) {
    warnings.push('猫人与当前职业组合不合法，AI会自动校正。');
  }

  if (state.C === 'C5') {
    if (!NAVIGATOR_OK_BG.includes(state.H)) warnings.push('领航者必须出身领航者世系或贵族家族。');
    if (MEDIUM_HEAVY_AUG.includes(state.Q)) warnings.push('领航者不适合中重度机械改造。');
    if (NAVIGATOR_FORBIDDEN_K.includes(state.K)) warnings.push('领航者不适合当前起始资源。');
  }

  if (state.C === 'C5' && ['E1', 'E4', 'E7', 'E9', 'E10', 'E11', ...ASTARTES, ...IQ_PROFESSIONS, 'E32', ...MECH_PROFESSIONS, 'E39', 'E40', 'E44'].includes(state.E)) {
    warnings.push('领航者与当前职业组合通常不合法，AI会自动校正。');
  }

  if (state.C === 'C4') {
    if ([...ASTARTES, ...MECH_PROFESSIONS, 'E30', 'E31', 'E32'].includes(state.E)) {
      warnings.push('不可接触者与当前职业组合通常不合法，AI会自动校正。');
    }
    if (HEAVY_AUG.includes(state.Q)) {
      warnings.push('不可接触者不适合义体改造。');
    }
  }

  if (state.E === 'E12' && !NOBLE_OK_BG.includes(state.H)) {
    warnings.push('帝国贵族需要贵族、上层或相关文官背景。');
  }

  if (state.E === 'E18' && !KNIGHT_OK_BG.includes(state.H)) {
    warnings.push('流浪骑士需要贵族、没落家族、失势贵族旁支或身世不明养子背景。');
  }

  // 资源警告
  if (state.K === 'K11') {
    if (state.C === 'C5') warnings.push('领航者不能以自有小船作为起始资源。');
    if (!SELF_OWNED_SHIP_OK.includes(state.E)) warnings.push('当前职业不适合自有小船。');
  }
  if (state.K === 'K12' && NO_BORROWED_SHIP.includes(state.E)) {
    warnings.push('当前职业通常无法借调舰船。');
  }
  if (state.K === 'K13' && !ASSIGNED_TO_SHIP_OK.includes(state.E)) {
    warnings.push('当前职业不适合在大舰服役。');
  }

  // 身体状态
  if (STREET_PROFESSIONS.includes(state.E) && state.Q === 'Q8') {
    warnings.push('当前职业无法负担重度机械化改造。');
  }

  // 动机
  if (state.U === 'U2' && state.N === 'N1') warnings.push('寻亲与家人仍在逻辑矛盾。');
  if (state.U === 'U10' && state.N === 'N0') warnings.push('守护动机需要一个羁绊对象。');
  if (state.U === 'U6' && ['D1','D5','D6','D7','D8','D9','D10','D11','D12','D13'].includes(state.D)) {
    warnings.push('逃亡者不适合强组织忠诚立场。');
  }
  if (state.U === 'U12') {
    if (ORG_PROFESSIONS_FOR_U12.includes(state.E)) warnings.push('组织化职业不适合漂泊动机。');
    if (['C5','C7'].includes(state.C)) warnings.push('该血统不适合漂泊动机。');
  }
  if (state.U === 'U14') {
    if (state.E === 'E10') warnings.push('修女会成员不适合猎艳动机。');
    if (ASTARTES.includes(state.E)) warnings.push('阿斯塔特不适合猎艳动机。');
  }

  // 出生星界
  if (state.A === 'A19' && !A19_OK_E.includes(state.E)) {
    warnings.push('欧姆巴佩11号是机密设施，仅对机械神教与审判庭高层开放。');
  }
  if (state.A === 'A21' && !A21_OK_E.includes(state.E)) {
    warnings.push('哥利亚要塞仅对死亡守望开放。');
  }

  // S 开场地点
  if (state.S !== 'S23') {
    const allowed = ALLOWED_S_BY_PROFESSION[state.E];
    if (allowed && !allowed.includes(state.S)) {
      warnings.push('当前职业不适合此开场地点。');
    }
    if (state.A === 'A19' && !A19_OK_S.includes(state.S)) warnings.push('欧姆巴佩11号开场地点受限。');
    if (state.A === 'A21' && !A21_OK_S.includes(state.S)) warnings.push('哥利亚要塞开场地点受限。');
  }

  // P 命运对象硬冲突提示
  if (state.P !== 'P0' && state.P !== 'P32') {
    if (state.D === 'D5' && (XENOS_PARTNERS.includes(state.P) || CASU_PARTNERS.includes(state.P) || IUVENESCE_PARTNERS.includes(state.P))) {
      warnings.push('纯洁派审判庭不会容忍该命运对象。');
    }
    if (state.D === 'D9' && (CASU_PARTNERS.includes(state.P) || TAU_PARTNERS.includes(state.P) || IUVENESCE_PARTNERS.includes(state.P) || DARK_ELDAR_PARTNERS.includes(state.P))) {
      warnings.push('火星正统派不会容忍该命运对象。');
    }
    if (SISTER_JOBS.includes(state.E) && (DARK_ELDAR_PARTNERS.includes(state.P) || CASU_PARTNERS.includes(state.P))) {
      warnings.push('修会身份与该命运对象强冲突。');
    }
    if (ASTARTES.includes(state.E) && DARK_ELDAR_PARTNERS.includes(state.P)) {
      warnings.push('阿斯塔特与该命运对象强冲突。');
    }
  }

  return warnings;
}

function canProceedFromPage(page) {
  const fields = PAGE_FIELDS[page] || [];

  if (fields.includes('B') && state.B === 'B1' && !state.NAME.trim()) {
    return { ok: false, message: '请先填写自定义名字,或改回默认名字。' };
  }

  if (fields.includes('H') && state.H === 'H25' && !state.H_CUSTOM.trim()) {
    return { ok: false, message: '你选择了 H25 自定义出身，请先填写出身描述。' };
  }

  if (fields.includes('S') && state.S === 'S23' && !state.S_CUSTOM.trim()) {
    return { ok: false, message: '你选择了 S23 自定义开场地点，请先填写场景描述。' };
  }

  if (fields.includes('P') && state.P === 'P32' && !state.P_CUSTOM.trim()) {
    return { ok: false, message: '你选择了 P32 自定义命运角色，请先填写角色描述。' };
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
      if (state.Q === 'Q0') state.Q = 'Q1';
      if (state.S === 'S0') state.S = 'S1';
      if (state.U === 'U0') state.U = 'U12';
      if (state.V === 'V0') state.V = 'V2';
      if (!state.P) state.P = 'P0';

      // 旧职业编号兼容: 若旧稿存在 E46 以上或已弃用职业,回落为 E1
      if (!OPTIONS.E.some(([k]) => k === state.E)) state.E = 'E1';
      if (!OPTIONS.A.some(([k]) => k === state.A)) state.A = 'A1';
      if (!OPTIONS.D.some(([k]) => k === state.D)) state.D = 'D1';
      if (!OPTIONS.H.some(([k]) => k === state.H)) state.H = 'H1';
      if (!OPTIONS.P.some(([k]) => k === state.P)) state.P = 'P0';
    } else {
      state = { ...DEFAULT_STATE };
    }
    currentPage = typeof savedPage === 'number' ? savedPage : 0;
    if (currentPage >= TOTAL_PAGES) currentPage = 0;
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

function injectBuilderFixStyles() {
  if (document.getElementById('wh40k-builder-fix-styles')) return;

  const style = document.createElement('style');
  style.id = 'wh40k-builder-fix-styles';
  style.textContent = `
    #wh40k-builder-overlay .wh40k-builder-modal {
      position: relative;
    }

    @media (min-width: 900px) {
      #wh40k-builder-overlay .wh40k-builder-content {
        width: 100% !important;
        max-width: none !important;
        box-sizing: border-box !important;
      }

      #wh40k-builder-overlay .wh40k-content-layout {
        display: grid !important;
        grid-template-columns: minmax(330px, 430px) minmax(460px, 1fr) !important;
        gap: 22px !important;
        width: 100% !important;
        max-width: none !important;
        box-sizing: border-box !important;
        align-items: start !important;
      }

      #wh40k-builder-overlay .wh40k-left-pane {
        width: 100% !important;
        min-width: 0 !important;
      }

      #wh40k-builder-overlay .wh40k-right-pane {
        display: block !important;
        min-height: 560px !important;
        max-height: calc(100vh - 220px) !important;
        overflow-y: auto !important;
        border: 1px solid rgba(201, 162, 75, 0.45) !important;
        background:
          radial-gradient(circle at 50% 0%, rgba(255, 184, 77, 0.08), transparent 38%),
          linear-gradient(180deg, rgba(20, 11, 4, 0.96), rgba(8, 5, 2, 0.96)) !important;
        box-shadow:
          inset 0 0 40px rgba(255, 170, 51, 0.035),
          0 0 18px rgba(0, 0, 0, 0.55) !important;
        padding: 18px 18px 20px !important;
        box-sizing: border-box !important;
        color: #e0cf9a !important;
        font-family: ui-monospace, Menlo, Consolas, monospace !important;
        position: sticky !important;
        top: 12px !important;
      }

      #wh40k-builder-overlay .wh40k-page-grid {
        display: flex !important;
        flex-direction: column !important;
        gap: 22px !important;
        width: 100% !important;
        max-width: none !important;
      }

      #wh40k-builder-overlay .wh40k-options {
        display: grid !important;
        grid-template-columns: 1fr !important;
        gap: 10px !important;
        width: 100% !important;
      }

      #wh40k-builder-overlay .wh40k-option {
        width: 100% !important;
        min-height: 58px !important;
        white-space: normal !important;
      }
    }

    @media (max-width: 899px) {
      #wh40k-builder-overlay .wh40k-content-layout {
        display: block !important;
      }

      #wh40k-builder-overlay .wh40k-right-pane {
        display: none !important;
      }
    }    #wh40k-builder-overlay .wh40k-side-title {
      color: #ffb84d;
      font-size: 15px;
      font-weight: 800;
      letter-spacing: 0.12em;
      margin-bottom: 10px;
      text-shadow: 0 0 8px rgba(255, 184, 77, 0.25);
    }

    #wh40k-builder-overlay .wh40k-side-subtitle {
      color: #8a6a38;
      font-size: 11px;
      letter-spacing: 0.16em;
      margin-bottom: 14px;
      border-bottom: 1px dashed rgba(138, 106, 56, 0.55);
      padding-bottom: 10px;
    }

    #wh40k-builder-overlay .wh40k-side-block {
      border: 1px solid rgba(94, 74, 40, 0.72);
      background: rgba(0, 0, 0, 0.18);
      padding: 12px;
      margin-bottom: 12px;
    }

    #wh40k-builder-overlay .wh40k-side-block-title {
      color: #cc7a1a;
      font-size: 12px;
      letter-spacing: 0.12em;
      margin-bottom: 8px;
    }

    #wh40k-builder-overlay .wh40k-side-row {
      display: grid;
      grid-template-columns: 90px 1fr;
      gap: 8px;
      font-size: 12px;
      line-height: 1.65;
      border-bottom: 1px dotted rgba(94, 74, 40, 0.38);
      padding: 3px 0;
    }

    #wh40k-builder-overlay .wh40k-side-row:last-child { border-bottom: none; }
    #wh40k-builder-overlay .wh40k-side-key { color: #8a6a38; }
    #wh40k-builder-overlay .wh40k-side-value { color: #e0cf9a; }

    #wh40k-builder-overlay .wh40k-side-code {
      color: #7ae07a;
      font-size: 11px;
      line-height: 1.55;
      word-break: break-word;
      white-space: pre-wrap;
    }

    #wh40k-builder-overlay .wh40k-side-warning {
      color: #ffcf66;
      line-height: 1.65;
      font-size: 12px;
    }

    #wh40k-builder-overlay .wh40k-side-danger {
      color: #c92030;
      text-shadow: 0 0 6px rgba(200, 35, 35, 0.45);
    }

    #wh40k-builder-overlay .wh40k-builder-modal.wh40k-flash::after,
    #wh40k-builder-overlay .wh40k-builder-modal.wh40k-flash-red::after {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 999;
      animation: wh40k-terminal-flash 420ms ease-out;
    }

    #wh40k-builder-overlay .wh40k-builder-modal.wh40k-flash::after {
      background: linear-gradient(180deg, transparent 0%, rgba(122, 224, 122, 0.16) 48%, transparent 100%), radial-gradient(circle at 50% 50%, rgba(255, 184, 77, 0.16), transparent 42%);
    }

    #wh40k-builder-overlay .wh40k-builder-modal.wh40k-flash-red::after {
      background: linear-gradient(180deg, transparent 0%, rgba(201, 32, 48, 0.18) 48%, transparent 100%), radial-gradient(circle at 50% 50%, rgba(201, 32, 48, 0.14), transparent 42%);
    }

    @keyframes wh40k-terminal-flash {
      0% { opacity: 0; transform: scaleY(0.96); }
      18% { opacity: 1; }
      100% { opacity: 0; transform: scaleY(1.02); }
    }
  `;

  document.head.appendChild(style);
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

  // 最终提交页保持独立,避免空字段页触发预览布局异常。
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
    return;
  }

  const layout = document.createElement('div');
  layout.className = 'wh40k-content-layout';

  const leftPane = document.createElement('div');
  leftPane.className = 'wh40k-left-pane';

  const grid = document.createElement('div');
  grid.className = 'wh40k-page-grid';
  PAGE_FIELDS[currentPage].forEach((field) => grid.appendChild(makeFieldSection(field)));
  leftPane.appendChild(grid);

  // 第 6 页(命运牵连/J 栏)在 J 字段之后追加全局"额外补充"文本框。
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
    leftPane.appendChild(extraBox);
  }

  layout.appendChild(leftPane);
  layout.appendChild(makeSidePanel());
  content.appendChild(layout);
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
}async function copyPayloadOnly() {
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
    injectBuilderEnhancementStyles();
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