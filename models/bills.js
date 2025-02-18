const mongoose = require('mongoose');


const billSchema = new mongoose.Schema({
    
   

    date: String,

    

    paid: {
        type: Boolean,
        default: false,
    },

      coach: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coach',
      },

     
      

    
});

billSchema.set('toJSON', {
    transform: (document,returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    }
});

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;