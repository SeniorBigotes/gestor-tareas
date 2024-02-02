// conectar a la base de datos
async function authenticate(sequelize) {
    sequelize.authenticate()
        .then(() => console.log('\nConexion a la Base de Datos establecida\n'))
        .catch(e => console.log(`\nError de conexion a la Base de Datos: ${e}\n`));
}

// sincronizar a la base de datos
async function syncronize(sequelize) {
    await new Promise(res => setTimeout(res, 1000)); // en caso de haber mas de una o más tablas "iguales"

    // sequelize.sync({force: true})
    sequelize.sync()
        .then(() => console.log('\nBase de datos sincronizada\n'))
        .catch(e => console.log(`\nError de sincronizacion a la Base de Datos: ${e}\n`));
}

module.exports = {
    authenticate,
    syncronize,
};