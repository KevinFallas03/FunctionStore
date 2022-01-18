const mongoose = require("mongoose");
const { Schema } = mongoose;

const functionSchema = new Schema(
  {
    name: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    category: { 
        type: String, 
        required: true 
    },
    js_code: {
        type: String,
        required: false
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    }
  },
  {timestamps: true}
);

module.exports = mongoose.model("Functions", functionSchema);