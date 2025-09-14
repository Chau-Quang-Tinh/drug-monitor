require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_STR)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use(express.json()); // parse JSON

// Routes
const drugRoutes = require("./routes/drugRoutes");
app.use("/api/drugs", drugRoutes);

// Error handler (luôn trả JSON)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
