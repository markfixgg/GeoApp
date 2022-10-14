import { Request, Response } from "express";
import {to} from "../../../modules";
import Device from "../../../models/Device.model";

class DevicesController {
    async get(req: Request, res: Response) {
        const [ error, devices ] = await to(Device.find({}).populate('group').exec());
        if(error) return res.status(500).send({ success: false, error: error.message });

        res.send(devices);
    }
}

export default new DevicesController();