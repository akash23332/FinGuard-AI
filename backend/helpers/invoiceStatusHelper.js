
const mongoose = require("mongoose");
const Invoice = require("../models/Invoice");
const calculateInvoiceStatus = async (userId) => {
      const invoiceStatus = await Invoice.aggregate([

            {
                $match: {
                    uploadedBy: new mongoose.Types.ObjectId(userId)
                }
            },

            {
                $lookup: {
                    from: "payments",
                    localField: "invoiceNumber",
                    foreignField: "invoiceNumber",
                    as: "payments"
                }
            },

            {
                $addFields: {
                    totalPaid: {
                        $sum: "$payments.amountPaid"
                    }
                }
            },

            {
                $addFields: {
                    remainingAmount: {
                        $subtract: [
                            "$invoiceAmount",
                            "$totalPaid"
                        ]
                    }
                }
            },

            {
                $addFields: {

                    paymentStatus: {

                        $switch: {

                            branches: [

                                {
                                    case: {
                                        $eq: [
                                            "$totalPaid",
                                            0
                                        ]
                                    },
                                    then: "Unpaid"
                                },

                                {
                                    case: {
                                        $lt: [
                                            "$totalPaid",
                                            "$invoiceAmount"
                                        ]
                                    },
                                    then: "Partially Paid"
                                },

                                {
                                    case: {
                                        $eq: [
                                            "$totalPaid",
                                            "$invoiceAmount"
                                        ]
                                    },
                                    then: "Paid"
                                },

                                {
                                    case: {
                                        $gt: [
                                            "$totalPaid",
                                            "$invoiceAmount"
                                        ]
                                    },
                                    then: "Overpaid"
                                }

                            ],

                            default: "Unknown"

                        }

                    }

                }

            },

            {
                $addFields: {

                    isOverdue: {

                        $and: [

                            {
                                $lt: [
                                    "$dueDate",
                                    new Date()
                                ]
                            },

                            {
                                $ne: [
                                    "$paymentStatus",
                                    "Paid"
                                ]
                            }

                        ]

                    }

                }

            },

            {
                $project: {

                    _id: 0,

                    invoiceNumber: 1,

                    vendorName: 1,

                    invoiceAmount: 1,

                    invoiceDate: 1,

                    dueDate: 1,

                    totalPaid: 1,

                    remainingAmount: 1,

                    paymentStatus: 1,

                    isOverdue: 1

                }
            }

        ]);
         return invoiceStatus;
    
}
module.exports = calculateInvoiceStatus;