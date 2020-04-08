const router = require('express').Router();
const User = require('../db').User;
const Inventory = require('../db').Inventory;
const Category = require('../db').Category;
const Manufacturer = require('../db').Manufacturer;
const isLoggedIn = require('./controllers/auth.controller.js').isLoggedIn;

router.get('/api/increment/:id', isLoggedIn, async (req, res) => {
    let inv = await Inventory.findByPk(req.params.id);
    let inStock = inv.inStock;
    inv.inStock = ++inStock;

    await inv.save();

    res.json(inStock);
});
router.get('/api/decrement/:id', isLoggedIn, async (req, res) => {
    let inv = await Inventory.findByPk(req.params.id);
    let inStock = inv.inStock;
    inv.inStock = --inStock;

    await inv.save();

    res.json(inStock);
});

router.get('/inventory-list', isLoggedIn, async (req, res) => {
    let user = await User.findAll();
    let items = await Inventory.findAll();
    let manufacturer = await Manufacturer.findAll();
    let category = await Category.findAll();

    res.render('buzzd-inventory-list', {
        items,
        user,
        manufacturer,
        category,
    });
});

router.get('/add-inventory', isLoggedIn, async (req, res) => {
    let user = await User.findAll();
    let manufacturer = await Manufacturer.findAll();
    let category = await Category.findAll();

    res.render('add-item', {
        manufacturer,
        category,
        user,
    });
});

router.post('/add-item', isLoggedIn, async (req, res) => {
    let {
        itemid,
        manufacturer,
        category,
        formula,
        upc,
        price,
        inStock,
        productName,
    } = req.body;
    console.log(req.body);

    let item;

    if (itemid) {
        item = await Inventory.findByPk(itemid);
        console.log('ITEM', item);
        item.manufacturer = manufacturer;
        item.category = category;
        item.upc = upc;
        item.productName = productName;
        item.formula = formula;
        item.price = price;
        item.inStock = inStock;

        item = await item.save();
    } else {
        item = await Inventory.create(req.body);

        item = await item.save();
    }

    if (req.file) {
        item.profileImage = req.file.filename;

        await item.save();
    }

    res.redirect('/inventory-list');
});

router.get('/add-item/:itemid', isLoggedIn, async (req, res) => {
    let user = await User.findAll();
    let item = await Inventory.findByPk(req.params.itemid);
    let man = await Manufacturer.findAll();
    let cat = await Category.findAll();

    res.render('edit-item', {
        item,
        man,
        cat,
        user,
    });
});

router.get('/delete-item/:id', isLoggedIn, async (req, res) => {
    await Inventory.destroy({
        where: {
            id: req.params.id,
        },
    });
    res.redirect('/inventory-list');
});

module.exports = router;
