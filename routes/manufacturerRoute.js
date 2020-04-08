const router = require('express').Router();
const User = require('../db').User;
const Manufacturer = require('../db').Manufacturer;
const isLoggedIn = require('./controllers/auth.controller.js').isLoggedIn;

router.get('/manufacturer-list', isLoggedIn, async (req, res) => {
    let user = await User.findAll();

    let man = await Manufacturer.findAll();

    res.render('buzzd-manufacturer-list', { man, user });
});

router.get('/add-manufacturer', isLoggedIn, async (req, res) => {
    let user = await User.findAll();

    res.render('add-manufacturer', { user });
});

router.post('/add-manufacturer', isLoggedIn, async (req, res) => {
    let { id, value } = req.body;
    let manufacturer;

    if (id) {
        manufacturer = await Manufacturer.findByPk(id);

        manufacturer.value = value;

        manufacturer = manufacturer.save();
    } else {
        manufacturer = await Manufacturer.create(req.body);

        await manufacturer.save();
    }

    res.redirect('/manufacturer-list');
});

router.get('/add-manufacturer/:id', isLoggedIn, async (req, res) => {
    let user = await User.findAll();

    let man = await Manufacturer.findByPk(req.params.id);

    res.render('edit-manufacturer', { man, user });
});

router.get('/delete-manufacturer/:id', isLoggedIn, async (req, res) => {
    await Manufacturer.destroy({
        where: {
            id: req.params.id,
        },
    });
    res.redirect('/manufacturer-list');
});

module.exports = router;
