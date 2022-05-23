const mongoose = require('mongoose');

const { Schema } = mongoose;

const VisitSchema = new Schema({
    property: { 
        type: String,
        required: true
    },
    num_visitors: {
        type: Number, 
        required: true
    },
    date_visit: {
        type: String, 
        required: true
    },
    start_time: {
        type: String,
        required: true
    },
    end_time: {
        type: String,
        required: true
    },
    status: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Visit', VisitSchema);