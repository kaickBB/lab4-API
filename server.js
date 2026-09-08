const express = require('express');
const sqlite3 = require('sqlite3').verbose(); // Corrigido: importação do sqlite3
// teste sinc

const app = express();
const PORT = 3000;

// === MIDDLEWARES GLOBAIS ===
app.use(express.json());
app.use(express.static('public'));

// === CONFIGURAÇÃO DO BANCO DE DADOS ===
const db = new sqlite3.Database('./universidade.db', (erro) => {
    if (erro) {
        console.error("Erro ao conectar no banco de dados:", erro.message);
    } else {
        console.log("Conectado ao banco de dados SQLite com sucesso!");
    }
});

// === CRIAÇÃO DA TABELA ===
db.run(`
    CREATE TABLE IF NOT EXISTS alunos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        curso TEXT NOT NULL
    )
`, () => {
    console.log("Tabela 'alunos' verificada/criada.");
});

// === ROTAS DA API ===

// ROTA PARA CADASTRAR (POST)
app.post('/api/alunos', (request, response) => {
    const { nome, curso } = request.body;

    if (!nome || !curso) {
        return response.status(400).json({
            erro: "Nome e curso são obrigatórios!"
        });
    }

    const sql = `INSERT INTO alunos (nome, curso) VALUES (?, ?)`;

    db.run(sql, [nome, curso], function(erro) {
        if (erro) {
            return response.status(500).json({ erro: erro.message });
        }

        response.status(201).json({
            mensagem: "Aluno matriculado no Banco de Dados!",
            id_gerado: this.lastID
        });
    });
});

// SIMULADOR DE FALHAS EM CASCATA
app.get('/api/alunos/pipeline-simulador', (request, response) => {
    const chanceDeFalha = Math.floor(Math.random() * 10) + 1;

    setTimeout(() => {
        if (chanceDeFalha <= 3) {
            return response.status(503).json({
                erro: "Cascading Failure: O pool de conexões do Banco de Dados esgotou."
            });
        }

        db.all(`SELECT * FROM alunos`, [], (erro, linhas) => {
            if (erro) {
                return response.status(500).json({ erro: erro.message });
            }
            response.status(200).json(linhas);
        });
    }, 1500);
});

// ROTA DE ESTATÍSTICAS
app.get('/api/alunos/estatisticas', (request, response) => {
    const sql = `
        SELECT 
            curso,
            COUNT(*) AS quantidade
        FROM alunos
        GROUP BY curso
        ORDER BY quantidade DESC
    `;

    db.all(sql, [], (erro, linhas) => {
        if (erro) {
            return response.status(500).json({ erro: erro.message });
        }
        response.status(200).json(linhas);
    });
});

// ROTA DE BUSCA DE ALUNOS (GET)
app.get('/api/alunos', (request, response) => {
    const sql = `SELECT * FROM alunos`;

    db.all(sql, [], (erro, linhas) => {
        if (erro) {
            return response.status(500).json({ erro: erro.message });
        }
        response.status(200).json(linhas);
    });
});

// ROTA PARA EXCLUIR (DELETE)
app.delete('/api/alunos/:id', (request, response) => {
    const idParaDeletar = request.params.id;
    const sql = `DELETE FROM alunos WHERE id = ?`;

    db.run(sql, [idParaDeletar], function(erro) {
        if (erro) {
            return response.status(500).json({ erro: erro.message });
        }

        if (this.changes === 0) {
            return response.status(404).json({ erro: "Aluno não encontrado." });
        }

        response.status(200).json({
            mensagem: "Registro apagado definitivamente."
        });
    });
});

// === INICIALIZAÇÃO DO SERVIDOR (Apenas uma chamada) ===
app.listen(PORT, () => {
    console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});