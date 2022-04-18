import express from "express";
import { sampleHealthCheck } from "../controllers/sample";

const router = express.Router();

router.get('/ping', sampleHealthCheck)

export = router;