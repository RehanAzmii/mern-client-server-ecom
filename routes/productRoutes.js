import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productDeleteController,
  productFillterController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();
// routes
// create product routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get products
router.get("/get-product", getProductController);

// get single product
router.get("/get-singleproduct/:slug", getSingleProductController);
//get photo

router.get("/product-photo/:pid", productPhotoController);
// delete product
router.delete(
  "/delete-product/:id",
  //   requireSignIn,
  //   isAdmin,
  productDeleteController
);

// filter Product
router.post("/product-filter", productFillterController);

// product count

router.get("/product-count", productCountController);

// product per page
router.get("/product-list/:page", productListController);

// Search product
router.get("/search/:keyword", searchProductController);

//similar products
router.get("/related-product/:pid/:cid", relatedProductController);

// category wise product get
router.get("/product-category/:slug", productCategoryController);

//pay ment routes

// token

router.get("/braintree/token", braintreeTokenController);
// payment rout

router.post("/braintree/payment", requireSignIn, braintreePaymentController);

export default router;
