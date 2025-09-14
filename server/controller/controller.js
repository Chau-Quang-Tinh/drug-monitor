const Drug = require("../models/drug");

// GET /api/drugs
exports.getAll = async (req, res, next) => {
  try {
    const drugs = await Drug.find();
    res.json(drugs);
  } catch (err) {
    next(err);
  }
};

// POST /api/drugs
exports.create = async (req, res, next) => {
  try {
    const drug = new Drug(req.body);
    await drug.save();
    res.status(201).json(drug);
  } catch (err) {
    next(err);
  }
};

// PUT /api/drugs/:id
exports.update = async (req, res, next) => {
  try {
    const updated = await Drug.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Drug not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/drugs/:id
exports.remove = async (req, res, next) => {
  try {
    const deleted = await Drug.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Drug not found" });
    res.json({ message: "Drug deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// POST /api/drugs/:id/purchase
exports.purchase = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const drug = await Drug.findById(req.params.id);
    if (!drug) return res.status(404).json({ error: "Drug not found" });
    if (quantity <= 0)
      return res.status(400).json({ error: "Invalid purchase quantity" });
    if (drug.pack < quantity)
      return res.status(400).json({ error: "Not enough packs available" });

    drug.pack -= quantity;
    await drug.save();
    res.json({ message: "Purchase successful", drug });
  } catch (err) {
    next(err);
  }
};
