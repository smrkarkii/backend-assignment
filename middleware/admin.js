module.exports = async(req, res, next) => {
    const {user} = req.body;
    console.log(user)
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'User is not an admin' });
    }
    next();
}
