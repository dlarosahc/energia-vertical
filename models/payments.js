const mongoose = require ('mongoose');

const paymentSchema = new mongoose.Schema({
    date: String,
    method: String,
    ref: String,
    amount: Number,
    classQuantity: Number,
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Package',
    },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      approved: {
        type: Boolean,
        default: false,
      },
    //   class: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Class',
    // }],
    });

    paymentSchema.set('toJSON', {
        transform: (document,returnedObject) => {
            returnedObject.id = returnedObject._id.toString();
            delete returnedObject._id;
            delete returnedObject.__v;
        }
    });

    paymentSchema.set('toJSON', {
      transform: (document,returnedObject) => {
          returnedObject.id = returnedObject._id.toString();
          delete returnedObject._id;
          delete returnedObject.__v;
      }
  });
  

    const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;