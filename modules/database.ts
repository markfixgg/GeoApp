import mongoose from 'mongoose';
import Group from "../models/Group.model";
import Device from "../models/Device.model";

export default async function (url: string) {
    await mongoose.connect(url)
        .then(() => console.log('Connected to database'))
        .catch(() => console.log('Error happened while connecting to database'))

    await Group.init()
    await Device.init()
}