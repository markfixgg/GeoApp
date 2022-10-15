import { Request, Response } from "express";
import { isObjectIdValid, to } from "../../../modules";
import Device from "../../../models/Device.model";
import mongoose from "mongoose";

class DevicesController {
    async get(req: Request, res: Response) {
        let { groups }: any = req.query;

        const filters: any = {};

        if(groups) {
            const splitted = groups.split(',').map((item: string) => item.trim()).filter(isObjectIdValid);

            filters.group = {
                $in: splitted.map((group: string) => new mongoose.Types.ObjectId(group))
            }
        }

        const [ error, devices ] = await to(Device.find(filters).populate('group').exec());
        if(error) return res.status(500).send({ success: false, error: error.message });

        res.send(devices);
    }
}

export default new DevicesController();