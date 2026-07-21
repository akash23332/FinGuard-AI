
const mongoose =require("mongoose")
const Invoice =require("../models/Invoice")
const Payment =require("../models/Payment")
exports.getDuplicatePayments=async(req,res)=>{
    try{
        const duplicatePayments=await Payment.aggregate([
            {
                $match:{
                    uploadedBy:new mongoose.Types.ObjectId(req.user.id)
                }
               
            },
            {
                 $group:{
                    _id:"$invoiceNumber",
                    totalPayments:{
                        $sum:1
                    }
                }
            },
            {
                $match:{
                    totalPayments:{
                        $gt:1
                    }
                }
            }
        ])
        return res.status(200).json({
    duplicatePayments
});

    }
    catch(error){
        return res.status(500).json({
            message: error.message
    })
}}


exports.getInvoiceStatus = async (req, res) => {

    try {

        const invoiceStatus = await Invoice.aggregate([

            {
                $match: {
                    uploadedBy: new mongoose.Types.ObjectId(req.user.id)
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

        return res.status(200).json({
            invoiceStatus
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};