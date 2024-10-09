require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db");
const authRouter = require("./routes/user");
const vehicleRouter = require("./routes/vehicle");
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

app.use(cors());
app.use("/", authRouter);
app.use("/", vehicleRouter);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send(
    "<h1 style='display: flex; justify-content: center;  align-items: center; height: 200px'>Welcome to MERN TASK Backend</h1>"
  );
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("DB Connected");
  } catch (error) {
    console.log(error);
  }
};

const PORT = process.env.PORT || 5050;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await start();
});
