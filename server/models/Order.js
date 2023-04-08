const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor"
    },
    products: [
      {
        productId: { 
          type: mongoose.Schema.Types.ObjectId,
          ref: "VendorItems"
        },
        itemName: String,
        price: Number,
        quantity: Number
      }
    ],
    status: {
      type: String,
      enum: ['new', 'accepted', 'fulfilled'],
      default: 'new'
    },
    createdOn: {
      type: Date,
      default: Date.now
    },
    modifiedOn: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = Order = mongoose.model("orders", OrderSchema);