const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const scraperRoutes = require("./routes/scraperRoutes");
const connectDb = require("./config/db");
const authRouter = require("./routes/authRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Working");
});
app.use('/api/auth', authRouter);
app.use('/api/scraper', scraperRoutes);
const startServer = async () => {
    await connectDb();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is started on port ${PORT}`);
    });
};

startServer();