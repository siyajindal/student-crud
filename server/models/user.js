const mongoose =  require ('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
         
    },
    password: {
        type: String,
        required: true
    }
});


const Authuser = mongoose.model('Authuser', userSchema);

module.exports = Authuser;