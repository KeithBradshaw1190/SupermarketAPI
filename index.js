if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Import express
const express = require("express");
// Import Body parser
const bodyParser = require("body-parser");
// Import Mongoose
const mongoose = require("mongoose");
//
// Initialise the app
const app = express();

// Import routes
const verifyWebhook = require("./routes/verify-webhook");
const customer = require("./routes/customer");
const products = require("./routes/shopping_list");
const delivery = require("./routes/delivery");
const pickup = require("./routes/pickup");

// CORs
//const cors = require('cors')

//app.use(cors());
app.use(allowCrossDomain)
app.use(function (req, res, next) {
  // Website you wish to allow to connect 'https://smartgrocery-manager.herokuapp.com' 

  res.setHeader('Access-Control-Allow-Origin', 'smartgrocery-manager.herokuapp.com/');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware

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
  process.env.MONGOOSE_CONNECT, {
    useNewUrlParser: true
  }
);
var db = mongoose.connection;

// Added check for DB connection
if (!db) console.log("Error connecting db");
else console.log("Db connected successfully");

// Setup server port
var port = process.env.PORT || 3003;

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
app.use(verifyWebhook);

// Launch app to listen to specified port
app.listen(port, function () {
  console.log("Running  on port " + port);
});