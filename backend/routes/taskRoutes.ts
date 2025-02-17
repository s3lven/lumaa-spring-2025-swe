import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json({ message: "Getting Tasks" });
});

router.post("/", async (req, res) => {
  res.json({ message: "Posting Tasks" });
});

router.put("/:id", async (req, res) => {
    const { id } = req.params
  res.json({ message: `Editing Task ${id}` });
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params
  res.json({ message: `Deleting Task ${id}` });
});

export default router;
