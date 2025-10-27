/* Validação de formulário + armazenamento local */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (!form) return;

  console.log(" Script de validação carregado.");

  const feedback = document.querySelector("#feedback");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Obtém os valores
    const nome = form.querySelector("#nome").value.trim();
    const email = form.querySelector("#email").value.trim();
    const cpf = form.querySelector("#cpf").value.trim();
    const telefone = form.querySelector("#telefone").value.trim();
    const tipo = form.querySelector("#tipo").value;

    let erros = [];

    // Validações
    
    if (nome.length < 3)
      erros.push("O nome deve conter pelo menos 3 caracteres.");

    if (!email.includes("@") || !email.includes("."))
      erros.push(" Informe um e-mail válido.");

    if (!/^[0-9]{11}$/.test(cpf))
      erros.push(" O CPF deve conter exatamente 11 números.");

    if (!/^[0-9]{10,11}$/.test(telefone))
      erros.push(" Telefone deve conter 10 ou 11 números.");

    if (!tipo)
      erros.push(" Selecione se deseja ser Doador ou Voluntário.");

    // Exibição de feedback
   
    feedback.innerHTML = "";
    feedback.className = "";

    if (erros.length > 0) {
      feedback.classList.add("erro");
      feedback.innerHTML = erros.join("<br>");
    } else {
      feedback.classList.add("sucesso");
      feedback.innerHTML = " Cadastro realizado com sucesso!";

      // Cria objeto e salva no LocalStorage
      const dados = { nome, email, cpf, telefone, tipo, data: new Date().toLocaleString() };
      localStorage.setItem("cadastro", JSON.stringify(dados));

      console.log(" Dados salvos no LocalStorage:", dados);

      form.reset();
    }
  });
});
