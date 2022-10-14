import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true }
});

const Group = mongoose.model('Group', groupSchema);

export default Group;
