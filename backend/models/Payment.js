const mongoose=require("mongoose")
const paymentSchema=new mongoose.Schema({
    invoiceId:{
        type:mongoose.Schema.Types.ObjectId,
        ref="Invoice",
        required:true
    },
    paymentAmout:{
        type:Number,
        required:true
    },
    paymentDate:{
        type:Date,
        require:true
    },
    paymentMethod:{
        type:String,
        enum:[
            "Cash",
            "UPI",
            "NEFT",
            "Cheque",
            "Card"
        ],
        require:true
        
    },
    refrenceNumber:{
        type:String,
        require=true
    },
    recievedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }



},{
       timestamps:true
})
module.exports=mongoose.model("Payment",paymentSchema)