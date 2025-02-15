import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  clerk_id: string;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  clerk_id: { type: String, required: true, unique: true },
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
