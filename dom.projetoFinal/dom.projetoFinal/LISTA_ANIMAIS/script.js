document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-adocao");
  const cpfInput = document.getElementById("cpf");
  const telInput = document.getElementById("telefone");
  const cepInput = document.getElementById("cep");
  const cepLoading = document.getElementById("cep-loading");
  const formContainer = document.querySelector(".form-container");

  // 1. MÁSCARA DO CPF (000.000.000-00)
  if (cpfInput) {
    cpfInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "");
      if (value.length > 11) value = value.slice(0, 11);

      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

      e.target.value = value;
    });
  }

  // 2. MÁSCARA DO TELEFONE
  if (telInput) {
    telInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "");
      if (value.length > 11) value = value.slice(0, 11);

      value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
      if (value.length > 13) {
        value = value.replace(/(\d{5})(\d)/, "$1-$2");
      } else {
        value = value.replace(/(\d{4})(\d)/, "$1-$2");
      }

      e.target.value = value;
    });
  }

  // 3. MÁSCARA DO CEP E PESQUISA AUTOMÁTICA
  if (cepInput) {
    cepInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "");
      if (value.length > 8) value = value.slice(0, 8);

      e.target.value = value.replace(/^(\d{5})(\d)/, "$1-$2");

      if (value.length === 8) {
        buscarEnderecoPorCEP(value);
      }
    });
  }

  async function buscarEnderecoPorCEP(cep) {
    if (cepLoading) cepLoading.style.display = "inline";

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        alert("CEP não encontrado. Por favor, preencha o endereço manualmente.");
        return;
      }

      if (document.getElementById("rua")) document.getElementById("rua").value = data.logradouro || "";
      if (document.getElementById("bairro")) document.getElementById("bairro").value = data.bairro || "";
      if (document.getElementById("cidade")) document.getElementById("cidade").value = data.localidade || "";
      if (document.getElementById("estado")) document.getElementById("estado").value = data.uf || "";

      const numeroInput = document.getElementById("numero");
      if (numeroInput) numeroInput.focus();
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    } finally {
      if (cepLoading) cepLoading.style.display = "none";
    }
  }

  // 4. SUBMISSÃO DO FORMULÁRIO (Capta o nome do pet dinamicamente)
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nome = document.getElementById("nome")?.value || "";
      const email = document.getElementById("email")?.value || "";

      // Lê o nome do pet diretamente do <h2> presente na página (ex: Bento)
      const petNome = document.querySelector(".pet-content h2")?.textContent.trim() || "seu novo pet";

      formContainer.innerHTML = `
        <div style="text-align: center; padding: 40px 10px; animation: fadeIn 0.4s ease;">
          <div style="width: 64px; height: 64px; background-color: rgba(31, 58, 43, 0.1); color: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px auto; font-size: 28px;">
            ✓
          </div>
          <h2 style="font-size: 24px; font-weight: 800; color: var(--primary); margin-bottom: 8px;">Solicitação Enviada!</h2>
          <p style="color: var(--text-muted); font-size: 15px; line-height: 1.6; max-width: 400px; margin: 0 auto 24px auto;">
            Obrigado, <strong>${nome}</strong>! Recebemos a sua proposta de adoção do(a) <strong>${petNome}</strong>.
          </p>
          <p style="font-size: 13px; color: var(--text-muted); background: var(--input-bg); padding: 12px; border-radius: 8px; border: 1px solid var(--border-color);">
            Enviámos uma confirmação para <strong>${email}</strong>. Entraremos em contacto via WhatsApp em breve!
          </p>
        </div>
      `;
    });
  }
});