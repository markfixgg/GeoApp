import { Request, Response } from "express";
import { to } from "../../modules";
import Device from "../../models/Device.model";
import Group from "../../models/Group.model";
import moment from "moment";

class MobileController {
    async get (req: Request, res: Response) {
        const { name } = req.params;

        if (!name) return res.status(403).send({ success: true, error: "Missing name" });

        const [ error ] = await to(Device.findOne({ name }).populate('group').exec());
        if (error) return res.send(error.message);

        return res.send(null);
    }

    async create (req: Request, res: Response) {
        const { name } = req.params;

        if (!name) return res.status(403).send({ success: true, error: "Missing device name" });

        const [ error ] = await to(Device.create({ name }));
        if (error) return res.send(error.message);

        return res.send(null);
    }

    async change_coordinates (req: Request, res: Response) {
        const { latitude, longitude } = req.query;

        if(!req.params.name) return res.status(403).send({ success: true, error: "Missing device name" });
        if(!latitude) return res.status(403).send({ success: true, error: "Missing latitude" });
        if(!longitude) return res.status(403).send({ success: true, error: "Missing longitude" });

        const [ error ] = await to(Device.updateOne({ name: req.params.name }, { coordinates: { latitude, longitude, timestamp: moment().utc().toISOString() } }).exec());
        if (error) return res.send(error.message);

        res.send(null);
    }

    async change_group (req: Request, res: Response) {
        const { name, groupName } = req.params;

        const group = await Group.findOne({ name: groupName });
        if(!group) return res.send("Group not found");

        const [ error ] = await to(Device.updateOne({ name }, { group: group._id }).exec())
        if (error) return res.send(error.message);

        res.send(null)
    }
}

export default new MobileController();