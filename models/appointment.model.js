module.exports = db => {
    const Appointment = db.sequelize.define('appointment', {
        id: {
            type: db.Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        service: {
            type: db.Sequelize.STRING,
        },
        style: {
            type: db.Sequelize.STRING,
        },
        appointmentDateTime: {
            type: db.Sequelize.DATE,
        },
        isArchived: {
            type: db.Sequelize.BOOLEAN,
            defaultValue: 0,
        },
    });

    return Appointment;
};
