export const middle3 = async (req, res, next) => {
    if (req.originalUrl !== "/register") {
        return next();
    }
    if (req.session.user) {
        if (req.session.user.role === "admin") {
            return res.redirect('/admin');
        } else {
            return res.redirect('/protected');
        }
    }
    else {
        return next();
    }
}