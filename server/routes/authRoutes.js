import { Router } from "express";
import {  getLikedShoes, getOrders, likeShoe, signIn, signUp, stripe_Payment_Guest } from "../controller/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router()

router.post("/signup",signUp)
router.post("/signin",signIn)

router.post("/likeShoe",authMiddleware,likeShoe)
router.get("/getLikedShoes",authMiddleware,getLikedShoes)

router.post("/checkoutGuest",stripe_Payment_Guest)

router.get("/allOrders",authMiddleware,getOrders)



//router.post('/webhook',authMiddleware,checkOutSession)

export default router