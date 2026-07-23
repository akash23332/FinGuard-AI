
const mongoose =require("mongoose")
const calculateInvoiceStatus = require("../helpers/invoiceStatusHelper");
const duplicatePaymentsCount=require("../helpers/duplicatePaymentHelper")
const Invoice =require("../models/Invoice")
const Payment =require("../models/Payment")

exports.getDuplicatePayments=async(req,res)=>{
    try{
        const duplicatePayments=await calculateDuplicatePayments(req.user.id);
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

    const invoiceStatus = await calculateInvoiceStatus(req.user.id);

        return res.status(200).json({
            invoiceStatus
        });
       

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};
