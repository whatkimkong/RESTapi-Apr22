import { Request, Response, NextFunction } from 'express';
import Instance from '../models/Heartbeats/Instance';
import Group from '../models/Heartbeats/Group';
import IInsResponse from "../interfaces/IHeartbeats/IInstance";
import IGroupResponse from "../interfaces/IHeartbeats/IGroups"
// import mongoose from 'mongoose'; // path _id is required -- problem

/*
POST /:group/:id - createInstance
GET / - getAllGroups -- CURRENTLY MALFUNCTIONING --
DELETE /:group/:id - deleteInstance
GET /:group - getAllInstances - timestamps missing - cant access object properties - typescript issue?
*/

const NAMESPACE = 'Heartbeats Controller';

// route 'heart/get/' 
/** WANT each group listed with their instances & timestamps
 * NOT CURRENTLY WORKING
 */
const getAllGroups = (req: Request, res: Response, next: NextFunction) => {
    Instance.find().exec().then(group => {
        let testing: {group: string, instance :number}[] = [];
        for (let i=0; i< group.length; i++){
            testing.find(obj => {
                if (obj.group == group[i].group){
                    obj.instance++
                } else {
                    testing.push({group: group[i].group, instance: 1})
                }})
        }
        return res.status(200).json({ testing })
    }).catch(err => {
        return res.status(500).json({
            message: err.message,
            err
        })
    });
};

/** CONTRARY TO ABOVE -- would rather use relational database Group Model */
/* BUT NOT CURRENTLY WORKING
const getAllGroups = (req: Request, res: Response, next: NextFunction) => {
    Group.find().exec().then(group => {
    return res.status(200).json({ group })
    }).catch(err => {
        return res.status(500).json({
            message: err.message,
            err
        })
    });
}; */

// route 'heart/get/:groupId'
/** TIMESTAMPS NOT YET ACCESSIBLE - typescript problem?
 *  finds by the groupId param
 * sorts by createdAt and updatedAt Timestamps
 * returns the total number of instances for this group and first and last heartbeat
*/
const getGroup = (req: Request, res: Response, next: NextFunction) => {
    const groupId = req.params.groupId;
    Instance.find({group: groupId}).sort({createdAt: 1 , updatedAt: 1 }).exec().then(data => {
    return res.status(200).json({
            group: groupId,
            instances: data.length,
            data: data,
            // createdAt: data[0].createdAt,
            // updatedAt: data[data.length].updatedAt,
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
 * should increment instance number on update
*/
const createInstance = (req: Request, res: Response, next: NextFunction) => {
    const { groupId, instanceId } = req.params;
    Instance.findOneAndUpdate({$and: [{group: groupId}, {id: instanceId}]}, {
        id: instanceId,
        group: groupId,
        meta: req.body,
        }, {new: true, upsert: true})
    .then((instance: IInsResponse) => {
        // if created right now - add to group otherwise create new group - NOT WORKING - why?
        if (instance.createdAt === instance.updatedAt){
            Group.findOneAndUpdate({group: instance._id}, { $inc: {instances: 1}}, {new: true, upsert: true})
        .then((group: IGroupResponse) => {
            return res.status(200).json({ group, message: "new instance added to group" })
        }).catch((err) => {
            return res.status(500).json({
                message: err.message,
                err
            })
        });
        } else {
            return res.status(200).json({ instance, message: "instance updated"})
        }
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
 * then deletes
*/
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

// IMPLETMENT timeframed delete function
async function deleteOldHeartbeat() {
    let date = new Date();
    let timeLimit = new Date();
    // subtract timeLimit from the time now
    timeLimit.setMinutes(date.getMinutes()-30);
  
    // search for documents last updated past the timeframe, using $lt operator & delete them
    const oldDocs = await Instance.find({"updated_at" : {$lt : timeLimit }})
    oldDocs.length > 0 ? console.log({oldDocs}, "documents to be deleted") : null;

    const docsToDelete = await Instance.deleteMany({"updated_at" : {$lt : timeLimit }})
   // recall the function after 1 days, you can change the frequence
   setTimeout(async () => {
       await deleteOldHeartbeat();
   }, 86400); 
}

// call deleteOldHeartBeat to start its loop recall
deleteOldHeartbeat();

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
