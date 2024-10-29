import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose"

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['admin', 'client'], required: true },
    created_at: { type: Date, default: Date.now }
  });

userSchema.plugin(passportLocalMongoose);

export default mongoose.model("User", userSchema);