const mongoose = require('mongoose');


const coachSchema = new mongoose.Schema({
    
   

    name: String,

    

    active: {
        type: Boolean,
        default: true,
    },

      bills: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bill',
      }],

     
      

    
});

coachSchema.set('toJSON', {
    transform: (document,returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    }
});

const Coach = mongoose.model('Coach', coachSchema);

module.exports = Coach;