const mongoose=require("mongoose")
const Invoice=require("../models/Invoice")
const Payment=require("../models/Payment")
const calculateInvoiceStatus = require("../helpers/invoiceStatusHelper");


exports.getDashboard=async(req,res)=>{
    try{
        const invoices= await Invoice.find({
            uploadedBy:req.user.id
        })
        const payments=await Payment.find({
            uploadedBy:req.user.id
        })

        const totalRevenue=invoices.reduce(
            (previous,current)=>
            previous+current.invoiceAmount,0

        )
        const totalCollected=payments.reduce(
            (previous,current)=>
            previous+current.amountPaid,0);

        const outstandingAmount=totalRevenue-totalCollected;


        return res.status(200).json({
            totalRevenue,totalCollected,outstandingAmount
        })
    }


    catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
}


