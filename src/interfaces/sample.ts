import { Document } from 'mongoose';

export default interface ISample extends Document {
    group: string;
    meta?: any;
}