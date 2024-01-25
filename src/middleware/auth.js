import jwt from "jsonwebtoken";
import userModel from "../../DB/model/User.model.js";



const auth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(400).json({ message: "please login" })
    }
    if (!authorization?.startsWith(process.env.BEARER_KEY)) {
        return res.status(400).json({ message: "In-valid bearer key" })
    }
    const token = authorization.split(process.env.BEARER_KEY)[1]

    if (!token) {
        return res.status(400).json({ message: "In-valid token" })
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SIGNATURE)
    if (!decoded?.id) {
        return res.status(400).json({ message: "In-valid token payload" })
    }
    const authUser = await userModel.findById(decoded.id).select('userName email role')
    if (!authUser) {
        return res.status(404).json({ message: "Not register account" })
    }
    req.user = authUser;
    return next()
}

export default auth