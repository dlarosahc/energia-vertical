const mongoose = require ('mongoose');

const classSchema = new mongoose.Schema({
    
    schedule: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Schedule',
    },
    date: String,
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    attended: {
        type: Boolean,
        default: false,
    },

    loaded: {
        type: Boolean,
        default: false,
    },

    payment: mongoose.Schema.Types.ObjectId,
    

    });

    classSchema.set('toJSON', {
        transform: (document,returnedObject) => {
            returnedObject.id = returnedObject._id.toString();
            delete returnedObject._id;
            delete returnedObject.__v;
        }
    });

    classSchema.set('toJSON', {
      transform: (document,returnedObject) => {
          returnedObject.id = returnedObject._id.toString();
          delete returnedObject._id;
          delete returnedObject.__v;
      }
  });
  

    const Class = mongoose.model('Class', classSchema);

module.exports = Class;