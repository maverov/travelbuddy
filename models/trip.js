const mongoose = require("mongoose");

// Schema
const tripSchema = new mongoose.Schema({
    created: { type: Date, default: Date.now },
    destinationName: String,
    image: String,
    leavingFrom: String,
    dates: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
        age: String
    },
    comments: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Comment"
        }
    ]
});

// Model
const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;