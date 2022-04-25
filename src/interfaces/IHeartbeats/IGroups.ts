import { Document } from 'mongoose';

export default interface IGroups extends Document {
    group: string;
    instances: number;
}


export default interface IGroupResponse extends Document {
    group: string;
    instances: number;
    createdAt: string;
    updatedAt: string;
    _id: string;
    __v: number;
}