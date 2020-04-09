const DeliveryModel = require("../models/delivery.model");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const fb = require("../firebase/firebaseInit");

//24 Hour Clock(7am to 9pm)
var hour = new Date().getHours();
var delivery_open = "07:00:00";
var delivery_closed = "21:00:00";

// Read all entries
// router.get("/api/delivery", (req, res) => {
//     DeliveryModel.find()
//         .sort({
//             date: -1
//         })
//         .then(items => console.log(res.status(200).json(items)));
// });

//Get a delivery by deliveryID
router.get("/api/delivery/:id", (req, res) => {
    DeliveryModel.findById({
        _id: req.params.id
    }).then(items => console.log(res.json(items)));
});
//Get most recent delivery by customerid
router.get("/api/delivery/customer/:id", (req, res) => {
    DeliveryModel.find({
        customer_id: req.params.id
    }).sort({
        "updatedAt": -1
    }).limit(1).then(items => console.log(res.json(items)));
});

// Time Period available for delivery
router.get("/api/delivery-time", (req, res) => {
    res.send({
        deliveryOpen: delivery_open,
        deliveryClosed: delivery_closed
    });
});

// Add a new entry
router.post("/api/delivery/:customer_id", (req, res) => {
    console.log(req.body);
    var delivery = new DeliveryModel({
        customer_id: req.params.customer_id,
        list_name: req.body.list_name,
        delivery_time: req.body.delivery_time,
        delivery_date: req.body.delivery_date,
        messengerID: req.body.messengerID
    });

    grabUserData = async () => {
        console.log("grabbing user data");
        console.log("MessengerID" + delivery.messengerID)
        var messengerID = delivery.messengerID;
        var listName = delivery.list_name
        // var list_items = [];
        let listRef = fb.db.collection("shopping_lists");
        try {
            listRef.where("messengerID", "==", messengerID).where("listName", "==", listName).get()
                .then(snapshot => {
                    if (snapshot.empty) {
                        res.sendStatus(404);
                        console.log("No matching documents.");
                        return;
                    } else {
                        snapshot.forEach(d => {
                            console.log(d.data())
                            delivery.items_in_list = d.data().items;
                            delivery.order_price = d.data().list_price;
                            delivery.list_quantity = d.data().list_quantity
                            delivery.save()
                                .then(() => res.send(201))
                                .catch(() => res.send(404));

                        })
                    }
                });
        } catch (error) {
            console.log("Error getting document:" + error);
        };
    }
    grabUserData();
    console.log(delivery)
    // console.log(gr)
    // delivery.items_in_list = grabUserData
    // delivery.save().then(item => res.json(item));

    // let query = listRef
    //     .where("uid", "==", firebaseUID)
    //     .where("listName", "==", listName)
    //     .get()
    //     .then(snapshot => {
    //         if (snapshot.empty) {
    //             console.log("No matching documents.");
    //             return;
    //         }

    //         snapshot.forEach(doc => {

    //             console.log(doc.id, "=>", doc.data().items);
    //             // this.delivery.items_in_list.push(doc.data().items);
    //             return list_items;
    //         });
    //     })
    //     .catch(err => {
    //         console.log("Error getting documents", err);
    //     });
    // if (query.doc.exists) return query.data().items;
    //console.log(list_items);
    // delivery.items_in_list.push(list_items[0]);

    // if (
    //     delivery.delivery_time >= delivery_open &&
    //     delivery.delivery_time <= delivery_closed
    // ) {
    //     delivery.save().then(item => res.json(item));
    // } else {
    //     res.json({
    //         timesAvailable: "7AM-9PM"
    //     });
    // }
});

// Delete an entry
router.delete("/api/delivery/:id", (req, res) => {
    DeliveryModel.findOneAndDelete({
            _id: req.params.id
        })
        .then(() =>
            res.status(200).json({
                success: true
            })
        )
        .catch(err =>
            res.status(404).json({
                success: false
            })
        );
});

// Update an entry
router.put("/api/delivery/:id", (req, res) => {
    DeliveryModel.findOneAndUpdate({
                _id: req.params.id
            },
            req.body
        )
        .then(() =>
            res.status(204).json({
                success: true
            })
        )
        .catch(err =>
            res.status(404).json({
                success: false
            })
        );
});

module.exports = router;