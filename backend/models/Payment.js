const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    paymentId: {
      type: String,
      required: true,
      unique: true,
    },

    invoiceNumber: {
      type: String,
      required: true,
    },

    amountPaid: {
      type: Number,
      required: true,
    },

    paymentDate: {
      type: Date,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["Cash", "UPI", "NEFT", "Cheque", "Card"],
      required: true,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", paymentSchema);