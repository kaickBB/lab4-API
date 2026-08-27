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
// === EVENT DELEGATION ===
// Um único ouvinte na Lista (elemento pai) intercepta os cliques dos botões filhos
DOM.lista.addEventListener('click', function(evento) {
// Verifica se o elemento clicado (target) tem a classe 'btn-delete'
if (evento.target.classList.contains('btn-delete')) {
// Puxa o ID que guardamos no atributo 'data-id'
const id = evento.target.getAttribute('data-id');
deletarAluno(id);
}
});
// Evento do botão de cadastro
DOM.btnCadastrar.addEventListener('click', cadastrarAluno);
// === COMUNICAÇÃO COM O BACK-END ===
function carregarAlunos() {
// Chamaremos nossa nova rota de simulação de pipeline (Criada na Fase 4)
fetch('/api/alunos/pipeline-simulador')
.then(resposta => {
if(!resposta.ok) throw new Error("Falha no servidor. Código: " + resposta.status);
return resposta.json();

})
.then(dados => {
DOM.alerta.classList.add('d-none'); // Esconde o alerta de erro
estadoApp.alunos = dados; // Elevação de Estado: Atualiza o objeto central
renderizarTela(); // Renderiza a partir do estado atualizado
})
.catch(erro => exibirErro("Falha em Cascata detectada: " + erro.message));
}
function exibirErro(mensagem) {
DOM.alerta.textContent = mensagem;
DOM.alerta.classList.remove('d-none');
}
// Inicializa a aplicação
carregarAlunos();
// (Mantenha as funções cadastrarAluno() e deletarAluno() do laboratório 2,
// apenas certificando-se de chamar carregarAlunos() no sucesso)