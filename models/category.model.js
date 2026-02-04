const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true }); 

module.exports = mongoose.model("Category", categorySchema);