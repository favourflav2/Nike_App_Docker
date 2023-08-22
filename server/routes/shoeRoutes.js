import { Router } from "express";
import { getAllShoes, insertShoes, insertShoesImages, updateImages, updateShoe_Images } from "../controller/shoeController.js";
import { v2 as cloudinary } from 'cloudinary'

const router = Router()

router.get('/allShoes',getAllShoes)
router.get('/shoe_images',insertShoesImages)
router.get('/shoes',insertShoes)
router.get("/updateShoeImgs",updateShoe_Images)
router.get("/updateOneShoe",updateImages)

export default router