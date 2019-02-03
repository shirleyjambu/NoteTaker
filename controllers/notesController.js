const db = require("./../db/connection");

module.exports={
  getAllNotes : function(req, res){
    db.query("select * from notes",function(err,dbNotesData){
      if(err) res.json(err);
      console.log(dbNotesData);
      res.json(dbNotesData);
    });
  },
  addNote : function(req,res){
    db.query("INSERT INTO notes SET ?", [req.body], function(err, dbNote){
      if(err) res.json(err);
      res.json(dbNote);
    });
  }
}
