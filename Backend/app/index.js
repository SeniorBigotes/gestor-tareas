const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const activities = require('./routes/activities');
const subtask = require('./routes/subtask');
const user = require('./routes/user');
const group = require('./routes/group');
const note = require('./routes/note');

const sequelize = require('./config/sequelize');

const { authenticate, syncronize } = require('./helpers/helper');

// necesario para crear los modelos en bd
const models = require('./models/index');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // permitir la conexion del back al front
app.use(express.json()); // convierte los datos recibidos en formato json

// CRUD
app.use('/api', activities);
app.use('/api', subtask);
app.use('/api', user);
app.use('/api', group);
app.use('/api', note);

// Conexion a la base de datos
authenticate(sequelize);

// Sincronizar a la base de datos
syncronize(sequelize);

// Levantar el backend
app.listen(PORT, () => console.log(`Activos en el puerto ${PORT}`));


