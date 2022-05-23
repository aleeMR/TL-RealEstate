const Visit = require('../models/visit');

// Método para crear un espacio de visita
const createVisit = async (req, res) => {
    const {
        property,
        num_visitors,
        date_visit,
        start_time,
        end_time
    } = req.body;

    const status = writeStatus(0);

    const visit = new Visit({
        property,
        num_visitors,
        date_visit,
        start_time,
        end_time,
        status
    });
    // Guardamos la visita en la BD
    const visitSaved = await visit.save();

    res.status(200).json({
        visitSaved,
        msg: "Visita creada exitosamente."
    });
};

// Método para cargar los espacios de visita con estado "Libre"
const loadVisits = async (req, res) => {
    let visits = await Visit.find({ status: writeStatus(0) });

    res.status(200).json({
        visits,
        msg: "Visitas cargadas exitosamente."
    });
};

// Método para agendar un espacio de visita
const scheduleVisit = async (req, res) => {
    const id = req.params.id;

    // Buscamos el espacio de visita
    let visit = await Visit.findOne({ _id: id });;

    // Si el espacio de visita no existe
    if (!visit)
        return res.status(400).json({
            msg: "Visita no registrada."
        });
    // Si el espacio de visita existe
    const num_visitors = visit.num_visitors - 1;
    if (num_visitors <= 0)
        visit = await Visit.findOneAndUpdate({ _id: id }, { num_visitors: num_visitors, status: writeStatus(1) }, { new: true });
    else
        visit = await Visit.findOneAndUpdate({ _id: id }, { num_visitors: num_visitors }, { new: true });
    
    res.status(200).json({
        visit,
        msg: "Visita agendada exitosamente."
    });
};

// Método auxiliar para controlar estados
const writeStatus = (id) => {
    const status = [
        "Libre","Ocupado"
    ];
    return status[id];
};

module.exports = {
    createVisit,
    loadVisits,
    scheduleVisit
}