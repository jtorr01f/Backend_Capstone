module.exports = db => {
    const Clock = db.sequelize.define(
        'onClock',
        {
            id: {
                type: db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            clockIn: {
                type: db.Sequelize.BIGINT,
            },
            clockOut: {
                type: db.Sequelize.BIGINT,
            },
        },
        {
            getterMethods: {
                totalTimeOnClock() {
                    return this.clockOut - this.clockIn;
                },
            },
        }
    );

    return Clock;
};
