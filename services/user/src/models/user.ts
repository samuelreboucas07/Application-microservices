import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, required: true },
    avatar: { type: String },

});

UserSchema.pre('save', function(next) {
    if (this.password) {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
    }
    next();
});

export default model('User', UserSchema);


