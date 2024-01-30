module.exports = (requiredRoles) => {
    return (req, res, next) => {
        const userRole = req.auth.user_Role;
        console.log("see",userRole);
        if (requiredRoles.includes(userRole)) {
            next();
        } else {
            res.status(403).json({ error: 'Unauthorized access' });
        }
    };
};