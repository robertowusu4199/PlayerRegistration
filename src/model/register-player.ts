import { Schema } from 'mongoose';
import mongoose from 'mongoose';
  
export const PlayerSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, required: false },
    firstName: String,
    lastName: String,
    gender: String,
    country: String,
    club: String,
    position: String,
    strongFoot: String,
    bio: String,
}, 
{
    timestamps: true
}    
);

const Player = mongoose.model("Player", PlayerSchema);
export default Player;