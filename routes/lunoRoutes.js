const express = require('express');
const router = express.Router();
const AlunoController = require('../controllers/alunoController');
// ATENÇÃO: Rotas fixas devem vir ANTES das rotas com parâmetros dinâmicos (/:id)
router.get('/', AlunoController.listar);
router.get('/estatisticas', AlunoController.estatisticas);
router.get('/pipeline-simulador', AlunoController.simularPipeline);
router.post('/', AlunoController.cadastrar);
router.put('/:id', AlunoController.editar);
router.delete('/:id', AlunoController.remover);
module.exports = router;