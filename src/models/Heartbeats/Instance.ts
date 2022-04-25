import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import IInstance from "../../interfaces/IHeartbeats/IInstance";

const InstanceSchema: Schema = new Schema(
    {   
        _id: { type: String, required: true },
        id: { type: String, required: true },
        group: { type: String, required: true },
        meta: { type: {}, required: false },
    },
    {
        timestamps: true
    }
);

// to hide certain fields from the JSON
InstanceSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj._id;
    delete obj.__v;
    return obj;
}

export default mongoose.model<IInstance>('Instance', InstanceSchema)


// Q - how would I position meta after the timestamps?

/* Info on hiding JSON fields found here:
https://contactsunny.medium.com/hide-properties-of-mongoose-objects-in-node-js-json-responses-a5437a5dbec2 */