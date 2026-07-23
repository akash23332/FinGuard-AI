const mongoose=require("mongoose")
const Invoice=require("../models/Invoice")
const Payment=require("../models/Payment")
const calculateInvoiceStatus = require("../helpers/invoiceStatusHelper");
const calculateDuplicatePayments = require("../helpers/duplicatePaymentHelper");


exports.getDashboard=async(req,res)=>{
    try{
        const invoices= await Invoice.find({
            uploadedBy:req.user.id
        })
        const payments=await Payment.find({
            uploadedBy:req.user.id
        })

        const invoiceStatus= calculateInvoiceStatus(req.user.id);

        const totalRevenue=invoices.reduce(
            (previous,current)=>
            previous+current.invoiceAmount,0

        )
        const totalCollected=payments.reduce(
            (previous,current)=>
            previous+current.amountPaid,0);

        const outstandingAmount=totalRevenue-totalCollected;
        const paidInvoices = invoiceStatus.filter(
    invoice => invoice.paymentStatus === "Paid").length;

     const paidInvoices = invoiceStatus.filter(
    invoice => invoice.paymentStatus === "Unpaid").length;

    const partiallyPaidInvoices = invoiceStatus.filter(
    invoice => invoice.paymentStatus === "Partially Paid").length;

     const overpaidInvoices = invoiceStatus.filter(
    invoice => invoice.paymentStatus === "Overpaid").length;

    const overdueInvoices = invoiceStatus.filter(
    invoice => invoice.isOverdue).length;

    const duplicatePayments = await calculateDuplicatePayments(req.user.id);
    const duplicatePaymentsCount = duplicatePayments.length;
    



        return res.status(200).json({
            totalRevenue,totalCollected,outstandingAmount,paidInvoices,
    unpaidInvoices,
    partiallyPaidInvoices,
    overpaidInvoices,
    overdueInvoices,duplicatePaymentsCount

        })
    }


    catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
}


