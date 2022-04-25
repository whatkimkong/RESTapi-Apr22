import { Document } from 'mongoose';

export default interface ISample extends Document {
    name: string;
    meta?: {};
}