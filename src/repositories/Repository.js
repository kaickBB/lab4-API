// ... métodos anteriores (buscarTodos, criar, etc)
// AGREGAÇÃO: Conta alunos por curso
contarPorCurso: (callback) => {
const sql = `
SELECT curso, COUNT(*) as quantidade
FROM alunos
GROUP BY curso
`;
db.all(sql, [], callback);
}