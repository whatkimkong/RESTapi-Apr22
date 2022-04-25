import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Sample from '../models/Sample';

const NAMESPACE = 'Sample Controller';

const getAllSamples = (req: Request, res: Response, next: NextFunction) => {
    Sample.find().exec().then(data => {
    return res.status(200).json({
            samples: data,
            count: data.length,
        })
    }).catch(err => {
        return res.status(500).json({
            message: err.message,
            err
        })
    });
};

const createASample = (req: Request, res: Response, next: NextFunction) => {
    let { name, meta } = req.body;
    const sample = new Sample({
        _id: new mongoose.Types.ObjectId(),
        name,
        meta,
    });

    return sample.save().then(data => {
        return res.status(200).json({
            sample: data,
        })
    }).catch(err => {
        return res.status(500).json({
            message: err.message,
            err
        })
    });
};

export default { getAllSamples, createASample };
