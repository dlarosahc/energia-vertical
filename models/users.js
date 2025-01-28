const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    
    idNumber: String,

    name: String,

    birthdate: String,
    
    email: String,

    phone: String,

    passwordHash: String,

    rol: {
        type: String,
        default: 'client'
    },

    verified: {
        type: Boolean,
        default: false,
    },

    
    
      payments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
      }],

      class: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
      }],

      

    
});

userSchema.set('toJSON', {
    transform: (document,returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;