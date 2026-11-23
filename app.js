const registros = [
  { titulo: "Lista de verificação da implantação", categoria: "operacao", rotulo: "OPERAÇÃO", tempoLeitura: "GUIA · 4 MIN", resumo: "Uma sequência curta para preparar dados, validar conexões e acompanhar o primeiro uso." },
  { titulo: "Como escrever critérios de aceite", categoria: "produto", rotulo: "PRODUTO", tempoLeitura: "PRÁTICA · 3 MIN", resumo: "Torne o resultado esperado observável com exemplos, regras e exceções explícitas." },
  { titulo: "Perguntas para investigar um erro", categoria: "operacao", rotulo: "OPERAÇÃO", tempoLeitura: "ROTEIRO · 5 MIN", resumo: "Registre contexto, impacto, evidências e tentativas sem antecipar uma causa." },
  { titulo: "Dicionário de indicadores", categoria: "dados", rotulo: "DADOS", tempoLeitura: "REFERÊNCIA · 6 MIN", resumo: "Definições, fórmulas e limitações para interpretar métricas com transparência." },
  { titulo: "Do retorno à hipótese", categoria: "produto", rotulo: "PRODUTO", tempoLeitura: "MÉTODO · 4 MIN", resumo: "Agrupe sinais de usuários e formule perguntas que possam ser testadas." },
  { titulo: "Qualidade de uma amostra", categoria: "dados", rotulo: "DADOS", tempoLeitura: "NOTA · 3 MIN", resumo: "Considere representatividade, recortes e incerteza antes de transformar números em decisão." }
];

const busca = document.querySelector("#busca");
const containerArtigos = document.querySelector("#artigos");
const vazio = document.querySelector("#vazio");
const quantidade = document.querySelector("#total-resultados");
const botoes = [...document.querySelectorAll(".categoria")];
let categoria = "todas";

function desenhar() {
  const consulta = busca.value.trim().toLocaleLowerCase("pt-BR");
  const resultados = registros.filter((registro) => {
    const correspondeCategoria = categoria === "todas" || registro.categoria === categoria;
    const correspondeBusca = `${registro.titulo} ${registro.rotulo} ${registro.resumo}`.toLocaleLowerCase("pt-BR").includes(consulta);
    return correspondeCategoria && correspondeBusca;
  });
  containerArtigos.replaceChildren();
  for (const registro of resultados) {
    const artigo = document.createElement("article");
    artigo.className = "artigo";
    const metadados = document.createElement("div");
    metadados.className = "metadados-artigo";
    const etiqueta = document.createElement("span");
    etiqueta.textContent = registro.rotulo;
    const tempoLeitura = document.createElement("time");
    tempoLeitura.textContent = registro.tempoLeitura;
    metadados.append(etiqueta, tempoLeitura);
    const titulo = document.createElement("h2");
    titulo.textContent = registro.titulo;
    const resumo = document.createElement("p");
    resumo.textContent = registro.resumo;
    artigo.append(metadados, titulo, resumo);
    containerArtigos.append(artigo);
  }
  quantidade.textContent = `${resultados.length} ${resultados.length === 1 ? "conteúdo" : "conteúdos"}`;
  vazio.hidden = resultados.length > 0;
}

busca.addEventListener("input", desenhar);
for (const botao of botoes) {
  botao.addEventListener("click", () => {
    categoria = botao.dataset.categoria;
    for (const botaoAtual of botoes) {
      const ativo = botaoAtual === botao;
      botaoAtual.classList.toggle("selecionado", ativo);
      botaoAtual.setAttribute("aria-pressed", String(ativo));
    }
    desenhar();
  });
}

desenhar();

