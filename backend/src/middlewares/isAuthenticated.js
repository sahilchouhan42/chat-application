import jwt from "jsonwebtoken"

const isAuthenticated = async (req, res, next)=>{
    try {
        const token = req.cookies.token
        // console.log(token)
        if(!token) return res.status(401).json({success: false, message: "User not authenticated"})
        
        const decode = await jwt.verify(token, process.env.JWT_SECRET)
        // console.log(decode)

        if(!decode) return res.status(401).json({success: false, message: "Invalid Token"})

        req.id = decode.userId
        next()
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({success: false, message: "error in isAuthenticated middleware"})
    }
}

export default isAuthenticated