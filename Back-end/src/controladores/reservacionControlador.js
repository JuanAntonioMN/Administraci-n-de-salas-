const express = require('express');
const router = express.Router();
const pool = require('../configuracion/basedatos');

async function verificarDisponibilidad(id_sala, hora_inicial, hora_final) {
    const sql = 'SELECT * FROM reservaciones WHERE id_sala = ? AND NOT (hora_final <= ? OR hora_inicial >= ?)';
    console.log("Verificando disponibilidad:", {id_sala, hora_inicial, hora_final});
    const [results] = await pool.promise().query(sql, [id_sala, hora_inicial, hora_final]);
    console.log("Resultados de disponibilidad:", results);
    return results.length === 0;
}

exports.crearReserva = async (req, res) => {
    const { id_sala, hora_inicial, hora_final, fecha } = req.body;
    console.log("Recibido para crear reserva:", {id_sala, hora_inicial, hora_final, fecha});

    try {
        if (!id_sala || !hora_inicial || !hora_final || !fecha) {
            console.log("Error: Faltan datos necesarios para la reserva.");
            return res.status(400).json({ error: 'Faltan datos necesarios para la reserva.' });
        }

        const disponible = await verificarDisponibilidad(id_sala, hora_inicial, hora_final);
        if (!disponible) {
            console.log("Error: La sala no está disponible.");
            return res.status(409).json({ error: 'La sala no está disponible en el rango de fechas seleccionado.' });
        }

        const insertSql = 'INSERT INTO reservaciones (id_sala, hora_inicial, hora_final, fecha) VALUES (?, ?, ?, ?)';
        console.log("Insertando reserva...");
        const [insertResults] = await pool.promise().query(insertSql, [id_sala, hora_inicial, hora_final, fecha]);
        console.log("Reserva insertada:", insertResults);

        const updateSql = 'UPDATE salas SET available = true WHERE id_sala = ?';
        await pool.promise().query(updateSql, [id_sala]);
        console.log("Sala actualizada.");

        res.status(201).json({ message: 'Reserva creada exitosamente.', reservaId: insertResults.insertId });
    } catch (error) {
        console.error("Error al crear la reserva:", error);
        res.status(500).json({ error: error.message });
    }
};


exports.reservaciones= async (req, res) => {
    try {
        const selectSql = 'SELECT * FROM View_ReservacionesDetalles ORDER BY fecha, hora_inicial';
        const [reservaciones] = await pool.promise().query(selectSql);
        console.log("Reservaciones recuperadas con detalles de la sala:", reservaciones);
        res.status(200).json(reservaciones);
    } catch (error) {
        console.error("Error al obtener las reservaciones y detalles de la sala:", error);
        res.status(500).json({ error: error.message });
    }
};


exports.liberarSala = async (req, res) => {
    const { id } = req.params;

    try {
        // Actualizar la disponibilidad de la sala a 'disponible'
        const updateSalaSql = 'UPDATE salas SET available = false WHERE id_sala = ?';
        await pool.promise().query(updateSalaSql, [id]);

        // Opcionalmente, eliminar la reserva correspondiente
        const deleteReservaSql = 'DELETE FROM reservaciones WHERE id_sala = ?';
        await pool.promise().query(deleteReservaSql, [id]);

        console.log(`Sala ${id} liberada y reserva eliminada.`);
        res.status(200).json({ message: 'Sala liberada y reserva eliminada.' });
    } catch (error) {
        console.error("Error al liberar la sala y eliminar la reserva:", error);
        res.status(500).json({ error: error.message });
    }
};


