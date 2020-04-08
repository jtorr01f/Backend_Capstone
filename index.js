const express = require('express');
const hbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const db = require('./db');
const loginRouter = require('./routes/loginRoute');
const clientRouter = require('./routes/clientRoute');
const inventoryRouter = require('./routes/inventoyRoute');
const appointmentRouter = require('./routes/appointmentRoute');
const manufacturerRouter = require('./routes/manufacturerRoute');
const categoryRouter = require('./routes/categoryRoute');
const path = require('path');
const SessionStore = require('express-session-sequelize')(session.Store);
const Handlebars = require('handlebars');
const MomentHandler = require('handlebars.moment');
const sequelizeSessionStore = new SessionStore({
    db: db.sequelize,
});

const flash = require('connect-flash');

const app = express();

app.set('view engine', 'hbs');
app.engine(
    'hbs',
    hbs({
        defaultLayout: 'main',
        extname: 'hbs',
        layoutsDir: path.join(__dirname, '/views/layouts'),
        helpers: {
            dateFormat: require('handlebars-dateformat'),
        },
    })
);
MomentHandler.registerHelpers(Handlebars);

app.use(
    session({
        secret: 'kingdom hearts is light',
        store: sequelizeSessionStore,
    })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(db.User.createStrategy());
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());
app.use(express.urlencoded());
app.use(loginRouter);
app.use(clientRouter);
app.use(inventoryRouter);
app.use(appointmentRouter);
app.use(manufacturerRouter);
app.use(categoryRouter);

app.use(express.static('public'));
app.use(
    '/lib/axios/',
    express.static(path.join(__dirname, 'node_modules', 'axios', 'dist'))
);
app.use('/images', express.static(path.resolve(process.env.HOME, 'uploads')));
app.listen(process.env.PORT || 7171, () => {
    console.log('Cuttin hair and takin names on port 7171');
});

module.exports = app;
