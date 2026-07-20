const express=require("express")
const router=express.Router()

const {addPayment,getPayments,updatePayment, deletePayment}=require("../controllers/paymentController")
const authMiddleware = require("../middleware/authMiddleware");

router.post("/add",authMiddleware,addPayment);
router.get("/",authMiddleware,getPayments);
router.put("/:id", authMiddleware, updatePayment);
router.delete("/:id", authMiddleware, deletePayment);
module.exports=router;

