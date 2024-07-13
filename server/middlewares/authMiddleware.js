import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.auth_token;
        if (!token) {
            return res.status(401).send({ error: "Access Denied, No Token Provided" });
        }
        const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = userId;
        next();
    } catch (error) {
        res.status(400).send({ error: "Invalid Token", errorMsg: error.message });
    }
};
