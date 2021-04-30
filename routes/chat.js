const {Router} = require("express");

const router =  Router();


router.get("/", (req, res) => {
    // console.log(req.query);
    res.render("chat.ejs", {user_name: req.query.user_name});
})


module.exports = router;