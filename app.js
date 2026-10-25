const grid = document.getElementById("grid");
const empty = document.getElementById("empty");

document.getElementById("today").textContent =
  new Date().toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric", weekday: "long" });

// 显示数据生成时间
fetch("news.js").then(r => r.text()).then(t => {
  const m = t.match(/at ([\d\- :]+) SGT/);
  if (m) document.getElementById("gen-info").textContent =
    "数据更新于 " + m[1] + " · 内容来自公开 RSS 源 · 186.loc.cc";
}).catch(() => {});

function render(cat) {
  const list = (typeof NEWS === "undefined") ? [] :
    (cat === "all" ? NEWS : NEWS.filter(n => n.cat === cat));
  grid.innerHTML = list.map(n => {
    const ext = n.link && n.link !== "#";
    const safe = ext ? String(n.link).replace(/"/g, "&quot;") : "";
    return `
    <article class="card" ${ext ? `onclick="window.open('${safe}','_blank')" style="cursor:pointer"` : ""}>
      <span class="tag">${n.tag || ""}</span>
      <h2>${n.title}</h2>
      ${n.desc ? `<p>${n.desc}</p>` : ""}
      <div class="meta">${n.source || ""} ${n.time ? "· " + n.time : ""}${ext ? " · ↗原文" : ""}</div>
    </article>`;
  }).join("");
  empty.classList.toggle("hidden", list.length > 0);
}

document.querySelectorAll(".tab").forEach(btn =>
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    render(btn.dataset.cat);
  }));

render("all");
