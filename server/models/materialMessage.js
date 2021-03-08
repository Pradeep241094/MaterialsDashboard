import mongoose from 'mongoose';

const materialSchema = mongoose.Schema({
    // _id: Number,
    name: String,
    volume: Number,
    color: String,
    total: Number,
    cost: Number,
    delivery_date: {
        type: Date,
        default: new Date(),
    },
})

var MaterialModel = mongoose.model('MaterialModel', materialSchema);

export default MaterialModel;