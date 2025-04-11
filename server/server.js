require('dotenv').config();
const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const { authenticate, authorizeRoles } = require("./middlewares/auth");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);

app.get("/api/admin-only", authenticate, authorizeRoles("admin"), (req, res) => {
    res.json({ message: "Admin-only content" })
});

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({ message: err.message || "Internal Server Error" });
});

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});