import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import IGroups from "../../interfaces/IHeartbeats/IGroups";

const GroupSchema: Schema = new Schema(
    {
        _id: { type: String},
        group: { type: Schema.Types.ObjectId, ref: 'Instance' },
        instances: { type: Number , default: 1}, // a counting parameter
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IGroups>('Groups', GroupSchema)