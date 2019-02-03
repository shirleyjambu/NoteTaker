const router = require("express").Router();
const vNotesRoutes = require("./vNotesRoutes");

router.use("/",vNotesRoutes);

module.exports=router;