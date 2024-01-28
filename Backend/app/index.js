const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const activities = require('./routes/activities');
const sequelize = require('./config/sequelize');

// necesario para crear los modelos en bd
const models = require('./models/index');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// CRUD
app.use('/api', activities);

// Conexion a la base de datos
sequelize.authenticate()
    .then(() => console.log('\nConexion a la Base de Datos establecida\n'))
    .catch(e => console.log(`\nError de conexion a la Base de Datos: ${e}\n`));

sequelize.sync({force: true})
// sequelize.sync()
    .then(() => console.log('\nBase de datos sincronizada\n'))
    .catch(e => console.log(`\nError de sincronizacion a la Base de Datos: ${e}\n`));

// Levantar el backend
app.listen(PORT, () => console.log(`Activos en el puerto ${PORT}`));