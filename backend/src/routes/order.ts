import {
    deleteOrder,
    getAllOrder,
    getSingleOrder,
    myOrders,
    newOrder,
    updateOrderStatus,
} from "../controllers/order";
import express, { Router } from "express";
import { authorizeRoles } from "../middleware/authorizeRoles";
import verifyJWT from "../middleware/verifyJWT";

const router: Router = express.Router();

router.route("/orders/new").post(verifyJWT, newOrder);

router.route("/orders/:id").get(verifyJWT, getSingleOrder);

router.route("/me/orders").get(verifyJWT, myOrders);

router
    .route("/admin/orders")
    .get(verifyJWT, authorizeRoles("admin"), getAllOrder);

router
    .route("/admin/orders/:id")
    .put(verifyJWT, authorizeRoles("admin"), updateOrderStatus);

router
    .route("/admin/order/:id")
    .delete(verifyJWT, authorizeRoles("admin"), deleteOrder);
export default router;
