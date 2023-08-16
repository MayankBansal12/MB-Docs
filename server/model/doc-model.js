const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  docId: String,
  data: Object,
});

const Document = mongoose.model("Document", Schema);
module.exports = Document;
