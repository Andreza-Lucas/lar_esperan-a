
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
