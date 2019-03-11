import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema(
    {
        id: Number,
        message: String
    },
    {
        timestamps: true
    }
);

const Data = mongoose.model('Data', DataSchema);
export default Data;