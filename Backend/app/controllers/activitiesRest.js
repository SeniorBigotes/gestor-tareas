const { json } = require('express');

// visualizar actividades
exports.viewActivities = async (req, resp) => {
    try {
        resp.json({message: 'Backend listo para usarse'});
    } catch (e) {
        console.log(e);
    }
}