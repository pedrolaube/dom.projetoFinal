const form = document.getElementById("form-animal");
const botaoCadastrar = document.getElementById("btn-cadastrar");

function campoVazio(valor) {
    return valor.trim() === "";
}

function validarFormulario() {
    const nome = document.getElementById("nome").value;
    const especie = document.getElementById("especie").value;
    const raca = document.getElementById("raca").value;
    const idade = document.getElementById("idade").value;
    const cidade = document.getElementById("cidade").value;
    const estado = document.getElementById("estado").value;
    const descricao = document.getElementById("descricao").value;
    const personalidade = document.getElementById("personalidade").value;
    const informacoes = document.getElementById("informacoes").value;

    const sexo = document.querySelector('input[name="sexo"]:checked');

    if (campoVazio(nome)) {
        return false;
    }

    if (especie === "") {
        return false;
    }

    if (campoVazio(raca)) {
        return false;
    }

    if (idade === "") {
        return false;
    }

    const idadeNumero = Number(idade);

    if (idadeNumero < 0) {
        return false;
    }

    if (!sexo) {
        return false;
    }

    if (campoVazio(cidade)) {
        return false;
    }

    if (estado === "") {
        return false;
    }

    if (campoVazio(descricao)) {
        return false;
    }

    if (campoVazio(personalidade)) {
        return false;
    }

    if (campoVazio(informacoes)) {
        return false;
    }

    return true;
}

form.addEventListener("input", function() {
    if (validarFormulario()) {
        botaoCadastrar.disabled = false;
    } else {
        botaoCadastrar.disabled = true;
    }
});

form.addEventListener("change", function() {
    if (validarFormulario()) {
        botaoCadastrar.disabled = false;
    } else {
        botaoCadastrar.disabled = true;
    }
});

form.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!validarFormulario()) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    alert("Animal cadastrado com sucesso!");
    form.reset();
    botaoCadastrar.disabled = true;
    if (photoLabel && photoDrop) {
        photoLabel.textContent = "Adicione uma foto do animal";
        photoDrop.classList.remove("has-file");
    }
    window.location.href = "../HOME/Home.html";
});

// Abre o seletor de arquivo ao clicar na área de foto
const photoDrop = document.getElementById("photoDrop");
const photoInput = document.getElementById("foto");
const photoLabel = document.getElementById("photoLabel");

if (photoDrop && photoInput) {
    photoDrop.addEventListener("click", () => photoInput.click());
    photoInput.addEventListener("change", () => {
        if (photoInput.files.length > 0) {
            photoLabel.textContent = photoInput.files[0].name;
            photoDrop.classList.add("has-file");
        } else {
            photoLabel.textContent = "Adicione uma foto do animal";
            photoDrop.classList.remove("has-file");
        }
    });
}