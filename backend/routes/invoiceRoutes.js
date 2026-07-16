const express=require("express");;
const router=express.Router();
const authMiddleware=require("../middleware/authMiddleware");
const {
    addInvoice,
    getInvoice,
    updateInvoice,
    deleteInvoice
} = require("../controllers/invoiceController");

router.post(
    "/add",
    authMiddleware,
    addInvoice,
)

router.get("/",
    authMiddleware,
    getInvoice
)

router.put(
    "/:id",
authMiddleware,
updateInvoice
);

router.delete(
    "/:id",
authMiddleware,
deleteInvoice

)


module.exports = router;