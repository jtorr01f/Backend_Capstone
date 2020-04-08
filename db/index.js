const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    process.env.DB_ENV || 'buzzd',
    process.env.DB_ADM || 'root',
    process.env.DB_PASS || '',
    {
        dialect: process.env.DB_DIALECT || 'mariadb',
        dialectOptions: {
            options: {
                encrypt: true,
            },
            timezone: 'America/Chicago',
        },
        host: process.env.DB_HOST || 'localhost',
        pool: {
            max: 5,
            min: 0,
            aquire: 20000,
            idle: 20000,
        },
    }
);

sequelize.authenticate().then(
    () => {
        console.log('success');
    },
    () => {
        console.log('connection failed');
    }
);
let db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('../models/user.model')(db);
db.Client = require('../models/client.model')(db);
db.Appointment = require('../models/appointment.model')(db);
db.Inventory = require('../models/inventory.model')(db);
db.Category = require('../models/category.model')(db);
db.Manufacturer = require('../models/manufacturer.model')(db);
db.Clock = require('../models/onClock.model')(db);

db.User.hasMany(db.Appointment);
db.User.hasMany(db.Clock);
db.Client.hasMany(db.Appointment);
db.Inventory.hasMany(db.Manufacturer);
db.Inventory.hasMany(db.Category);

db.Appointment.belongsTo(db.User);
db.Clock.belongsTo(db.User);
db.Appointment.belongsTo(db.Client);
db.Category.belongsTo(db.Inventory);
db.Manufacturer.belongsTo(db.Inventory);

sequelize.sync();
//sequelize.sync({ force: true });

module.exports = db;
