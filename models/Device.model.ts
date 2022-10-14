import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    group: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "Group" },
    coordinates: {
        latitude: { type: String, default: null },
        longitude: { type: String, default: null },
        timestamp: { type: Date, default: null }
    }
});

const Device = mongoose.model('Device', deviceSchema);

export default Device;
