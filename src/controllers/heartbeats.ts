import { Request, Response, NextFunction } from 'express';
import Instance from '../models/Heartbeats/Instance';
import Group from '../models/Heartbeats/Group';
import IInsResponse from "../interfaces/IHeartbeats/IInstance";
// import IGroupRaw from '../interfaces/IHeartbeats/IGroups';
// import IGroupResponse from  "../interfaces/IHeartbeats/IGroups";

/*
POST /:group/:id - createInstance
GET / - getAllGroups - NEEDS populating
DELETE /:group/:id - deleteInstance
GET /:group - getGroup
timeframed delete - NEEDS revision
*/

const NAMESPACE = 'Heartbeats Controller';

// route 'heart/get/' NOT CURRENTLY WORKING
/** returns the total number of instances for each group and their first and last heartbeat
 * sorts by createdAt and updatedAt Timestamps
 * hides __v and _id
 * Group Model has instances which is a count incremented during Instance creation
 * NEED: FIX .populate('group') so result !== null  */
const getAllGroups = (req: Request, res: Response, next: NextFunction) => {
    Group.find().sort({createdAt: 1 , updatedAt: 1 }).select('-__v -_id').exec().then(group => {
        return res.status(200).json({ group
        })
    }).catch(err => {
        return res.status(500).json({
            message: err.message,
            err
        })
    });
};

// route 'heart/get/:groupId'
/** returns the total number of instances for this group
 * Extra: sorts by createdAt and updatedAt Timestamps */
const getGroup = (req: Request, res: Response, next: NextFunction) => {
    const groupId = req.params.groupId;
    Instance.find({group: groupId}).sort({createdAt: 1 , updatedAt: 1 }).then(data => {
    return res.status(200).json({
            data,
        })
    }).catch(err => {
        return res.status(500).json({
            message: err.message,
            err
        })
    });
};

// route 'heart/post/:group/:id'
/** upsert true -- so if Instance exists update
 * if not, create a new document,
 * then do the same for Group Model
 * should increment instance number on update */
const createInstance = (req: Request, res: Response, next: NextFunction) => {
    const { groupId, instanceId } = req.params;
    Instance.findOneAndUpdate({$and: [{group: groupId}, {id: instanceId}]}, {
        id: instanceId,
        group: groupId,
        meta: req.body,
        }, {new: true, upsert: true})
    .then((instance: IInsResponse) => {
        Group.findOneAndUpdate({group: instance._id}, { $inc: {instances: 1}}, {new: true, upsert: true, rawResult: true})
        .then((group: any) => {
            group.lastErrorObject.updatedExisting === true ? res.status(200).json({ instance, message: "instance updated"}) : res.status(200).json({ instance, message: "new instance added to this group" })
        }).catch((err) => {
            return res.status(500).json({
                message: err.message,
                err
            })
        });
    }).catch((err) => {
        return res.status(500).json({
            message: err.message,
            err
        })
    })
};

// route 'heart/delete/:group/:id' 
/** first 'finds' the group by its params
 * then checks that its id === the params
 * then deletes */
const deleteInstance = (req: Request, res: Response, next: NextFunction) => {
    const groupId = req.params.groupId;
    const instanceId = req.params.instanceId;
    Instance.findOneAndDelete({$and: [{group: groupId}, {id: instanceId}]}).exec().then(instance => {
        instance ? res.status(201).json({ instance, message: 'This Instance has been deleted' }) : res.status(404).json({ message: 'Instance not found' })
        }).catch(err => {
                return res.status(500).json({
                message: err.message,
                err
            })
    });
}; 

// Timeframed delete function
setInterval(async () => {
        await async function deleteOldHeartbeat() {
        let date = new Date();
        let timeLimit = new Date();
        // subtract timeLimit from the time now
        timeLimit.setMinutes(date.getMinutes()-30);
    
        // search for documents last updated past the timeframe, using $lt operator & delete them
        const oldDocs = await Instance.find({"updated_at" : {$lt : timeLimit }})
        oldDocs.length > 0 ? console.log({oldDocs}, "documents to be deleted") : null;

        const docsToDelete = await Instance.deleteMany({"updated_at" : {$lt : timeLimit }})
        docsToDelete ? console.log({docsToDelete}, "documents successfully deleted") : null;
        }
// recall the function after 15 mins, you can change the frequence (previously 1 day: 86400)
}, 60); // TO BE REFACTORED: process.env.DELETE_TIMEFRAME | 900 (where the latter should be a default)

// route 'heart/get/instances'
/** Extra route 
 * to check total instances and
 * to monitor effect of other routes */
const getAllInstances = (req: Request, res: Response, next: NextFunction) => {
    Instance.find().exec().then(data => {
    return res.status(200).json({
            instances: data,
            count: data.length,
        })
    }).catch(err => {
        return res.status(500).json({
            message: err.message,
            err
        })
    });
};

export default {getAllGroups, getAllInstances, getGroup, createInstance, deleteInstance };
