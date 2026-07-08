require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;
const app = express();
connectDB();
const cors = require("cors");


app.use(
  cors({
    origin: "*", // পরে frontend deploy হলে specific URL বসাবে
    credentials: true,
  }),
);
app.use(express.json());

// Routes
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

app.get("/", (req, res) => res.send("Server is running ✅"));
app.use("/api/upload", require("./routes/uploadRoutes"));

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`),
);
