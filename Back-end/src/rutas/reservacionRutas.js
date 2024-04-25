const express = require('express');
const router = express.Router();
const reservasController = require('../controladores/reservacionControlador');

// Define las rutas para la gestión de reservas
router.post('/',reservasController.crearReserva);
router.get('/mostrar',reservasController.reservaciones);
router.post('/liberar-sala/:id',reservasController.liberarSala);
module.exports = router;
