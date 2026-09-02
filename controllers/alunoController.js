const AlunoRepository = require('../repositories/alunoRepository');
const AlunoController = {
listar: (req, res) => {
AlunoRepository.buscarTodos((erro, linhas) => {
if (erro) return res.status(500).json({ erro: erro.message });
res.status(200).json(linhas);
});
},
estatisticas: (req, res) => {
AlunoRepository.contarPorCurso((erro, linhas) => {
if (erro) return res.status(500).json({ erro: erro.message });
res.status(200).json(linhas);
});
},
// Mantém a rota do Lab 4/5 para o Front-end não quebrar
simularPipeline: (req, res) => {
const chanceDeFalha = Math.floor(Math.random() * 10) + 1;
setTimeout(() => {
if (chanceDeFalha <= 3) {
return res.status(503).json({ erro: "Cascading Failure: O pool de conexões do Banco esgotou." });
}
AlunoRepository.buscarTodos((erro, linhas) => {
if (erro) return res.status(500).json({ erro: erro.message });
res.status(200).json(linhas);

});
}, 1500);
},
cadastrar: (req, res) => {
const { nome, curso } = req.body;
if (!nome || !curso) return res.status(400).json({ erro: "Nome e curso são obrigatórios!" });
AlunoRepository.criar(nome, curso, (erro, id) => {
if (erro) return res.status(500).json({ erro: erro.message });
res.status(201).json({ mensagem: "Criado!", id });
});
},
editar: (req, res) => {
const id = req.params.id;
const { nome, curso } = req.body;
AlunoRepository.atualizar(id, nome, curso, (erro, alterados) => {
if (erro) return res.status(500).json({ erro: erro.message });
if (alterados === 0) return res.status(404).json({ erro: "Aluno não encontrado." });
res.status(200).json({ mensagem: "Atualizado com sucesso!" });
});
},
remover: (req, res) => {
const id = req.params.id;
AlunoRepository.deletar(id, (erro, apagados) => {
if (erro) return res.status(500).json({ erro: erro.message });
if (apagados === 0) return res.status(404).json({ erro: "Aluno não encontrado." });
res.status(200).json({ mensagem: "Removido!" });
});
}
};
module.exports = AlunoController;