// ... métodos anteriores
estatisticas: (req, res) => {
AlunoRepository.contarPorCurso((erro, linhas) => {
if (erro) return res.status(500).json({ erro: erro.message });
res.status(200).json(linhas);
});
}