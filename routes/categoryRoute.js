const router = require('express').Router();
const User = require('../db').User;
const Category = require('../db').Category;
const isLoggedIn = require('./controllers/auth.controller.js').isLoggedIn;

router.get('/category-list', isLoggedIn, async (req, res) => {
    let user = await User.findAll();

    let cat = await Category.findAll();

    res.render('buzzd-category-list', { cat, user });
});

router.get('/add-category', isLoggedIn, async (req, res) => {
    let user = await User.findAll();

    res.render('add-category'), { user };
});
router.post('/add-category', isLoggedIn, async (req, res) => {
    let { id, value } = req.body;
    let category;

    if (id) {
        category = await Category.findByPk(id);

        category.value = value;

        category = category.save();
    } else {
        category = await Category.create(req.body);

        await category.save();
    }

    res.redirect('/category-list');
});

router.get('/add-category/:id', isLoggedIn, async (req, res) => {
    let user = await User.findAll();

    let cat = await Category.findByPk(req.params.id);

    res.render('edit-category', { cat, user });
});

router.get('/delete-category/:id', isLoggedIn, async (req, res) => {
    await Category.destroy({
        where: {
            id: req.params.id,
        },
    });
    res.redirect('/category-list');
});

module.exports = router;
