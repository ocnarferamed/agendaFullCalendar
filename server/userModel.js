const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    usuario: {
        type: String,
        required: true,
        unique:true

    },
    password: {
        type: String,
        required: true
    }
});

userSchema.methods.comparePassword = function(password,callback){
    bcrypt.compare(password,this.password,function(err,same){
        if(err){
            callback(err);
        }else{
            callback(err,same);
        }
    });
}




module.exports = mongoose.model('Usuario', userSchema);
