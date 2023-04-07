const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema(
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
        productId:{ 
          type: mongoose.Schema.Types.ObjectId,
          ref: "VendorItems"
        },        
        
        quantity: Number,
        itemName: String,
        price: String
      }
    ],
    active: {
      type: Boolean,
      default: true
    },
    modifiedOn: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = Cart = mongoose.model("carts", CartSchema);