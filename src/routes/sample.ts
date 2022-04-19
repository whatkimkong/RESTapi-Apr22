import express from "express";
import sample from "../controllers/sample";

const router = express.Router();

router.get('/get', sample.getAllSamples);
router.post('/post', sample.createASample);

export = router;