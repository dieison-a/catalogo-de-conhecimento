const entries = [
  { title: "Checklist de implantação", category: "operacao", label: "OPERAÇÃO", date: "GUIA · 4 MIN", summary: "Uma sequência curta para preparar dados, validar conexões e acompanhar o primeiro uso." },
  { title: "Como escrever critérios de aceite", category: "produto", label: "PRODUTO", date: "PRÁTICA · 3 MIN", summary: "Torne o resultado esperado observável com exemplos, regras e exceções explícitas." },
  { title: "Perguntas para investigar um erro", category: "operacao", label: "OPERAÇÃO", date: "PLAYBOOK · 5 MIN", summary: "Registre contexto, impacto, evidências e tentativas sem antecipar uma causa." },
  { title: "Dicionário de indicadores", category: "dados", label: "DADOS", date: "REFERÊNCIA · 6 MIN", summary: "Definições, fórmulas e limitações para interpretar métricas com transparência." },
  { title: "Do feedback à hipótese", category: "produto", label: "PRODUTO", date: "MÉTODO · 4 MIN", summary: "Agrupe sinais de usuários e formule perguntas que possam ser testadas." },
  { title: "Qualidade de uma amostra", category: "dados", label: "DADOS", date: "NOTA · 3 MIN", summary: "Considere representatividade, recortes e incerteza antes de transformar números em decisão." }
];

const search = document.querySelector("#search");
const container = document.querySelector("#articles");
const empty = document.querySelector("#empty");
const count = document.querySelector("#result-count");
const buttons = [...document.querySelectorAll(".category")];
let category = "all";

function render() {
  const query = search.value.trim().toLocaleLowerCase("pt-BR");
  const results = entries.filter((entry) => {
    const matchesCategory = category === "all" || entry.category === category;
    const matchesSearch = `${entry.title} ${entry.label} ${entry.summary}`.toLocaleLowerCase("pt-BR").includes(query);
    return matchesCategory && matchesSearch;
  });
  container.replaceChildren();
  for (const entry of results) {
    const article = document.createElement("article");
    article.className = "article";
    const meta = document.createElement("div");
    meta.className = "article-meta";
    const tag = document.createElement("span");
    tag.textContent = entry.label;
    const date = document.createElement("time");
    date.textContent = entry.date;
    meta.append(tag, date);
    const title = document.createElement("h2");
    title.textContent = entry.title;
    const summary = document.createElement("p");
    summary.textContent = entry.summary;
    article.append(meta, title, summary);
    container.append(article);
  }
  count.textContent = `${results.length} ${results.length === 1 ? "conteúdo" : "conteúdos"}`;
  empty.hidden = results.length > 0;
}

search.addEventListener("input", render);
for (const button of buttons) {
  button.addEventListener("click", () => {
    category = button.dataset.category;
    for (const item of buttons) {
      const active = item === button;
      item.classList.toggle("selected", active);
      item.setAttribute("aria-pressed", String(active));
    }
    render();
  });
}

render();
