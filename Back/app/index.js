const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const activities = require('./routes/activities');

dotenv.config({path: '../.env'});

const conection_mongo = process.env.CONNECTION_MONGO;
mongoose.connect(conection_mongo)
.then(() => console.log('Conectado a MongoDB...'))
.catch(e => console.error('Error de conexion a la Base de Datos', e));

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/activities', activities);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor levantado en el puerto ${port}...`));
