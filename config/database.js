const sqlite3 = require('sqlite3').verbose();
// Conecta ao banco de dados SQLite na raiz do projeto
const db = new sqlite3.Database('./universidade.db', (erro) => {
if (erro) {
console.error("❌ Erro ao conectar no BD:", erro.message);
} else {
console.log("✅ Conectado ao banco de dados SQLite.");
// Garante que a tabela exista
db.run(`
CREATE TABLE IF NOT EXISTS alunos (
id INTEGER PRIMARY KEY AUTOINCREMENT,

nome TEXT NOT NULL,
curso TEXT NOT NULL
)
`);
}
});
module.exports = db;