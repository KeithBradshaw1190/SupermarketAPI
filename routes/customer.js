const CustomerModel = require("../models/customers.model");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
// Import Bcrypt
const bcrypt = require("bcrypt");
const saltRounds = 10;
// Read all entries
// router.get("/api/customers", (req, res) => {
//   CustomerModel.find().then(items => console.log(res.json(items)));
// });

//Get a Customer by ID
router.get("/api/customer/:id", (req, res) => {
  CustomerModel.findById({
    _id: req.params.id
  }).then(items => console.log(res.json(items)));
});

//Get a Customer by Email/Password
router.post("/api/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email);

  //Check if customer Exists
  CustomerModel.findOne({
    email: email
  }, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        console.log(foundUser);
        bcrypt.compare(password, foundUser.password, function (err, result) {
          if (result === true) {
            res.status(200).json({
              id: foundUser.id,
              success: true
            });
          } else {
            res.sendStatus(400);
          }
        });
      }
    }
  });
});

// Add a new customer + Hash password
router.post("/api/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password
  //Check if customer Exist
  console.log("req body" + req.body)
  CustomerModel.findOne({
    "email": email
  }, (err, foundUser) => {
    if (err) {
      res.status(500).send(err)
    } else {
      //console.log(foundUser);
      //Else Create new customer
      if (!foundUser) {
        bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err) {
            console.log(err);
          } else {
            const customer = new CustomerModel({
              email: req.body.email,
              password: hash,
              address: req.body.address
            });
            //Successfully created
            customer.save()
              .then((cust) => res.status(201).json({
                id: cust._id
              }))
              .catch((msg) => {
                res.status(400).json({
                  messsage: msg
                })
              });
          }
        });
      } else {
        //User exists
        res.sendStatus(409);
      }
    }
  });
});



// Update Address
router.put("/api/customer/:id", (req, res) => {
  CustomerModel.findOneAndUpdate({
        _id: req.params.id
      }, {
        address: req.body.address
      }

    )
    .then(() =>
      res.status(204).json({
        success: true
      })
    )
    .catch(err =>
      res.status(404).json({
        error: err.message,
        success: false
      })
    );
});

// Delete an entry
router.delete("/api/customer/:id", (req, res) => {
  CustomerModel.findOneAndDelete({
      _id: req.params.id
    })
    .then(() =>
      res.json({
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