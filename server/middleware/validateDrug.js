module.exports = function (req, res, next) {
  const { name, dosage, card, pack, perDay } = req.body;

  if (!name || name.length <= 5) {
    return res
      .status(400)
      .json({ error: "Name must be longer than 5 characters" });
  }

  const dosageRegex = /^\d{1,2}-morning,\d{1,2}-afternoon,\d{1,2}-night$/;
  if (!dosageRegex.test(dosage)) {
    return res
      .status(400)
      .json({
        error: "Invalid dosage format (XX-morning,XX-afternoon,XX-night)",
      });
  }

  if (card <= 1000) {
    return res.status(400).json({ error: "Card must be greater than 1000" });
  }

  if (pack <= 0) {
    return res.status(400).json({ error: "Pack must be greater than 0" });
  }

  if (perDay <= 0 || perDay >= 90) {
    return res.status(400).json({ error: "PerDay must be >0 and <90" });
  }

  next();
};
