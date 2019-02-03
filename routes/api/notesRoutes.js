const router = require("express").Router();
const notesController = require("../../controllers/notesController");


router.route("/getNotes").get(notesController.getAllNotes);
router.route("/note").post(notesController.addNote); 

/*

router
  .route("/all")
  .get(tableController.getAllTables);

router
  .route("/tables")
  .get(tableController.getSeatedTables);

router
  .route("/waitList")
  .get(tableController.getWaitList);  

router
  .route("/reserve")
  .post(tableController.makeReservation);

router
  .route("/delete")
  .delete(tableController.deleteTable); */

module.exports = router;