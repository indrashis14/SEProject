const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    quantity: { type: Number, default: 1 },
  });
// const CartSchema = new Schema({
//     userName: {
//         type: String,
//     },
//     items: [{
//         itemName: String,
//         quantity: {
//             type: Number,
//             required: true,
//             min: [1, 'Quantity can not be less then 1.'],
//             default: 1
//         },
//         price: Number
//     }],
//     bill: {
//         type: Number,       
//         default: 0
//     }
// });

module.exports = Cart = mongoose.model('Cart',CartSchema);