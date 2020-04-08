const router = require('express').Router();
const User = require('../db').User;
const Client = require('../db').Client;
const passport = require('passport');
const Appointment = require('../db').Appointment;
const isLoggedIn = require('./controllers/auth.controller.js').isLoggedIn;
const path = require('path');
const multer = require('multer');
const upload = multer({
    dest: path.resolve(process.env.HOME, 'uploads'),
});
const Op = require('../db').Sequelize.Op;

/*-------------------------------------------------------- Login Routes -------------------------------------------------------*/
router.get('/home', isLoggedIn, async (req, res) => {
    let user = req.user.id;
    let client = Client.findAll();
    let user2 = User.findAll();
    let start = new Date();
    let appointment2 = Appointment.findAll();
    start.setHours(0, 0, 0, 0);

    let end = new Date();
    end.setHours(23, 59, 59, 999);

    let appointment = await Appointment.findAll({
        where: {
            userId: user,
            appointmentDateTime: {
                [Op.gt]: start,
                [Op.lt]: end,
            },
            isArchived: false,
        },
        include: [
            {
                model: Client,
            },
        ],
    });

    res.render('buzzd-home', {
        user: req.user,
        appointment,
        user2,
        client,
        appointment2,
    });
});

router.get('/', isLoggedIn, async (req, res) => {
    res.redirect('/home');
});

router.get('/login', (req, res) => {
    res.render('buzzd-login', {
        flashes: req.flash('error'),
    });
});

router.post(
    '/login',
    passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: 'Incorrect Password or Username',
    }),
    (req, res) => {
        res.redirect('/home');
    }
);

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
});

/*-------------------------------------------------------- Register Routes ----------------------------------------------------*/

router.get('/register-user', (req, res) => {
    res.render('buzzd-registration');
});

router.post('/register-user', upload.single('profileImage'), (req, res) => {
    let { password } = req.body;

    User.register(req.body, password, async (err, registeredUser) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (req.file) {
            registeredUser.profileImage = req.file.filename;

            await registeredUser.save();
        }

        registeredUser.save().then(() => {
            res.redirect('/login');
        });
    });
});

/*-------------------------------------------------------- User Profile Routes ----------------------------------------------------*/

router.get('/user-profile/:userId', isLoggedIn, (req, res) => {
    let userId = User.findByPk(req.params.userId);
    res.render('user-profile', userId);
});

module.exports = router;
