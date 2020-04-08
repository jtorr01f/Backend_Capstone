const router = require('express').Router();
const Client = require('../db').Client;
const User = require('../db').User;
const isLoggedIn = require('./controllers/auth.controller.js').isLoggedIn;
const path = require('path');
const multer = require('multer');
const upload = multer({
    dest: path.resolve(process.env.HOME, 'uploads'),
});

router.get('/client-list', isLoggedIn, async (req, res) => {
    let user = await User.findAll();

    let client = await Client.findAll();

    res.render('buzzd-client-list', {
        client,
        user,
    });
});

router.get('/add-client', isLoggedIn, async (req, res) => {
    let user = await User.findAll();

    res.render('add-client', { user });
});

router.post(
    '/add-client',
    upload.single('profileImage'),
    isLoggedIn,
    async (req, res) => {
        let { id, name, phone, email, address, clientBio, notes } = req.body;

        let client;

        if (id) {
            client = await Client.findByPk(id);
            client.name = name;
            client.phone = phone;
            client.email = email;
            client.address = address;
            client.clientBio = clientBio;
            client.notes = notes;

            client = await client.save();
        } else {
            client = await Client.create(req.body);
        }

        if (req.file) {
            client.profileImage = req.file.filename;

            await client.save();
        }

        res.redirect('/client-list');
    }
);

router.get('/add-client/:id', isLoggedIn, async (req, res) => {
    let client = await Client.findByPk(req.params.id);

    res.render('edit-client', {
        client,
    });
});

router.get('/delete-client/:id', isLoggedIn, async (req, res) => {
    await Client.destroy({
        where: {
            id: req.params.id,
        },
    });
    res.redirect('/client-list');
});
router.get('/profile/:id', isLoggedIn, async (req, res) => {
    let user = await User.findAll();

    let client = await Client.findByPk(req.params.id);
    res.render('profile', {
        client,
        user,
    });
});

module.exports = router;
