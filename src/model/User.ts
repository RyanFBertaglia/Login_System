import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt'

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    senha: {
        type: String,
        required: true,
    }
});

UserSchema.pre("save", async function(next){
    this.senha = await bcrypt.hash(this.senha, 10);
    next();
})

const User = mongoose.model('User', UserSchema);
export default User;