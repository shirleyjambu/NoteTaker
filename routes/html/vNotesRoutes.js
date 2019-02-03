const router = require("express").Router();
const path = require("path");

const getPath = (fileName) =>{
  return "./../../public/html/"+fileName;
};

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, getPath('landing.html')));
});

router.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, getPath('notes.html')));
});

module.exports = router;