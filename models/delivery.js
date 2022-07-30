const mongoose = require('mongoose')

const deliverySchema = new mongoose.Schema({
  
    
    patron_name: {
        type: String,
    required: true
    },
    patron_id: {
        type: String,
    required: true
    },
    patron_phoneNumber: {
        type: String,
    required: true
    },
    patron_address: {
        type: String,
    required: true
    },
    book_name: {
        type: String,
    required: true
    },
    ward_number: {
        type: Number,
    required: true
    },
    delivery_boy:{
        type:String
    },
    barcode: {
        type: String,
    required: true
    },
    biblio_id: {
        type: String,
    required: true
    },
    item_id:{
        type:String,
        required:true
    },
    checkout_status: {
        type: String,
    required: true,
    default:"Open"
    },
    return_status: {
        type: String,
    required: true,
    default:"N"
    },


}, { timestamps: true })

module.exports= mongoose.model('Delivery', deliverySchema)
