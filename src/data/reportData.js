export const reportData = {
  meta: {
    title: '2026 H1 年中汇报',
    period: '2026 H1 / H2 + Q3 Plan',
    summary: '以客为先，以智为驱，以终为始，以人为本。',
  },
  navItems: [
    { id: 'okr', label: 'H1 OKR' },
    { id: 'impact', label: '业务结果' },
    { id: 'kiss', label: 'KISS' },
    { id: 'plan', label: 'H2 + Q3' },
    { id: 'battles', label: '攻坚事项' },
    { id: 'suggestions', label: '个人建议' },
  ],
  metrics: [
    {
      label: '处理工单',
      value: '711',
      description: 'H1 服务维持工单总量',
    },
    {
      label: '平均处理时长',
      value: '27m',
      description: '目标 <= 60m',
    },
    {
      label: '交付模块',
      value: '245',
      description: '目标 240',
    },
    {
      label: '内部测试通过率',
      value: '90%+',
      description: '目标 80%+',
    },
  ],
  okrSummary:
    'H1 整体交付表现较稳，效率与质量指标均达成目标，其中工单响应效率、模块交付数量和首次完成率形成了比较明确的业务支撑效果。',
  h1Okrs: [
    {
      code: 'O1',
      objective: '提升交付效率',
      status: '已完成',
      note: '工单处理效率和模块交付数量均达到或超过目标要求。',
      krs: [
        {
          title: 'KR1',
          target: '服务维持工单平均处理总时长 <= 60 分钟',
          result: '平均处理时长 27 分钟，处理工单 711 个。',
          status: '已完成',
        },
        {
          title: 'KR2',
          target: '半年度至少 240 个模块交付',
          result: '已交付 245 个模块，完成率约 102.1%。',
          status: '已完成',
        },
      ],
    },
    {
      code: 'O2',
      objective: '提升交付质量',
      status: '已完成',
      note: '内部测试通过率和首次完成率均高于既定目标。',
      krs: [
        {
          title: 'KR1',
          target: '内部测试通过率 80%+',
          result: '内部测试通过率 90%+。',
          status: '已完成',
        },
        {
          title: 'KR2',
          target: '工单首次完成率 85%',
          result: '工单首次完成率 95%+。',
          status: '已完成',
        },
      ],
    },
    {
      code: 'O3',
      objective: '个人能力整体提升',
      status: '部分完成',
      note: 'AI 工具与业务系统参与有推进，但爬虫项目尚未完成。',
      krs: [
        {
          title: 'KR1',
          target: '自主设计完成 Agent 项目或相关提效工具至少 1 个',
          result:
            '已使用 Claude Code、Codex 等 AI 工具，完成数据处理函数等辅助开发实践。',
          status: '部分完成',
        },
        {
          title: 'KR2',
          target: '参与完成至少 1 个商场结算平台开发',
          result: '已参与完成多个商场结算平台开发。',
          status: '已完成',
        },
        {
          title: 'KR3',
          target: '完成爬虫项目至少 1 个',
          result: 'H1 暂未触及。',
          status: '未完成',
        },
      ],
    },
  ],
  completionChart: [
    { name: 'O1', value: 102.1, color: '#2563eb' },
    { name: 'O2', value: 100, color: '#14b8a6' },
    { name: 'O3', value: 66, color: '#f59e0b' },
  ],
  trendChart: [
    { name: '效率', value: 92 },
    { name: '交付', value: 96 },
    { name: '质量', value: 94 },
    { name: '成长', value: 71 },
  ],
  businessImpact: {
    title: '业务结果',
    summary:
      '在高工单量和持续模块交付的情况下，保持了较好的响应效率、交付质量和业务支撑稳定性。',
    points: [
      {
        title: '工单响应稳定',
        content:
          '半年度共处理 711 个工单，平均处理时长 27 分钟，能够有效缩短业务等待时间。',
      },
      {
        title: '首次完成率较高',
        content:
          '工单首次完成率达到 95%+，说明处理结果较稳定，减少了重复沟通与二次返工。',
      },
      {
        title: '模块交付达成目标',
        content:
          '完成 245 个模块交付，超过既定目标，说明上半年在需求承接和功能落地方面保持了稳定产出。',
      },
      {
        title: '质量控制较稳',
        content:
          '内部测试通过率达到 90%+，结合首次完成率表现，说明交付数量和交付质量保持了较好的平衡。',
      },
    ],
    conclusion:
      '711 个工单平均 27 分钟处理、首次完成率 95%+、245 个模块交付超过目标、内部测试通过率 90%+，这些结果共同支撑了业务需求的稳定落地，也降低了业务侧等待、返工和沟通成本。',
  },
  kiss: [
    {
      label: 'Keep',
      title: '继续保持',
      items: [
        '保持高效的工单响应和处理节奏。',
        '保持对核心业务交付的稳定投入。',
        '保持主动使用 AI 工具提升开发效率。',
        '保持对 AI Native 的持续学习。',
      ],
    },
    {
      label: 'Improve',
      title: '需要改进',
      items: [
        '提升目标过程管理的主动性。',
        '提升 AI 工具使用的沉淀能力。',
        '提升工单处理经验的复用程度。',
        '提升个人能力目标与业务重点的匹配度。',
      ],
    },
    {
      label: 'Start',
      title: '开始尝试',
      items: [
        '每月进行一次自我总结。',
        '开始沉淀 AI 使用经验。',
        '开始沉淀工单处理经验。',
      ],
    },
    {
      label: 'Stop',
      title: '停止或减少',
      items: ['减少只凭感觉判断结果。', '减少重复劳动。'],
    },
  ],
  planSummary:
    'H2 + Q3 延续 H1 的效率与质量主线，同时把个人成长聚焦到 AI 工具与自动化基础能力，降低难度，确保真实完成。',
  h2Okrs: [
    {
      code: 'O1',
      objective: '提升交付效率',
      note: '在保持稳定响应效率的同时，继续维持模块交付节奏。',
      krs: [
        {
          title: 'KR1',
          description: '服务维持工单平均处理总时长 <= 45 分钟。',
        },
        {
          title: 'KR2',
          description: 'H2 持续交付模块不少于 240 个，Q3 不少于 120 个。',
        },
        {
          title: 'KR3',
          description: '每月完成一次 OKR / 交付情况自我总结。',
        },
      ],
    },
    {
      code: 'O2',
      objective: '提升交付质量',
      note: '继续维持高质量交付结果，并开始沉淀可复用经验。',
      krs: [
        {
          title: 'KR1',
          description: '内部测试通过率保持 90%+。',
        },
        {
          title: 'KR2',
          description: '工单首次完成率保持 95%+。',
        },
        {
          title: 'KR3',
          description: '沉淀不少于 5 个高频工单处理经验或排查模板。',
        },
      ],
    },
    {
      code: 'O3',
      objective: '提升 AI 工具与自动化基础能力',
      note: '重点是实践和沉淀，不追求复杂平台化成果。',
      krs: [
        {
          title: 'KR1',
          description: '完成至少 1 个爬虫 / 数据采集相关练习或小项目。',
        },
        {
          title: 'KR2',
          description: '使用 AI 工具辅助完成至少 2 个实际工作任务。',
        },
        {
          title: 'KR3',
          description: '整理不少于 2 篇 AI 工具或爬虫实践总结。',
        },
      ],
    },
  ],
  battleItems: [
    {
      title: 'AI 工具使用经验沉淀',
      value: '减少重复试错，形成更稳定的个人提效方法。',
      steps: [
        '记录 AI 工具在实际任务中的使用场景。',
        '沉淀有效提示词、适用边界和产出质量判断方式。',
        '整理不少于 2 篇 AI 工具或 Playwright 实践总结。',
      ],
    },
    {
      title: 'Playwright 学习与项目应用调研',
      value: '围绕具体项目场景，完成 Playwright 基础能力学习、方案调研和应用验证。',
      steps: [
        '系统学习 Playwright 的基础用法、页面操作、元素定位和调试方式。',
        '结合具体项目场景调研 Playwright 的适用边界、实现方案和潜在风险。',
        '完成至少一次可落地的应用验证，并总结问题、收益和后续复用方式。',
      ],
    },
  ],
  suggestions: [
    {
      title: '加强代码注释和开发规范',
      content:
        '后续开发过程中建议进一步加强代码注释和开发规范，尤其是在复杂逻辑、关键流程、特殊兼容处理和容易产生误解的位置，适当补充注释，降低后续维护和协作理解成本。同时，部分开发细节可以继续规范，例如元素捕获方式相对随意、部分流程存在冗杂步骤等。后续可以通过统一命名、明确选择器使用规范、减少重复流程、拆分复杂逻辑等方式，让代码结构更清晰，也让后续迭代和问题排查更高效。',
    },
    {
      title: '鼓励更多技术分享',
      content:
        '技术分享值得继续提倡。分享内容不一定都要是完整的大专题，也可以是日常开发中遇到的一个有意思的问题、一次排查过程、一个工具使用技巧、一个代码优化点，或者对某个技术方案的个人思考。我认为无论内容大小，只要有自己的理解和实践体会，都可以分享出来。这样的分享一方面能帮助团队互相补充经验，另一方面也能促进个人对问题的再次梳理，让零散经验逐步沉淀为团队可复用的知识。',
    },
  ],
};
