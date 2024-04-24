const pool = require('../configuracion/basedatos');

exports.listarSalas = (req, res) => {
    pool.query('SELECT * FROM salas', (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(200).json(results);
    });
};


exports.crearSala = async (req, res) => {
    const { nombre, capacidad, available } = req.body;
    
    if (!nombre || nombre.trim() === "" || typeof capacidad !== 'number' || capacidad < 1 || typeof available !== 'boolean') {
        return res.status(400).json({ message: "Todos los campos son requeridos y deben ser válidos. La capacidad debe ser un número positivo y available debe ser un valor booleano." });
    }

    try {
        const results = await pool.promise().query('INSERT INTO salas (nombre, capacidad, available) VALUES (?, ?, ?)', [nombre, capacidad, available]);
        res.status(201).json({ message: 'Sala añadida con éxito', id: results[0].insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.obtenerSala = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('SELECT * FROM salas WHERE id_sala = ?', [id], (error, results, fields) => {
        if (error) {
            console.error('Error al realizar la consulta', error);
            return res.status(500).json({ error: error.message });
        }
    
        if (results.length > 0) { // Cambia 'results.rows.length' a 'results.length'
            res.status(200).json(results[0]); // Cambia 'results.rows[0]' a 'results[0]'
        } else {
            res.status(404).json({ message: "Sala no encontrada" });
        }
    });
    
};





exports.actualizarSala = async (req, res) => {
    const { nombre, capacidad, available } = req.body;
    const { id } = req.params;

    if (!nombre || nombre.trim() === "" || typeof capacidad !== 'number' || capacidad < 1 || typeof available !== 'boolean') {
        return res.status(400).json({ message: "Todos los campos son requeridos y deben ser válidos." });
    }

    try {
        await pool.promise().query('UPDATE salas SET nombre = ?, capacidad = ?, available = ? WHERE id_sala = ?', [nombre, capacidad, available, id]);
        res.json({ message: `Sala con ID: ${id} actualizada.` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.eliminarSala = (req, res) => {
    const { id } = req.params;
    pool.query('DELETE FROM salas WHERE id_sala = ?', [id], (error, results) => {
        if (error) {
            console.error('Error al eliminar la sala:', error);
            return res.status(500).json({ error: error.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'No se encontró la sala con el ID proporcionado' });
        }
        res.status(200).json({ message: `Sala con ID: ${id} eliminada correctamente.` });
    });
};



