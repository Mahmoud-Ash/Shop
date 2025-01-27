const router = require("express").Router();
const Category = require("../models/Category");
const { verifyTokenAndAdmin } = require("./verifyToken");

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newCategory = new Category(req.body);
  try {
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json("Category has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get
router.get("/find/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get ALL
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  try {
    const categorys = qNew
      ? await Category.find().sort({ createdAt: -1 }).limit(5)
      : await Category.find();
    res.status(200).json(categorys);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
