const pool = require('../configuracion/basedatos');

exports.crearReserva = (req, res) => {
    const { salaId, fechaInicio, fechaFin } = req.body;

    // Verificar que no haya solapamientos
    const checkDisponibilidad = 'SELECT * FROM reservaciones WHERE sala_id = ? AND NOT (fecha_fin <= ? OR fecha_inicio >= ?)';
    pool.query(checkDisponibilidad, [salaId, fechaInicio, fechaFin], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        if (results.length > 0) {
            return res.status(409).json({ error: 'La sala no está disponible en el rango de fechas seleccionado.' });
        }

        // Insertar la nueva reserva
        const insertReserva = 'INSERT INTO reservaciones (sala_id, fecha_inicio, fecha_fin) VALUES (?, ?, ?)';
        pool.query(insertReserva, [salaId, fechaInicio, fechaFin], (error, results) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            res.status(201).json({ message: 'Reserva creada exitosamente.', reservaId: results.insertId });
        });
    });
};


exports.liberarReserva = (req, res) => {
    const { reservaId } = req.params;
    const deleteReserva = 'DELETE FROM reservaciones WHERE id = ?';
    pool.query(deleteReserva, [reservaId], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(200).json({ message: 'Reserva liberada exitosamente.' });
    });
};
