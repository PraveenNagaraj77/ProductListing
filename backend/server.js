const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
