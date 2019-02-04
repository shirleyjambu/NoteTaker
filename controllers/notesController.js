const db = require("./../db/connection");

module.exports={
  getAllNotes : function(req, res){
    db.query("SELECT * FROM notes order by created_dt desc,-modified_dt desc",function(err,dbNotesData){
      if(err) res.json(err);
      //console.log(dbNotesData);
      res.json(dbNotesData);
    });
  },
  getNote : function(req, res){
    db.query("SELECT * FROM notes WHERE ?",[req.query],function(err,dbNotesData){
      if(err) res.json(err);
      //console.log(dbNotesData);
      res.json(dbNotesData);
    });
  },
  addNote : function(req,res){
    db.query("INSERT INTO notes SET ?", [req.body], function(err, dbNote){
      if(err) res.json(err);
      res.json(dbNote);
    });
  },
  deleteNote : function(req,res){
    db.query("DELETE FROM notes WHERE ?", [req.body], function(err, dbNote){
      if(err) res.json(err);
      res.json(dbNote);
    });
  },
  editNote : function(req,res){
    let query = db.query("UPDATE notes SET modified_dt = CURRENT_TIMESTAMP, ? WHERE ?", [req.body, {note_id:req.params.note_id}], function(err, dbNote){
      if(err) res.json(err);
      
      res.json(dbNote);
    });
    console.log(query.sql);
  }

}
