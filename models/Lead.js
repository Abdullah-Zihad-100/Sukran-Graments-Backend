const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: String,

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },

    productName: String,

    quantity: Number,

    totalPrice: Number,

    orderItems: Array,

    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Lead", leadSchema);
