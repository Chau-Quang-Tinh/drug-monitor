const mongoose = require("mongoose");

const drugSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    dosage: { type: String, required: true },
    card: { type: Number, required: true },
    pack: { type: Number, required: true },
    perDay: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Drug", drugSchema);
