const passportLocalSequelize = require('passport-local-sequelize');

module.exports = db => {
    const User = db.sequelize.define('user', {
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
        profileImage: {
            type: db.Sequelize.STRING,
        },
        username: {
            type: db.Sequelize.STRING,
        },
        isClockedIn: {
            type: db.Sequelize.BOOLEAN,
            defaultValue: 0,
        },
        buzzdHash: {
            type: db.Sequelize.TEXT,
        },
        buzzdSalt: {
            type: db.Sequelize.TEXT,
        },
    });
    passportLocalSequelize.attachToUser(User, {
        usernameField: 'username',
        hashField: 'buzzdHash',
        saltField: 'buzzdSalt',
    });

    return User;
};
