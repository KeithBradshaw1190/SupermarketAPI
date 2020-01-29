const DeliveryModel = require("../models/delivery.model");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
// Read all entries
router.get('/api/delivery', (req, res) => {
    DeliveryModel.find()
        .sort({
            date: -1
        })
        .then(items => console.log(res.json(items)));
});

//Get a delivery by ID
router.get('/api/delivery/:id', (req, res) => {
    DeliveryModel.findById({
            _id: req.params.id
        })
        .then(items => console.log(res.json(items)));
});


// Add a new entry
router.post('/api/delivery', (req, res) => {
    const delivery = new DeliveryModel({
        status: req.body.status,
        products: req.body.products,
        customer_id: req.body.customer_id
    });
    delivery
        .save()
        .then(item => res.json(item));
});

// Delete an entry
router.delete('/api/delivery/:id', (req, res) => {
    DeliveryModel.findOneAndDelete({
            _id: req.params.id
        })
        .then(() => res.json({
            success: true
        }))
        .catch(err => res.status(404).json({
            success: false
        }));
});

// Update an entry
router.put('/api/delivery/:id', (req, res) => {
    DeliveryModel.findOneAndUpdate({
            _id: req.params.id
        }, req.body)
        .then(() => res.json({
            success: true
        }))
        .catch(err => res.status(404).json({
            success: false
        }));
});

module.exports = router;