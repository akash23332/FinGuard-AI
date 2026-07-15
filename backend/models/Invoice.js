const mongoose=require("mongoose");
const invoiceSchema=new mongoose.Schema({
    invoiceNumber:{
        type:String,
        required:true,
        unique:true
    },
   vendorName:{
        type:String,
        required:true
    },
    invoiceAmount:{
        type:Number,
        required:true,
    },
    invoiceDate:{
        type:Date,
        required:true,
    },
    dueDate:{
        type:Date,
        required:true,
    },
    discount:{
        type:Number,
        default:0,

    },
    status:{
        type:String,
        enum:[
            "Pending",
            "Paid",
            "Overdue"
        ],
        default:"Pending"

    },
    uploadedBy:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
},





},{
timestamps:true
});
module.exports=mongoose.model("Invoice",invoiceSchema);