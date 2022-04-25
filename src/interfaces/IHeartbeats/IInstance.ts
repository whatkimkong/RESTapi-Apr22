import { Document, Types } from 'mongoose';

export default interface IInstance extends Document {
    id: string;
    group: string;
    meta?: Types.ObjectId; // ? what if meta is object changing in complexity
}

