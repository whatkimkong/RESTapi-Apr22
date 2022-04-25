import { Document } from 'mongoose';

export default interface IGroups extends Document {
    group: string;
    count: number;
}