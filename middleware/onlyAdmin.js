module.exports = (req, res, next) => {
    const userRole = req.auth.user_Role;
    if (userRole=="ADMIN") {
        next();
    } else {
        res.status(403).json({ error: 'Unauthorized access' });
    }
};