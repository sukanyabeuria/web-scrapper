const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
        let token = req.headers.authorization;
        console.log("Token from headers:", token); 
        token = token.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
};


module.exports = authMiddleware;
