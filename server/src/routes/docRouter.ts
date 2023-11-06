import { Router } from "express";
import Documents from "../model/doc-model";
const router=Router();

// Documents Route
router.get("/", async (req, res) => {
  let documents = await Documents.find({});
  return res.json(documents);
});

export default router;
