const mongoose = require ('mongoose');

const scheduleSchema = new mongoose.Schema({
    
    dayOfWeek: String, // Lunes, Martes, etc.
    time: String,
    discipline: String, // Pole Dance, Pole Exotic, etc.
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
    },
    coach: String, 
    available: {
        type: Boolean,
        default: true
    },
    });

    scheduleSchema.set('toJSON', {
        transform: (document,returnedObject) => {
            returnedObject.id = returnedObject._id.toString();
            delete returnedObject._id;
            delete returnedObject.__v;
        }
    });

    scheduleSchema.set('toJSON', {
      transform: (document,returnedObject) => {
          returnedObject.id = returnedObject._id.toString();
          delete returnedObject._id;
          delete returnedObject.__v;
      }
  });
  

    const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;