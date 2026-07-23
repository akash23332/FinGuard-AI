const mongoose = require("mongoose");
const Payment = require("../models/Payment");

const calculateDuplicatePayments = async(userId)=>{
    const duplicatePayments=await Payment.aggregate([
            {
                $match:{
                    uploadedBy:new mongoose.Types.ObjectId(UserId)
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
        return duplicatePayments;

}
module.exports = calculateDuplicatePayments;