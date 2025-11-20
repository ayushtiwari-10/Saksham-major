// src/app.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const teacherRoutes = require("./routes/teacher.routes");
const coinsRoutes = require("./routes/coins.routes");
const aiRoutes = require("./routes/ai.routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/coins", coinsRoutes);
app.use("/api/ai", aiRoutes);

// health
app.get("/health", (req, res) => res.send({ ok: true }));

module.exports = app;
