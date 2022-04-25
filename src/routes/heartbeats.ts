import express from "express";
import heartbeats from "../controllers/heartbeats";

const router = express.Router();

// heartbeat routes
router.get('/get/', heartbeats.getAllGroups);
router.get('/get/instances', heartbeats.getAllInstances);
router.get('/get/:groupId', heartbeats.getGroup);
router.post('/post/:groupId/:instanceId', heartbeats.createInstance);
router.delete('/delete/:groupId/:instanceId', heartbeats.deleteInstance);

export = router;