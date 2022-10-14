import { Request, Response } from "express";
import { to } from "../../modules";
import Group from "../../models/Group.model";
import Device from "../../models/Device.model";

class WebController {
    async get_groups(req: Request, res: Response) {
        const [ error, groups ] = await to(Group.find({}).exec());
        if(error) return res.status(500).send({ success: false, error: error.message });

        res.send(groups);
    }

    async get_devices(req: Request, res: Response) {
        const [ error, devices ] = await to(Device.find({}).exec());
        if(error) return res.status(500).send({ success: false, error: error.message });

        res.send(devices);
    }
}

export default new WebController();