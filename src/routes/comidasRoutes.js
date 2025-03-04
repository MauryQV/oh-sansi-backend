const express = require('express');
const { getComidas, updateComida, deleteComida, createComida, getComidaById } = require('../controllers/comidasController'); // Importa desde el controlador

const router = express.Router();

router.get('/', getComidas);
router.post('/', createComida);
router.put('/:id', updateComida);
router.delete('/:id', deleteComida);
router.get('/:id', getComidaById);

module.exports = router;