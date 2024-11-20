import { User } from "../models/userModel.js"
import sendJwtToken from "../utils/sendJwtToken.js";


const register = async (req, res) => {
    try {
        const { name, email, password,role } = req.body;
        console.log("name",name,"Email",email,"Password",password);
        
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const isUserExistOrNot = await User.findOne({ email });
        if (isUserExistOrNot) {
            return res.status(400).json({
                success: false,
                message: "User already registered !!"
            })
        }

        let user;

        if(role){
             user = await User.create({ name, email, password,role });
             console.log("role");
        }else{
             user = await User.create({ name, email, password });
        }

        if (!user) {
            return res.status(500).json({
                success: false,
                message: "server error while registering"
            })
        }
        sendJwtToken("User registered successfully",200,user,res);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fileds are required"
            })
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User are not registered"
            })
        }

        const isCorrectPassword = await user.correctPassword(password);
        if (!isCorrectPassword) {
            return res.status(400).json({
                success: false,
                message: "Password is incorrect"
            })
        }
        sendJwtToken("User loggedIn successfully",200,user,res);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const logout = (req, res) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly:true
    }).json({
        success: true,
        message: "user successfully logout"
    })
}

const getUserProfile = async(req,res) => {
    const {id} = req.user;
    // console.log("name",req.user);
    try {
        const user = await User.findById(id);
        // console.log(user);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"user are not registered"
            })
        }
        res.status(200).json({
            success:true,
            message:"succefully get user profile",
            data:user
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const updateUser = async (req, res) => {
    const { id } = req.user;
    const { name } = req.body;

    const user = await User.findById(id);
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "user doesn't exists"
        })
    }
    
    console.log(name);

    if(name){
        console.log("no00000");
        user.name = name;
    }

    try {
        // console.log(req.file);
        if (req.file) {
            console.log(req.file);
            // console.log("req", req.file);
            await cloudinary.v2.uploader.destroy(user.avatar.public_id);
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                width: "250",
                height: "250",
                crop: "fill",
                gravity: "faces"
            })
            console.log("res", result);
            if (result) {
                user.avatar.public_id = result.public_id;
                user.avatar.secure_url = result.secure_url;
            }
        }
        // console.log(user);
        await user.save();
        const updatedUser = await User.findById(user._id);
        console.log(updatedUser);
        res.status(200).json({
            success:true,
            message:"Profile updated successfully"
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success:false,
            message:error.message
        })
    }

}


export {
    register,
    login,
    logout,
    getUserProfile,
    updateUser,
}