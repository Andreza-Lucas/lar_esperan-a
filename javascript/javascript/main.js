
// Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", () => {
  console.log(" JavaScript principal carregado com sucesso.");

  // Sistema SPA básico
  
  const links = document.querySelectorAll("nav a");
  const mainContent = document.querySelector("main");

  links.forEach((link) => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();

      const url = link.getAttribute("href");
      if (!url.endsWith(".html")) return; // Evita links externos

      try {
        const response = await fetch(url);
        const html = await response.text();

        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        const newMain = tempDiv.querySelector("main");

        if (newMain) {
          mainContent.innerHTML = newMain.innerHTML;
          window.history.pushState({}, "", url);
          console.log(` Conteúdo carregado: ${url}`);
        }
      } catch (error) {
        console.error("Erro ao carregar página via SPA:", error);
        mainContent.innerHTML = "<p>Erro ao carregar o conteúdo.</p>";
      }
    });
  });

  // Permite voltar páginas com o botão “voltar” do navegador
  window.addEventListener("popstate", () => {
    location.reload();
  });
});

// Alternância de modo escuro
const themeButton = document.getElementById("toggle-theme");
const userPref = localStorage.getItem("theme");

if (userPref === "dark") {
  document.body.classList.add("dark-mode");
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

// Atalho "D" para modo escuro
document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "d") {
    themeButton.click();
  }
});

// Botão leva ao formulário
const botaoForm = document.getElementById("btn-formulario");
botaoForm.addEventListener("click", () => {
  document.getElementById("formulario").scrollIntoView({ behavior: "smooth" });
});
