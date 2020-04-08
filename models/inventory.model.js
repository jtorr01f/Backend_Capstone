module.exports = db => {
    const Inventory = db.sequelize.define('inventory', {
        id: {
            type: db.Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        manufacturer: {
            type: db.Sequelize.STRING,
        },
        productName: {
            type: db.Sequelize.STRING,
        },
        category: {
            type: db.Sequelize.STRING,
        },
        formula: {
            type: db.Sequelize.STRING,
        },
        price: {
            type: db.Sequelize.DECIMAL,
        },
        inStock: {
            type: db.Sequelize.INTEGER,
        },
        upc: {
            type: db.Sequelize.BIGINT,
        },
    });

    return Inventory;
};
