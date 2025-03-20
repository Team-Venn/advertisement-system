// import jwt from 'jsonwebtoken';
import { expressjwt } from "express-jwt";


export const authenticate = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],

    getToken: function fromHeaderOrQuerystring(req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
});



// Create an error handler for auth errors
export const handleAuthError = (err, req, res, next) => {
if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Authentication required. Please log in.' });
}
next(err);
};


// export const authenticate = (req, res, next) => {
//     const authorization = req.headers.authorization;

//     // Check if the authorization is provided
//     if (!authorization) {
//         return res.status(403).json({ message: 'No authorization provided' });
//     }

//     // Extract authorization from "Bearer <authorization>" format
//     const tk = authorization.split(' ')[1];

//     // Verify the token
//     jwt.verify(tk, process.env.JWT_SECRET, (err, decoded) => {
//         if (err) {
//             return res.status(500).json({
//                 message: 'Failed to authenticate token',
//                 error: err.message
//             });
//         }

//         // Assuming the token carries userId or consumerId, vendorId for distinguishing users
//         req.user = { id: decoded.userId }; // Attach the user ID to the request object

//         next(); // Call the next middleware or route handler
//     });
// };