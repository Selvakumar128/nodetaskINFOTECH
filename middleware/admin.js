const Admin = (req, res, next) => {
    if(!req.user.isAdmin) return res.status(403).send("Access denided, User dosen't have rights ")
    next()
}

export default Admin;