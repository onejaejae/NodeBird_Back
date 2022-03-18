import express from "express";
import dotenv from "dotenv";
import postRoute from "./routes/postRoute";
import userRoute from "./routes/userRoute";
import db from "../models";

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/posts", postRoute);
app.use("/users", userRoute);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: "존재하지 않는 API입니다." });
});

if (process.env.NODE_ENV === "development") {
  app.listen(process.env.PORT_DEV, () => {
    console.log(`Server is Running on ${process.env.PORT_DEV}`);
  });
} else {
  app.listen(process.env.PORT_PRO, () => {
    console.log(`Server is Running on ${process.env.PORT_PRO}`);
  });
}
