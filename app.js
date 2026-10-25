const NEWS = [
  { cat: "tech", tag: "科技", title: "GitHub Actions 推出更大规格的运行器", desc: "新规格面向大型 CI 工作负载，构建速度显著提升。", source: "样例来源", time: "09:30" },
  { cat: "tech", tag: "科技", title: "开源社区发布新一代静态站点工具链", desc: "零配置启动，构建产物更小，主题生态持续扩张。", source: "样例来源", time: "08:12" },
  { cat: "tech", tag: "科技", title: "多家浏览器厂商联合改进 Web 性能标准", desc: "新的调度 API 让页面交互更流畅，已在预览版可用。", source: "样例来源", time: "07:45" },
  { cat: "world", tag: "国际", title: "多国签署跨境数据流通合作备忘录", desc: "旨在降低企业合规成本，促进数字贸易往来。", source: "样例来源", time: "10:05" },
  { cat: "world", tag: "国际", title: "东南亚数字经济规模持续扩大", desc: "报告显示电商与在线服务仍是主要增长引擎。", source: "样例来源", time: "08:40" },
  { cat: "world", tag: "国际", title: "国际航运价格回落至近年低位", desc: "运力恢复叠加需求平稳，出口企业成本压力缓解。", source: "样例来源", time: "07:20" },
  { cat: "finance", tag: "财经", title: "亚太主要股指早盘表现分化", desc: "科技板块领涨，能源板块承压，成交额保持平稳。", source: "样例来源", time: "09:55" },
  { cat: "finance", tag: "财经", title: "多国央行释放维持利率稳定的信号", desc: "市场解读为通胀压力趋缓，债券收益率小幅回落。", source: "样例来源", time: "08:30" },
  { cat: "finance", tag: "财经", title: "风险投资机构关注 AI 基础设施赛道", desc: "数据中心、算力调度与节能技术获多家机构布局。", source: "样例来源", time: "07:10" }
];

const grid = document.getElementById("grid");
const empty = document.getElementById("empty");
document.getElementById("today").textContent =
  new Date().toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric", weekday: "long" });

function render(cat) {
  const list = cat === "all" ? NEWS : NEWS.filter(n => n.cat === cat);
  grid.innerHTML = list.map(n => `
    <article class="card">
      <span class="tag">${n.tag}</span>
      <h2>${n.title}</h2>
      <p>${n.desc}</p>
      <div class="meta">${n.source} · 今天 ${n.time}</div>
    </article>`).join("");
  empty.classList.toggle("hidden", list.length > 0);
}

document.querySelectorAll(".tab").forEach(btn =>
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    render(btn.dataset.cat);
  }));

render("all");
