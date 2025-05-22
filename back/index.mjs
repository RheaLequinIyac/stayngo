import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/userRoutes.mjs";
import roomRoutes from "./routes/roomRoutes.mjs";
import reservationRoutes from "./routes/reservationRoutes.mjs";
import queryRoutes from "./routes/queryRoutes.mjs";

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/reservations", reservationRoutes);
app.use("/users", userRoutes);
app.use("/rooms", roomRoutes);
app.use("/queries", queryRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
