const mongoose = require ('mongoose');

const packageSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    classQuantity: Number,
    available: {
        type: Boolean,
        default: true
    },
    
    });

packageSchema.set('toJSON', {
        transform: (document,returnedObject) => {
            returnedObject.id = returnedObject._id.toString();
            delete returnedObject._id;
            delete returnedObject.__v;
        }
    });
    
    const Package = mongoose.model('Package', packageSchema);

module.exports = Package;