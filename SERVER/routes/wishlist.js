const Wishlist = require("../models/Wishlist");
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("./verifyToken");
const router = require("express").Router();

//CREATE
router.post("/", verifyTokenAndAuthorization, async (req, res) => {
  const newWishlist = new Wishlist(req.body);
  try {
    const savedWishlist = await newWishlist.save();
    res.status(200).json(savedWishlist);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedWishlist = await Wishlist.findOneAndUpdate(
      { userId: req.params.userId },
      {
        productsId: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedWishlist);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //DELETE
// router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.status(200).json("Product has been deleted...");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //Get PRODUCT
// router.get("/find/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     res.status(200).json(product);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //Get ALL PRODUCTS
// router.get("/", async (req, res) => {
//   const qNew = req.query.new;
//   const qCategory = req.query.category;
//   const qName = req.query.name;
//   try {
//     const products = qNew
//       ? await Product.find().sort({ createdAt: -1 }).limit(5)
//       : qCategory
//       ? await Product.find({ categories: { $in: [qCategory] } }).sort({
//           createdAt: -1,
//         })
//       : await Product.find();
//     res.status(200).json(products);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //GET-SEARCH
// router.get("/search", async (req, res) => {
//   const query = req.query.q;
//   try {
//     const results = await Product.find({
//       name: { $regex: query, $options: "i" },
//     });
//     res.status(200).json(results);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

module.exports = router;
