import mongoose from "mongoose";

export const to = (promise: Promise<any>) => promise.then((data) => [null, data]).catch((error) => [error])
export const isObjectIdValid = (id: string) => mongoose.Types.ObjectId.isValid(id) ? String(new mongoose.Types.ObjectId(id)) === id : false;