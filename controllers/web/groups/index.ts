import { Request, Response } from "express";
import { to } from "../../../modules";

import Group from "../../../models/Group.model";

class GroupController {
    async get(req: Request, res: Response) {
        const [ error, groups ] = await to(Group.find({}).exec());
        if(error) return res.status(500).send({ success: false, error: error.message });

        res.send(groups);
    }

    async create(req: Request, res: Response) {
        if(!req.body.name) return res.send({ error: 'Missing name' });

        const [ error, result ] = await to(Group.create({ name: req.body.name }));
        if(error) return res.send({ error: error.message })

        res.send(result)
    }

    async delete(req: Request, res: Response) {
        if(!req.params.name) return res.send({ error: 'Missing name' });

        const [ error, result ] = await to(Group.findOneAndDelete({ name: req.params.name }).exec());
        if(error) return res.send({ error: error.message })

        res.send(result)
    }
}

export default new GroupController();