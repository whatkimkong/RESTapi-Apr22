import express from "express";
import sample from "../controllers/sample";

const router = express.Router();

// sample routes - create lint templates for scaling?
/* with corresponding ISample Interface, 
        sample controller and Sample Model */
router.get('/get', sample.getAllSamples);
router.post('/post', sample.createASample);

export = router;