// Import express
const express = require("express");
// Import Body parser
const bodyParser = require("body-parser");
// Import Mongoose
const mongoose = require("mongoose");

// Initialise the app
const app = express();

// Import routes
const customer = require("./routes/customer");
const products = require("./routes/shopping_list");
const delivery = require("./routes/delivery");
const pickup = require("./routes/pickup");

// CORs
const cors = require('cors')

app.use(cors());

app.use(function (req, res, next) {

  next();
});
// Configure bodyparser to handle post requests
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
mongoose.connect(
  "mongodb+srv://keithb:Lotus1964!@supermarket-9immb.mongodb.net/users?retryWrites=true&w=majority", {
    useNewUrlParser: true
  }
);
var db = mongoose.connection;

// Added check for DB connection
if (!db) console.log("Error connecting db");
else console.log("Db connected successfully");

// Setup server port
var port = process.env.PORT || 3000;

// Send message for default URL
app.get("/", (req, res) =>
  res.send("Supermarket API- Routes are /api/customer")
);
app.use(express.json());

// Use Api routes in the App
app.use(customer);
//app.use(products);
app.use(delivery);
app.use(pickup);

// Launch app to listen to specified port
app.listen(port, function () {
  console.log("Running  on port " + port);
});