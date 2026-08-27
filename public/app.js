// === LIFTING STATE UP: O Estado Global da Aplicação ===
const estadoApp = {
alunos: [], // Guarda a lista de alunos na memória do navegador
carregando: false // Indica se estamos aguardando o Back-end
};
// === MANIPULAÇÃO DE OBJETOS DO HTML ===
const DOM = {
lista: document.getElementById('listaAlunos'),
inputNome: document.getElementById('inputNome'),
selectCurso: document.getElementById('selectCurso'),
btnCadastrar: document.getElementById('btnCadastrar'),
alerta: document.getElementById('alertaSistema')
};
// Função unificada para renderizar a tela baseada no estadoApp
function renderizarTela() {

DOM.lista.innerHTML = '';
estadoApp.alunos.forEach(aluno => {
const li = document.createElement('li');
li.className = "list-group-item d-flex justify-content-between align-items-center";
// Note que removemos o onclick="deletarAluno()" daqui!
li.innerHTML = `
<span><strong>${aluno.nome}</strong> - ${aluno.curso}</span>
<button class="btn btn-danger btn-sm btn-delete" data-id="${aluno.id}">Remover</button>
`;
DOM.lista.appendChild(li);
});
}