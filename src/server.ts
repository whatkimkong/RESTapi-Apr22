import http from 'http';
import express from '../.gitignore/node_modules/@types/express';
import bodyParser from '../.gitignore/node_modules/@types/body-parser';
import log from './config/log';
import config from './config/config';
import sampleRoutes from './routes/sample';
import mongoose from 'mongoose';

const NAMESPACE = 'Server';
const router = express();

// Connect to MONGO
mongoose.connect(config.mongo.url, config.mongo.options).then(res => {
    log.info(NAMESPACE, 'Connected successfully to MongoDB!');
}).catch(err => {
    log.error(NAMESPACE, err.message, err)
});

// Log the request - MIDDLEWARE
router.use((req, res, next) => {
    log.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

    // LISTENER when the response is finished
    res.on('finish', () => {
        log.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    });

    next();
});

// Parse the request - MIDDLEWARE
// so no need to Parse on the React Frontend side of Apps
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// API rules  - MIDDLEWARE
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Origin', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }

    next();
});

// ROUTES
router.use('/api', sampleRoutes);

// Error-handling
router.use((req, res, next) => {
    const error = new Error('not found');

    return res.status(404).json({ message: error.message });
});

// SERVER
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => log.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`));
