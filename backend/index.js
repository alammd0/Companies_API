import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import companiesRouter from "./routes/companies.js";

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/v1/companies", companiesRouter);

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server started on port 3000");
});