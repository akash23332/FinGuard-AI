const Invoice=require("../models/Invoice")

exports.addInvoice=async(req,res)=>{
    try{
        const{
           invoiceNumber,

            vendorName,

            invoiceAmount,

            invoiceDate,

            dueDate,

            discount,
            status

        } = req.body;
      ;


        const uploadedBy=req.user.id;
        const existingInvoice=await Invoice.findOne({
            invoiceNumber
        })
        if(existingInvoice){
            return res.status(400).json({
                message:"Invoice Already Exists"
            })
        }
        const newInvoice =new Invoice({
             invoiceNumber,
            vendorName,
            invoiceAmount,
            invoiceDate,
            dueDate,
            discount,
            uploadedBy
        })
        await newInvoice.save();
        res.status(201).json({
            message: "Invoice Added Successfully"
        });

    }
    catch(err){

        res.status(500).json({
            message: "Server Error"
        });
    }
}




exports.getInvoice=async(req,res)=>{
     try {
        const uploadedBy=req.user.id;
        const invoices=await Invoice.find({
            uploadedBy
        })
        res.status(200).json(invoices);

     }

    catch (err) {

        res.status(500).json({
            message: "Server Error"
        });

    }
}


exports.updateInvoice = async (req, res) => {

    try {
        const{id}=req.params;
        const{

            vendorName,

            invoiceAmount,

            invoiceDate,

            dueDate,

            discount,

            status

        }=req.body;
        const updatedInvoice=await Invoice.findByIdAndUpdate(
            id,
            {
                vendorName,

                invoiceAmount,

                invoiceDate,

                dueDate,

                discount


            },
            {
                new : true
            }
        )

        if(!updatedInvoice){

            return res.status(404).json({

                message:"Invoice Not Found"

            });

        }
        res.status(200).json({

            message:"Invoice Updated Successfully",

            updatedInvoice

        });

    }

    catch (err) {

        res.status(500).json({
            message:"Server Error"
        });

    }
    

}
exports.deleteInvoice = async (req, res) => {

    try {
        const {id}=req.params;
        const deletedInvoice=await Invoice.findByIdAndDelete(id);
        if (!deletedInvoice) {

            return res.status(404).json({

                message: "Invoice Not Found"

            });

        }

        res.status(200).json({

            message: "Invoice Deleted Successfully"

        });

    
    }

    catch (err) {

        res.status(500).json({
            message: "Server Error"
        });

    }

}