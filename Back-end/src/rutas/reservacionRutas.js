const express = require('express');
const router = express.Router();
const reservasController = require('../controladores/reservacionControlador');

// Define las rutas para la gestión de reservas
router.post('/',reservasController.crearReserva);
router.delete('/:id', reservasController.liberarReserva);

module.exports = router;
