document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const linguagens = {
    html: {
      nome: "HTML",
      texto:
        "Linguagem de marcação que cria a estrutura das páginas web: títulos, textos, imagens, links e botões. É o esqueleto do site.",
    },
    css: {
      nome: "CSS",
      texto:
        "Linguagem de estilo usada para deixar a página bonita: cores, fontes, espaçamentos, layout e animações. É a roupa do site.",
    },
    javascript: {
      nome: "JavaScript",
      texto:
        "Linguagem de programação que dá vida à página: reage a cliques, mostra janelas, faz animações e muda o conteúdo sem recarregar.",
    },
    java: {
      nome: "Java",
      texto:
        "Linguagem de programação orientada a objetos, muito usada no back-end: sistemas, APIs (com Spring Boot) e aplicações empresariais.",
    },
    sql: {
      nome: "SQL",
      texto:
        "Linguagem para conversar com bancos de dados, como o PostgreSQL: buscar, inserir, atualizar e apagar informações organizadas em tabelas.",
    },
  };

  const janela = document.createElement("div");
  janela.className = "janela-linguagem";
  janela.id = "tooltip-linguagem";
  janela.setAttribute("role", "tooltip");
  janela.setAttribute("aria-hidden", "true");
  janela.innerHTML = "<h3></h3><p></p>";
  document.body.appendChild(janela);

  function mostrar(simbolo) {
    const info = linguagens[simbolo.dataset.linguagem];
    if (!info) return;

    janela.querySelector("h3").textContent = info.nome;
    janela.querySelector("p").textContent = info.texto;

    const caixa = simbolo.getBoundingClientRect();
    const largura = janela.offsetWidth;
    const altura = janela.offsetHeight;

    let esquerda = caixa.left + caixa.width / 2 - largura / 2;
    esquerda = Math.max(10, Math.min(esquerda, window.innerWidth - largura - 10));

    let topo = caixa.top - altura - 14;
    if (topo < 10) topo = caixa.bottom + 14;
    topo = Math.max(10, Math.min(topo, window.innerHeight - altura - 10));

    janela.style.left = esquerda + "px";
    janela.style.top = topo + "px";
    janela.classList.add("visivel");
    janela.setAttribute("aria-hidden", "false");
    simbolo.setAttribute("aria-describedby", janela.id);
  }

  function esconder() {
    janela.classList.remove("visivel");
    janela.setAttribute("aria-hidden", "true");
    document.querySelectorAll(".simbolo[aria-describedby]").forEach((simbolo) => {
      simbolo.removeAttribute("aria-describedby");
    });
  }

  document.querySelectorAll(".simbolo").forEach((simbolo) => {
    simbolo.addEventListener("mouseenter", () => mostrar(simbolo));
    simbolo.addEventListener("mouseleave", () => {
      if (!simbolo.matches(":focus")) esconder();
    });
    simbolo.addEventListener("focus", () => mostrar(simbolo));
    simbolo.addEventListener("blur", esconder);
  });

  window.addEventListener("scroll", esconder);
  window.addEventListener("resize", esconder);
});