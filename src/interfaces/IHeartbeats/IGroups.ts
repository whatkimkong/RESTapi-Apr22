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

export default interface IGroupRaw extends Document {
    lastErrorObject: {
        n: number,
        updatedExisting: boolean,
    };
    value: {
        _id: string,
        group: string,
        __v: number,
        createdAt: string,
        instances: number,
        updatedAt: string,
    }
    ok: number;
    $clusterTime: {
        clusterTime: {},
        signature: {}, 
    };
    operationTime: {
        $timestamp: string,
    };
}