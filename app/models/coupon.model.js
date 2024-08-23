const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String
    },
    discount: {
        type: Number,
        required: true
    },
    discountType: {
        type: String,
        enum: ['percentage', 'flat'],
        required: true
    },
    imageId: {
        type: Object
    },
    expirationDateString: { // Store expiration date as a string in "dd/mm/yyyy" format
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        index: true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: false,
        index: true,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        index: true,
        default: false
    },
    isActive: {
        type: Boolean,
        index: true,
        default: true
    }
});

// Virtual property to convert expirationDateString to Date object
couponSchema.virtual('expirationDate').get(function() {
  if (!this.expirationDateString) {
      return undefined; // or handle this case according to your application's logic
  }

  const parts = this.expirationDateString.split('/');
  if (parts.length !== 3) {
      return undefined; // or handle invalid date string
  }

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Month is zero-based
  const year = parseInt(parts[2], 10);
  return new Date(year, month, day);
});


const Coupon = mongoose.model("Coupon", couponSchema);

module.exports = Coupon;
