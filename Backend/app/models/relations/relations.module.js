function OneToOne(a, b, atr) {
    a.hasOne(b, { foreignKey: atr });
}

function OneToMany(a, b, atr) {
    a.hasMany(b, { foreignKey: atr });
}

function ManyToMany(a, b, atr) {
    a.belongsToMany(b, { through: atr });
    b.belongsToMany(a, { through: atr });
}

module.exports = {
    OneToOne,
    OneToMany,
    ManyToMany,
}