const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type:String,
        require: true
    },
    email: {
        type:String,
        unique:true
    },
    senha: {
        type:string

    }
});

const User = mongoose.model('User', UserSchema);
export default User;