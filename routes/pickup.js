const PickupModel = require("../models/pickup.model");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
// Read all entries
router.get('/api/pickup', (req, res) => {
    PickupModel.find()
        .sort({
            date: -1
        })
        .then(items => console.log(res.json(items)));
});

//Get a pickup by ID
router.get('/api/pickup/:id', (req, res) => {
    PickupModel.findById({
            _id: req.params.id
        })
        .then(items => console.log(res.json(items)));
});


// Add a new entry
router.post('/api/pickup', (req, res) => {
    const pickup = new PickupModel({
        name: req.body.name,
        email: req.body.email,

    });
    pickup
        .save()
        .then(item => res.json(item));
});

// Delete an entry
router.delete('/api/pickup/:id', (req, res) => {
    PickupModel.findOneAndDelete({
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
router.put('/api/pickup/:id', (req, res) => {
    PickupModel.findOneAndUpdate({
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