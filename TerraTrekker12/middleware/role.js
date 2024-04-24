const isAdmin = (admin) => async (req, res, next) => {
    if (admin !== req.user.type) {
        return res.status(400).json({ message: 'forbidden' });
    }
    next();
};

module.exports = { isAdmin };
