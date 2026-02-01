import cors from "cors";

export const availableCors = [
  "http://localhost:3000",
  "http://localhost:9000",
  "http://localhost:8081",
];

const corsOptions = cors({
  origin: availableCors,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Api-Key", "isGuestMode"],
  credentials: true,
  exposedHeaders: ["Authorization", "Api-Key"],
  maxAge: 86400,
});

export default corsOptions;
