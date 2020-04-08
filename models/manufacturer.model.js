module.exports = db => {
    const Manufacturer = db.sequelize.define('manufacturer', {
        id: {
            type: db.Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        value: {
            type: db.Sequelize.STRING,
        },
    });

    return Manufacturer;
};
