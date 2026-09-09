/* =========================================================
FORMULÁRIO DE DENÚNCIA
========================================================= */

// Procuramos o formulário pelo seu ID
const denunciaForm = document.getElementById("denuncia-form");

// Procuramos a opção de denúncia anónima
const anonimo = document.getElementById("anonimo");

// Procuramos o campo do nome
const nome = document.getElementById("nome");

// Procuramos o campo do contacto
const contacto = document.getElementById("contacto");

// Procuramos a mensagem de erro
const formErrors = document.getElementById("form-errors");

// Procuramos o elemento onde será apresentada a mensagem de erro
const errorMessage = document.getElementById("error-message");

// Procuramos a mensagem de sucesso
const formSuccess = document.getElementById("form-success");

/* =========================================================
DENÚNCIA ANÓNIMA
========================================================= */

// Quando o utilizador clicar na opção "anónimo"
anonimo.addEventListener("change", function () {


// Verificamos se a opção está marcada
if (anonimo.checked) {

    // Limpamos o nome
    nome.value = "";

    // Limpamos o contacto
    contacto.value = "";

    // Desativamos o campo nome
    nome.disabled = true;

    // Desativamos o campo contacto
    contacto.disabled = true;

} else {

    // Ativamos novamente o campo nome
    nome.disabled = false;

    // Ativamos novamente o campo contacto
    contacto.disabled = false;

}


});

/* =========================================================
GERAR PROTOCOLO
========================================================= */

// Esta função cria um número único para cada denúncia
function gerarProtocolo() {


// Obtém a data e hora atual
const agora = new Date();

// Obtém o ano
const ano = agora.getFullYear();

// Gera números aleatórios
const numero = Math.floor(
    100000 + Math.random() * 900000
);

// Junta tudo e devolve o protocolo
return `DEN-${ano}-${numero}`;


}

/* =========================================================
VALIDAR FORMULÁRIO
========================================================= */

function validarFormulario() {

// Escondemos mensagens anteriores
formErrors.style.display = "none";

formSuccess.style.display = "none";


// Obtém os valores dos campos
const tipo = document.getElementById("tipo").value;

const local = document.getElementById("local").value.trim();

const data = document.getElementById("data").value;

const descricao = document
    .getElementById("descricao")
    .value
    .trim();


// Verifica se o tipo foi selecionado
if (tipo === "") {

    mostrarErro(
        "Por favor, selecione o tipo de ocorrência."
    );

    return false;

}


// Verifica se o local foi preenchido
if (local === "") {

    mostrarErro(
        "Por favor, informe onde aconteceu a ocorrência."
    );

    return false;

}


// Verifica se a data foi preenchida
if (data === "") {

    mostrarErro(
        "Por favor, informe a data da ocorrência."
    );

    return false;

}


// Verifica se a descrição foi preenchida
if (descricao === "") {

    mostrarErro(
        "Por favor, descreva o que aconteceu."
    );

    return false;

}


// Verifica se a descrição possui pelo menos 10 caracteres
if (descricao.length < 10) {

    mostrarErro(
        "A descrição deve ter pelo menos 10 caracteres."
    );

    return false;

}


// Se tudo estiver correto
return true;


}

/* =========================================================
MOSTRAR ERRO
========================================================= */

function mostrarErro(mensagem) {


// Coloca a mensagem dentro do elemento
errorMessage.textContent = mensagem;

// Mostra a caixa de erro
formErrors.style.display = "block";

// Leva o utilizador até à mensagem
formErrors.scrollIntoView({
    behavior: "smooth",
    block: "center"
});


}

/* =========================================================
ENVIAR DENÚNCIA
========================================================= */

denunciaForm.addEventListener("submit", function (event) {


// Impede o formulário de recarregar a página
event.preventDefault();


// Verifica se os dados são válidos
if (!validarFormulario()) {

    return;

}


/* =====================================================
   OBTER OS DADOS
====================================================== */

const denuncia = {

    // Identificador único da denúncia
    id: Date.now(),

    // Número de protocolo
    protocolo: gerarProtocolo(),

    // Nome
    nome: anonimo.checked
        ? "Anónimo"
        : nome.value.trim(),

    // Contacto
    contacto: anonimo.checked
        ? "Não informado"
        : contacto.value.trim(),

    // Indica se é anónima
    anonima: anonimo.checked,

    // Tipo de ocorrência
    tipo: document.getElementById("tipo").value,

    // Local
    local: document.getElementById("local").value.trim(),

    // Data
    data: document.getElementById("data").value,

    // Descrição
    descricao: document
        .getElementById("descricao")
        .value
        .trim(),

    // Pessoas envolvidas
    envolvidos: document
        .getElementById("envolvidos")
        .value
        .trim(),

    // Testemunhas
    testemunhas: document
        .getElementById("testemunhas")
        .value
        .trim(),

    // Estado inicial da denúncia
    estado: "Pendente",

    // Data em que a denúncia foi enviada
    dataEnvio: new Date().toISOString()

};


/* =====================================================
   RECUPERAR DENÚNCIAS EXISTENTES
====================================================== */

let denuncias =
    JSON.parse(
        localStorage.getItem("denuncias")
    ) || [];


/* =====================================================
   ADICIONAR NOVA DENÚNCIA
====================================================== */

denuncias.push(denuncia);


/* =====================================================
   GUARDAR NO LOCALSTORAGE
====================================================== */

localStorage.setItem(
    "denuncias",
    JSON.stringify(denuncias)
);


/* =====================================================
   MOSTRAR SUCESSO
====================================================== */

formSuccess.innerHTML = `
    <p>
        <strong>Denúncia enviada com sucesso!</strong>
    </p>

    <p>
        O seu protocolo é:
        <strong>${denuncia.protocolo}</strong>
    </p>

    <p>
        Guarde este número para consultar a denúncia
        posteriormente.
    </p>
`;


// Mostra a mensagem
formSuccess.style.display = "block";


// Limpa o formulário
denunciaForm.reset();


// Reativa os campos
nome.disabled = false;

contacto.disabled = false;


// Leva o utilizador para a mensagem
formSuccess.scrollIntoView({
    behavior: "smooth",
    block: "center"
});


});
