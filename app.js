require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db");
const authRouter = require("./routes/user");
const vehicleRouter = require("./routes/vehicle");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", authRouter);
app.use("/", vehicleRouter);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send(
    "<h1 style='display: flex; justify-content: center; align-items: center; height: 200px'>Welcome to MERN TASK Backend</h1>"
  );
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("DB Connected");

    const PORT = process.env.PORT || 5050;

    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    server.setTimeout(30000);
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

// Start the server
start();
