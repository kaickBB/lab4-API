const db = require('../config/database');
const AlunoRepository = {
buscarTodos: (callback) => {
db.all(`SELECT * FROM alunos`, [], callback);
},
contarPorCurso: (callback) => {
db.all(`SELECT curso, COUNT(*) as quantidade FROM alunos GROUP BY curso`, [], callback);
},
criar: (nome, curso, callback) => {
db.run(`INSERT INTO alunos (nome, curso) VALUES (?, ?)`, [nome, curso], function(erro) {
callback(erro, this ? this.lastID : null);
});
},
atualizar: (id, nome, curso, callback) => {
db.run(`UPDATE alunos SET nome = ?, curso = ? WHERE id = ?`, [nome, curso, id],
function(erro) {
callback(erro, this ? this.changes : 0);
});
},
deletar: (id, callback) => {
db.run(`DELETE FROM alunos WHERE id = ?`, [id], function(erro) {

callback(erro, this ? this.changes : 0);
});
}
};
module.exports = AlunoRepository;