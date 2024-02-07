import express from "express";
import authRoute from "./authRoutes.js";
import userRoute from "./userRoutes.js";
import postRoute from "./postRoutes.js";

const router = express.Router();

router.use(`/auth`, (req,res,next)=>{
    console.log(req.body) 
next();
},authRoute); //auth/register
router.use(`/users`, userRoute);
router.use(`/posts`, postRoute);

export default router;
