import { Document, Types } from 'mongoose';

export default interface IInstance extends Document {
    id: string;
    group: string;
    meta?: Types.ObjectId; // ? what if meta is object changing in complexity
}

export default interface IInsResponse extends Document {
    id: string;
    group: string;
    meta?: Types.ObjectId;
    createdAt: string;
    updatedAt: string;
    _id: string;
    __v: number;
}