import express from "../../.gitignore/node_modules/@types/express";
import { sampleHealthCheck } from "../controllers/sample";

const router = express.Router();

router.get('/ping', sampleHealthCheck)

export = router;