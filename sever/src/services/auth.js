import UserModel from "../models/user.js";
import jwt from 'jsonwebtoken'

async function registerUser(data){
    const isExist = await checkExistUsername(data.username);
    if (isExist) {
        return {
            status:{
                message: 'Username already exist, please choose a new username',
                success: false,
            },
            user: null,
        }
    }
    
    var newUser = new UserModel({...data, displayName: data.username}, {password: 0});
    var user = await newUser.save();

    console.log(user)    
    return {
        status:{
            message: '',
            success: true,
        },
        user
    }
}

//check correct username and password
async function checkLogin({username, password}){
    var message = '';
    var success = false;
    const user = await UserModel.findOne({username: username, password: password}, {password: 0});
    if (!user){
        message = 'Incorrect password';
    }else{
        success = true;
    }
    return {status: {message, success}, user: user}
}

//login 
function login(username){
    console.log("USER NAME LOGIN", username)
    var token = jwt.sign({username}, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

async function checkExistUsername(username){
    try {
        const user = await UserModel.findOne({username: username});
        return user !== null;  
    } catch (error) {
        console.log(error)
    }
}

async function checkCorrectPassowrd(username, password){
    try {
        const user = await UserModel.findOne({username: username, password: password});
        console.log("user", user)
        return user !== null;
    } catch (error) {
        console.log(error)
    }
}


function verifyToken(token){
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        console.log('verify token', data);
        return data;
    } catch (error) {
        console.log(error)
        return false;
    }

    
}
export {registerUser, checkLogin, login, verifyToken}