import { Request, Response, NextFunction } from 'express';
import log from '../config/log';

const NAMESPACE = 'Sample Controller';

const sampleHealthCheck = (req: Request, res: Response, next: NextFunction) => {
    log.info(NAMESPACE, `Sample health check route called.`);

    return res.status(200).json({
        message: 'pong'
    });
};

export { sampleHealthCheck };
