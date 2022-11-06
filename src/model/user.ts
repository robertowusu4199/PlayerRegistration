import mongoose from "mongoose";
import IUser from "../interfaces/user";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },
},
    {
      timestamps: true
    }
);

export default mongoose.model<IUser>("User", userSchema)