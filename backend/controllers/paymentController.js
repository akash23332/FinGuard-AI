const Payment=require("../models/Payment")



exports.addPayment=async(req,res)=>{
    try{
        const {
    paymentId,
    invoiceNumber,
    amountPaid,
    paymentDate,
    paymentMethod
} = req.body;


const existingPayment=await Payment.findOne({paymentId});
if(existingPayment) {
    return res.status(400).json({
        message:"Payment Already exists"
    })
}
const payment=new Payment({
       paymentId,
            invoiceNumber,
            amountPaid,
            paymentDate,
            paymentMethod,
            uploadedBy: req.user.id
})
await payment.save();
return res.status(201).json({
    message:"Payment Added Successsfully"
})
    } catch(error){
         return res.status(500).json({
            message: error.message
    })

}}



exports.getPayments=async(req,res)=>{
    try{
        const payments=await Payment.find({uploadedBy:req.user.id})
        return res.status(200).json(payments);

    }
    catch(error){
          return res.status(500).json({
            message: error.message
        });

    }
}

exports.updatePayment=async(req,res)=>{
    try{
        const updatePayment=await Payment.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        )
        if(!updatePayment){
            return res.status(404).json({
                message: "Payment Not Found"
            });
        }
           return res.status(200).json({
            message: "Payment Updated Successfully",
            updatePayment
        });
    }
    catch(error){
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.deletePayment=async(req,res)=>{
    try{
        const deletedPayment = await Payment.findByIdAndDelete(req.params.id);
        if(!deletedPayment){
            return res.status(404).json({
                message: "Payment Not Found"
            });

        }
         return res.status(200).json({
            message: "Payment Deleted Successfully"
        });

    }
    catch (error) {

        return res.status(500).json({
            message: error.message
        })
}}