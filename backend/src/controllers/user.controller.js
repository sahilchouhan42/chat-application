import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export const register = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        if (!fullName || !username || !password || !gender || !confirmPassword) {
            return res.status(400).json({ success: false, message: "All fields required" })
        }

        if (password !== confirmPassword) return res.status(400).json({ success: false, message: "Password mismatch" })

        const existUser = await User.findOne({ username })
        if (existUser) return res.status(400).json({ success: false, message: "User already exist" })

        const hashedPassword = await bcrypt.hash(password, 10)

        //profilephoto
        const userpProfilePhoto = `https://i.pravatar.cc/300?username=${username}`

        const user = await User.create({
            fullName,
            username,
            password: hashedPassword,
            profilePhoto: userpProfilePhoto,
            gender

        })

        return res.status(201).json({success: true, message: "User created successfully", user})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

export const login = async (req, res)=>{
    try {
        const {username, password} = req.body
        if(!username || !password) return res.status(400).json({success: false, message: "All fileds required"})

        const user = await User.findOne({username})
        if(!user) return res.status(400).json({success: false, message: "User not found"})

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if(!isPasswordMatch) return res.status(400).json({success: false, message: "Incorrect Password"})

        const tokenData = {userId: user._id}

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET,{expiresIn: "1d"})

        return res.status(200).cookie("token", token, {maxAge: 1*24*60*60*1000, httpOnly: true, sameSite: 'lax'}).json({success: true, message: "Login successfull", user})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success: false, message: "Internal server error"})
    }
}

export const logout = (req, res)=>{
    try {
        return res.status(200).cookie('token', "", {maxAge:0}).json({success: true, message: "Logout successfully"})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success: false, message: "Internal server error"})
    }
}

export const getOtherUsers = async (req, res)=>{
    try {
        const loggedInUserId = req.id
        const otherUsers = await User.find({_id: {$ne:loggedInUserId}}).select('-password')
        return res.status(200).json({success: true, message: "Other users", otherUsers})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success: false, message: "Internal server error"})
    }
}