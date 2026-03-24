const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const teacherRoutes = require("./routes/teacher.routes");
const coinsRoutes = require("./routes/coins.routes");
const aiRoutes = require("./routes/ai.routes");
const recommendationRoutes = require("./routes/recommendation.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Serve uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/coins", coinsRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/recommendations", recommendationRoutes);

// health
app.get("/health", (req, res) => res.send({ ok: true }));

module.exports = app;
