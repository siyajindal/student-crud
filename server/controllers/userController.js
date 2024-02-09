 
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10 //required by bcrypt
const Token  = require('../models/token.js');
const User = require('../models/user.js');



exports.signup = async (request, response) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(request.body.password, salt);
        
        const user = { 
            username: request.body.username,
            name: request.body.name, 
            password: hashedPassword }
        console.log(user); 
        
        const newUser = new User(user);
        await newUser.save();
      
        return response.status(200).json({ msg: 'Signup successfull' });
    } catch (error) {
        return response.status(500).json({ 
            msg: 'Error while signing up user',
            err : error
            
        });
    }
}


exports.login = async (request, response) => {
    let user = await User.findOne({ username: request.body.username });
    if (!user) {
        return response.status(400).json({ msg: 'Username does not match' });
    }

    try {
        let match = await bcrypt.compare(request.body.password, user.password);
        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '60m'});
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
            
            const newToken = new Token({ token: refreshToken });
            await newToken.save();
        
            response.status(200).json({ accessToken: accessToken, refreshToken: refreshToken,name: user.name, username: user.username });
        
        } else {
            response.status(400).json({ msg: 'Password does not match' })
        }
    } catch (error) {
        response.status(500).json({ msg: 'error while login the user' })
    }
}

exports.logout = async (request, response) => {
    const token = request.body.token;
    await Token.deleteOne({ token: token });

    response.status(204).json({ msg: 'logout successfull' });
}

   exports.verifyToken = (req,res, next)=>{
    req.user = {username:null, verified:false}
    const { privateKey } = process.env
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader!=='undefined') {
      const bearerToken = bearerHeader.split(' ')[1]
      jwt.verify(bearerToken, privateKey, function (err,data){
        if(! (err && typeof data=== 'undefined')) {
          req.user = {username:data.username, verified:true}
          next()}
      })
    }
    return res.sendStatus(403)
   }

   exports.updatePassword = async(req,res)=> {
    try{
      const { oldPassword, newPassword } = req.body
      const { passwordHash } = process.env
      if(oldPassword && newPassword) {
        let match = await bcrypt.compare(oldPassword, passwordHash)
        if(match) {
          let hash = await bcrypt.hash(newPassword, saltRounds)
          return res.sendStatus(200)
        }
      }
      return res.sendStatus(401)
    } catch(err){
      console.log(err)
      return res.sendStatus(500)
    }
  } 
