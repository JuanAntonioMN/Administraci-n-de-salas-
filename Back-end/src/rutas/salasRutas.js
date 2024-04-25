const express = require('express');
const router = express.Router();
const salasController = require('../controladores/salasControlador');

//rutas para las operaciones CRUD
router.get('/mostrar', salasController.listarSalas);
router.get('/disponibles', salasController.listarSalasDisponibles);
router.get('/reservada', salasController.listarSalasNoDisponibles);
router.post('/insertar', salasController.crearSala);
router.get('/:id', salasController.obtenerSala);
router.put('/:id', salasController.actualizarSala);
router.delete('/:id', salasController.eliminarSala);





module.exports = router;
