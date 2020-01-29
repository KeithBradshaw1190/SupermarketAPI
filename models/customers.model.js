const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const CustomersSchema = new mongoose.Schema(
  {
    customer_id: ObjectId,
    name: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    address: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Customer", CustomersSchema);
