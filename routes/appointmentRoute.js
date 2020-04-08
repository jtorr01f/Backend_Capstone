const router = require('express').Router();
const User = require('../db').User;
const Client = require('../db').Client;
const Appointment = require('../db').Appointment;
const isLoggedIn = require('./controllers/auth.controller.js').isLoggedIn;

router.get('/appointment-list', isLoggedIn, async (req, res) => {
    let user = await User.findAll();
    let client = await Client.findAll();

    let appointment = await Appointment.findAll({
        where: {
            isArchived: false,
        },
        include: [
            {
                model: Client,
            },
            {
                model: User,
            },
        ],
    });

    res.render('buzzd-appointment-list', {
        appointment,
        user,
        client,
    });
});

router.get('/add-appointment', isLoggedIn, async (req, res) => {
    let client = await Client.findAll();
    let user = await User.findAll();
    let appointment = await Appointment.findAll({
        include: [
            {
                model: Client,
            },
        ],
    });

    res.render('add-appointment', {
        client,
        user,
        appointment,
    });
});

router.post('/add-appointment', isLoggedIn, async (req, res) => {
    let { id, style, service, appointmentDateTime, clientId } = req.body;
    let appointment;

    if (id) {
        appointment = await Appointment.findByPk(id);

        appointment.style = style;
        appointment.service = service;
        appointment.appointmentDateTime = appointmentDateTime;
        appointment.clientId = clientId;

        appointment = appointment.save();
    } else {
        appointment = await Appointment.create(req.body);

        appointment.setUser(req.user);
        appointment.clientId = clientId;

        await appointment.save();
    }

    res.redirect('/appointment-list');
});

router.get('/edit-appointment/:id', isLoggedIn, async (req, res) => {
    let appointment = await Appointment.findByPk(req.params.id);
    let client = await Client.findAll();

    res.render('edit-appointment', { appointment, client });
});

router.get('/delete-appointment/:id', isLoggedIn, async (req, res) => {
    await Appointment.destroy({
        where: {
            id: req.params.id,
        },
    });

    res.redirect('/appointment-list');
});
router.get('/delete-archive/:id', isLoggedIn, async (req, res) => {
    await Appointment.destroy({
        where: {
            id: req.params.id,
        },
    });

    res.redirect('/appointment-archive');
});

router.get('/appointment-archive', isLoggedIn, async (req, res) => {
    let user = await User.findAll();

    let appointment = await Appointment.findAll({
        where: {
            isArchived: true,
        },
        include: [
            {
                model: Client,
            },
            {
                model: User,
            },
        ],
    });

    res.render('buzzd-appointment-archive', {
        appointment,
        user,
    });
});

router.get(
    '/appointment-archive/archive-event/:id',
    isLoggedIn,
    async (req, res) => {
        let appointment = await Appointment.findByPk(req.params.id);
        if (appointment.isArchived == 0) {
            appointment.isArchived = 1;
            await appointment.save();
        }
        res.redirect('/appointment-list');
    }
);
router.get(
    '/appointment-archive/home-archive-event/:id',
    isLoggedIn,
    async (req, res) => {
        let appointment = await Appointment.findByPk(req.params.id);
        if (appointment.isArchived == 0) {
            appointment.isArchived = 1;
            await appointment.save();
        }
        res.redirect('/home');
    }
);
module.exports = router;
