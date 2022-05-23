const express = require('express');
const router = express.Router();

// Importando controladores
const VisitCtrl = require('../controllers/visit.controller');

// Ruta para crear un espacio de visita
router.post('/new', VisitCtrl.createVisit);

// Ruta para cargar los espacios de visita con estado "Libre"
router.get('', VisitCtrl.loadVisits);

// Ruta para agendar un espacio de visita
router.post('/:id', VisitCtrl.scheduleVisit);

module.exports = router;