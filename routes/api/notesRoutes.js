const router = require("express").Router();
const notesController = require("../../controllers/notesController");

router.route("/getNotes").get(notesController.getAllNotes);

router
  .route("/note/:note_id?")
  .get(notesController.getNote)
  .post(notesController.addNote)
  .delete(notesController.deleteNote)
  .put(notesController.editNote); 

module.exports = router;