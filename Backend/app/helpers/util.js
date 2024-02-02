function sendReport(res, data, status, message) {
    if(data) {
        res.status(status).send(data);
    } else {
        res.status(404).json({message: message})
    }
}

function catchError(res, e) {
    res.status(500).json({message: `Answer error: ${e.message}`});
}

module.exports = {
    sendReport,
    catchError,
}