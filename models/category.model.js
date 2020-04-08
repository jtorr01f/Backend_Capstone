module.exports = db => {
    const Category = db.sequelize.define('category', {
        id: {
            type: db.Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        value: {
            type: db.Sequelize.STRING,
        },
    });

    return Category;
};
