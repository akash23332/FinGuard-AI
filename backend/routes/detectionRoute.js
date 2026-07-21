const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getDuplicatePayments,
    getInvoiceStatus
} = require("../controllers/detectionController");

router.get(
    "/duplicate-payments",
    authMiddleware,
    getDuplicatePayments
);

router.get(
    "/invoice-status",
    authMiddleware,
    getInvoiceStatus
);

module.exports = router;