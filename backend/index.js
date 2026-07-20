const express=require("express")
const app=express();
const mongoose=require("mongoose");
const cors=require("cors");
require("dotenv").config();


app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const paymentRoutes=require("./routes/paymentRoutes")
const detectionRoutes=require("./routes/detectionRoute")


app.use("/auth", authRoutes);
app.use("/invoice", invoiceRoutes);
app.use("/payment", paymentRoutes);
app.use("/detection",detectionRoutes)



mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {

        console.log("MongoDB Connected");

    })
    .catch((err) => {

        console.log(err);

    });

    const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server Running on Port ${PORT}`);

});
