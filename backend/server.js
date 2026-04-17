const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, ".env"),
});

console.log("ENV CHECK:", process.env.MONGO_URI ? "YES" : "NO");
console.log("ENV VALUE:", process.env.MONGO_URI);
console.log("CWD:", process.cwd());

const app = require("./src/app");
const connectDB = require("./src/config/db");

console.log('ENV CHECK:', process.env.MONGO_URI ? 'YES' : 'NO');

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
});