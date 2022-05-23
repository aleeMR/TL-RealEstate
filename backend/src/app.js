// Environment Variables (Variables de entorno)
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { database } = require('./config/database');

const app = express();

// Settings (Configuraciones)
// ---------------------------------------------------------------
app.set('port', process.env.PORT || 5000);

// Middlewares (Programas intermedios)
// ---------------------------------------------------------------
app.use(cors());
app.use(express.json());

// Routes (Rutas)
// ---------------------------------------------------------------
app.use('/api/visits', require('./routes/visit.routes'));

// Starting the server (Iniciando el servidor)
// ---------------------------------------------------------------
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});