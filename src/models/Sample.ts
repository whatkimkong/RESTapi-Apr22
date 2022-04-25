import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import ISample from "../interfaces/ISample";

const SampleSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        meta: { type: {}, required: false },
    },
    {
        timestamps: true
    }
);

export default mongoose.model<ISample>('Sample', SampleSchema)