const express =require("express");
const router=express.Router();
const authMiddleware=require("../middleware/authMiddleware")

const {getDuplicatePayments}=require("../controllers/detectionController")

router.get("/duplicate-payments",authMiddleware,getDuplicatePayments)
module.exports=router;