function sendReport(res, data, status) {
    res.status(status).send(data);
}

function sendError(res, status, messageError) {
    res.status(status).json({message: messageError})
}

function catchError(res, e) {
    res.status(500).json({message: `Answer error: ${e.message}`});
}

module.exports = {
    sendReport,
    sendError,
    catchError,
}