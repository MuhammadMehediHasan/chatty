const {Router} = require("express");

const router =  Router();


router.get("/", (req, res) => {
    console.log(req.query.password)
    if(req.query.password === "Admin1234" && req.query.user_name === "Admin1234")
        res.render("admin.ejs", {admin: true, user_name: "Admin"});
    else 
        res.render("admin.ejs", {admin:false})
})


module.exports = router;