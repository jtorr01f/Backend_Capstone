module.exports = db => {
    const Client = db.sequelize.define('client', {
        id: {
            type: db.Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: db.Sequelize.STRING,
        },
        phone: {
            type: db.Sequelize.STRING,
        },
        email: {
            type: db.Sequelize.STRING,
        },
        address: {
            type: db.Sequelize.STRING,
        },
        profileImage: {
            type: db.Sequelize.STRING,
        },
        clientBio: {
            type: db.Sequelize.STRING,
        },
        notes: {
            type: db.Sequelize.TEXT,
        },
        notesPhoto: {
            type: db.Sequelize.STRING,
        },
        isClockedIn: {
            type: db.Sequelize.BOOLEAN,
        },
    });

    return Client;
};
