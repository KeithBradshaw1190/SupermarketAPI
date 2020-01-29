const ShoppingListModel = require('../models/shopping_list.model')
const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();


// Read all shopping lists
router.get('/api/shopping-lists', (req, res) => {
    ShoppingListModel.find()
        .sort({
            date: -1
        })
        .then(items => console.log(res.json(items)));
});

// Add a new entry
router.post('/api/shopping-list', (req, res) => {
    const shopping_list = new ShoppingListModel({
        list_id: req.body.list_id,
        customer_id: req.body.customer_id,
        list_name: req.body.list_name,
        list_items: req.body.list_items,
        items_count: req.body.items_count,
        total_price: req.body.total_price
    });
    shopping_list
        .save()
        .then(item => res.json(item));
});

// Delete an entry
router.delete('/api/shopping-list/:id', (req, res) => {
    ShoppingListModel.findOneAndDelete({
            list_id: req.params.list_id
        })
        .then(() => res.json({
            success: true
        }))
        .catch(err => res.status(404).json({
            success: false
        }));
});

// Update an entry
router.put('/api/shopping-list/:id', (req, res) => {
    ShoppingListModel.findOneAndUpdate({
            list_id: req.params.list_id
        }, req.body)
        .then(() => res.json({
            success: true
        }))
        .catch(err => res.status(404).json({
            success: false
        }));
});

// Read items in a shopping list by list id
router.get('/api/shopping-lists/:list_id', (req, res) => {
    ShoppingListModel.find()
        .sort({
            date: -1
        })
        .then(items => console.log(res.json(items)));
});
module.exports = router;