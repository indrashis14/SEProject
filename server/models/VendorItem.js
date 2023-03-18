const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vendorItemsSchema = new mongoose.Schema({
    itemName: String,
    inStock: Boolean,
    isAvailable: Boolean,
    price: String,
    image: String,
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true }
})


module.exports= VendorItems = mongoose.model('VendorItems', vendorItemsSchema);