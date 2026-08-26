// app.js - O comportamento do Front-end
// === FUNÇÃO 1: BUSCAR E EXIBIR ALUNOS (GET) ===
function carregarAlunos() {
// A Fetch API faz um HTTP GET para o nosso servidor na rota /api/alunos
fetch('http://localhost:3000/api/alunos')
.then(resposta => resposta.json()) // Transforma a resposta de rede em Objeto JS
.then(alunos => {
const ul = document.getElementById('listaAlunos');
ul.innerHTML = ''; // Limpa a lista na tela antes de renderizar
// Laço de repetição para cada aluno que veio do Back-end
alunos.forEach(aluno => {
const li = document.createElement('li');
// Cria o texto do item e um botão de exclusão
li.innerHTML = `
<span><strong>${aluno.nome}</strong> - ${aluno.curso}</span>

<button class="btn-delete"
onclick="deletarAluno(${aluno.id})">Remover</button>
`;
// Anexa (injeta) o novo item na tela (DOM)
ul.appendChild(li);
});
})
.catch(erro => console.error("Erro ao buscar alunos:", erro));
}
// === FUNÇÃO 2: CADASTRAR UM NOVO ALUNO (POST) ===
function cadastrarAluno() {
// 1. Pegamos os valores digitados nas caixas de texto
const nome = document.getElementById('inputNome').value;
const curso = document.getElementById('selectCurso').value;
// 2. Validação simples
if(nome === "") {
alert("Por favor, digite o nome do aluno!");
return;
}
// 3. Montamos o "Payload"
const novoAluno = { nome: nome, curso: curso };
// 4. Disparamos a requisição POST
fetch('http://localhost:3000/api/alunos', {
method: 'POST',
headers: {
'Content-Type': 'application/json' // Avisa o servidor que estamos mandando JSON
},
body: JSON.stringify(novoAluno) // Converte nosso objeto JS para Texto JSON
})
.then(resposta => {
if(resposta.status === 201) {
// Se deu certo, limpa o campo e recarrega a tabela
document.getElementById('inputNome').value = "";
carregarAlunos();
}
});
}
// === FUNÇÃO 3: REMOVER UM ALUNO (DELETE) ===
function deletarAluno(idDoAluno) {
if(confirm("Tem certeza que deseja remover este aluno?")) {
// Faz o DELETE na URL passando o ID específico
fetch(`http://localhost:3000/api/alunos/${idDoAluno}`, {
method: 'DELETE'
})
.then(resposta => {
if(resposta.status === 200) {
// Se o servidor confirmou a exclusão, recarrega a lista
carregarAlunos();
}
});
}
}
// Quando a página HTML terminar de carregar, execute a busca inicial automaticamente
carregarAlunos();