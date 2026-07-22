require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const leadRoutes = require("./routes/leadRoutes");

const app = express();

connectDB();

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

app.use(express.json());

// Routes
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));
app.use("/api/incomplete-orders", leadRoutes);


app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
