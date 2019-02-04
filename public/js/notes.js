const displayExistingNotes = () =>{
  $.ajax({
    url: "/NoteTaker/api/getNotes",
    method: "GET"
    }).then(function (data) {
      if(data){
        displayNotes(data);
      }
  });
};

const displayNotes = (noteData) => {
  $("#savedNotes").empty();
  for(let i=0; i < noteData.length; i++){
    $("#savedNotes").append(getCard(noteData[i]));
  }
};

const getCard =(dbNote)=>{
  let strDt = moment(dbNote.created_dt,'YYYY-MM-DD HH:mm:ss').format("Do MMM[']YY[, ]HH:mm a");

  $card = $("<div class='card'>");
  $card.attr("id",dbNote.note_id);

  $cardHeader = $("<div class='card-header'>");
  $cardHeader.attr("id",dbNote.note_id);
  
  $cardHeader.append(`<a data-toggle="collapse" href="#collapse${dbNote.note_id}">${dbNote.note_title}</a>`);
  $cardHeader.append(`<span style='float:right;'>${strDt} <i class="fa fa-edit"></i><i class="fa fa-trash-alt"></i></span>`);

  $cardBody = $("<div class='card-body'>");
  $cardBody.append(dbNote.note_text);

  $collapseDiv = $("<div class='collapse'>");
  $collapseDiv.attr("id","collapse"+dbNote.note_id);
  $collapseDiv.append($cardBody);
    
  $card.append($cardHeader,$collapseDiv);
   
  return $card;
}

const validateNote =(noteData)=>{
  if(!noteData.note_title  && !noteData.note_text ){
    return false;
  }
  return true;
}

const addNote = (noteData)=>{
  $.ajax({
    url: "/NoteTaker/api/note",
    method: "POST",
    data:noteData
    }).then(function () {
      console.log("Note Created");
      clearNote();
      displayExistingNotes();
  });
}

const editNote = (note_id, noteData)=>{
  
  console.log("note_id :" + note_id);
  console.log(noteData);
  $.ajax({
    url: "/NoteTaker/api/note/"+note_id,
    method: "PUT",
    data:noteData
    }).then(function () {
      console.log("Note Updated");
      clearNote();
      displayExistingNotes();
  });
}

const deleteNote = (note_id)=>{
  console.log("Note_id : " + note_id);
  $.ajax({
    url: "/NoteTaker/api/note",
    method: "DELETE",
    data:{note_id:note_id}
    }).then(function () {
      console.log("Note Deleted");
      displayExistingNotes();
  });
};

//Set Note to Edit
const setNoteToEdit = (note_id)=>{
  // Get Note from Database
  $.ajax({
    url: "/NoteTaker/api/note",
    method: "GET",
    data:{note_id:note_id}
    }).then(function (noteData) {
      if(noteData){
        setNote(noteData[0]);
      }
  });
};

const setNote = (noteData) =>{
  $("#note_title").val(noteData.note_title);
  $("#note_text").val(noteData.note_text);
  $("#note_id").val(noteData.note_id);
}

const clearNote = () => {
  $("#note_title").val("");
  $("#note_text").val("");
  $("#note_id").val("");
} 

$(document).ready(function(){
  //Get existing notes
  displayExistingNotes();

  // Event Handlers
  // Add Note
  $(document).on("click",".fa-save",function(){
    let note_id = $("#note_id").val();
    let note_title = $("#note_title").val().trim();
    let note_text = $("#note_text").val().trim();

    let noteData = {note_title:note_title, note_text:note_text};

    if(validateNote(noteData)){
      if(note_id){
        editNote(note_id, noteData);
      }else{
        addNote(noteData);
      }
    }else{
      $("#message").text("Nothing to save.");
    }

    
  });

  // Delete Note
  $(document).on("click",".fa-trash-alt",function(){
    let note_id = $(this).closest("div").attr("id");
    deleteNote(note_id);
  });

  // Edit Note
  $(document).on("click",".fa-edit",function(){
    let note_id = $(this).closest("div").attr("id");
    console.log(note_id);
    setNoteToEdit(note_id);
  });


});
