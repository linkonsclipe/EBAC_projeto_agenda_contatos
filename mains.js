const form = document.getElementById('form-agenda');
const nomes = [];
const telefones = [];
let linhas = '';

form.addEventListener('submit', function(e) {
    e.preventDefault();

    adicionaLinha();
    atualizaTabela();
    contadorContatos();
});

function adicionaLinha() {
    const inputNome = document.getElementById('nome-contato');
    const inputTelefone = document.getElementById('telefone-contato');

    if (nomes.includes(inputNome.value)) {
        alert(`Já existe um contato com o nome: ${inputNome.value}!`);
        return;
    }

    const telefoneFormatado = formatarTelefone(inputTelefone.value);

    if (telefoneFormatado.length !== 15) {
        alert('O telefone deve conter 11 dígitos (xx) xxxxx-xxxx');
        return;
    }

    if (telefones.includes(telefoneFormatado)) {
        alert('Este número já está cadastrado em outro contato.');
        return;
    }

    nomes.push(inputNome.value);
    telefones.push(telefoneFormatado);

    let linha = '<tr>';
    linha += `<td>${inputNome.value}</td>`;
    linha += `<td>${telefoneFormatado}</td>`;
    linha += '</tr>';

    linhas += linha;

    inputNome.value = '';
    inputTelefone.value = '';
}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

function contadorContatos() {
    const contador = document.getElementById('contador-contatos');
    contador.textContent = nomes.length;
}

function formatarTelefone(telefone) {
    telefone = telefone.replace(/\D/g, ''); // Remove caracteres não numéricos
    telefone = telefone.replace(/^(\d{2})(\d)/g, '($1) $2'); // Formata os primeiros dígitos
    telefone = telefone.replace(/(\d{5})(\d)/, '$1-$2'); // Formata os últimos dígitos
    return telefone;
}
