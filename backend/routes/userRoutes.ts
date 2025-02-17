import express from "express";

const router = express.Router();

router.post("/register", async (req, res) => {
  res.json({ message: "Registering Users" });
});

router.post("/login", async (req, res) => {
  res.json({ message: "Logging In Users" });
});

export default router;
