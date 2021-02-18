import { model, Schema } from 'mongoose';
import { IUser } from '../../../interface';

const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

export default model<IUser>('User', UserSchema);
