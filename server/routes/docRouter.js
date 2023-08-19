const router = require("express").Router();
const Documents = require("../model/doc-model");

// Documents Route
router.get("/", async (req, res) => {
  let documents = await Documents.find({});
  return res.json(documents);
});

module.exports = router;
