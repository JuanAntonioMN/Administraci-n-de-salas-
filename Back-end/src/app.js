const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:4200'  // Asegúrate de que este es el puerto correcto para tu app Angular
}));

app.use(bodyParser.json());

// Aquí incluyes tus rutas
const salasRoutes = require('./rutas/salasRutas');
const reservasRoutes = require('./rutas/reservacionRutas');

app.use('/salas', salasRoutes);
app.use('/reservas', reservasRoutes);

app.get('/', (req, res) => {
    res.send('API de Gestión de Salas de Juntas está funcionando!');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
