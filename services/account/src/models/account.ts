import { model, Schema } from 'mongoose';

const AccountSchema = new Schema({
    type: { type: String, required: true },
    balance: { type: Number, required: true, min: 0 },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    account: { type: String, required: true },
    agency: { type: String, required: true }
});

export default model('Account', AccountSchema);