import express, { Router } from "express";
import {
    createProduct,
    createProductReview,
    deleteProduct,
    deleteProductReview,
    getAdminProducts,
    getAllProducts,
    getProductDetails,
    getProductReviews,
    updateProduct,
} from "../controllers/product";
import verifyJWT from "../middleware/verifyJWT";
import { authorizeRoles } from "../middleware/authorizeRoles";

const router: Router = express.Router();

router.route("/products").get(getAllProducts);

router
    .route("/admin/products")
    .get([verifyJWT, authorizeRoles("admin"), getAdminProducts]);

router.route("/product/:id").get(getProductDetails);

router.route("/products/new").post(createProduct);

router
    .route("/admin/products/add")
    .post([verifyJWT, authorizeRoles("admin"), createProduct]);

router.route("/product/:id").put(updateProduct);

router
    .route("/admin/product/:id")
    .put([verifyJWT, authorizeRoles("admin"), updateProduct]);

router.route("/product/:id").delete(deleteProduct);

router
    .route("/admin/product/:id")
    .delete([verifyJWT, authorizeRoles("admin"), deleteProduct]);

router.route("/review").put([verifyJWT, createProductReview]);

router.route("/reviews").get([getProductReviews]);

router.route("/delete/reviews").delete([verifyJWT, deleteProductReview]);

export default router;
