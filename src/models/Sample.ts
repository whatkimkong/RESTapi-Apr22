import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import ISample from "../interfaces/sample";

const SampleSchema: Schema = new Schema(
    {
        group: { type: String, required: true },
        meta: { required: false }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<ISample>('Sample', SampleSchema)